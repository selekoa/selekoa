/**
 * A propositions collection that records each text's voice (schema 2.33) as
 * a CSV file: one row per proposition record, then one per institutional
 * event, from the same view as the page (`propositionsView`). The build
 * writes it beside the page (scripts/comparison-csv.ts).
 */
import type { Dataset } from './schema';
import { csvText } from './comparison-csv';
import { referencePath } from './addresses';
import {
  eventStageLabels,
  propositionsView,
  registerLabels,
  roleLabels,
  stanceLabels,
  voiceLabels,
  type PropositionsCollection,
} from './propositions';

/** The CSV file's address beside the collection's page. */
export const propositionsCsvPath = (id: string) => `/propositions/${id}.csv`;

export const propositionsCsvColumns = [
  'row_kind',
  'code',
  'proposition',
  'stance_or_stage',
  'roles',
  'voice',
  'register',
  'text',
  'date',
  'wording_date',
  'statement',
  'document',
  'record',
] as const;

export function propositionsCsv(
  data: Dataset,
  collection: PropositionsCollection,
  baseUrl = '',
): string {
  const view = propositionsView(data, collection);
  const records = view.groups.flatMap((g) =>
    g.propositions.flatMap((p) =>
      p.records.map((r) => ({
        row_kind: 'record',
        code: p.proposition.code,
        proposition: p.entity.name,
        stance_or_stage: stanceLabels[r.stance],
        roles: r.roles.map((x) => roleLabels[x]).join('; '),
        voice: r.voice ? voiceLabels[r.voice] : '',
        register: registerLabels[r.register],
        text: r.label,
        date: r.dated,
        wording_date: r.wording ?? '',
        statement: r.claim.statement,
        document: `${baseUrl}${referencePath({ kind: 'document', id: r.document.id })}`,
        record: `${baseUrl}/claim/${r.claim.id}`,
      })),
    ),
  );
  const events = view.events.map((e) => ({
    row_kind: 'event',
    code: '',
    proposition: '',
    stance_or_stage: eventStageLabels[e.stage],
    roles: '',
    voice: '',
    register: '',
    text: e.body,
    date: e.claim.time.kind === 'event' ? e.claim.time.date : '',
    wording_date: '',
    statement: e.claim.statement,
    document: '',
    record: `${baseUrl}/claim/${e.claim.id}`,
  }));
  return csvText(propositionsCsvColumns, [...records, ...events]);
}
