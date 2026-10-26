import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import summary from 'virtual:landing-summary';
import { repository } from './domain/repository';
import {
  dateOf,
  isPropositionRecord,
  mapReadable,
  mapSize,
  queryDataset,
  timeLabel,
  type Filters,
} from './domain/query';
import { createSearchIndex, searchRecords } from './domain/search';
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
  referenceHash,
  resolveReference,
  type HubId,
} from './domain/deep-links';
import { documentHistory } from './domain/document-history';
import { frontierSafetyFrameworks } from './reading/frontier-safety-frameworks';
import { controlStructure } from './domain/control-structures';
import { commitmentsView } from './domain/commitments';
import { controlStructures } from './reading/control-structures';
import { externalCommitments } from './reading/commitments';
import { questionStarters } from './reading/self-governance';
import { questionStarterView } from './domain/question-starter';
import { propositionsView } from './domain/propositions';
import { propositionCollections } from './reading/human-thought';
import { chineseHistories } from './domain/landing';
import { Landing } from './ui/Landing';
import { HubPage } from './ui/Hub';
import {
  SiteFooter,
  SiteHeader,
  SkipLink,
  type NavTarget,
  type StartAction,
} from './ui/SiteChrome';

// Each page loads its code the first time it opens.
const Network = lazy(() =>
  import('./ui/Network').then((module) => ({ default: module.Network })),
);
const Dossier = lazy(() =>
  import('./ui/Dossier').then((module) => ({ default: module.Dossier })),
);
const ResearchPath = lazy(() =>
  import('./ui/ResearchPath').then((module) => ({
    default: module.ResearchPath,
  })),
);
const PersonPage = lazy(() =>
  import('./ui/PersonPage').then((module) => ({ default: module.PersonPage })),
);
const DocumentPage = lazy(() =>
  import('./ui/DocumentPage').then((module) => ({
    default: module.DocumentPage,
  })),
);
const DocumentHistory = lazy(() =>
  import('./ui/DocumentHistory').then((module) => ({
    default: module.DocumentHistory,
  })),
);
const ControlStructure = lazy(() =>
  import('./ui/ControlStructure').then((module) => ({
    default: module.ControlStructure,
  })),
);
const Commitments = lazy(() =>
  import('./ui/Commitments').then((module) => ({
    default: module.Commitments,
  })),
);
const Propositions = lazy(() =>
  import('./ui/Propositions').then((module) => ({
    default: module.Propositions,
  })),
);
const QuestionStarter = lazy(() =>
  import('./ui/QuestionStarter').then((module) => ({
    default: module.QuestionStarter,
  })),
);
const About = lazy(() =>
  import('./ui/About').then((module) => ({ default: module.About })),
);
const Search = lazy(() =>
  import('./ui/Search').then((module) => ({ default: module.Search })),
);

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

/** The claims the explorer and its map show; proposition records have their own page. */
const explorable = repository.data.claims.filter(
  (c) => !isPropositionRecord(c),
);
const years = [
  ...new Set(
    explorable
      .map(dateOf)
      .filter((d): d is string => Boolean(d))
      .map((d) => Number(d.slice(0, 4))),
  ),
].sort((a, b) => b - a);
const latestYear = years[0];
const datasetStatus = summary.status;
/** Computed on first use, so a page pays only for what it shows. */
const once = <T,>(make: () => T) => {
  let value: T | undefined;
  return () => (value ??= make());
};
const frameworkHistory = once(() =>
  documentHistory(repository.data, frontierSafetyFrameworks),
);
const controlViews = once(
  () =>
    new Map(
      controlStructures.map((c) => [
        c.id,
        controlStructure(repository.data, c),
      ]),
    ),
);
const commitmentsPage = once(() =>
  commitmentsView(repository.data, externalCommitments),
);
const propositionPages = once(
  () =>
    new Map(
      propositionCollections.map((c) => [
        c.id,
        propositionsView(repository.data, c),
      ]),
    ),
);
const starterViews = once(
  () =>
    new Map(
      questionStarters.map((d) => [
        d.id,
        questionStarterView(repository.data, d),
      ]),
    ),
);
const searchIndex = once(() => createSearchIndex(repository.data));

type View =
  | 'home'
  | 'hub'
  | 'about'
  | 'map'
  | 'claims'
  | 'timeline'
  | 'dossier'
  | 'path'
  | 'starter'
  | 'documents'
  | 'control'
  | 'commitments'
  | 'propositions'
  | 'person'
  | 'document'
  | 'search';
type Bookmark = { questionId: string; claimId: string };
const isQuestion = (kind?: string) => kind === 'reading' || kind === 'question';
/** People and documents open their reading pages; other entities explore. */
const hasPage = (id: string) => {
  const type = repository.entities.get(id)?.type;
  return type === 'person' || type === 'document';
};

function locationState() {
  const { target, notice } = resolveReference(
    window.location.hash,
    repository.data,
  );
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
              ? 'dossier'
              : target?.kind === 'documents'
                ? 'documents'
                : target?.kind === 'control'
                  ? 'control'
                  : target?.kind === 'commitments'
                    ? 'commitments'
                    : target?.kind === 'propositions'
                      ? 'propositions'
                      : target?.kind === 'person'
                        ? 'person'
                        : target?.kind === 'document'
                          ? 'document'
                          : target?.kind === 'claim'
                            ? 'claims'
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
    controlId: target?.kind === 'control' ? target.id : null,
    propositionsId: target?.kind === 'propositions' ? target.id : null,
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
  theme,
  onTheme,
  start,
}: {
  theme: 'light' | 'dark';
  onTheme: (theme: 'light' | 'dark') => void;
  /** A start-page link followed before the records had loaded. */
  start: StartAction | null;
}) {
  const [initial] = useState(locationState);
  const [linkNotice, setLinkNotice] = useState(initial.notice);
  const [filters, setFilters] = useState<Filters>({
    topic: 'all',
    throughYear: latestYear,
    entityType: 'structural',
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
  const [propositionsId, setPropositionsId] = useState<string | null>(
    initial.propositionsId,
  );
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
  useEffect(() => {
    const restore = () => {
      const next = locationState();
      setLinkNotice(next.notice);
      setFilters({
        topic: 'all',
        throughYear: latestYear,
        entityType: 'all',
        focusId: next.focusId,
      });
      setView(next.view);
      setClaimId(next.claimId);
      setBookmark(next.bookmark);
      setQuestionId(next.questionId);
      setControlId(next.controlId);
      setPropositionsId(next.propositionsId);
      setStarterId(next.starterId);
      setStarterSection(next.starterSection);
      setSearchQuery(next.searchQuery);
      setSearchMode(next.searchMode);
      setHubId(next.hubId);
      setExploreQuery(next.exploreQuery);
      setQuery('');
    };
    window.addEventListener('hashchange', restore);
    window.addEventListener('popstate', restore);
    return () => {
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('popstate', restore);
    };
  }, []);
  const claimReturnScroll = useRef<number | null>(null);
  const claimTrigger = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const visible = useMemo(() => {
    const all = queryDataset(repository.data, filters);
    if (!exploreQuery.trim()) return all;
    // The timeline and map of a search show the claims it found: claims and
    // passages that match, and claims about a matching record.
    const hits = searchRecords(searchIndex(), exploreQuery).groups.flatMap(
      (g) => g.hits,
    );
    const ids = new Set(hits.flatMap((h) => (h.claimId ? [h.claimId] : [])));
    const matched = new Set(
      hits.filter((h) => h.type === 'entity').map((h) => h.id),
    );
    const claims = all.claims.filter(
      (c) =>
        ids.has(c.id) ||
        matched.has(c.subject) ||
        (c.object.kind === 'entity' && matched.has(c.object.entityId)),
    );
    const used = new Set(
      claims.flatMap((c) => [
        c.subject,
        ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
      ]),
    );
    if (filters.focusId) used.add(filters.focusId);
    return { claims, entities: all.entities.filter((e) => used.has(e.id)) };
  }, [filters, exploreQuery]);
  // The explorer's lookup searches names and aliases only.
  const results = useMemo(
    () =>
      query.trim()
        ? (searchRecords(searchIndex(), query, {
            mode: 'names',
          }).groups[0]?.hits.map((hit) => repository.entities.get(hit.id)!) ??
          [])
        : [],
    [query],
  );
  const focusEntity = filters.focusId
    ? repository.entities.get(filters.focusId)
    : null;
  const focusEntityId = filters.focusId;
  const dossier = useMemo(
    () =>
      filters.focusId
        ? institutionalDossier(repository.data, filters.focusId)
        : null,
    [filters.focusId],
  );
  const dossierOpen = view === 'dossier' && !!dossier;
  /** The question anchored to the focused institution, for dossier exits. */
  const dossierPath = useMemo(
    () =>
      filters.focusId ? researchPath(repository.data, filters.focusId) : null,
    [filters.focusId],
  );
  const path = useMemo(
    () => (questionId ? questionPath(repository.data, questionId) : null),
    [questionId],
  );
  const savedPath = useMemo(
    () =>
      bookmark ? questionPath(repository.data, bookmark.questionId) : null,
    [bookmark],
  );
  const pathOpen = view === 'path' && !!path;
  const documentsOpen = view === 'documents';
  const structure =
    view === 'control' && controlId
      ? (controlViews().get(controlId) ?? null)
      : null;
  const controlOpen = !!structure;
  const commitmentsOpen = view === 'commitments';
  const propositionsPage =
    view === 'propositions' && propositionsId
      ? (propositionPages().get(propositionsId) ?? null)
      : null;
  const propositionsOpen = !!propositionsPage;
  const starterView =
    view === 'starter' && starterId
      ? (starterViews().get(starterId) ?? null)
      : null;
  const starterOpen = !!starterView;
  const profile = useMemo(
    () =>
      view === 'person' && filters.focusId
        ? personProfile(repository.data, filters.focusId)
        : null,
    [view, filters.focusId],
  );
  const record = useMemo(
    () =>
      view === 'document' && filters.focusId
        ? documentRecord(repository.data, filters.focusId)
        : null,
    [view, filters.focusId],
  );
  const recordOpen = !!profile || !!record;
  const projectionOpen =
    dossierOpen ||
    pathOpen ||
    starterOpen ||
    documentsOpen ||
    controlOpen ||
    commitmentsOpen ||
    propositionsOpen;
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
    const target = starterView
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
            : structure
              ? {
                  kind: 'control' as const,
                  id: structure.collection.id,
                  inspect: claimId ?? undefined,
                }
              : commitmentsOpen
                ? {
                    kind: 'commitments' as const,
                    id: externalCommitments.id,
                    inspect: claimId ?? undefined,
                  }
                : propositionsPage
                  ? {
                      kind: 'propositions' as const,
                      id: propositionsPage.collection.id,
                      inspect: claimId ?? undefined,
                    }
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
                                  q: exploreQuery.trim() || undefined,
                                  view:
                                    view === 'timeline'
                                      ? ('timeline' as const)
                                      : undefined,
                                };
    if (linkNotice && (!target || target.kind === 'explore')) return;
    const hash = target ? referenceHash(target) : '';
    if (window.location.hash === hash) return;
    // A different page is a new history entry; a change of inspected claim,
    // section or search query within the same page only normalises the
    // current entry.
    const page = (h: string) => h.split('?')[0];
    const change =
      page(window.location.hash) === page(hash) ? 'replaceState' : 'pushState';
    window.history[change](
      null,
      '',
      window.location.pathname + window.location.search + hash,
    );
  }, [
    starterView,
    starterSection,
    pathOpen,
    path,
    dossierOpen,
    dossier,
    documentsOpen,
    structure,
    commitmentsOpen,
    propositionsPage,
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
  useEffect(() => {
    if (!claimId) return;
    const panel = document.getElementById('inspector');
    panel?.focus({ preventScroll: true });
    if (window.innerWidth <= 940) panel?.scrollIntoView({ block: 'start' });
  }, [claimId]);
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
  const entityTypes = [...new Set(repository.data.entities.map((e) => e.type))];
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
    setView((v) =>
      v === 'path' ||
      v === 'starter' ||
      v === 'documents' ||
      v === 'control' ||
      v === 'commitments' ||
      v === 'propositions' ||
      v === 'person' ||
      v === 'document' ||
      v === 'search'
        ? isInstitution
          ? 'dossier'
          : 'claims'
        : v === 'dossier' && !isInstitution
          ? 'claims'
          : v === 'home' || v === 'hub'
            ? isInstitution
              ? 'dossier'
              : 'map'
            : v,
    );
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
        view === 'path' || view === 'starter' || view === 'propositions'
          ? window.scrollY
          : null;
      claimTrigger.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setClaimId(id);
      requestAnimationFrame(() => {
        const panel = document.getElementById('inspector');
        if (panel) {
          panel.scrollTop = 0;
          panel.focus({ preventScroll: true });
          if (window.innerWidth <= 940)
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
      view === 'propositions' ||
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
  const openPropositions = (id: string) => {
    setLinkNotice(null);
    setFilters((f) => ({ ...f, focusId: null }));
    setPropositionsId(id);
    setClaimId(null);
    setQuery('');
    setView('propositions');
    window.scrollTo(0, 0);
  };
  /** Opens the propositions page at one proposition's section. */
  const openProposition = (propositionId: string) => {
    const collection = propositionCollections.find((c) =>
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
  const navigate = (target: NavTarget) =>
    target === 'home'
      ? goHome()
      : target === 'search'
        ? openSearch()
        : target === 'about'
          ? openAbout()
          : openHub(target);
  const openDossier = (id: string) => {
    selectEntity(id);
    setView('dossier');
  };
  const showHowChecked = () => {
    openAbout();
    // The About page can take a few frames to render after another view.
    const reveal = (frames: number) =>
      requestAnimationFrame(() => {
        const heading = document.getElementById('about-method');
        if (!heading) {
          if (frames > 0) reveal(frames - 1);
          return;
        }
        heading.scrollIntoView({ block: 'start' });
        heading.focus({ preventScroll: true });
      });
    reveal(30);
  };
  const perform = (action: StartAction) =>
    action.kind === 'hub'
      ? openHub(action.id)
      : action.kind === 'documents'
        ? openDocuments()
        : action.kind === 'commitments'
          ? openCommitments()
          : action.kind === 'propositions'
            ? openPropositions(action.id)
            : action.kind === 'control'
              ? openControl(action.id)
              : action.kind === 'reading'
                ? openQuestion(researchPaths[0].id)
                : action.kind === 'question'
                  ? openStarter(action.id)
                  : action.kind === 'dossier'
                    ? openDossier(action.id)
                    : action.kind === 'person'
                      ? openEntity(action.id)
                      : action.kind === 'claim'
                        ? openClaim(action.id)
                        : action.kind === 'search'
                          ? openSearch(action.q ?? '')
                          : action.kind === 'how-checked'
                            ? showHowChecked()
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
    if (claimId) {
      setClaimId(null);
      requestAnimationFrame(() => {
        if (claimTrigger.current?.isConnected) {
          const restoreScroll =
            (view === 'path' ||
              view === 'starter' ||
              view === 'propositions') &&
            claimReturnScroll.current !== null;
          claimTrigger.current.focus({ preventScroll: restoreScroll });
          if (restoreScroll) window.scrollTo(0, claimReturnScroll.current!);
        }
      });
    } else setFilters((f) => ({ ...f, focusId: null }));
  };

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
              : controlOpen
                ? 'control'
                : commitmentsOpen
                  ? 'commitments'
                  : propositionsOpen
                    ? 'propositions'
                    : recordOpen
                      ? 'record-page'
                      : pathOpen || starterOpen
                        ? 'question'
                        : 'explorer';
  const readingPage =
    view === 'home' ||
    view === 'hub' ||
    view === 'about' ||
    view === 'search' ||
    documentsOpen ||
    controlOpen ||
    commitmentsOpen ||
    propositionsOpen ||
    recordOpen ||
    pathOpen ||
    starterOpen;
  const resume =
    bookmark && savedPath && !pathOpen ? (
      <button
        className="path-resume"
        onClick={() => openQuestion(bookmark.questionId, bookmark.claimId)}
      >
        Resume the {savedPath.institution?.name ?? savedPath.title} reading ·{' '}
        {
          savedPath.items[readingPosition(savedPath, bookmark.claimId)].section
            .title
        }
      </button>
    ) : null;
  const readingInspector = (
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
    />
  );
  return (
    <>
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
                : view === 'search' || !readingPage
                  ? 'search'
                  : documentsOpen ||
                      commitmentsOpen ||
                      controlOpen ||
                      starterOpen
                    ? 'governance'
                    : propositionsOpen
                      ? 'ideas'
                      : dossierOpen || pathOpen || profile
                        ? 'institutions'
                        : null
        }
        onNavigate={navigate}
        theme={theme}
        onTheme={onTheme}
        onHowChecked={showHowChecked}
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
              repository={repository}
              status={datasetStatus}
              history={frameworkHistory()}
              commitmentTexts={commitmentsPage().documents.length}
              controlTimelines={controlStructures.length}
              propositionCollections={propositionCollections.length}
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
                    <button aria-pressed="true">List</button>
                    <button onClick={() => openSearchView('timeline')}>
                      Timeline
                    </button>
                    <button onClick={() => openSearchView('map')}>Map</button>
                  </div>
                }
                repository={repository}
                index={searchIndex()}
                query={searchQuery}
                onQuery={setSearchQuery}
                mode={searchMode}
                onMode={setSearchMode}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={selectEntity}
                onPage={openEntity}
              />
            </main>
            {claimId ? (
              readingInspector
            ) : (
              <aside className="reading-aside" aria-label="Search guide">
                <h2>How search works</h2>
                <p>
                  A term matches the beginning of a word. Case, accents and
                  hyphens are ignored, so ASL-3 also finds “ASL 3”. Put a phrase
                  in quotation marks to keep its words together. A record
                  matches only if it contains every term.
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
                others={controlStructures
                  .filter((c) => c.id !== structure.collection.id)
                  .map((c) => ({ id: c.id, title: c.title }))}
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
        ) : propositionsPage ? (
          <div className="reading-layout">
            <main className="reading-main" id="propositions" tabIndex={-1}>
              <Propositions
                key={propositionsPage.collection.id}
                view={propositionsPage}
                repository={repository}
                selectedClaimId={claimId}
                onClaim={selectClaim}
                onEntity={openEntity}
                focus={propositionFocus}
                onFocused={() => setPropositionFocus(null)}
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
                  text. No human review of the selection or framing is recorded.
                </p>
              </aside>
            )}
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
                <h1>Explore the documentary record</h1>
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
                          <button
                            className="search-page-link"
                            onClick={() => openEntity(e.id)}
                            aria-label={`${e.name}: ${e.type} page`}
                          >
                            {e.type === 'person'
                              ? 'Person page'
                              : 'Document page'}{' '}
                            →
                          </button>
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
                          ? explorable.length
                          : explorable.filter((c) => c.topic === topic).length}
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
                  <button onClick={openDocuments}>
                    {frontierSafetyFrameworks.title}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <details className="collection-nav">
                  <summary>Chinese AI histories</summary>
                  <p className="small-note">
                    Three selected institutional histories, grouped here for
                    navigation. The grouping implies no shared ownership,
                    strategy or lineage.
                  </p>
                  <div className="anchor-nav">
                    {chineseHistories.map(([id, label]) => (
                      <button
                        key={id}
                        aria-pressed={filters.focusId === id}
                        onClick={() => openDossier(id)}
                      >
                        {label} <span aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </div>
                </details>
                <div className="rail-footnote">
                  <span className="eyebrow">Coverage is selective</span>
                  <p>
                    Selected records
                    <br />
                    <strong>1965–{latestYear}</strong>
                  </p>
                  <p>
                    Latest source check
                    <br />
                    {repository.data.evidence
                      .map((e) => e.checkedAt)
                      .sort()
                      .at(-1)}
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
                    <p>
                      Claims found by the search for “{exploreQuery.trim()}”:{' '}
                      {visible.claims.length}.
                    </p>
                    <button
                      className="text-button"
                      onClick={() => openSearch(exploreQuery.trim())}
                    >
                      Back to the list of results
                    </button>
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
                    <h2>
                      {focusEntity
                        ? focusEntity.name
                        : pathOpen && path
                          ? path.title
                          : exploreQuery.trim()
                            ? `Search: ${exploreQuery.trim()}`
                            : topicLabels[filters.topic]}
                    </h2>
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
                      {visible.entities.length} people, organisations and other
                      records ·{' '}
                      {
                        visible.claims.filter((c) => c.object.kind === 'entity')
                          .length
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
                      view === 'timeline'
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
                    {visible.claims.length ? (
                      (view === 'timeline' ? timeline : visible.claims).map(
                        (c) => (
                          <div key={c.id} className="list-record">
                            {view === 'timeline' && (
                              <span className="timeline-date">
                                {timeLabel(c)}
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
                    No human review of the selection or framing is recorded.
                    Each claim shows its own editorial status and evidence
                    checks.
                  </p>
                  <h3 className="section-heading">Inspect any statement</h3>
                  <p>
                    Select a statement to open its evidence here. Closing the
                    panel returns focus to the statement.
                  </p>
                </aside>
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
                />
              )}
            </main>
          </>
        )}
      </Suspense>
      <SiteFooter onAbout={openAbout} />
    </>
  );
}
