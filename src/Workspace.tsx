import { createPortal } from 'react-dom';
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import summary from 'virtual:landing-summary';
import facts from 'virtual:site-facts';
import { chronicleIndexOf, parseYearPageId } from './domain/chronicle-index';
import {
  dataHeld,
  whenData,
  perRecords,
  recordsHeld,
  repository,
  useHeldRecords,
  whenRecords,
} from './ui/records';
import { searchSource } from './ui/search-source';
import { remember, selected, type Remembered } from './domain/memo';
import type { Dataset } from './domain/schema';
import {
  dateOf,
  mapReadable,
  mapSize,
  queryDataset,
  timeLabel,
  type Filters,
} from './domain/query';
import {
  createSearchIndex,
  searchClaims,
  searchRecords,
} from './domain/search';
import { topics, type Topic } from './domain/predicates';
import { frameworkLabels } from './domain/versions';
import { Inspector, ClaimButton } from './ui/Inspector';
import { entityStyle } from './ui/entityStyle';
import { EntitySymbol } from './ui/EntitySymbol';
import { institutionalDossier } from './domain/dossier';
import {
  researchPath,
  readingPosition,
  researchPaths,
  questionPath,
} from './domain/research-path';
import { personProfile } from './domain/person-profile';
import { documentRecord } from './domain/document-record';
import {
  referencePath,
  resolveReference,
  startPath,
  type HubId,
  type ReferenceTarget,
} from './domain/deep-links';
import { currentAddress } from './ui/location';
import { pages, preloadPage } from './ui/page-modules';
import { revealRow } from './ui/reveal-row';
import { useInBrowser } from './ui/client';
import { pageMeta } from './prerender/pages';
import { documentHistory } from './domain/document-history';
import { frontierSafetyFrameworks } from './reading/frontier-safety-frameworks';
import { frameworkComparison } from './reading/framework-comparison';
import { modelCardsId } from './reading/model-cards-page';
import { lawsComparedId } from './reading/laws-compared-page';
import { predictionsId } from './reading/predictions-page';
import { comparisonView } from './domain/framework-comparison';
import { controlStructure } from './domain/control-structures';
import { commitmentsView } from './domain/commitments';
import { frameworksLawView } from './domain/frameworks-law';
import { computeGuides, editionGuides, guides } from './reading/guides';
import { frameworkChangesView } from './domain/framework-changes';
import { computeBuildoutView } from './domain/compute-buildout';
import { controlStructures } from './reading/control-structures';
import {
  controlTimelinesId,
  controlTimelinesOrganisations,
  controlTimelinesTitle,
} from './reading/control-timelines-page';
import { externalCommitments } from './reading/commitments';
import { questionStarters } from './reading/self-governance';
import { questionStarterView } from './domain/question-starter';
import { propositionFrames } from './reading/proposition-frames';
import { chineseHistories } from './domain/landing';
import { Landing } from './ui/Landing';
import { HubPage } from './ui/Hub';
import { NavLink, RecordHref } from './ui/NavLink';
import { recordPath } from './ui/record-path';
import { holdUntilRecords } from './ui/hold-until-records';
import { opensFromSlice, visit, visitPending } from './ui/page-visits';
import { entityView, type View } from './ui/views';
import { ClaimPage, type ClaimCollection } from './ui/ClaimPage';
import {
  collectionsByClaim,
  type CollectionDefinition,
} from './release/collections';
import {
  SiteFooter,
  SiteHeader,
  SkipLink,
  type NavTarget,
  type StartAction,
} from './ui/SiteChrome';

// Each page loads its code the first time it opens.
const {
  Network,
  Dossier,
  ResearchPath,
  PersonPage,
  DocumentPage,
  DocumentHistory,
  FrameworkComparison,
  ModelCards,
  LawsCompared,
  Predictions,
  ControlStructure,
  ControlTimelines,
  Commitments,
  FrameworksLaw,
  FrameworkChanges,
  ComputeBuildout,
  Propositions,
  PropositionStances,
  QuestionStarter,
  Chronicle,
  About,
  Search,
} = pages;

const topicLabels: Record<Topic | 'all', string> = {
  all: 'All topics',
  people: 'People',
  institutions: 'Institutions',
  ideas: 'Ideas & lineages',
  capital: 'Capital',
  compute: 'Compute',
  governance: 'Governance',
};
const topicNotes: Record<Topic | 'all', string> = {
  all: 'Choose an institution to see its records and dossier, or choose a topic.',
  people:
    'Roles, co-founding and departure announcements. Unknown dates stay unknown.',
  institutions:
    'Combinations, acquisitions, separations, name changes and other documented institutional changes.',
  ideas:
    'Authorship, discussion, citation, explicit credit and reported use of methods.',
  capital:
    'Announced and reported investment and funding. Each record keeps its stage and limits.',
  compute: 'Cloud agreements, compute use and hardware suppliers.',
  governance:
    'Framework editions, evaluation engagements, laws and their provisions, each tied to a date.',
};

const years = facts.years;
const latestYear = years[0];
const latestCheck = facts.latestCheck;
/**
 * A record dated after the latest source check states a scheduled date, such
 * as when a law takes effect. The year filter says so, so that a future year
 * does not read as an error.
 */
const scheduledYears = latestYear > Number(latestCheck.slice(0, 4));
const datasetStatus = summary.status;
/**
 * Computed on first use, so a page pays only for what it shows, and again
 * when other records are held (src/ui/records.ts).
 */
const once = perRecords;
const frameworkHistory = once(() =>
  documentHistory(repository.data, frontierSafetyFrameworks),
);
/**
 * Each collection's view by ID, computed when its page is drawn, not every
 * collection's at once: a page drawn from its slice holds the records of its
 * own collection only (src/domain/slices.ts).
 */
function viewsById<D extends { id: string }, V>(
  definitions: readonly D[],
  make: (data: Dataset, definition: D) => V,
) {
  return once(() => {
    const views = new Map<string, Remembered<V>>();
    const data = repository.data;
    return {
      get(id: string): V | undefined {
        const definition = definitions.find((d) => d.id === id);
        if (!definition) return undefined;
        return remember(views, id, () => make(data, definition));
      },
    };
  });
}
const controlViews = viewsById(controlStructures, controlStructure);
/** The organisations whose dossiers link to the control timelines. */
const timelineOrganisations = new Set(controlTimelinesOrganisations);
const comparisonPage = once(() =>
  comparisonView(repository.data, frameworkComparison),
);
const commitmentsPage = once(() =>
  commitmentsView(repository.data, externalCommitments),
);
// The latest check comes from the build's site facts, so that a guide is
// drawn from its own records rather than from every passage.
const guidePages = viewsById(guides, (data, g) =>
  frameworksLawView(data, g, facts.latestCheck),
);
const changesPages = viewsById(editionGuides, (data, g) =>
  frameworkChangesView(data, g, frameworkComparison),
);
const computePages = viewsById(computeGuides, computeBuildoutView);
const starterViews = viewsById(questionStarters, questionStarterView);
const searchIndex = once(() => createSearchIndex(repository.data));

/** The width at which the reading layouts drop their side column. */
const narrowQuery = '(max-width: 940px)';

/**
 * Places a slot for the claim panel directly after the record row, list item
 * or table row that opened it. A table row gets a full-width row of its own,
 * whose panel stays in view while the table scrolls sideways. Returns null on
 * wide screens, and for controls that are not part of a record row, such as
 * the map.
 */
function inspectorSlot(trigger: Element | null): HTMLElement | null {
  if (!trigger || !window.matchMedia?.(narrowQuery).matches) return null;
  // The comparison opens its records in a drawer at every width.
  if (trigger.closest('#inspector, .network-wrap, .cmp')) return null;
  const row = trigger.closest('tr');
  if (row) {
    const slotRow = document.createElement('tr');
    slotRow.className = 'inspector-slot-row';
    const cell = document.createElement('td');
    cell.colSpan = row.children.length;
    const slot = document.createElement('div');
    slot.className = 'inspector-slot';
    const frame = row.closest('table')?.parentElement;
    if (frame) slot.style.width = `${frame.clientWidth}px`;
    cell.append(slot);
    slotRow.append(cell);
    row.after(slotRow);
    return slot;
  }
  const item = trigger.closest('li, .list-record');
  if (!item) return null;
  const slot = document.createElement(item.tagName === 'LI' ? 'li' : 'div');
  slot.className = 'inspector-slot';
  item.after(slot);
  return slot;
}

type Bookmark = { questionId: string; claimId: string };
const isQuestion = (kind?: string) => kind === 'reading' || kind === 'question';
/** People and documents open their reading pages; other entities explore. */
const hasPage = (id: string) => {
  const type = repository.entities.get(id)?.type;
  return type === 'person' || type === 'document';
};

function locationState(address: string) {
  const { target, notice } = resolveReference(address, repository.data);
  const selection =
    target && (target.kind === 'reading' || target.kind === 'question')
      ? researchPaths.find((s) => s.id === target.id)
      : undefined;
  const selected =
    selection &&
    target &&
    (target.kind === 'reading' || target.kind === 'question')
      ? (target.claim ??
        selection.items.find(
          (i) => !target.section || i.sectionId === target.section,
        )!.claimId)
      : null;
  // A question starter shares the question address but has its own page.
  const starterId =
    target &&
    (target.kind === 'reading' || target.kind === 'question') &&
    questionStarters.some((s) => s.id === target.id)
      ? target.id
      : null;
  const view: View = starterId
    ? 'starter'
    : isQuestion(target?.kind)
      ? 'path'
      : target?.kind === 'about'
        ? 'about'
        : target?.kind === 'hub'
          ? 'hub'
          : target?.kind === 'explore' && target.view === 'timeline'
            ? 'timeline'
            : target?.kind === 'dossier'
              ? target.view === 'map'
                ? 'map'
                : 'dossier'
              : target?.kind === 'documents'
                ? 'documents'
                : target?.kind === 'compare'
                  ? 'compare'
                  : target?.kind === 'control'
                    ? 'control'
                    : target?.kind === 'commitments'
                      ? 'commitments'
                      : target?.kind === 'guide'
                        ? 'guide'
                        : target?.kind === 'predictions'
                          ? 'predictions'
                          : target?.kind === 'propositions' ||
                              target?.kind === 'stances'
                            ? 'propositions'
                            : target?.kind === 'year' ||
                                target?.kind === 'years'
                              ? 'year'
                              : target?.kind === 'person'
                                ? 'person'
                                : target?.kind === 'document'
                                  ? 'document'
                                  : target?.kind === 'claim'
                                    ? 'claim'
                                    : target?.kind === 'search'
                                      ? 'search'
                                      : target || notice
                                        ? 'map'
                                        : 'home';
  return {
    notice,
    view,
    hubId: target?.kind === 'hub' ? target.id : ('governance' as HubId),
    exploreQuery: target?.kind === 'explore' ? (target.q ?? '') : '',
    /** A dossier's map shows every type of record it connects to. */
    allTypes: target?.kind === 'dossier' && target.view === 'map',
    controlId: target?.kind === 'control' ? target.id : null,
    /** The comparison shown: Compare frameworks or Model cards compared. */
    compareId: target?.kind === 'compare' ? target.id : frameworkComparison.id,
    compareFacet: target?.kind === 'compare' ? (target.facet ?? null) : null,
    compareDeveloper:
      target?.kind === 'compare' ? (target.developer ?? null) : null,
    compareEditions:
      target?.kind === 'compare' ? (target.editions ?? []) : ([] as string[]),
    compareFrameworks:
      target?.kind === 'compare' ? (target.frameworks ?? null) : null,
    propositionsId:
      target?.kind === 'propositions' || target?.kind === 'stances'
        ? (target.id ?? '')
        : null,
    /** Propositions by author: the index, or a collection's stances. */
    stances: target?.kind === 'stances',
    guideId: target?.kind === 'guide' ? target.id : null,
    /** A chronicle page's id; null on the index of the years. */
    yearId: target?.kind === 'year' ? target.id : null,
    starterId,
    starterSection:
      starterId && target && 'section' in target
        ? (target.section ?? null)
        : null,
    questionId: selection?.id ?? null,
    focusId:
      selection?.institutionId ??
      (target?.kind === 'dossier' ||
      target?.kind === 'person' ||
      target?.kind === 'document'
        ? target.id
        : null),
    claimId:
      target?.kind === 'claim'
        ? target.id
        : target && 'inspect' in target
          ? (target.inspect ?? null)
          : null,
    bookmark:
      selection && selected
        ? { questionId: selection.id, claimId: selected }
        : null,
    searchQuery: target?.kind === 'search' ? (target.q ?? '') : '',
    searchMode:
      target?.kind === 'search' && target.mode === 'names'
        ? ('names' as const)
        : ('all' as const),
  };
}

export default function Workspace({
  address,
  theme,
  onTheme,
  start,
  onShown,
}: {
  /** The address the page opened at. */
  address: string;
  /** Called once the page runs in the browser. */
  onShown: (shown: true) => void;
  theme: 'light' | 'dark';
  onTheme: (theme: 'light' | 'dark') => void;
  /** A start-page link followed before the records had loaded. */
  start: StartAction | null;
}) {
  /** The records held, for values computed from them (src/ui/records.ts). */
  const records = useHeldRecords();
  const [initial] = useState(() => locationState(address));
  const [linkNotice, setLinkNotice] = useState(initial.notice);
  const [filters, setFilters] = useState<Filters>({
    topic: 'all',
    throughYear: latestYear,
    // A search's timeline and map show every type of record it found.
    entityType: initial.exploreQuery || initial.allTypes ? 'all' : 'structural',
    focusId: initial.focusId,
  });
  const [claimId, setClaimId] = useState<string | null>(initial.claimId);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>(initial.view);
  const [bookmark, setBookmark] = useState<Bookmark | null>(initial.bookmark);
  const [questionId, setQuestionId] = useState<string | null>(
    initial.questionId,
  );
  const [controlId, setControlId] = useState<string | null>(initial.controlId);
  const [compareId, setCompareId] = useState<string>(initial.compareId);
  const [compareFacet, setCompareFacet] = useState<string | null>(
    initial.compareFacet,
  );
  /** The developer whose cards Model cards compared shows, if chosen. */
  const [compareDeveloper, setCompareDeveloper] = useState<string | null>(
    initial.compareDeveloper,
  );
  /** Editions chosen on the comparison page in place of the latest ones. */
  const [compareEditions, setCompareEditions] = useState<string[]>(
    initial.compareEditions,
  );
  /** Frameworks shown side by side on the comparison page, if chosen. */
  const [compareFrameworks, setCompareFrameworks] = useState<string[] | null>(
    initial.compareFrameworks,
  );
  const [propositionsId, setPropositionsId] = useState<string | null>(
    initial.propositionsId,
  );
  const [stances, setStances] = useState(initial.stances);
  const [guideId, setGuideId] = useState<string | null>(initial.guideId);
  const [yearId, setYearId] = useState<string | null>(initial.yearId);
  const [propositionFocus, setPropositionFocus] = useState<string | null>(null);
  const [starterId, setStarterId] = useState<string | null>(initial.starterId);
  const [starterSection, setStarterSection] = useState<string | null>(
    initial.starterSection,
  );
  const [searchQuery, setSearchQuery] = useState(initial.searchQuery);
  const [searchMode, setSearchMode] = useState(initial.searchMode);
  const [hubId, setHubId] = useState<HubId>(initial.hubId);
  /** Search text whose matches the explorer's timeline and map show. */
  const [exploreQuery, setExploreQuery] = useState(initial.exploreQuery);
  /**
   * The explorer's list of claims is drawn once the page is in the browser.
   * A built page leaves it out: with every claim in it, the explorer and each
   * claim's page would carry the whole list.
   */
  const listed = useInBrowser();
  // Controls in a built page answer once the page runs in the browser.
  /**
   * Controls answer once the page runs in the browser; on a page drawn from
   * its slice, their input waits for the records (see the effect below).
   */
  const live = listed;
  useEffect(() => onShown(true), [onShown]);
  /**
   * A page drawn from its slice holds input until what it needs has loaded
   * (src/ui/hold-until-records.ts); its links to pages with a slice open
   * those pages from their slices (src/ui/page-visits.ts). The search page
   * runs without records on its own: only such links are handled there (its
   * other changes of page wait for the records).
   */
  const searchView = view === 'search';
  useEffect(() => {
    if (recordsHeld()) return;
    return holdUntilRecords({ linksOnly: searchView });
  }, [searchView, records]);
  /** Whether the page has written its first address. */
  const addressed = useRef(false);
  /** Whether the address the page opened at is still to be applied. */
  const deferred = useRef(false);
  useEffect(() => {
    /** The latest address to open; an earlier one still loading gives way. */
    let latest = 0;
    const restore = (opening = false, address = currentAddress()) => {
      const turn = ++latest;
      // Back or forward from a page drawn from its slice, to a page with a
      // slice: that page opens as a fresh load of its address would.
      if (!opening && opensFromSlice(address)) {
        visit(address, 'history');
        return;
      }
      // A page that needs more records opens once they have loaded; the page
      // in view stays until then, and may write its own address meanwhile,
      // so the address to open is put back first.
      if (!dataHeld(address)) {
        whenData(address, () => {
          if (turn !== latest) return;
          if (currentAddress() !== address)
            window.history.replaceState(null, '', address);
          restore(opening, address);
        });
        return;
      }
      const next = locationState(address);
      setLinkNotice(next.notice);
      setFilters({
        topic: 'all',
        throughYear: latestYear,
        entityType:
          opening && !next.exploreQuery && !next.allTypes
            ? 'structural'
            : 'all',
        focusId: next.focusId,
      });
      setView(next.view);
      setClaimId(next.claimId);
      setBookmark(next.bookmark);
      setQuestionId(next.questionId);
      setControlId(next.controlId);
      setCompareId(next.compareId);
      setCompareFacet(next.compareFacet);
      setCompareDeveloper(next.compareDeveloper);
      setCompareEditions(next.compareEditions);
      setCompareFrameworks(next.compareFrameworks);
      setPropositionsId(next.propositionsId);
      setStances(next.stances);
      setGuideId(next.guideId);
      setYearId(next.yearId);
      setStarterId(next.starterId);
      setStarterSection(next.starterSection);
      setSearchQuery(next.searchQuery);
      setSearchMode(next.searchMode);
      setHubId(next.hubId);
      setExploreQuery(next.exploreQuery);
      setQuery('');
    };
    // A built page opens at its path alone; the query (an inspected claim, a
    // search) applies once the page has taken over its HTML.
    if (currentAddress() !== address) {
      restore(true);
      deferred.current = true;
    }
    const back = () => restore();
    window.addEventListener('popstate', back);
    return () => {
      // A restore still loading for this workspace gives way when a link
      // mounts another (src/ui/page-visits.ts).
      latest += 1;
      window.removeEventListener('popstate', back);
    };
    // The address is read once, when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const claimReturnScroll = useRef<number | null>(null);
  const claimTrigger = useRef<HTMLElement | null>(null);
  /**
   * On narrow screens the claim panel opens directly below the record or grid
   * row that opened it, in a slot placed there; on wide screens it stays in
   * the side column.
   */
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const slotRef = useRef<HTMLElement | null>(null);
  const lastClick = useRef<Element | null>(null);
  useEffect(() => {
    const remember = (event: MouseEvent) => {
      lastClick.current = event.target instanceof Element ? event.target : null;
    };
    document.addEventListener('click', remember, true);
    const query = window.matchMedia?.(narrowQuery);
    const widen = () => {
      if (!query?.matches) {
        slotRef.current = null;
        setSlot(null);
      }
    };
    query?.addEventListener('change', widen);
    return () => {
      document.removeEventListener('click', remember, true);
      query?.removeEventListener('change', widen);
    };
  }, []);
  // A slot whose page or list has gone (another view opened) gives way to the
  // side column, so the open panel stays on the page. It checks after every
  // render, since any page change can remove the slot; it sets state only
  // once per removed slot.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (slotRef.current && !slotRef.current.isConnected) {
      slotRef.current = null;
      setSlot(null);
    }
  });
  // A closed panel gives up its slot.
  useEffect(() => {
    if (!claimId && slotRef.current) {
      slotRef.current = null;
      setSlot(null);
    }
  }, [claimId]);
  // A slot leaves the page when the panel moves or closes.
  useEffect(
    () => () => {
      if (!slot) return;
      (slot.closest('.inspector-slot-row') ?? slot).remove();
    },
    [slot],
  );
  /**
   * A change of page from one drawn without records (the search page) waits
   * for them; on every other page they are already held.
   */
  const afterRecords = whenRecords;
  const searchRef = useRef<HTMLInputElement>(null);
  /** The claims behind a search's list, and the records it matches by name. */
  const found = useMemo(
    () =>
      exploreQuery.trim() ? searchClaims(searchIndex(), exploreQuery) : null,
    // The index is computed from the records held, so it changes with them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exploreQuery, records],
  );
  const visible = useMemo(() => {
    if (!found) return queryDataset(records.data, filters);
    // The timeline and map of a search show every claim its list shows,
    // proposition records included, and the claims about a matching record.
    const all = queryDataset(records.data, {
      ...filters,
      propositions: true,
    });
    const claims = all.claims.filter(
      (c) =>
        found.listed.has(c.id) ||
        found.matched.has(c.subject) ||
        (c.object.kind === 'entity' && found.matched.has(c.object.entityId)),
    );
    const used = new Set(
      claims.flatMap((c) => [
        c.subject,
        ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
      ]),
    );
    if (filters.focusId) used.add(filters.focusId);
    return { claims, entities: all.entities.filter((e) => used.has(e.id)) };
  }, [filters, found, records]);
  // The explorer's lookup searches names and aliases only.
  const results = useMemo(
    () =>
      query.trim()
        ? (searchRecords(searchIndex(), query, {
            mode: 'names',
          }).groups[0]?.hits.map((hit) => records.entities.get(hit.id)!) ?? [])
        : [],
    [query, records],
  );
  const focusEntity = filters.focusId
    ? repository.entities.get(filters.focusId)
    : null;
  const focusEntityId = filters.focusId;
  /** The explorer's own heading is the page's main heading only without a focus. */
  const HeadingTag = focusEntity ? 'h1' : 'h2';
  const dossier = useMemo(
    () =>
      filters.focusId
        ? institutionalDossier(records.data, filters.focusId)
        : null,
    [filters.focusId, records],
  );
  const dossierOpen = view === 'dossier' && !!dossier;
  /** The question anchored to the focused institution, for dossier exits. */
  const dossierPath = useMemo(
    () =>
      filters.focusId ? researchPath(records.data, filters.focusId) : null,
    [filters.focusId, records],
  );
  const path = useMemo(
    () => (questionId ? questionPath(records.data, questionId) : null),
    [questionId, records],
  );
  const savedPath = useMemo(
    () => (bookmark ? questionPath(records.data, bookmark.questionId) : null),
    [bookmark, records],
  );
  const pathOpen = view === 'path' && !!path;
  const documentsOpen = view === 'documents';
  const compareOpen = view === 'compare';
  const structure =
    view === 'control' && controlId
      ? (controlViews().get(controlId) ?? null)
      : null;
  // The timelines page computes its records in its own module, so that
  // the workspace, which every page loads, does not carry them.
  const timelines = view === 'control' && controlId === controlTimelinesId;
  const controlOpen = !!structure || !!timelines;
  const commitmentsOpen = view === 'commitments';
  const guidePage =
    view === 'guide' && guideId ? (guidePages().get(guideId) ?? null) : null;
  const changesPage =
    view === 'guide' && guideId ? (changesPages().get(guideId) ?? null) : null;
  const computePage =
    view === 'guide' && guideId ? (computePages().get(guideId) ?? null) : null;
  const guideOpen = !!guidePage || !!changesPage || !!computePage;
  // A propositions page computes its view from its collection, which it
  // loads whole (src/ui/proposition-text.ts).
  const stancesOpen = view === 'propositions' && stances;
  const propositionsPage =
    view === 'propositions' && propositionsId && !stances
      ? (propositionFrames.find((c) => c.id === propositionsId) ?? null)
      : null;
  const propositionsOpen = !!propositionsPage || stancesOpen;
  const predictionsOpen = view === 'predictions';
  /** The year and topic of a chronicle page; null on the index. */
  const yearPage =
    view === 'year' && yearId ? parseYearPageId(records.data, yearId) : null;
  const yearOpen = view === 'year';
  const starterView =
    view === 'starter' && starterId
      ? (starterViews().get(starterId) ?? null)
      : null;
  const starterOpen = !!starterView;
  const profile = useMemo(
    () =>
      view === 'person' && filters.focusId
        ? personProfile(records.data, filters.focusId)
        : null,
    [view, filters.focusId, records],
  );
  const record = useMemo(
    () =>
      view === 'document' && filters.focusId
        ? documentRecord(records.data, filters.focusId)
        : null,
    [view, filters.focusId, records],
  );
  const recordOpen = !!profile || !!record;
  /** A claim's own page, opened at its address rather than from a list. */
  const claimPage =
    view === 'claim' && claimId ? repository.claims.get(claimId) : undefined;
  const claimPageOpen = !!claimPage;
  const projectionOpen =
    dossierOpen ||
    pathOpen ||
    starterOpen ||
    documentsOpen ||
    compareOpen ||
    controlOpen ||
    commitmentsOpen ||
    guideOpen ||
    propositionsOpen ||
    predictionsOpen;
  /**
   * Why the map view shows the list instead: the whole dataset is never
   * drawn, and a set too large to read is not drawn either.
   */
  const mapWithheld =
    !exploreQuery.trim() && !filters.focusId && filters.topic === 'all'
      ? ('unnarrowed' as const)
      : !mapReadable(visible, !!filters.focusId)
        ? ('too-large' as const)
        : null;
  const visibleSize = mapSize(visible);
  useEffect(() => {
    const item =
      path?.items.find((i) => i.claimId === bookmark?.claimId) ??
      path?.items[0];
    const target: ReferenceTarget | null = starterView
      ? {
          kind: 'question' as const,
          id: starterView.definition.id,
          section: starterSection ?? undefined,
          inspect: claimId ?? undefined,
        }
      : pathOpen && path && item
        ? {
            kind: 'question' as const,
            id: path.id,
            section: item.sectionId,
            claim: item.claimId,
            inspect: claimId ?? undefined,
          }
        : dossierOpen && dossier
          ? {
              kind: 'dossier' as const,
              id: dossier.institution.id,
              inspect: claimId ?? undefined,
            }
          : documentsOpen
            ? {
                kind: 'documents' as const,
                id: frontierSafetyFrameworks.id,
                inspect: claimId ?? undefined,
              }
            : compareOpen
              ? compareId === modelCardsId
                ? {
                    kind: 'compare' as const,
                    id: compareId,
                    facet: compareFacet ?? undefined,
                    developer: compareDeveloper ?? undefined,
                    inspect: claimId ?? undefined,
                  }
                : compareId === lawsComparedId
                  ? {
                      kind: 'compare' as const,
                      id: compareId,
                      facet: compareFacet ?? undefined,
                      editions: compareEditions,
                      inspect: claimId ?? undefined,
                    }
                  : {
                      kind: 'compare' as const,
                      id: frameworkComparison.id,
                      facet: compareFacet ?? undefined,
                      editions: compareEditions,
                      frameworks: compareFrameworks ?? undefined,
                      inspect: claimId ?? undefined,
                    }
              : structure || timelines
                ? {
                    kind: 'control' as const,
                    id: structure
                      ? structure.collection.id
                      : controlTimelinesId,
                    inspect: claimId ?? undefined,
                  }
                : commitmentsOpen
                  ? {
                      kind: 'commitments' as const,
                      id: externalCommitments.id,
                      inspect: claimId ?? undefined,
                    }
                  : guidePage || changesPage || computePage
                    ? {
                        kind: 'guide' as const,
                        id: (guidePage ?? changesPage ?? computePage)!
                          .collection.id,
                        inspect: claimId ?? undefined,
                      }
                    : predictionsOpen
                      ? {
                          kind: 'predictions' as const,
                          id: predictionsId,
                          inspect: claimId ?? undefined,
                        }
                      : stancesOpen
                        ? {
                            kind: 'stances' as const,
                            id: propositionsId || undefined,
                            inspect: claimId ?? undefined,
                          }
                        : propositionsPage
                          ? {
                              kind: 'propositions' as const,
                              id: propositionsPage.id,
                              inspect: claimId ?? undefined,
                            }
                          : yearOpen
                            ? yearId
                              ? {
                                  kind: 'year' as const,
                                  id: yearId,
                                  inspect: claimId ?? undefined,
                                }
                              : { kind: 'years' as const }
                            : recordOpen && filters.focusId
                              ? {
                                  kind: profile
                                    ? ('person' as const)
                                    : ('document' as const),
                                  id: filters.focusId,
                                  inspect: claimId ?? undefined,
                                }
                              : view === 'search'
                                ? {
                                    kind: 'search' as const,
                                    q: searchQuery.trim() || undefined,
                                    mode:
                                      searchMode === 'names'
                                        ? ('names' as const)
                                        : undefined,
                                    inspect: claimId ?? undefined,
                                  }
                                : view === 'map' &&
                                    dossier &&
                                    !exploreQuery.trim() &&
                                    !claimId
                                  ? {
                                      kind: 'dossier' as const,
                                      id: dossier.institution.id,
                                      view: 'map' as const,
                                    }
                                  : claimId
                                    ? { kind: 'claim' as const, id: claimId }
                                    : view === 'home'
                                      ? null
                                      : view === 'about'
                                        ? { kind: 'about' as const }
                                        : view === 'hub'
                                          ? { kind: 'hub' as const, id: hubId }
                                          : {
                                              kind: 'explore' as const,
                                              q:
                                                exploreQuery.trim() ||
                                                undefined,
                                              view:
                                                view === 'timeline'
                                                  ? ('timeline' as const)
                                                  : undefined,
                                            };
    if (deferred.current) {
      deferred.current = false;
      return;
    }
    // While the next page loads, the page in view writes no address: after a
    // step back or forward the browser already shows the next one.
    if (visitPending()) return;
    if (linkNotice && (!target || target.kind === 'explore')) {
      document.title = pageMeta(repository.data, startPath)!.title;
      return;
    }
    const next = target ? referencePath(target) : startPath;
    document.title = (
      pageMeta(repository.data, next) ?? pageMeta(repository.data, startPath)!
    ).title;
    const opening = !addressed.current;
    addressed.current = true;
    const current = currentAddress();
    if (current === next) return;
    // A different page is a new history entry; a change of inspected claim,
    // section or search query within the same page, and the page's first
    // address, only normalise the current entry.
    const page = (h: string) => h.split(/[?#]/)[0];
    const change =
      opening || page(current) === page(next) ? 'replaceState' : 'pushState';
    // A change within the page keeps the entry's state (where the reader
    // was, for a step back to it).
    window.history[change](
      change === 'replaceState' ? window.history.state : null,
      '',
      next,
    );
  }, [
    starterView,
    starterSection,
    pathOpen,
    path,
    dossierOpen,
    dossier,
    documentsOpen,
    compareOpen,
    compareId,
    compareFacet,
    compareDeveloper,
    compareEditions,
    compareFrameworks,
    structure,
    timelines,
    commitmentsOpen,
    guidePage,
    changesPage,
    computePage,
    propositionsPage,
    predictionsOpen,
    stancesOpen,
    propositionsId,
    yearOpen,
    yearId,
    recordOpen,
    profile,
    filters.focusId,
    view,
    claimId,
    bookmark,
    linkNotice,
    searchQuery,
    searchMode,
    hubId,
    exploreQuery,
  ]);
  const onClaimPage = view === 'claim';
  useEffect(() => {
    // A claim's own page opens at its heading, with the panel below on a phone.
    if (!claimId || onClaimPage) return;
    const panel = document.getElementById('inspector');
    panel?.focus({ preventScroll: true });
    if (window.innerWidth <= 940) panel?.scrollIntoView({ block: 'start' });
  }, [claimId, onClaimPage]);
  const openQuestion = (id: string, claim?: string) => {
    setLinkNotice(null);
    const target = questionPath(repository.data, id);
    if (!target) return;
    const claimId =
      claim ??
      (bookmark?.questionId === id
        ? bookmark.claimId
        : target.items[0].claimId);
    setBookmark({ questionId: id, claimId });
    setQuestionId(id);
    setFilters((f) => ({ ...f, focusId: target.institutionId ?? null }));
    setClaimId(null);
    setView('path');
  };
  const entityTypes = facts.entityTypes;
  const timeline = useMemo(
    () =>
      [...visible.claims].sort(
        (a, b) =>
          (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
          a.id.localeCompare(b.id),
      ),
    [visible.claims],
  );

  const selectEntity = useCallback((id: string) => {
    setLinkNotice(null);
    const isInstitution = repository.entities.get(id)?.type === 'organisation';
    setView((v) => entityView(v, isInstitution));
    // An explicit search or anchor selection opens the entity with all its relations.
    setFilters({
      topic: 'all',
      throughYear: latestYear,
      entityType: 'all',
      focusId: id,
    });
    setClaimId(null);
    setQuery('');
  }, []);
  /** Links to a person or document open its reading page. */
  const openEntity = useCallback(
    (id: string) => {
      const type = repository.entities.get(id)?.type;
      if (type !== 'person' && type !== 'document') return selectEntity(id);
      setLinkNotice(null);
      setFilters({
        topic: 'all',
        throughYear: latestYear,
        entityType: 'all',
        focusId: id,
      });
      setClaimId(null);
      setQuery('');
      setView(type);
      window.scrollTo(0, 0);
      requestAnimationFrame(() =>
        document.getElementById('record-page')?.focus({ preventScroll: true }),
      );
    },
    [selectEntity],
  );
  const selectClaim = useCallback(
    (id: string) => {
      setLinkNotice(null);
      claimReturnScroll.current =
        view === 'path' ||
        view === 'starter' ||
        view === 'propositions' ||
        view === 'predictions' ||
        view === 'year' ||
        view === 'guide' ||
        view === 'compare'
          ? window.scrollY
          : null;
      const active = document.activeElement;
      // Safari does not focus a tapped button, so fall back to the last click.
      const trigger =
        active instanceof HTMLElement && active !== document.body
          ? active
          : (lastClick.current?.closest<HTMLElement>('button, a') ?? null);
      const current = slotRef.current;
      if (current && trigger && current.contains(trigger)) {
        // A link inside the inline panel keeps the panel where it is, and
        // Close still returns to the record that opened it.
      } else {
        claimTrigger.current = trigger;
        slotRef.current = inspectorSlot(trigger);
        setSlot(slotRef.current);
      }
      setClaimId(id);
      requestAnimationFrame(() => {
        const panel = document.getElementById('inspector');
        if (panel) {
          panel.scrollTop = 0;
          panel.focus({ preventScroll: true });
          if (window.innerWidth <= 940 && view !== 'compare')
            panel.scrollIntoView({ block: 'start' });
        }
      });
    },
    [view],
  );
  const changeTopic = (topic: Topic | 'all') => {
    if (
      view === 'dossier' ||
      view === 'path' ||
      view === 'starter' ||
      view === 'documents' ||
      view === 'compare' ||
      view === 'guide' ||
      view === 'propositions' ||
      view === 'predictions' ||
      view === 'year' ||
      view === 'search' ||
      view === 'hub' ||
      recordOpen
    )
      setView('claims');
    setFilters((f) => ({
      ...f,
      topic,
      frameworkFamily: null,
      focusId: null,
      entityType: topic === 'all' ? 'structural' : 'all',
    }));
    setClaimId(null);
    setQuery('');
  };
  const selectFamily = (family: string) => {
    setFilters({
      topic: 'governance',
      throughYear: latestYear,
      entityType: 'all',
      focusId: null,
      frameworkFamily: family || null,
    });
    setClaimId(null);
    setQuery('');
    setView('timeline');
  };
  /**
   * Map from an inspected claim with nothing else narrowing the view draws the
   * direct connections of the claim's subject; the claim stays selected, so
   * its line is marked on the map.
   */
  const showMap = () => {
    const subject =
      mapWithheld === 'unnarrowed' && claimId
        ? repository.claims.get(claimId)?.subject
        : undefined;
    if (subject)
      setFilters({
        topic: 'all',
        throughYear: latestYear,
        entityType: 'all',
        focusId: subject,
      });
    setView('map');
  };
  const reset = () => {
    setLinkNotice(null);
    if (
      projectionOpen ||
      recordOpen ||
      view === 'home' ||
      view === 'hub' ||
      view === 'about' ||
      view === 'search'
    )
      setView('map');
    setFilters({
      topic: 'all',
      throughYear: latestYear,
      entityType: 'structural',
      focusId: null,
    });
    setClaimId(null);
    setQuery('');
    setExploreQuery('');
  };
  const goHome = () => {
    reset();
    setView('home');
    window.scrollTo(0, 0);
  };
  const openAbout = () => {
    reset();
    setView('about');
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      document.getElementById('about')?.focus({ preventScroll: true }),
    );
  };
  const openDocuments = () => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setClaimId(null);
    setQuery('');
    setView('documents');
  };
  /** Opens a comparison: Compare frameworks unless another is named. */
  const openCompare = (
    facet?: string,
    id: string = frameworkComparison.id,
    developer?: string,
    editions: string[] = [],
  ) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setCompareId(id);
    setCompareFacet(facet ?? null);
    setCompareDeveloper(developer ?? null);
    setCompareEditions(editions);
    setCompareFrameworks(null);
    setClaimId(null);
    setQuery('');
    setView('compare');
    window.scrollTo(0, 0);
  };
  const openControl = (id: string) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setControlId(id);
    setClaimId(null);
    setQuery('');
    setView('control');
    window.scrollTo(0, 0);
  };
  const openStarter = (id: string) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setStarterId(id);
    setStarterSection(null);
    setClaimId(null);
    setQuery('');
    setView('starter');
    window.scrollTo(0, 0);
  };
  const openCommitments = () => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setClaimId(null);
    setQuery('');
    setView('commitments');
    window.scrollTo(0, 0);
  };
  const openGuide = (id: string) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setGuideId(id);
    setClaimId(null);
    setQuery('');
    setView('guide');
    window.scrollTo(0, 0);
  };
  const openPropositions = (id: string) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setPropositionsId(id);
    setStances(false);
    setClaimId(null);
    setQuery('');
    setView('propositions');
    window.scrollTo(0, 0);
  };
  const openPredictions = () => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setClaimId(null);
    setQuery('');
    setView('predictions');
    window.scrollTo(0, 0);
  };
  /**
   * Opens propositions by author: the index, or a collection's stances, at
   * the first author whose byline key is given (from a person page).
   */
  const openStances = (id?: string, authors?: string[]) => {
    openPropositions(id ?? '');
    setStances(true);
    setPropositionFocus(authors?.length ? authors.join('|') : null);
  };
  /** Opens a chronicle page: a year (`2025`, `2025-governance`) or the index. */
  const openYear = (id: string | null) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setYearId(id);
    setClaimId(null);
    setQuery('');
    setView('year');
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      document.getElementById('chronicle')?.focus({ preventScroll: true }),
    );
  };
  /** Opens a claim's own page. */
  const openClaimPage = (id: string) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setClaimId(id);
    setQuery('');
    setView('claim');
    window.scrollTo(0, 0);
  };
  /** Opens the propositions page at one proposition's section. */
  const openProposition = (propositionId: string) => {
    const collection = propositionFrames.find((c) =>
      c.groups.some((g) => g.propositionIds.includes(propositionId)),
    );
    if (!collection) return;
    openPropositions(collection.id);
    // The page scrolls to the proposition once it has rendered.
    setPropositionFocus(propositionId);
  };
  /** Record links from the claim panel: a proposition opens its collection page. */
  const openRecord = (id: string) =>
    repository.entities.get(id)?.proposition
      ? openProposition(id)
      : openEntity(id);
  const openClaim = (id: string) => {
    // Pages without an inspector open the claim in the claims list.
    if (view === 'home' || view === 'hub' || view === 'about') {
      setLinkNotice(null);
      setFilters({
        topic: 'all',
        throughYear: latestYear,
        entityType: 'all',
        focusId: null,
      });
      setView('claims');
      setClaimId(id);
    } else selectClaim(id);
  };
  const openHub = (id: HubId) => {
    reset();
    setHubId(id);
    setView('hub');
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      document.getElementById('hub')?.focus({ preventScroll: true }),
    );
  };
  /** Shows the current search's matches as a timeline or on the map. */
  const openSearchView = (mode: 'timeline' | 'map') => {
    reset();
    setFilters({
      topic: 'all',
      throughYear: latestYear,
      entityType: 'all',
      focusId: null,
    });
    setExploreQuery(searchQuery.trim());
    setView(mode);
  };
  const openSearch = (text?: string) => {
    setLinkNotice(null);
    setClaimId(null);
    if (text !== undefined) {
      setSearchQuery(text);
      setSearchMode('all');
    }
    setQuery('');
    setView('search');
    window.scrollTo(0, 0);
  };
  /** Opens the record explorer with every record. */
  const openExplorer = () => {
    reset();
    setView('map');
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      document.getElementById('explorer')?.focus({ preventScroll: true }),
    );
  };
  /** Opens a reading page that search lists, by its address. */
  const openPage = (path: string) => {
    const { target } = resolveReference(path, repository.data);
    if (!target) return;
    if (target.kind === 'hub') openHub(target.id);
    else if (target.kind === 'about') openAbout();
    else if (target.kind === 'explore') openExplorer();
    else if (target.kind === 'documents') openDocuments();
    else if (target.kind === 'compare')
      openCompare(
        target.facet,
        target.id,
        target.developer,
        target.editions ?? [],
      );
    else if (target.kind === 'control') openControl(target.id);
    else if (target.kind === 'commitments') openCommitments();
    else if (target.kind === 'guide') openGuide(target.id);
    else if (target.kind === 'propositions') openPropositions(target.id);
    else if (target.kind === 'predictions') openPredictions();
    else if (target.kind === 'stances') openStances(target.id);
    else if (target.kind === 'years') openYear(null);
    else if (target.kind === 'year') openYear(target.id);
    else if (target.kind === 'question' || target.kind === 'reading') {
      if (questionStarters.some((s) => s.id === target.id))
        openStarter(target.id);
      else {
        openQuestion(target.id);
        window.scrollTo(0, 0);
      }
    }
  };
  const navigate = (target: NavTarget) =>
    target === 'home'
      ? goHome()
      : target === 'search'
        ? openSearch()
        : target === 'explore'
          ? openExplorer()
          : target === 'about'
            ? openAbout()
            : openHub(target);
  const openDossier = (id: string, view?: 'map') => {
    selectEntity(id);
    setView(view === 'map' ? 'map' : 'dossier');
  };
  const showAboutSection = (id: string) => {
    openAbout();
    // The About page can take a few frames to render after another view.
    const reveal = (frames: number) =>
      requestAnimationFrame(() => {
        const heading = document.getElementById(id);
        if (!heading) {
          if (frames > 0) reveal(frames - 1);
          return;
        }
        heading.scrollIntoView({ block: 'start' });
        heading.focus({ preventScroll: true });
      });
    reveal(30);
  };
  /** The banner's “How this works →”: How this was built, on About. */
  const showHowBuilt = () => showAboutSection('about-built');
  const perform = (action: StartAction) =>
    action.kind === 'hub'
      ? openHub(action.id)
      : action.kind === 'documents'
        ? openDocuments()
        : action.kind === 'compare'
          ? openCompare(action.facet, action.id)
          : action.kind === 'commitments'
            ? openCommitments()
            : action.kind === 'guide'
              ? openGuide(action.id)
              : action.kind === 'propositions'
                ? openPropositions(action.id)
                : action.kind === 'predictions'
                  ? openPredictions()
                  : action.kind === 'stances'
                    ? openStances(action.id, action.authors)
                    : action.kind === 'years'
                      ? openYear(null)
                      : action.kind === 'control'
                        ? openControl(action.id)
                        : action.kind === 'reading'
                          ? openQuestion(researchPaths[0].id)
                          : action.kind === 'question'
                            ? openStarter(action.id)
                            : action.kind === 'dossier'
                              ? openDossier(action.id, action.view)
                              : action.kind === 'person'
                                ? openEntity(action.id)
                                : action.kind === 'claim'
                                  ? openClaim(action.id)
                                  : action.kind === 'search'
                                    ? openSearch(action.q ?? '')
                                    : action.kind === 'explore'
                                      ? openExplorer()
                                      : action.kind === 'how-checked'
                                        ? showHowBuilt()
                                        : action.kind === 'not-covered'
                                          ? showAboutSection(
                                              'about-not-covered',
                                            )
                                          : openAbout();
  // A start-page link followed while the records loaded opens once.
  const pendingStart = useRef(start);
  useEffect(() => {
    const action = pendingStart.current;
    if (!action) return;
    pendingStart.current = null;
    perform(action);
  });
  const closeInspector = () => {
    // Closing a claim's own page leaves the explorer in its place.
    if (view === 'claim') setView('claims');
    if (claimId) {
      const inline = !!slotRef.current;
      setClaimId(null);
      requestAnimationFrame(() => {
        if (inline && claimTrigger.current?.isConnected) {
          // The panel sat below the record: return to the record itself.
          claimTrigger.current.focus({ preventScroll: true });
          claimTrigger.current.scrollIntoView({ block: 'center' });
          return;
        }
        if (claimTrigger.current?.isConnected) {
          const restoreScroll =
            (view === 'path' ||
              view === 'starter' ||
              view === 'propositions' ||
              view === 'predictions' ||
              view === 'year' ||
              view === 'guide' ||
              view === 'compare') &&
            claimReturnScroll.current !== null;
          claimTrigger.current.focus({ preventScroll: restoreScroll });
          if (restoreScroll) window.scrollTo(0, claimReturnScroll.current!);
        }
      });
    } else setFilters((f) => ({ ...f, focusId: null }));
  };

  // Escape closes the comparison's drawer and returns to the cell.
  const drawerOpen = compareOpen && !!claimId;
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      // Escape in a field outside the drawer, such as the header search,
      // belongs to that field.
      const target = event.target instanceof Element ? event.target : null;
      if (
        target?.closest('input, select, textarea, [contenteditable]') &&
        !target.closest('.cmp-drawer')
      )
        return;
      event.preventDefault();
      closeInspector();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
  /**
   * The address a record link opens from this view. An organisation opens its
   * dossier, except in the explorer, where it becomes the explorer's focus.
   */
  const recordHref = (id: string) =>
    recordPath(
      repository.entities.get(id),
      view === 'map' || view === 'claims' || view === 'timeline',
    );
  const plural = (n: number, one: string, many: string) =>
    `${n} ${n === 1 ? one : many}`;
  /**
   * How the timeline and map of a search relate to its list: every claim the
   * list shows, then the claims about a record it matches by name.
   */
  const searchCoverage = found
    ? (() => {
        const listed = visible.claims.filter((c) =>
          found.listed.has(c.id),
        ).length;
        const added = visible.claims.length - listed;
        const hidden = found.listed.size - listed;
        return [
          `Claims found by the search for “${exploreQuery.trim()}”: ${visible.claims.length}.`,
          found.listed.size
            ? `They include ${listed === found.listed.size ? 'all' : listed + ' of the'} ${plural(found.listed.size, 'claim', 'claims')} behind the list’s claims and evidence passages.`
            : 'The list shows no claim or evidence passage.',
          hidden ? `The filters below hide ${hidden} of them.` : '',
          added
            ? `${plural(added, 'claim is', 'claims are')} about a person, organisation, document or other record the list matches by name.`
            : '',
        ]
          .filter(Boolean)
          .join(' ');
      })()
    : null;
  const literalClaims = visible.claims.filter(
    (c) => c.object.kind === 'literal',
  ).length;
  const contentId =
    view === 'home'
      ? 'start'
      : view === 'hub'
        ? 'hub'
        : view === 'about'
          ? 'about'
          : view === 'search'
            ? 'search'
            : documentsOpen
              ? 'documents'
              : compareOpen
                ? 'compare'
                : controlOpen
                  ? 'control'
                  : commitmentsOpen
                    ? 'commitments'
                    : guideOpen
                      ? 'guide'
                      : propositionsOpen
                        ? 'propositions'
                        : predictionsOpen
                          ? 'predictions'
                          : yearOpen
                            ? 'chronicle'
                            : recordOpen
                              ? 'record-page'
                              : claimPageOpen
                                ? 'claim-page'
                                : pathOpen || starterOpen
                                  ? 'question'
                                  : 'explorer';
  const readingPage =
    view === 'home' ||
    view === 'hub' ||
    view === 'about' ||
    view === 'search' ||
    documentsOpen ||
    compareOpen ||
    controlOpen ||
    commitmentsOpen ||
    guideOpen ||
    propositionsOpen ||
    predictionsOpen ||
    yearOpen ||
    recordOpen ||
    claimPageOpen ||
    pathOpen ||
    starterOpen;
  const resume =
    bookmark && savedPath && !pathOpen ? (
      <NavLink
        className="path-resume"
        href={referencePath({
          kind: 'question',
          id: bookmark.questionId,
          claim: bookmark.claimId,
        })}
        onOpen={() => openQuestion(bookmark.questionId, bookmark.claimId)}
      >
        Resume the {savedPath.institution?.name ?? savedPath.title} reading ·{' '}
        {
          savedPath.items[readingPosition(savedPath, bookmark.claimId)].section
            .title
        }
      </NavLink>
    ) : null;
  /** The latest opening at a row; a later one, or leaving, ends earlier ones. */
  const revealing = useRef(0);
  useEffect(
    () => () => {
      revealing.current += 1;
    },
    [],
  );
  /**
   * Opens a collection page with one claim open at its row, as if the reader
   * had selected the row there. A row inside a closed section is opened first.
   */
  const openInCollection = (
    kind: CollectionDefinition['kind'],
    id: string,
    claim: string,
  ) => {
    if (kind === 'documents') openDocuments();
    else if (kind === 'compare') openCompare(undefined, id);
    else if (kind === 'control') openControl(id);
    else if (kind === 'commitments') openCommitments();
    else if (kind === 'propositions') openPropositions(id);
    else if (kind === 'guide') openGuide(id);
    else if (kind === 'predictions') openPredictions();
    else openQuestion(id, claim);
    // The row is drawn once the page's code and text have loaded (a
    // propositions collection loads whole with its page): wait for that
    // load, however long, then for the row (src/ui/reveal-row.ts).
    const turn = ++revealing.current;
    void revealRow({
      loaded: preloadPage(`/${kind}/${encodeURIComponent(id)}`),
      find: () =>
        document.querySelector<HTMLElement>(
          `main [data-claim-id="${CSS.escape(claim)}"]`,
        ),
      open: (row) => {
        for (
          let details = row.closest('details');
          details;
          details = details.parentElement?.closest('details') ?? null
        )
          details.open = true;
        row.scrollIntoView({ block: 'center' });
        row.focus({ preventScroll: true });
        row.click();
      },
      missing: () => setClaimId(claim),
      current: () => turn === revealing.current,
    });
  };
  const claimCollections: ClaimCollection[] = claimPage
    ? (collectionsByClaim(repository.data).get(claimPage.id) ?? []).map(
        ({ kind, definition }) => {
          const id = definition.id;
          const institution =
            typeof definition.institutionId === 'string'
              ? repository.entities.get(definition.institutionId)?.name
              : undefined;
          const title = String(definition.title);
          return {
            title: institution ? `${institution}: ${title}` : title,
            href: referencePath({ kind, id, inspect: claimPage.id }),
            onOpen: () => openInCollection(kind, id, claimPage.id),
          };
        },
      )
    : [];
  const inlineSlot = claimId ? slot : null;
  const readingInspector = inlineSlot ? (
    createPortal(
      <Inspector
        repository={repository}
        claimId={claimId}
        entityId={null}
        visibleClaims={[]}
        onClaim={selectClaim}
        onEntity={openRecord}
        onClose={closeInspector}
        onTopic={changeTopic}
        onFamily={selectFamily}
        onYear={openYear}
      />,
      inlineSlot,
    )
  ) : (
    <Inspector
      repository={repository}
      claimId={claimId}
      entityId={null}
      visibleClaims={[]}
      onClaim={selectClaim}
      onEntity={openRecord}
      onClose={closeInspector}
      statementShown={claimPageOpen}
      onTopic={changeTopic}
      onFamily={selectFamily}
      onYear={openYear}
    />
  );
  return (
    <RecordHref.Provider value={recordHref}>
      <SkipLink
        target={contentId}
        label={readingPage ? 'Skip to content' : 'Skip to explorer'}
      />
      <SiteHeader
        current={
          view === 'home'
            ? 'home'
            : view === 'hub'
              ? hubId
              : view === 'about'
                ? 'about'
                : view === 'search'
                  ? 'search'
                  : !readingPage
                    ? 'explore'
                    : computePage
                      ? 'institutions'
                      : documentsOpen ||
                          compareOpen ||
                          commitmentsOpen ||
                          guideOpen ||
                          controlOpen ||
                          starterOpen
                        ? 'governance'
                        : propositionsOpen || predictionsOpen
                          ? 'ideas'
                          : dossierOpen || pathOpen || profile
                            ? 'institutions'
                            : null
        }
        onNavigate={(target) =>
          afterRecords(
            () => navigate(target),
            () =>
              target === 'about' ? pages.About.preload() : Promise.resolve(),
          )
        }
        onSearch={openSearch}
        theme={theme}
        onTheme={onTheme}
        onHowChecked={() => afterRecords(showHowBuilt, pages.About.preload)}
      />
      <Suspense
        fallback={
          <main className="page-loading" id={contentId} tabIndex={-1}>
            <p role="status">Loading the page…</p>
          </main>
        }
      >
        {view === 'home' ? (
          <Landing summary={summary} onAction={perform} />
        ) : view === 'hub' ? (
          <HubPage hub={hubId} summary={summary} onAction={perform} />
        ) : view === 'about' ? (
          <main className="about-page" id="about" tabIndex={-1}>
            <About
              status={datasetStatus}
              controlTimelines={controlStructures.length}
              propositionCollections={propositionFrames.length}
              dossiers={summary.dossiers.length}
              questions={researchPaths.length}
              starters={questionStarters.length}
              statements={summary.statements}
              onClaim={openClaim}
            />
          </main>
        ) : view === 'search' ? (
          <div className="reading-layout">
            <main className="reading-main" id="search" tabIndex={-1}>
              <Search
                views={
                  <div
                    className="view-switch search-views"
                    role="group"
                    aria-label="Show search results as"
                  >
                    <NavLink
                      href={referencePath({
                        kind: 'search',
                        q: searchQuery.trim() || undefined,
                        mode: searchMode === 'names' ? 'names' : undefined,
                      })}
                      onOpen={() => window.scrollTo(0, 0)}
                      aria-current="page"
                    >
                      List
                    </NavLink>
                    <NavLink
                      href={referencePath({
                        kind: 'explore',
                        q: searchQuery.trim() || undefined,
                        view: 'timeline',
                      })}
                      onOpen={() =>
                        afterRecords(() => openSearchView('timeline'))
                      }
                    >
                      Timeline
                    </NavLink>
                    <NavLink
                      href={referencePath({
                        kind: 'explore',
                        q: searchQuery.trim() || undefined,
                      })}
                      onOpen={() => afterRecords(() => openSearchView('map'))}
                    >
                      Map
                    </NavLink>
                  </div>
                }
                source={searchSource()}
                query={searchQuery}
                onQuery={setSearchQuery}
                mode={searchMode}
                onMode={setSearchMode}
                selectedClaimId={claimId}
                onClaim={(id) => afterRecords(() => selectClaim(id))}
                onEntity={(id) =>
                  afterRecords(() => selectEntity(id), pages.Dossier.preload)
                }
                onPage={(id) =>
                  afterRecords(
                    () => openEntity(id),
                    () =>
                      Promise.all([
                        pages.PersonPage.preload(),
                        pages.DocumentPage.preload(),
                      ]),
                  )
                }
                onPagePath={(path) =>
                  afterRecords(
                    () => openPage(path),
                    () => preloadPage(path),
                  )
                }
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Search guide">
                <h2>How search works</h2>
                <p>
                  A term matches the beginning of a word. Case, accents, hyphens
                  and apostrophes are ignored, so ASL-3 also finds “ASL 3” and
                  “Anthropic’s” also finds “Anthropics”. Put a phrase in
                  quotation marks to keep its words together. A record matches
                  only if it contains every term.
                </p>
                <p>
                  Select a claim or passage to open its claim here, with the
                  qualification, every source passage and when it was checked. A
                  passage can support a claim, contradict it or give context.
                  The Evidence Inspector shows which.
                </p>
                <p>
                  Search covers only the records selected for Selekoa. No match
                  is a gap in coverage. It does not show that something did not
                  happen.
                </p>
              </aside>
            )}
          </div>
        ) : documentsOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="documents" tabIndex={-1}>
              <DocumentHistory
                history={frameworkHistory()}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                onCompare={() => openCompare()}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a date, a “Replaces” link, a change or a provision to
                  open its claim here. The panel shows the qualification, the
                  source passage, where it sits in the source and when it was
                  checked. Close the panel to return to your place.
                </p>
                <p>
                  Effective, revision and publication dates are kept apart. A
                  missing date or change has not been recorded. It does not mean
                  that nothing happened.
                </p>
              </aside>
            )}
          </div>
        ) : compareOpen && compareId === modelCardsId ? (
          <div className="cmp-layout">
            <main className="reading-main" id="compare" tabIndex={-1}>
              <ModelCards
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                facet={compareFacet}
                onFacet={setCompareFacet}
                developer={compareDeveloper}
                onDeveloper={setCompareDeveloper}
                onEditions={(editions) =>
                  openCompare(undefined, undefined, undefined, editions)
                }
              />
            </main>
            {claimId && <div className="cmp-drawer">{readingInspector}</div>}
          </div>
        ) : compareOpen && compareId === lawsComparedId ? (
          <div className="cmp-layout">
            <main className="reading-main" id="compare" tabIndex={-1}>
              <LawsCompared
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                facet={compareFacet}
                onFacet={setCompareFacet}
                editions={compareEditions}
                onEditions={setCompareEditions}
                onFrameworks={() => openCompare()}
              />
            </main>
            {claimId && <div className="cmp-drawer">{readingInspector}</div>}
          </div>
        ) : compareOpen ? (
          <div className="cmp-layout">
            <main className="reading-main" id="compare" tabIndex={-1}>
              <FrameworkComparison
                view={comparisonPage()}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                facet={compareFacet}
                onFacet={(facet) => {
                  // A question's page shows every framework: opening one
                  // clears the side-by-side choice, as its address does.
                  if (facet) setCompareFrameworks(null);
                  setCompareFacet(facet);
                }}
                editions={compareEditions}
                onEditions={setCompareEditions}
                frameworks={compareFrameworks}
                onFrameworks={setCompareFrameworks}
                onCards={(developer) =>
                  openCompare(undefined, modelCardsId, developer)
                }
                onLaws={() => openCompare(undefined, lawsComparedId)}
              />
            </main>
            {/* A cell's record opens in a drawer over the table; Escape or
                Close returns to the cell. */}
            {claimId && <div className="cmp-drawer">{readingInspector}</div>}
          </div>
        ) : timelines ? (
          <div className="timelines-layout">
            <main className="reading-main" id="control" tabIndex={-1}>
              <ControlTimelines
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onControl={openControl}
                onDossier={(id) => openDossier(id)}
              />
            </main>
            {claimId &&
              (inlineSlot ? (
                readingInspector
              ) : (
                <div className="timelines-drawer">{readingInspector}</div>
              ))}
          </div>
        ) : structure ? (
          <div className="reading-layout">
            <main className="reading-main" id="control" tabIndex={-1}>
              <ControlStructure
                key={structure.collection.id}
                structure={structure}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                others={[
                  ...controlStructures
                    .filter((c) => c.id !== structure.collection.id)
                    .map((c) => ({ id: c.id, title: c.title })),
                  { id: controlTimelinesId, title: controlTimelinesTitle },
                ]}
                onOther={openControl}
                onCommitments={openCommitments}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select any row to open its claim here, with its instrument,
                  stage, qualification, source passage and check date. Close the
                  panel to return to your place.
                </p>
                <p>
                  Announced, agreed and effective arrangements are separate
                  records, each with its own date. A control right is not an
                  ownership share. Rows are never joined into an inferred chain
                  of control.
                </p>
              </aside>
            )}
          </div>
        ) : commitmentsOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="commitments" tabIndex={-1}>
              <Commitments
                view={commitmentsPage()}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                controls={controlStructures.map((c) => ({
                  id: c.id,
                  title: c.title,
                }))}
                onControl={openControl}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select any cell or row to open its claim here, with its date
                  basis, scope, qualification and source passage. Close the
                  panel to return to your place.
                </p>
                <p>
                  Announcing an intent to sign, signing and appearing on a
                  published list are recorded as separate stages. A commitment
                  or legal duty is never evidence of compliance. When a
                  framework says it fulfils one, that is the framework’s own
                  claim.
                </p>
              </aside>
            )}
          </div>
        ) : guidePage ? (
          <div className="reading-layout">
            <main className="reading-main" id="guide" tabIndex={-1}>
              <FrameworksLaw
                key={guidePage.collection.id}
                view={guidePage}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                onCompare={() => openCompare()}
                onLaws={() => openCompare(undefined, lawsComparedId)}
                onDocuments={openDocuments}
                onCommitments={openCommitments}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a date, a standing, a link or a provision to open its
                  claim here, with the qualification, the source passage, where
                  it sits in the source and when it was checked. Close the panel
                  to return to your place.
                </p>
                <p>
                  Each text’s standing describes its form and recorded stage,
                  not its legal effect. A framework’s statement that it complies
                  with or serves under a law is the framework’s own claim. The
                  page records no cause or influence between texts.
                </p>
              </aside>
            )}
          </div>
        ) : changesPage ? (
          <div className="reading-layout">
            <main className="reading-main" id="guide" tabIndex={-1}>
              <FrameworkChanges
                key={changesPage.collection.id}
                view={changesPage}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                onCompare={(facet) => {
                  openCompare();
                  if (facet) setCompareFacet(facet);
                }}
                onDocuments={openDocuments}
                onGuide={openGuide}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a status, a step or a passage to open its record here,
                  with the qualification, the source passage, where it sits in
                  the edition and when it was checked. Close the panel to return
                  to your place.
                </p>
                <p>
                  A difference is between two editions’ recorded cells. The page
                  gives no reason for it, and a framework’s text is never
                  evidence of what a developer did.
                </p>
              </aside>
            )}
          </div>
        ) : computePage ? (
          <div className="reading-layout">
            <main className="reading-main" id="guide" tabIndex={-1}>
              <ComputeBuildout
                key={computePage.collection.id}
                view={computePage}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onPropositions={openPropositions}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a row, a figure or a stated date to open its record
                  here, with the qualification, the source passage, where it
                  sits in the source and when it was checked. Close the panel to
                  return to your place.
                </p>
                <p>
                  An announcement or an agreement records what a party stated.
                  It does not show that anything was built, delivered or paid
                  for.
                </p>
              </aside>
            )}
          </div>
        ) : yearOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="chronicle" tabIndex={-1}>
              <Chronicle
                key={yearId ?? 'years'}
                page={yearPage}
                data={records.data}
                index={chronicleIndexOf(records.data)}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onClaimPage={openClaimPage}
                onEntity={openRecord}
                onYear={openYear}
                onCollectionRow={(collection, claim) =>
                  openInCollection('propositions', collection, claim)
                }
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                {yearPage ? (
                  <>
                    <h2>Inspect any record</h2>
                    <p>
                      Select a record’s statement to open its claim here, with
                      the source passage, where it sits in the source and when
                      it was checked. Close the panel to return to your place.
                    </p>
                  </>
                ) : (
                  <h2>Reading the years</h2>
                )}
                <p>
                  The records are listed by the dates their sources give. Their
                  order in a year records no connection between them.
                </p>
              </aside>
            )}
          </div>
        ) : predictionsOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="predictions" tabIndex={-1}>
              <Predictions
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onYear={(year: string) => openYear(year)}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a point on the chart or a row in the table to open its
                  record here, with the source passage, where it sits in the
                  source and when it was checked. Close the panel to return to
                  your place.
                </p>
                <p>
                  Each record gives what a text states and when. It says nothing
                  about whether the predicted event happened.
                </p>
              </aside>
            )}
          </div>
        ) : stancesOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="propositions" tabIndex={-1}>
              <PropositionStances
                key={propositionsId}
                collectionId={propositionsId || null}
                summary={summary}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                onAction={perform}
                focus={propositionFocus}
                onFocused={() => setPropositionFocus(null)}
              />
            </main>
            {claimId && readingInspector}
          </div>
        ) : propositionsPage ? (
          <div className="reading-layout">
            <main className="reading-main" id="propositions" tabIndex={-1}>
              <Propositions
                key={propositionsPage.id}
                frame={propositionsPage}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                onProposition={openProposition}
                focus={propositionFocus}
                onFocused={() => setPropositionFocus(null)}
                onAction={perform}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a record or a headline to open its claim here, with the
                  source passage, where it sits in the source and when it was
                  checked. Close the panel to return to your place.
                </p>
                <p>
                  Each record relates one text to one proposition. Texts are
                  listed in date order; the order records no influence between
                  them. “Earliest located” means the earliest text the searches
                  found.
                </p>
              </aside>
            )}
          </div>
        ) : starterView ? (
          <div className="reading-layout">
            <main className="reading-main" id="question" tabIndex={-1}>
              <QuestionStarter
                key={starterView.definition.id}
                view={starterView}
                section={starterSection}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                onDocuments={openDocuments}
                onCommitments={openCommitments}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select a record to open its claim here, with the source
                  passage, where it sits in the source and when it was checked.
                  Each row also links to the original source. Close the panel to
                  return to your place.
                </p>
                <p>
                  The page lists existing records under the question. It adds no
                  claim and draws no conclusion. A framework’s statement that it
                  fulfils or complies with a text is the framework’s own claim.
                </p>
              </aside>
            )}
          </div>
        ) : pathOpen && path ? (
          <div className="reading-layout">
            <main className="reading-main" id="question" tabIndex={-1}>
              <ResearchPath
                path={path}
                repository={repository}
                claimId={
                  bookmark?.questionId === path.id ? bookmark.claimId : null
                }
                onStep={(id) => {
                  setBookmark({ questionId: path.id, claimId: id });
                  setClaimId(null);
                }}
                onClaim={selectClaim}
                onDossier={
                  path.institution ? () => setView('dossier') : undefined
                }
                onMap={path.institution ? () => setView('map') : undefined}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Follow the evidence</h2>
                <p>
                  The main records come first. Optional branches add documentary
                  context. The record you last focused or opened is bookmarked,
                  and Resume brings you back to it from any other page.
                </p>
                <p>
                  An event is a dated action. A snapshot is one dated report of
                  a state. An interval keeps only the start and end its source
                  states. Undated records are not placed in the sequence.
                </p>
                <p>
                  A machine selected these records and wrote the connecting
                  text.
                </p>
              </aside>
            )}
          </div>
        ) : claimPageOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="claim-page" tabIndex={-1}>
              <ClaimPage
                key={claimPage!.id}
                claim={claimPage!}
                repository={repository}
                collections={claimCollections}
                onEntity={openRecord}
                onExplore={() => {
                  setFilters((f) => ({ ...f, focusId: claimPage!.subject }));
                  setView('claims');
                }}
              />
            </main>
            {readingInspector}
          </div>
        ) : recordOpen ? (
          <div className="reading-layout">
            <main className="reading-main" id="record-page" tabIndex={-1}>
              {profile ? (
                <PersonPage
                  key={profile.person.id}
                  profile={profile}
                  repository={repository}
                  selectedClaimId={claimId}
                  onClaim={selectClaim}
                  onEntity={openEntity}
                  onExplore={() => selectEntity(profile.person.id)}
                  onCollection={perform}
                  resume={resume}
                  theme={theme}
                />
              ) : (
                record && (
                  <DocumentPage
                    key={record.document.id}
                    record={record}
                    repository={repository}
                    selectedClaimId={claimId}
                    onClaim={selectClaim}
                    onEntity={openEntity}
                    onExplore={() => selectEntity(record.document.id)}
                    onProposition={openProposition}
                    onCollection={perform}
                    onCollectionRow={(id, claim) =>
                      openInCollection('propositions', id, claim)
                    }
                    onHistory={
                      record.family &&
                      frontierSafetyFrameworks.families.includes(
                        record.family.family,
                      )
                        ? openDocuments
                        : undefined
                    }
                    resume={resume}
                  />
                )
              )}
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Reading guide">
                <h2>Inspect any record</h2>
                <p>
                  Select any row to open its claim here, with its qualification,
                  source passage, location in the source and check date. Close
                  the panel to return to your place.
                </p>
                <p>
                  {profile
                    ? 'Each date keeps its kind and precision. A snapshot is one dated report, and a missing end date means the end is unknown. This page does not infer moves between institutions.'
                    : 'Publication, effective and revision dates are kept apart. A relation that is not listed has not been recorded. It may still exist.'}
                </p>
              </aside>
            )}
          </div>
        ) : (
          <>
            <section className="intro" aria-label="About this research sample">
              <div>
                <span className="eyebrow">Record explorer</span>
                {/* A dossier's or a record's name is the page's main heading. */}
                {focusEntity ? (
                  <p className="intro-title">Explore the documentary record</p>
                ) : (
                  <h1>Explore the documentary record</h1>
                )}
              </div>
              <p>
                Every claim links to its source passage,
                <br />
                its dates where known and its limits.
              </p>
            </section>
            <main className="workspace" id="explorer" tabIndex={-1}>
              <nav className="sidebar" aria-label="Explore the dataset">
                <label className="eyebrow" htmlFor="entity-search">
                  Search by name
                </label>
                <div className="search-box">
                  <span aria-hidden="true">⌕</span>
                  <input
                    id="entity-search"
                    readOnly={!live}
                    ref={searchRef}
                    type="search"
                    placeholder="Name or alias…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setQuery('');
                      if (e.key === 'Enter' && results.length === 1)
                        selectEntity(results[0].id);
                    }}
                    autoComplete="off"
                    aria-controls={query.trim() ? 'search-results' : undefined}
                  />
                </div>
                {query.trim() && (
                  <div
                    className="search-results"
                    id="search-results"
                    aria-label="Search results"
                  >
                    <p role="status">
                      {results.length
                        ? `${results.length} ${results.length === 1 ? 'record matches' : 'records match'} by name or alias`
                        : `No name or alias matches “${query.trim()}”.`}
                    </p>
                    {results.map((e) => (
                      <div className="search-result" key={e.id}>
                        <button onClick={() => selectEntity(e.id)}>
                          {e.name}
                          <small>{entityStyle[e.type].label}</small>
                        </button>
                        {hasPage(e.id) && (
                          <NavLink
                            className="search-page-link"
                            href={recordHref(e.id)!}
                            onOpen={() => openEntity(e.id)}
                            aria-label={`${e.name}: ${e.type} page`}
                          >
                            {e.type === 'person'
                              ? 'Person page'
                              : 'Document page'}{' '}
                            →
                          </NavLink>
                        )}
                      </div>
                    ))}
                    {!results.length && (
                      <p>Try a name such as MIRI or Anthropic.</p>
                    )}
                    <button
                      className="text-button search-everything"
                      onClick={() => openSearch(query.trim())}
                    >
                      Search claims, passages and sources for “{query.trim()}” →
                    </button>
                  </div>
                )}
                <span className="eyebrow rail-label">Browse by topic</span>
                <div className="view-nav">
                  {(['all', ...topics] as const).map((topic) => (
                    <button
                      key={topic}
                      onClick={() => changeTopic(topic)}
                      aria-current={
                        filters.topic === topic && !focusEntity
                          ? 'page'
                          : undefined
                      }
                    >
                      <span>{topicLabels[topic]}</span>
                      <span className="nav-count">
                        {topic === 'all'
                          ? facts.explorable
                          : (facts.topics[topic] ?? 0)}
                      </span>
                    </button>
                  ))}
                </div>
                <span className="eyebrow rail-label">Core institutions</span>
                <div className="anchor-nav">
                  {repository.data.meta.anchors.map((id) => (
                    <button
                      key={id}
                      onClick={() => selectEntity(id)}
                      aria-pressed={filters.focusId === id}
                    >
                      <span className="anchor-dot" aria-hidden="true" />
                      {repository.entities.get(id)!.name}
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
                <span className="eyebrow rail-label">Document histories</span>
                <div className="anchor-nav">
                  <NavLink
                    href={referencePath({
                      kind: 'documents',
                      id: frontierSafetyFrameworks.id,
                    })}
                    onOpen={openDocuments}
                  >
                    {frontierSafetyFrameworks.title}
                    <span aria-hidden="true">↗</span>
                  </NavLink>
                </div>
                <details className="collection-nav">
                  <summary>Chinese AI histories</summary>
                  <p className="small-note">
                    Selected institutional histories, grouped here for
                    navigation. The grouping implies no shared ownership,
                    strategy or lineage.
                  </p>
                  <div className="anchor-nav">
                    {chineseHistories.map(([id, label]) => (
                      <NavLink
                        key={id}
                        href={referencePath({ kind: 'dossier', id })}
                        aria-current={
                          filters.focusId === id ? 'page' : undefined
                        }
                        onOpen={() => openDossier(id)}
                      >
                        {label} <span aria-hidden="true">↗</span>
                      </NavLink>
                    ))}
                  </div>
                </details>
                <div className="rail-footnote">
                  <span className="eyebrow">Coverage is selective</span>
                  <p>
                    Selected records
                    <br />
                    <strong>1965–{latestYear}</strong>
                    {scheduledYears && (
                      <>
                        <br />
                        Dates after the latest check are scheduled dates
                      </>
                    )}
                  </p>
                  <p>
                    Latest source check
                    <br />
                    {latestCheck}
                  </p>
                </div>
              </nav>
              <section
                className="exploration"
                aria-label="Relationship explorer"
              >
                {linkNotice && (
                  <div className="reference-notice" role="status">
                    <p>{linkNotice}</p>
                    <button onClick={() => setLinkNotice(null)}>
                      Dismiss notice
                    </button>
                  </div>
                )}
                {exploreQuery.trim() && !projectionOpen && (
                  <div className="explore-query" role="status">
                    <p>{searchCoverage}</p>
                    <NavLink
                      className="text-button"
                      href={referencePath({
                        kind: 'search',
                        q: exploreQuery.trim(),
                      })}
                      onOpen={() => openSearch(exploreQuery.trim())}
                    >
                      Back to the list of results
                    </NavLink>
                    <button
                      className="text-button"
                      onClick={() => setExploreQuery('')}
                    >
                      Show all records
                    </button>
                  </div>
                )}
                <div className="exploration-heading">
                  <div>
                    <div className="eyebrow">
                      {projectionOpen
                        ? pathOpen
                          ? 'Guided reading'
                          : 'Institutional dossier'
                        : focusEntity
                          ? 'Direct connections'
                          : exploreQuery.trim()
                            ? 'Search results'
                            : 'All records'}
                    </div>
                    <HeadingTag>
                      {focusEntity
                        ? focusEntity.name
                        : pathOpen && path
                          ? path.title
                          : exploreQuery.trim()
                            ? `Search: ${exploreQuery.trim()}`
                            : topicLabels[filters.topic]}
                    </HeadingTag>
                  </div>
                  <div
                    className="view-switch"
                    role="group"
                    aria-label="Display mode"
                  >
                    {dossier && (
                      <button
                        onClick={() => setView('dossier')}
                        aria-pressed={dossierOpen}
                      >
                        Dossier
                      </button>
                    )}
                    {(['map', 'claims', 'timeline'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() =>
                          mode === 'map' ? showMap() : setView(mode)
                        }
                        aria-pressed={view === mode}
                      >
                        {mode[0].toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="view-description">
                  {projectionOpen
                    ? 'Built from the same claims and evidence as the map.'
                    : focusEntity
                      ? 'Only claims that connect directly to this record. Select another name to move on.'
                      : !(pathOpen && path) && exploreQuery.trim()
                        ? 'Records matching your search. Choose a record to see its direct connections.'
                        : topicNotes[filters.topic]}
                </p>
                {resume}
                {!projectionOpen && (
                  <>
                    <div className="filters">
                      {filters.topic === 'governance' && (
                        <label>
                          Framework family{' '}
                          <select
                            disabled={!live}
                            aria-label="Framework family"
                            value={filters.frameworkFamily ?? ''}
                            onChange={(e) => selectFamily(e.target.value)}
                          >
                            <option value="">All frameworks</option>
                            {Object.entries(frameworkLabels).map(
                              ([id, label]) => (
                                <option key={id} value={id}>
                                  {label}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                      )}
                      <label>
                        Through year{' '}
                        <select
                          disabled={!live}
                          aria-label="Records through year"
                          value={filters.throughYear}
                          onChange={(e) => {
                            setFilters((f) => ({
                              ...f,
                              throughYear: Number(e.target.value),
                            }));
                            setClaimId(null);
                          }}
                        >
                          <option value={latestYear}>
                            {latestYear} · all records
                            {scheduledYears && ', including scheduled dates'}
                          </option>
                          {years.slice(1).map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Show{' '}
                        <select
                          disabled={!live}
                          aria-label="Record type"
                          value={filters.entityType}
                          onChange={(e) => {
                            setFilters((f) => ({
                              ...f,
                              entityType: e.target
                                .value as Filters['entityType'],
                            }));
                            setClaimId(null);
                          }}
                        >
                          <option value="structural">
                            Organisations and infrastructure
                          </option>
                          <option value="all">All types</option>
                          {entityTypes.map((t) => (
                            <option key={t} value={t}>
                              {entityStyle[t].label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        className="text-button reset-filters"
                        onClick={reset}
                      >
                        Reset filters
                      </button>
                    </div>
                    <p className="result-count" role="status">
                      {/* Counted and drawn by their relations alone. */}
                      {selected('entities', visible.entities).length} people,
                      organisations and other records ·{' '}
                      {
                        selected('claims', visible.claims).filter(
                          (c) => c.object.kind === 'entity',
                        ).length
                      }{' '}
                      relationships
                      {visible.claims.some((c) => c.object.kind === 'literal')
                        ? ` · ${visible.claims.filter((c) => c.object.kind === 'literal').length} claim${visible.claims.filter((c) => c.object.kind === 'literal').length === 1 ? '' : 's'} about a value`
                        : ''}
                      <span>
                        Everything recorded up to the chosen year, whether or
                        not still in effect · Undated records included
                      </span>
                    </p>
                  </>
                )}
                {dossierOpen && dossier ? (
                  <Dossier
                    key={dossier.institution.id}
                    dossier={dossier}
                    path={dossierPath}
                    onRead={() => dossierPath && openQuestion(dossierPath.id)}
                    control={(() => {
                      const c = controlStructures.find(
                        (s) => s.organisationId === dossier.institution.id,
                      );
                      return c
                        ? {
                            title: c.title,
                            href: referencePath({ kind: 'control', id: c.id }),
                            onOpen: () => openControl(c.id),
                          }
                        : undefined;
                    })()}
                    timelines={
                      timelineOrganisations.has(dossier.institution.id)
                        ? {
                            title: controlTimelinesTitle,
                            href: referencePath({
                              kind: 'control',
                              id: controlTimelinesId,
                            }),
                            onOpen: () => openControl(controlTimelinesId),
                          }
                        : undefined
                    }
                    onRecordPage={openEntity}
                    repository={repository}
                    selectedClaimId={claimId}
                    onClaim={selectClaim}
                    onInstitution={selectEntity}
                  />
                ) : view === 'map' && !mapWithheld ? (
                  <>
                    <Suspense
                      fallback={
                        <div className="network-wrap">
                          <p className="graph-notice">
                            Loading the relationship map…
                          </p>
                        </div>
                      }
                    >
                      <Network
                        entities={visible.entities}
                        claims={visible.claims}
                        records={repository.data}
                        anchors={repository.data.meta.anchors}
                        focusId={focusEntityId}
                        selectedClaimId={claimId}
                        onEntity={selectEntity}
                        onClaim={selectClaim}
                        theme={theme}
                      />
                    </Suspense>
                    <div className="map-caption">
                      <div className="legend" aria-label="Entity type legend">
                        {entityTypes.map((type) => (
                          <span key={type}>
                            <EntitySymbol type={type} />
                            {entityStyle[type].label}
                          </span>
                        ))}
                      </div>
                      <p>
                        Arrows point from subject to object. Distance and
                        position carry no meaning.
                      </p>
                      {literalClaims > 0 && (
                        <p className="map-undrawn">
                          The map cannot draw{' '}
                          {plural(literalClaims, 'claim', 'claims')} about a
                          value, such as an amount or a quoted provision, since
                          {literalClaims === 1
                            ? ' it connects'
                            : ' they connect'}{' '}
                          to no second record. The Timeline and the list show{' '}
                          {literalClaims === 1 ? 'it' : 'them'}.
                        </p>
                      )}
                      <button
                        className="text-button"
                        onClick={() => setView('claims')}
                      >
                        Browse all {visible.claims.length} claims as a list →
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    className={`record-list ${view}`}
                    aria-label={
                      // An empty list in a built page needs no name.
                      !listed
                        ? undefined
                        : view === 'timeline'
                          ? 'Chronological claims'
                          : 'Claims list'
                    }
                  >
                    {view === 'map' && (
                      <p className="map-withheld" role="status">
                        {mapWithheld === 'unnarrowed'
                          ? 'The map is drawn for a search, a topic or an institution. Search or choose one to see its map.'
                          : `${visibleSize.records} records and ${visibleSize.relationships} relationships match, too many for a readable map. Narrow the search or the filters, or choose an institution, to see its map.`}
                      </p>
                    )}
                    {view === 'timeline' && (
                      <p className="timeline-note">
                        Events, snapshots and intervals in date order. Undated
                        records come last. Only selected records are included.
                      </p>
                    )}
                    {!listed ? null : visible.claims.length ? (
                      (view === 'timeline' ? timeline : visible.claims).map(
                        (c) => (
                          <div key={c.id} className="list-record">
                            {view === 'timeline' && (
                              <span className="timeline-date">
                                {timeLabel(c, repository.data)}
                              </span>
                            )}
                            <ClaimButton
                              claim={c}
                              repository={repository}
                              onSelect={selectClaim}
                              selected={claimId === c.id}
                            />
                          </div>
                        ),
                      )
                    ) : (
                      <p className="empty-note">
                        {filters.focusId &&
                        repository.entities.get(filters.focusId)
                          ?.proposition ? (
                          <>
                            The explorer does not show propositions. Their
                            records are listed on the collection page.{' '}
                            <button
                              className="text-button"
                              onClick={() => openProposition(filters.focusId!)}
                            >
                              Open this proposition on its collection page →
                            </button>
                          </>
                        ) : (
                          'No claims match these filters. Reset the filters to start again.'
                        )}
                      </p>
                    )}
                  </div>
                )}
              </section>
              {projectionOpen && !claimId ? (
                <aside
                  className="inspector dossier-guide"
                  aria-label="Dossier reading guide"
                >
                  <span className="eyebrow">Dossier guide</span>
                  <h2>
                    {pathOpen ? 'Follow the evidence' : 'Reading this dossier'}
                  </h2>
                  <p>
                    {pathOpen
                      ? 'The main records come first. Optional branches add documentary context. The record you last focused or opened is bookmarked, and Resume brings you back to it from the dossier, the map or another record.'
                      : 'Start with the chronology, then read the other sections. Each section groups existing claims and adds no statement of its own.'}
                  </p>
                  <h3 className="section-heading">Dates</h3>
                  <p>
                    An event is a dated action. A snapshot is one dated report
                    of a state. An interval keeps only the start and end its
                    source states. Undated records are not placed in the
                    sequence.
                  </p>
                  <h3 className="section-heading">Editorial status</h3>
                  <p>
                    {pathOpen
                      ? 'A machine selected these records.'
                      : 'This dossier groups records automatically.'}{' '}
                    Each claim shows its own editorial status and evidence
                    checks.
                  </p>
                  <h3 className="section-heading">Inspect any statement</h3>
                  <p>
                    Select a statement to open its evidence here. Closing the
                    panel returns focus to the statement.
                  </p>
                </aside>
              ) : inlineSlot ? (
                readingInspector
              ) : (
                <Inspector
                  repository={repository}
                  claimId={claimId}
                  entityId={filters.focusId}
                  visibleClaims={visible.claims}
                  onClaim={selectClaim}
                  onEntity={openRecord}
                  onPage={openRecord}
                  onClose={closeInspector}
                  onTopic={changeTopic}
                  onFamily={selectFamily}
                  onYear={openYear}
                />
              )}
            </main>
          </>
        )}
      </Suspense>
      <SiteFooter
        onAbout={() => afterRecords(openAbout, pages.About.preload)}
      />
    </RecordHref.Provider>
  );
}
