// Builds the "download dataset" archive of each release directory when the
// application is built or served. The archive is derived from the tracked
// release files and is never tracked itself.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { crc32, deflateRawSync } from 'node:zlib';
import type { Plugin } from 'vite';
import { dataLicenceFiles } from '../src/site/machine-readable.ts';

const releaseRoot = 'release';
const releaseName = /^v\d+\.\d+\.\d+$/;
export const archiveName = (directory: string) =>
  `selekoa-dataset-${directory}.zip`;

/** A deterministic ZIP: fixed order, fixed timestamps, deflated entries. */
export function zip(entries: { name: string; data: Buffer }[], date: string) {
  const [year, month, day] = date.split('-').map(Number);
  const dosDate = ((year - 1980) << 9) | (month << 5) | day;
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const nameBytes = Buffer.from(name, 'utf8');
    const compressed = deflateRawSync(data, { level: 9 });
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBytes.length, 28);
    central.writeUInt32LE(offset, 42);
    locals.push(local, nameBytes, compressed);
    centrals.push(central, nameBytes);
    offset += local.length + nameBytes.length + compressed.length;
  }
  const directory = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, directory, end]);
}

/**
 * Licence files from the repository root. They are added to every archive,
 * outside the manifest's checksummed files, so a release made before the
 * licence existed (releases are immutable) still ships with its terms.
 */
export const archiveLicenceFiles = dataLicenceFiles;

/** One archive per release directory: its manifest's files and the licence files. */
export async function releaseArchives(root = releaseRoot) {
  const names = (await readdir(root).catch(() => [] as string[])).filter((n) =>
    releaseName.test(n),
  );
  return Promise.all(
    names.map(async (directory) => {
      const dir = path.join(root, directory);
      const manifest = JSON.parse(
        await readFile(path.join(dir, 'manifest.json'), 'utf8'),
      ) as { releasedAt: string; files: { path: string }[] };
      const files = ['manifest.json', ...manifest.files.map((f) => f.path)];
      const prefix = archiveName(directory).replace(/\.zip$/, '/');
      const entries = await Promise.all(
        files.sort().map(async (name) => ({
          name: prefix + name,
          data: await readFile(path.join(dir, name)),
        })),
      );
      const licences = await Promise.all(
        archiveLicenceFiles.map(async (name) => ({
          name: prefix + name,
          data: await readFile(name),
        })),
      );
      entries.push(...licences);
      entries.sort((a, b) => (a.name < b.name ? -1 : 1));
      return {
        fileName: `release/${archiveName(directory)}`,
        source: zip(entries, manifest.releasedAt),
      };
    }),
  );
}

export function releaseDownloads(): Plugin {
  return {
    name: 'selekoa-release-downloads',
    async generateBundle() {
      // The page renderer's bundle carries no site files.
      if (this.environment?.config.consumer === 'server') return;
      for (const archive of await releaseArchives())
        this.emitFile({ type: 'asset', ...archive });
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/release/')) return next();
        const archive = (await releaseArchives()).find(
          (a) => '/' + a.fileName === req.url,
        );
        if (!archive) return next();
        res.setHeader('Content-Type', 'application/zip');
        res.end(archive.source);
      });
    },
  };
}
