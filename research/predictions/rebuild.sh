#!/bin/sh
# Rebuild the pack from its drafts, in order. Needs the ignored cache (.local/predictions/).
set -e
cd "$(dirname "$0")"
node drafts/sources.src.mjs
node drafts/records.src.mjs
node audit-fixes.mjs
# The 2026-11-03 log is historical: on a rerun its omission entries read "already
# recorded", so keep the log as first written.
cp adjudication/applied-2026-11-03.json "${TMPDIR:-/tmp}/applied-2026-11-03.json"
node adjudication/apply-2026-11-03.mjs
cp "${TMPDIR:-/tmp}/applied-2026-11-03.json" adjudication/applied-2026-11-03.json
node adjudication/decisions-2026-11-04.mjs
[ -f followup/records-2026-11-05.mjs ] && node followup/records-2026-11-05.mjs
[ -f adjudication/apply-2026-11-05.mjs ] && node adjudication/apply-2026-11-05.mjs
node tools.mjs build
