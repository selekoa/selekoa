# Economists on recursive self-improvement, superintelligence and AI existential risk: scope

The esoteric strand of the economics-mainstream thread. It asks whether, when and how economists engaged with three ideas usually discussed outside economics:

- recursive self-improvement (RSI, the "intelligence explosion");
- machine superintelligence or AGI beyond human level (ASI);
- existential risk from advanced AI.

It records what dated texts say. It does not assess whether these ideas are right, and it never claims first use. Nothing here is editorially accepted.

## Boundaries with the other packs

- **Explosive growth** (economics-growth pack, G01–G09) covers growth explosions from full automation, automated idea production, long-run history, bottlenecks and wages. E01 needs AI improving AI with accelerating capability growth, and E02 needs machines surpassing human cognition in essentially all domains. A passage about growth that meets neither belongs to the growth pack and is recorded here only as bearing on E01 or E02.
- **Mainstream engagement** (the parent pack, M01–M09) covers automation, tasks, productivity and distribution. M05 (machines doing every task more cheaply) bears on E02 but does not meet it.
- **Non-economist origins** of the ideas (Good 1965, Vinge 1993, Yudkowsky, Bostrom) are not searched here; Selekoa's data and the Yudkowsky packs cover them. They appear only where an economist quotes or answers them (reported voice), or as the other side of a debate an economist took part in (tier 2).

## Propositions

E01–E05 are in `pack.json`. All are posed. E05 is this strand's counterpart of M09: whether economics engaged with or neglected these ideas, assessed from the dated record and from texts' own statements.

## Tiers

The rule of 2026-10-11, as confirmed by the maintainer on 2026-10-12, applies (parent README D2):

- **Tier 1:** scholarly work by economists in any venue, with standing judged at the time of writing, including their essays and articles in magazines; plus anything in the core venues, whatever its form. KAK is a core venue for the Finnish strand (2026-10-12).
- **Tier 2:** non-economists' texts, and short-form commentary even by economists (blog posts, forum replies, comments, magazine or online debates).

Applied on 2026-10-15:

- Hanson's 1998 journal article and his working paper are tier 1. By 1998 he had economist standing (economics address, teaching and publications on the archived 1999 homepage and vita); in 1994 he did not, which is why the economics-growth pack puts "If Uploads Come First" in tier 2.
- Hanson's 1998 comment in the online Vinge symposium and the 2008 Hanson–Yudkowsky blog debate (compiled by MIRI in 2013) are tier 2 by form, not by author.
- Hyytinen's 2017 KAK editorial is tier 1 (core venue; tier 2 on 2026-10-11).

Every source carries a one-line `tierBasis`. Earliest located is computed within tier 1; the tier-2 earliest is shown separately (role `earliest-located-tier-2`).

## Further boundaries (recorded 2026-10-15)

- **Emulations.** Whole-brain emulations ("ems") are not designed AI. Passages about ems bear on E01–E03 but do not articulate them (applied since the audit of 2026-10-11; E03-02 kept on 2026-10-15).
- **Locality and suddenness.** E01 needs AI improving AI so that capability growth accelerates. Doubting that one system or team suddenly takes over the world bears on E01; it contests E01 only if it disputes the accelerating feedback itself (E01-10, not E01-09 or E01-11).
- **Reported voice** does not lower a relation. A reported view can articulate; voice keeps it out of earliest located.
- **E05** (maintainer decision of 2026-10-15, option A of the decision note in audit.md): a passage articulates E05 only if it explicitly says something about the state of economics on the topic: that it is new, neglected, speculative, on the agenda of economics, or beyond economists' existing tools. An economist's engagement with the ideas is recorded under E01–E04 and in the timeline, not as an E05 articulation.
- **"Machine intelligence" is not AGI** for E02 or E05 (maintainer decision of 2026-10-15). Machines that can do every human job meet M05 in the parent pack, not cognitive superiority; Hanson's 1998–2000 neglect statement about them (E05-02) therefore bears on E05 and belongs with M09.

## Search scope (2026-10-11)

- **Title census:** the cached Crossref census of the parent pack (AER, QJE, JPE, Econometrica, REStud, JEP, JEL, AEA P&P, NBER), plus AER: Insights. Titles were searched for superintelligen*, singularit*, intelligence explosion, self-improv*, recursive improvement, transformative AI, artificial general intelligence, AGI, existential risk, human extinction, takeoff, human-level, posthuman, ultraintelligen*, Turing, superhuman, AI risk and catastrophic risk. Off-topic matches (matrix singularity, industrial take-off) were set aside by reading the titles.
- **KAK:** the parent pack's cached text layers, searched for singulariteetti, superäly, yliäly, yleinen tekoäly, älyräjähdys, superintelligent* and eksistentiaali*.
- **Full texts:**
  - every NBER working paper the census found on AGI, transformative AI or AI existential risk (2018–2026); the five newest were available as abstract pages only;
  - Jones in AER: Insights (abstract);
  - Hanson's 1998 texts through Wayback captures (the Wayback Machine answered on 2026-10-11);
  - the MIRI compilation of the 2008 Hanson–Yudkowsky debate;
  - Hyytinen's 4/2017 KAK editorial.
  - On 2026-10-15, the original Overcoming Bias page of "AI Go Foom", to check its date.
- **Second Wayback capture:** the October 2023 version of Trammell and Korinek (capture 2023-11-29), whose wording differs from the April 2026 revision served by NBER.
- **Reused from the parent pack:**
  - Nordhaus (2015);
  - Aghion, Jones and Jones (2017);
  - Korinek and Stiglitz (2017);
  - Sachs and Kotlikoff (2012);
  - Acemoglu (2024);
  - the NBER volume introduction and Cowen's chapter (2019).
- **Not searched:** books (Hanson, _The Age of Em_, 2016; Cowen, _Average Is Over_, 2013); magazine pieces (Hanson in IEEE Spectrum, 2008); economics blogs beyond the compiled debate; journals outside the census; the NBER volume _The Economics of Transformative AI_ beyond the chapters found as working papers.

## Method

As in the parent pack:

- fresh-context sub-agents find passages;
- `tools.mjs verify` checks every quotation (run with `PACK_DIR=research/economics-mainstream/esoteric`);
- earliest located is computed within tier 1 by the date of the checked wording;
- a bounded fresh-context audit follows, then a cross-family packet.
