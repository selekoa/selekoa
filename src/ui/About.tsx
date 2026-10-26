import { analytics, contact, releaseVersion } from 'virtual:site';
import { versionStatus } from '../site/version';
import type { Repository } from '../domain/repository';
import type { ReviewStatus } from '../domain/review-status';
import type { DocumentHistory } from '../domain/document-history';
import { coverage } from '../domain/coverage';
import { mapLimits } from '../domain/query';
import type { Entity } from '../domain/schema';
import { changeBasis } from './ReadingRows';
import { ReviewExceptions } from './ReviewNotice';
import {
  changedSinceRelease,
  latestRelease,
  releaseDownload,
} from './release-info';
import './reading-first.css';
import './about.css';

const sections = [
  ['about-what', 'What Selekoa is'],
  ['about-coverage', 'Current coverage'],
  ['about-method', 'How this was checked'],
  ['about-labels', 'What the labels mean'],
  ['about-limits', 'Known limits and errors'],
  ['about-cite', 'How to cite'],
  ['about-licences', 'Licences and credits'],
  ['about-corrections', 'Corrections'],
  ['about-privacy', 'Privacy'],
  ['about-keyboard', 'Keyboard use'],
] as const;

const analyticsNames = {
  cloudflare: 'Cloudflare Web Analytics',
  goatcounter: 'GoatCounter',
} as const;

function jumpTo(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ block: 'start' });
  target?.focus({ preventScroll: true });
}

const plural = (n: number, one: string, many = one + 's') =>
  `${n.toLocaleString('en-US')} ${n === 1 ? one : many}`;

/** Reader nouns for each record type, singular and plural. */
const typeNouns: Record<Entity['type'], [string, string]> = {
  organisation: ['organisation', 'organisations'],
  person: ['person', 'people'],
  document: ['document', 'documents'],
  concept: ['concept', 'concepts'],
  infrastructure: ['infrastructure asset', 'infrastructure assets'],
  model: ['model', 'models'],
  public_body: ['public body', 'public bodies'],
  fund: ['fund', 'funds'],
};

export function About({
  repository,
  status,
  history,
  commitmentTexts,
  controlTimelines,
  propositionCollections,
  dossiers,
  questions,
  starters,
  statements,
  onClaim,
}: {
  repository: Repository;
  status: ReviewStatus;
  history: DocumentHistory;
  commitmentTexts: number;
  controlTimelines: number;
  propositionCollections: number;
  dossiers: number;
  questions: number;
  starters: number;
  /** Statements of the review exceptions, by claim ID. */
  statements: Record<string, string>;
  onClaim: (id: string) => void;
}) {
  const data = repository.data;
  const c = coverage(data);
  const editions = history.families.reduce((n, f) => n + f.editions.length, 0);
  return (
    <article className="about" aria-labelledby="about-title">
      <header className="doc-lede">
        <span className="eyebrow">About & method</span>
        <h1 id="about-title">About Selekoa and its method</h1>
        <p className="landing-deck">
          Selekoa is a research base on the documentary history of machine
          intelligence. It records people, institutions, documents, funding and
          governance as individual claims. Each claim links to the source
          passage it rests on.
        </p>
      </header>
      <nav className="about-toc" aria-label="On this page">
        <ol>
          {sections.map(([id, title]) => (
            <li key={id}>
              <button className="text-button" onClick={() => jumpTo(id)}>
                {title}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <section aria-labelledby="about-what">
        <h2 id="about-what" tabIndex={-1}>
          What Selekoa is
        </h2>
        <p>
          Selekoa is built for historians, journalists, policy researchers and
          other readers who need to check where a statement comes from. It
          covers people and their institutional roles, ideas and the documents
          that carry them, institutions and how they changed, capital and
          compute, and governance texts such as safety frameworks and laws.
        </p>
        <p>
          Its basic unit is the claim: one statement with a defined scope, a
          date and at least one evidence record. Dossiers, document histories,
          person pages and the guided reading are computed from these claims.
          They add no facts of their own.
        </p>
        <h3>What it does not claim</h3>
        <ul>
          <li>
            <strong>Completeness.</strong> Coverage is selective and uneven. It
            is not a current inventory of the field, and a missing record is a
            gap in coverage. The topics, people and documents covered so far
            follow the maintainer’s research interests, so the site reads in
            part as a research diary.
          </li>
          <li>
            <strong>Effect.</strong> A published framework or commitment shows
            what its author said. It does not show that anyone implemented it,
            complied with it or that it worked.
          </li>
          <li>
            <strong>Classification.</strong> Selekoa records self-description,
            documents, roles, funding and citations one by one. It never assigns
            an ideological label to a person or institution because of who they
            appear with.
          </li>
          <li>
            <strong>Authority over the sources.</strong> Read the original
            passage, in the cited edition, before you rely on a claim.
          </li>
          <li>
            <strong>Publication.</strong> This is a research preview,{' '}
            {versionStatus(releaseVersion)}. Records, pages and the dataset
            change between releases. It is not a finished reference work.
          </li>
        </ul>
      </section>

      <section aria-labelledby="about-coverage">
        <h2 id="about-coverage" tabIndex={-1}>
          Current coverage
        </h2>
        <p>
          These figures are computed from the dataset loaded in this page,
          updated {data.meta.updatedAt}.
        </p>
        <dl className="about-facts">
          <dt>Claims</dt>
          <dd>
            {plural(c.claims, 'claim')}:{' '}
            {plural(c.relationships, 'relationship')} between records and{' '}
            {plural(c.values, 'claim')} about a value, such as an amount, a
            legal form or a quoted provision (
            {plural(c.provisions, 'quoted provision')}).
          </dd>
          <dt>Subjects</dt>
          <dd>
            {c.types
              .map(([type, n]) => plural(n, ...typeNouns[type]))
              .join(' · ')}
          </dd>
          <dt>Evidence</dt>
          <dd>
            {plural(c.evidence, 'evidence record')} drawn from{' '}
            {plural(c.sources, 'source')}, checked between {c.firstCheck} and{' '}
            {c.lastCheck}.
          </dd>
          <dt>Dates</dt>
          <dd>
            Dated records run from {c.firstYear} to {c.lastYear}.{' '}
            {plural(c.undated, 'record has', 'records have')} no established
            date.
          </dd>
          <dt>Disputes</dt>
          <dd>
            {plural(c.resolution.contested, 'contested record')} and{' '}
            {plural(c.resolution.unresolved, 'unresolved question')}.
          </dd>
          <dt>Review</dt>
          <dd>
            {status.acceptedClaimIds.length} of {status.claims} claims{' '}
            {status.acceptedClaimIds.length === 1 ? 'is' : 'are'} editorially
            accepted. {status.humanReviewedEvidence.length} of {status.evidence}{' '}
            evidence records{' '}
            {status.humanReviewedEvidence.length === 1 ? 'is' : 'are'}{' '}
            human-reviewed.
            <ReviewExceptions
              status={status}
              statements={statements}
              onClaim={onClaim}
            />
          </dd>
          <dt>Reading pages</dt>
          <dd>
            Document histories of{' '}
            {plural(history.families.length, 'safety framework')} (
            {plural(editions, 'edition')}),{' '}
            {plural(
              commitmentTexts,
              'external commitment or law',
              'external commitments and laws',
            )}
            , {plural(controlTimelines, 'control-structure timeline')},{' '}
            {plural(
              propositionCollections,
              'collection of propositions',
              'collections of propositions',
            )}
            , {plural(dossiers, 'featured institutional dossier')},{' '}
            {plural(questions, 'guided reading')},{' '}
            {plural(starters, 'research question')} and a page for every person
            and document.
          </dd>
          <dt>Dataset release</dt>
          <dd>
            {latestRelease ? (
              <>
                v{latestRelease.version}, released {latestRelease.releasedAt}{' '}
                (schema {latestRelease.dataset.schemaVersion}).{' '}
                <a
                  href={releaseDownload(latestRelease.version)}
                  download
                  type="application/zip"
                >
                  Download dataset v{latestRelease.version}
                </a>{' '}
                (ZIP): entities, claims, evidence, sources and collections as
                JSON and CSV, with a manifest, changelog and citation file.
                Selekoa’s own records and text are licensed CC BY 4.0. Quoted
                source passages remain the publishers’ text and are excluded.
                {changedSinceRelease(data, latestRelease) &&
                  ' The records on these pages have changed since this release.'}
              </>
            ) : (
              'No dataset release has been made yet.'
            )}
          </dd>
        </dl>
        <p>
          Institutional coverage centres on Anthropic, OpenAI, DeepMind and
          Google DeepMind, xAI and Meta, with earlier material on MIRI and the
          history of AI alignment research. A first Chinese collection covers
          DeepSeek, Alibaba and its Qwen models, and Zhipu AI. Related
          institutions keep separate records.
        </p>
      </section>

      <section aria-labelledby="about-method">
        <h2 id="about-method" tabIndex={-1}>
          How this was checked
        </h2>
        <dl className="about-terms">
          <dt>Machine-first research</dt>
          <dd>
            An automated research process finds sources, reads them and proposes
            claims. Each claim must rest on direct evidence from the closest
            suitable source, for example an original paper or edition, an
            institutional document from the time, a filing, an archived web
            page, or competent scholarship or reporting. Wikipedia and similar
            summaries are used to find sources and never as evidence.
          </dd>
          <dt>Passage checks</dt>
          <dd>
            Every evidence record gives the exact place in the source (section,
            page or paragraph), a short quote or a marked paraphrase, the
            source’s role and the date of the check. The check compares the
            claim with that passage in context, including the document’s version
            and dates.
          </dd>
          <dt>Archive copies</dt>
          <dd>
            For web documents that can change, Selekoa records the nearest
            existing Internet Archive capture where one exists. A capture shows
            what the archive retrieved that day. It does not prove what the page
            said earlier, and it can differ from the copy that was checked.
          </dd>
          <dt>Quotation</dt>
          <dd>
            Quotes are short and attributed. Each is at most 50 words. From any
            one document, counting each edition separately, Selekoa quotes at
            most 400 words or 5 per cent of the document, whichever is larger,
            and never more than 800. From a document under 2,000 words it quotes
            about 10 per cent, or one complete sentence of up to 25 words where
            less would mislead. Selekoa quotes where exact wording matters, such
            as a threshold, a condition or who decides, and paraphrases
            otherwise. It never reproduces tables, figures or whole sections.
          </dd>
          <dt>Machine audits</dt>
          <dd>
            A separate audit, run without the original verdicts, rechecks a
            random sample together with higher-risk claims: amounts, inferences,
            statements that something is absent, ambiguous terms and pages that
            have changed. Its coverage, disagreements and retrieval failures are
            recorded. A sample does not certify the records it did not check.
          </dd>
          <dt>Different-model checks</dt>
          <dd>
            Research collections, contested records and records that assess what
            a change or provision means are checked by a model from a different
            family from the one that proposed them before they enter the main
            dataset. Each disagreement and how it was settled is recorded. From
            2026-10-15, if the proposing model overrules that check on an
            earliest located text or a headline, the other model checks again or
            the maintainer decides.
          </dd>
          <dt>Human review</dt>
          <dd>
            People review selected records: reported errors, material
            disagreements, consequential ambiguities and claims put forward for
            editorial acceptance. Most evidence records are machine-checked
            only, and the interface marks the exceptions.
          </dd>
        </dl>
      </section>

      <section aria-labelledby="about-labels">
        <h2 id="about-labels" tabIndex={-1}>
          What the labels mean
        </h2>
        <h3>How a claim was derived</h3>
        <dl className="about-terms">
          <dt>Stated in source</dt>
          <dd>A source states the claim directly.</dd>
          <dt>Inferred</dt>
          <dd>
            The claim follows from the evidence by reasoning. The reasoning and
            its premises are shown with the claim.
          </dd>
          <dt>Question posed by Selekoa</dt>
          <dd>
            Selekoa frames the claim as a question, such as whether a change
            weakened a policy or whether a body can exercise control in
            practice. Sources take positions on it or give context; none is
            recorded as stating it in these words. Such a record is always
            contested or unresolved.
          </dd>
        </dl>
        <h3>Whether the evidence settles it</h3>
        <dl className="about-terms">
          <dt>Supported</dt>
          <dd>
            The recorded evidence supports the claim as scoped. This does not
            mean the claim is beyond dispute or that no contrary evidence
            exists.
          </dd>
          <dt>Contested</dt>
          <dd>
            Competent sources disagree. Supporting and contrary evidence are
            shown together, and Selekoa does not decide between them.
          </dd>
          <dt>Unresolved</dt>
          <dd>
            The recorded evidence does not settle the question. Linked evidence
            is context only.
          </dd>
        </dl>
        <h3>Editorial status and evidence checks</h3>
        <dl className="about-terms">
          <dt>Not reviewed by an editor</dt>
          <dd>
            The default status of a claim: an exploratory record that no editor
            has accepted. Where a person has checked some of its evidence, the
            claim panel says “Not editorially accepted” instead. It does not say
            whether a person has read any linked passage. Lists leave this
            status unmarked and show only the exceptions below.
          </dd>
          <dt>Editorially accepted</dt>
          <dd>
            An editor explicitly accepted the claim after human review of its
            evidence. Accepting a contested record accepts the record of the
            dispute. It does not declare either side right.
          </dd>
          <dt>Machine-checked</dt>
          <dd>
            An automated check compared the claim with the source passage. No
            person has confirmed this evidence record.
          </dd>
          <dt>Human-reviewed evidence</dt>
          <dd>
            A named reviewer, identified by pseudonym, checked this evidence
            record on the date shown.
          </dd>
        </dl>
        <h3>Evidence</h3>
        <dl className="about-terms">
          <dt>Primary and secondary source</dt>
          <dd>
            The source’s role for this claim. A primary source documents what
            its author said or did. A company announcement is evidence of the
            announcement, not independent proof that a payment was made or a
            safeguard worked. Neither role ranks truth.
          </dd>
          <dt>Supporting evidence, counterevidence, context</dt>
          <dd>
            Whether an evidence record supports the claim, contradicts it or
            only gives background. The number of sources describes coverage. It
            does not show that the sources are independent of each other.
          </dd>
          <dt>Retrospective source</dt>
          <dd>
            A source written after the events it describes. Later accounts can
            compress, omit or retitle earlier roles.
          </dd>
        </dl>
        <h3>Dates</h3>
        <dl className="about-terms">
          <dt>Event</dt>
          <dd>A dated action, such as a publication or an announcement.</dd>
          <dt>Snapshot</dt>
          <dd>
            One dated report of a state, such as a job title on a given day. It
            says nothing about when the state began or ended.
          </dd>
          <dt>Interval</dt>
          <dd>
            A period with only the start and end a source states. A missing end
            means the end is unknown.
          </dd>
          <dt>Undated</dt>
          <dd>
            No defensible date is recorded. The record is not placed in a
            sequence.
          </dd>
        </dl>
        <h3>Document histories and provisions</h3>
        <dl className="about-terms">
          <dt>{changeBasis.publisher_statement}</dt>
          <dd>The publisher states the change itself.</dd>
          <dt>{changeBasis.changelog}</dt>
          <dd>The change appears in the publisher’s changelog or redline.</dd>
          <dt>{changeBasis.document_comparison}</dt>
          <dd>
            Selekoa compared two editions and recorded a difference. No
            publisher statement of the change is recorded.
          </dd>
          <dt>{changeBasis.assessment}</dt>
          <dd>
            A judgement by named sources about what a change or provision means
            in practice. It is always contested or unresolved, and never a
            finding.
          </dd>
          <dt>Stated, not found, –</dt>
          <dd>
            In a provision table, “Stated” means the edition’s quoted text
            contains the provision. “Not found” means it was not found within a
            stated, inspected part of the edition. That is not a claim that it
            was deleted. A dash means nothing is recorded.
          </dd>
          <dt>Coverage gap</dt>
          <dd>
            Something Selekoa has not recorded. It is not evidence that the
            thing does not exist or did not happen.
          </dd>
          <dt>Questions set aside</dt>
          <dd>
            Questions that were deliberately not turned into records, because
            answering them would need legal interpretation, a decisive source
            for conflicting dates, or statements about a living person beyond
            documented roles.
          </dd>
        </dl>
        <h3>Propositions</h3>
        <dl className="about-terms">
          <dt>Articulates, contests, bears on</dt>
          <dd>
            A text articulates a proposition when a passage meets its one
            criterion, contests it when a passage disputes it or a premise it
            depends on, and bears on it when a passage comes close. The record
            of a text that bears on a proposition names what is missing.
          </dd>
          <dt>Earliest located</dt>
          <dd>
            The earliest text the collection’s recorded searches found, decided
            by the date of its wording. It is never a claim of first use. A
            collection can name an earliest located text for each stance.
          </dd>
          <dt>Engages a premise, states the contrary</dt>
          <dd>
            A contesting passage engages a premise when its paragraph, message
            or dialogue turn gives a reason against that premise. Otherwise it
            states the contrary conclusion only.
          </dd>
          <dt>Looking back</dt>
          <dd>
            The author reports an earlier belief of their own. The record is
            dated by the report, not by the belief it describes.
          </dd>
          <dt>Shown only with its context</dt>
          <dd>
            A passage that would mislead on its own, such as an earlier view
            without the later text that rejects it. Selekoa shows it only
            together with the context its record names, and exports state that
            context beside it.
          </dd>
          <dt>Tier 1, tier 2</dt>
          <dd>
            A collection can sort its texts into tiers by who wrote them and in
            which form. In the economics collection, tier 1 is scholarly work by
            economists and the core economics venues, and tier 2 is other texts
            and short-form commentary. Earliest located is then named within
            tier 1, and the tier-2 earliest separately. A tier is not a ranking
            of quality.
          </dd>
          <dt>Conditions, model scenario, estimate</dt>
          <dd>
            A result from a formal model is recorded with the conditions under
            which the model derives it, and is never shown as an unconditional
            forecast. A model scenario is such a result, not the author’s own
            claim. An estimate is recorded as the text states it, with its
            holder, horizon and definition, and estimates from different texts
            are never combined.
          </dd>
        </dl>
      </section>

      <section aria-labelledby="about-limits">
        <h2 id="about-limits" tabIndex={-1}>
          Known limits and errors
        </h2>
        <p>
          Any record can be wrong. The checks look for the errors below, and
          some limits remain whatever the checks find.
        </p>
        <dl className="about-terms">
          <dt>Selection</dt>
          <dd>
            Coverage follows research choices and source availability. It is not
            a neutral sample of the field, and it makes no claim about who used
            a term or idea first.
          </dd>
          <dt>Identity</dt>
          <dd>
            Two people or organisations can be confused, or one institution can
            appear under several names. Related institutions keep separate
            records, and a name change is recorded as an announcement, not a
            merger.
          </dd>
          <dt>Passage and locator</dt>
          <dd>
            A quote or paraphrase can be attached to the wrong place in a
            source, or read out of context.
          </dd>
          <dt>Version</dt>
          <dd>
            Documents change. Quotes are checked against the cited edition where
            it can be retrieved, and an access date, a current file or an
            archive copy does not prove an earlier text.
          </dd>
          <dt>Dates</dt>
          <dd>
            Sources can disagree about dates, and later accounts can blur
            earlier events. Precision is kept as the source gives it.
          </dd>
          <dt>Overreach</dt>
          <dd>
            A claim can say more than its source supports. Each claim carries a
            qualification to prevent this, and audits check for it.
          </dd>
          <dt>Retrieval</dt>
          <dd>
            Some sources were unavailable, gated or changed during checking.
            Retrieval failures are recorded with the records they affect.
          </dd>
          <dt>Machine agreement</dt>
          <dd>
            Agreement between machine checks does not make a claim true, and a
            disagreement is not settled by majority.
          </dd>
        </dl>
      </section>

      <section aria-labelledby="about-cite">
        <h2 id="about-cite" tabIndex={-1}>
          How to cite
        </h2>
        <p>
          Cite the original source for the fact itself. Cite Selekoa for the
          record: the claim, its scope and the evidence it links to.
        </p>
        <p>
          To cite an original source, open “Cite the original source” on an
          evidence record in the Evidence Inspector. It copies an APA reference
          or downloads the source as BibTeX, RIS or CSL-JSON for Zotero, EndNote
          and similar tools. Research starters and reading exports offer one
          file with every source they cite. The details come from the source
          record and name the original document, not Selekoa. Check them against
          the document. A source without a known publication date is cited as
          n.d., and a date known only to the year or month keeps that precision.
        </p>
        <p>
          Every claim has a record ID. It appears in the claim’s link and under
          “Status and meaning” in the Evidence Inspector. Once a claim is in the
          main dataset its ID does not change. A correction that keeps the same
          proposition keeps the ID. A changed proposition gets a new ID that
          names the claim it replaces, and the earlier record stays available.
        </p>
        <p>
          “Copy claim reference” in the Evidence Inspector gives the record ID,
          statement, qualification, dates, the dataset’s update date and a
          fingerprint of the dataset. Add the date you accessed it:
        </p>
        <p className="about-example">
          Selekoa, claim record <code>record-id</code>, dataset updated{' '}
          {data.meta.updatedAt}, accessed YYYY-MM-DD, link to the claim.
        </p>
        {latestRelease ? (
          <>
            <p>
              A dataset release is a fixed, numbered copy of the records. To
              cite a record in a release, give its ID and the release version:
            </p>
            <p className="about-example">
              Selekoa, claim record <code>record-id</code>, dataset release v
              {latestRelease.version} ({latestRelease.releasedAt}).
            </p>
            <p>
              The pages here can be newer than the latest release. Check that
              the record in the downloaded release says what you cite.
            </p>
          </>
        ) : (
          <p>
            No dataset release has been made yet. The dataset date and your
            access date identify what you saw.
          </p>
        )}
      </section>

      <section aria-labelledby="about-licences">
        <h2 id="about-licences" tabIndex={-1}>
          Licences and credits
        </h2>
        <p>
          Selekoa’s own records and the text written for Selekoa are licensed
          under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/">
            Creative Commons Attribution 4.0
          </a>
          . You can reuse them with credit. The licence does not cover quoted
          source passages, words inside quotation marks in Selekoa’s text, the
          source documents or the names and marks of the organisations
          described. Those stay under their owners’ rights. The application code
          is licensed under the MIT licence.{' '}
          <a href="legal/LICENSING.txt">Scope of each licence</a>,{' '}
          <a href="legal/LICENSE-DATA.txt">data licence text</a> and{' '}
          <a href="legal/LICENSE.txt">code licence text</a>.
        </p>
        <p>
          “Copy APA” formats references with citeproc-js by Frank Bennett, used
          under the Common Public Attribution License 1.0, and the APA style by
          Brenton M. Wiernik and Andrew Dunning, licensed under Creative Commons
          Attribution-ShareAlike 3.0, through Citation.js. The source of
          citeproc-js is available under that licence.{' '}
          <a href="legal/THIRD-PARTY-NOTICES.txt">
            Notices for every shipped dependency
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="about-corrections">
        <h2 id="about-corrections" tabIndex={-1}>
          Corrections
        </h2>
        {contact ? (
          <p>
            Send corrections, questions and requests from rights owners or from
            people named in a record to{' '}
            <a href={'mailto:' + contact}>{contact}</a>. When reporting an
            error, give the record ID, what is wrong and the source that shows
            it.
          </p>
        ) : (
          <p>
            A contact address for corrections will be published here before any
            public release. When reporting an error, give the record ID, what is
            wrong and the source that shows it.
          </p>
        )}
        <p>
          A reported error is rechecked against the sources. A correction keeps
          the claim’s ID when its proposition is unchanged and records the
          reason. A disputed point stays visible as a contested record and is
          not deleted to simplify the history.
        </p>
      </section>

      <section aria-labelledby="about-privacy">
        <h2 id="about-privacy" tabIndex={-1}>
          Privacy
        </h2>
        <p>
          This site sets no cookies. It stores one item in your browser: your
          light or dark theme choice, if you press the Dark mode button. It
          never leaves your device.{' '}
          {analytics === 'none'
            ? 'It loads nothing from other sites and does not count visits. '
            : `It counts visits with ${analyticsNames[analytics]}, a cookieless service that reports totals such as page loads, referring sites, countries and browser types. Loading the count script contacts that service. `}
          Selekoa collects no names, accounts or other personal data and does
          not try to identify visitors. The web host may keep ordinary server
          logs.
        </p>
      </section>

      <section aria-labelledby="about-keyboard">
        <h2 id="about-keyboard" tabIndex={-1}>
          Keyboard use
        </h2>
        <p>
          Every page works with a keyboard. Tab moves between controls, and
          Enter opens a claim. In the explorer’s name search, Enter selects the
          only match. On the search page, Enter moves to the first result.
          Escape clears either search box. The relationship map has a text
          equivalent: the Claims and Timeline views list every relationship it
          shows.
        </p>
        <p>
          The map is drawn for a search, a topic or one record’s direct
          connections, never for the whole dataset. A search or topic map is
          drawn up to {mapLimits.unfocused.records} records and{' '}
          {mapLimits.unfocused.relationships} relationships. A map of one
          record’s direct connections places them around that record, so it
          stays readable up to {mapLimits.focused.records} records and{' '}
          {mapLimits.focused.relationships} relationships. Above either limit
          the labels and lines overlap too much to read, and the list is shown
          instead.
        </p>
      </section>
    </article>
  );
}
