# Publishing the source

For the maintainer and for sessions asked to sync the public source. The
live site is built from this repository; the public source repository is a
separate copy kept for readers and for the licences' source-availability
obligations (see [launch readiness](launch-readiness.md), "Licence and
attribution gaps").

## Two repositories

- **`futurelightcone/selekoa-dev`** (this repository, private). Development
  history, branches and pull requests. Cloudflare Pages builds its `main`;
  merging to `main` deploys the live site.
- **`selekoa/selekoa`** (public). The source as snapshot commits, one per
  sync, with no development history. Its history is never rewritten: no
  force-push, rebase, amend or deleted commit. A mistake is corrected by a
  new snapshot commit.

The two repositories have different names, so a session can attach and
check out both side by side.

## When

At each dataset release, once the release is merged to `main` of
`selekoa-dev`, or when the maintainer asks. A sync needs the maintainer's
explicit authorization in the session prompt; the public repository is never
touched otherwise.

## Routine

1. **Attach both repositories** to the session and check each out under its
   own name. Fetch `origin/main` of `selekoa-dev` and the default branch of
   `selekoa/selekoa`. Confirm the public checkout has no uncommitted or
   unpushed changes.
2. **Copy the tree.** In the public checkout, remove every tracked file
   (`git rm -rq .`), then extract dev main into it:

   ```sh
   git -C <dev checkout> archive origin/main | tar -x -C <public checkout>
   ```

   `git archive` writes tracked files only, so ignored and local files
   (`review/.local/`, `dist/`, `node_modules/`, `.venv/`) cannot leak.

3. **Run the privacy audit** in the public checkout, after `git add -A`:
   - `pnpm install --frozen-lockfile` and `pnpm check:privacy` (it reads the
     staged index);
   - scans of the staged tree for email addresses other than the published
     contact `maintainer@selekoa.org`, for local or home-directory paths
     (Windows user folders, macOS and Linux home directories), for credentials (tokens, keys,
     `.env` files, PAT-shaped strings) and for the maintainer's personal
     identity beyond the pseudonym `futurelightcone`.

   Any finding stops the sync. Fix it on `selekoa-dev` through a normal
   branch and merge, then start again from step 1. Never patch the public
   copy by hand.

4. **Check the tree equals dev main.** The staged tree's ID must be the tree
   of dev main:

   ```sh
   git -C <public checkout> write-tree
   git -C <dev checkout> rev-parse origin/main^{tree}
   ```

   The two IDs must match. A difference means a file was added, lost or
   changed in the copy.

5. **Commit once and push.** With the repository-local identity
   (`git config user.name futurelightcone` and the account's no-reply
   address, set in the public checkout only), commit with the message
   `Selekoa source at dataset release vX.Y.Z` (for a sync on request, name
   the dev `main` commit instead of a release) and no trailers. Push that one
   commit to the default branch. Do not tag, create a GitHub release or
   change repository settings.
6. **Report** the commit, the dev `main` commit it copies, the tree ID and
   the audit results.
