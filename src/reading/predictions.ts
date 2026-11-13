import type { PredictionsCollection } from '../domain/predictions';
import { predictionsFrame } from './predictions-frame';

/**
 * "Predictions on record" (schema 2.32), admitted on 2026-11-05 from the
 * adjudicated candidate pack in research/predictions (review note
 * review/predictions-pack-2026-11-02.md) under the maintainer's decisions of
 * 2026-11-04 and 2026-11-05. Shared code reads only the frame
 * (./predictions-frame.ts); this text loads with the page.
 */
export const predictionsOnRecord: PredictionsCollection = {
  ...predictionsFrame,
  introduction:
    'Dated predictions about machine intelligence, from Turing’s paper of 1950 to statements of 2025 and 2026. Each record gives the text’s own words for the predicted event, for the horizon and for any probability. A record is dated by when the prediction was made, never by its target. The chart places each prediction with a printed target year by its source date (across) and that year (up). The table below it lists every record, with or without a year.',
  doesNot: [
    'The collection does not say whether any prediction came true.',
    'It does not rank predictors or combine estimates.',
    'A horizon such as “within ten years” is never turned into a year. Only years a text prints appear on the chart; every other horizon is in the table, in the text’s words.',
  ],
  forms: [
    {
      id: 'stated-forecast',
      label: 'Stated forecast',
      description:
        'A forecast stated in a paper, essay, post or announcement by its author or publisher.',
    },
    {
      id: 'expert-survey',
      label: 'Expert survey',
      description:
        'A survey’s published result. The figure belongs to the survey report, with its question and respondents, not to any one respondent.',
    },
    {
      id: 'public-bet',
      label: 'Public bet',
      description:
        'A bet between named parties, with its terms and stakes as the bet’s page states them.',
    },
    {
      id: 'platform-question',
      label: 'Forecasting platform',
      description:
        'A forecasting platform’s community figure, read from a dated copy of the question page. The figure changes from day to day; the record holds one day’s figure.',
    },
    {
      id: 'reported-statement',
      label: 'Reported statement',
      description:
        'A text’s report of predictions by people it does not name. The record names the reporting text, not the people.',
    },
  ],
  marks: [
    {
      id: 'forecast-or-aim',
      label: 'Forecast or aim',
      description:
        'The sentence can be read as a forecast or as an aim, as with “should be able to”.',
    },
    {
      id: 'reported-later',
      label: 'Reported later',
      description:
        'A later text’s report of an earlier estimate. The record is dated by the later text; the earlier estimate’s date is shown beside it.',
    },
    {
      id: 'reported-statement',
      label: 'Reported statement',
      description:
        'The predictors are not named; the record rests on the text that reports them.',
    },
    {
      id: 'attested',
      label: 'Wording attested from',
      description:
        'The quoted wording is known only from a later copy or from the page as read live. The date from which the wording is attested is shown.',
    },
  ],
  limits: [
    'The records come from targeted searches, not from a census of predictions. A prediction missing from the table was not recorded; that says nothing about whether it was made.',
    'Surveys differ in their questions, definitions and respondents. Their figures are shown as each report words them and are not put on a common basis.',
    'Where a text gives several probabilities or dates, the record lists each one with its own horizon. On the chart, a thin line joins the printed years of one record.',
    'Some pages were read as they stand today. Their wording is attested only from the date they were read, which is shown.',
    'A printed target year can link to the dataset’s page for that year. That page lists what the dataset records for the year. It is not an outcome of any prediction.',
  ],
  searchNote: {
    scope:
      'Predictions about machine intelligence that give a target date or a horizon, in texts dated from 1950 to 2026: forecasts in papers, essays, posts and announcements; published results of expert surveys; one public bet; one forecasting platform’s figure from a dated copy; and one report of unnamed correspondents’ predictions. A passage with no horizon was not recorded.',
    methods: [
      'Texts the dataset already holds were read first; gaps were then filled with searches of authors’ sites, survey reports, the bet’s page, laboratory publications and Internet Archive copies. Searches ran from 2026-11-02 to 2026-11-05.',
      'Every quotation was matched mechanically against the retrieved text, or against the dataset’s own checked passage, or read on a page image where the copy has no text layer. A fresh retrieval at admission on 2026-11-05 matched again every quotation whose source could be retrieved.',
      'Copies the preparing assistant could not reach (Internet Archive copies, some publisher pages) were read by a model from a different family, OpenAI’s GPT; each record says whose reading it rests on.',
      'A fresh-context audit by a Claude model re-read the records. Two checks by an OpenAI model followed, each answering blind before it compared its answers with the records. The maintainer decided the open questions on 2026-11-04 and 2026-11-05.',
      'After admission, a blind audit by an OpenAI model of a sample of admitted records (2026-11-09) led to corrections applied on 2026-11-10: a distribution’s mean and mode are no longer shown as probabilities (Legg, 2009 to 2011), and Turing’s and de Garis’s locators and wording follow the printed copies cited.',
      'Where a source’s length is not known, or a quotation would pass the source’s quotation limit, the passage is a labelled paraphrase with the text’s own words in quotation marks.',
    ],
    gaps: [
      'Books that could not be read in full were not used: Kurzweil’s books of 1999 and 2005, Moravec’s of 1988 and 1999, Minsky’s of 1967.',
      'Posts on social media, video and audio without a published transcript, and press interviews were not used.',
      'Of sixteen dated copies of two forecasting-platform questions that were read, one shows a readable community figure; only that one is recorded.',
      'Kurzweil’s essay “The Law of Accelerating Returns” is dated January 2001 on the page read; the dataset dates it 7 March 2001. No copy read settles the date.',
      'A search that finds nothing does not show that nothing exists.',
    ],
    notRecorded: [
      {
        text: 'Simon (1965), Minsky (1967), Michie in Nature (1973), and Kurzweil’s books of 1999 and 2005',
        reason: 'Neither model family could read the texts. They remain leads.',
      },
      {
        text: 'Life, 20 November 1970, reporting Minsky',
        reason:
          'Only a search-index excerpt could be read. The record waits until the page itself is read, with Grudin’s later report beside it that Minsky said he was misquoted.',
      },
      {
        text: 'Moravec, “The Age of Robots” (1993)',
        reason:
          'Its section headings carry dates, but a heading frames a scenario; it is not a sentence stating an event by a date.',
      },
      {
        text: 'Long Bet 1 as worded in 2002',
        reason:
          'An archive copy of 2002 words the bet differently and calls the parties “initiator” and “responder” without saying who predicted which side. The record keeps the wording of the page as read, with the 2002 wording in its qualification.',
      },
    ],
  },
};
