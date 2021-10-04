export const server = 'https://qa.door43.org';

/**
 this default for next columns in Workspace:
 columns={{
          lg: 12,
          md: 6,
          sm: 1,
          xs: 1,
          xxs: 1,
        }}
 */

/** export const defaultTplBible = {
  ru: {
    lg: [
      { w: 4, h: 12, x: 0, y: 0, i: 'ru_rob', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 4, y: 0, i: 'ru_rsb', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 8, y: 0, i: 'ru_tn', minH: 4, minW: 2 },
    ],
    md: [
      { w: 3, h: 12, x: 0, y: 0, i: 'ru_rob', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 0, i: 'ru_rsb', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 6, i: 'ru_tn', minH: 4, minW: 2 },
    ],
    sm: [
      { w: 1, h: 4, x: 0, y: 0, i: 'ru_rob', minH: 3, minW: 1 },
      { w: 1, h: 4, x: 0, y: 4, i: 'ru_rsb', minH: 3, minW: 1 },
      { w: 1, h: 4, x: 0, y: 8, i: 'ru_tn', minH: 3, minW: 1 },
    ],
  },
  en: {
    lg: [
      { w: 4, h: 12, x: 0, y: 0, i: 'en_ueb', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 4, y: 0, i: 'en_ust', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 8, y: 0, i: 'el-x-koine_ugnt', minH: 4, minW: 2 },
    ],
    md: [
      { w: 3, h: 12, x: 0, y: 0, i: 'en_ueb', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 0, i: 'en_ust', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 6, i: 'el-x-koine_ugnt', minH: 4, minW: 2 },
    ],
    sm: [
      { w: 1, h: 4, x: 0, y: 0, i: 'en_ueb', minH: 3, minW: 1 },
      { w: 1, h: 4, x: 0, y: 4, i: 'en_ust', minH: 3, minW: 1 },
      { w: 1, h: 4, x: 0, y:8, i: 'el-x-koine_ugnt', minH: 3, minW: 1 },
    ],
  },
};

export const defaultTplOBS = {
  ru: {
    lg: [
      { w: 4, h: 12, x: 0, y: 0, i: 'ru_obs', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 4, y: 0, i: 'ru_obs-tn', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 8, y: 0, i: 'ru_obs-tq', minH: 4, minW: 2 },
    ],
     md: [
      { w: 3, h: 12, x: 0, y: 0, i: 'ru_obs', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 0, i: 'ru_obs-tn', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 6, i: 'ru_obs-tq', minH: 4, minW: 2 },
    ],
    sm: [
      { w: 1, h: 5, x: 0, y: 0, i: 'ru_obs', minH: 3, minW: 1 },
      { w: 1, h: 4, x: 0, y: 5, i: 'ru_obs-tn', minH: 3, minW: 1 },
      { w: 1, h: 3, x: 0, y: 9, i: 'ru_obs-tq', minH: 3, minW: 1 },
    ],
  },
  en: {
    lg: [
      { w: 4, h: 12, x: 0, y: 0, i: 'en_obs', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 4, y: 0, i: 'en_obs-tn', minH: 4, minW: 2 },
      { w: 4, h: 12, x: 8, y: 0, i: 'en_obs-tq', minH: 4, minW: 2 },
    ],
     md: [
      { w: 3, h: 12, x: 0, y: 0, i: 'en_obs', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 0, i: 'en_obs-tn', minH: 4, minW: 2 },
      { w: 3, h: 6, x: 3, y: 6, i: 'en_obs-tq', minH: 4, minW: 2 },
    ],
    sm: [
      { w: 1, h: 5, x: 0, y: 0, i: 'en_obs', minH: 3, minW: 1 },
      { w: 1, h: 4, x: 0, y: 5, i: 'en_obs-tn', minH: 3, minW: 1 },
      { w: 1, h: 3, x: 0, y: 9, i: 'en_obs-tq', minH: 3, minW: 1 },
    ],
  },
};
*/

export const defaultTplBible = {
  ru: [
    { w: 4, h: 12, x: 0, y: 0, i: 'ru_rob', minH: 4, minW: 2 },
    { w: 4, h: 12, x: 4, y: 0, i: 'ru_rsb', minH: 4, minW: 2 },
    { w: 4, h: 12, x: 8, y: 0, i: 'ru_tn', minH: 4, minW: 2 },
  ],
  en: [
    { w: 4, h: 12, x: 0, y: 0, i: 'en_ueb', minH: 3, minW: 1 },
    { w: 4, h: 12, x: 4, y: 0, i: 'en_ust', minH: 3, minW: 1 },
    { w: 4, h: 12, x: 8, y: 0, i: 'el-x-koine_ugnt', minH: 3, minW: 1 },
  ],
};

export const defaultTplOBS = {
  ru: [
    { w: 4, h: 12, x: 0, y: 0, i: 'ru_obs', minH: 4, minW: 2 },
    { w: 4, h: 12, x: 4, y: 0, i: 'ru_obs-tn', minH: 4, minW: 2 },
    { w: 4, h: 12, x: 8, y: 0, i: 'ru_obs-tq', minH: 4, minW: 2 },
  ],
  en: [
    { w: 4, h: 12, x: 0, y: 0, i: 'en_obs', minH: 3, minW: 2 },
    { w: 4, h: 12, x: 0, y: 0, i: 'en_obs-tn', minH: 3, minW: 2 },
    { w: 4, h: 12, x: 0, y: 0, i: 'en_obs-tq', minH: 3, minW: 2 },
  ],
};

export const defaultBibleReference = {
  ru: {
    bookId: 'mat',
    chapter: 1,
    verse: 1,
  },
  en: {
    bookId: 'mat',
    chapter: 1,
    verse: 1,
  },
};

export const defaultOBSReference = {
  ru: {
    bookId: 'obs',
    chapter: 1,
    verse: 1,
  },
  en: {
    bookId: 'obs',
    chapter: 1,
    verse: 1,
  },
};

export const languages = ['en', 'ru'];

/* CORE */

export const defaultCard = { w: 4, h: 4, x: 0, y: 99, minH: 2, minW: 2 };
/**
 * 
export const defaultCard = {
  lg:{ w: 4, h: 4, x: 0, y: 99, minH: 2, minW: 2},
  md:{ w: 3, h: 4, x: 0, y: 99, minH: 2, minW: 2},
  sm:{ w: 1, h: 4, x: 0, y: 99, minH: 2, minW: 1},
};

*/
export const singleChaptersBookID = ['oba', '2jn', '3jn', 'jud', 'phm'];

export const bibleList = [
  {
    identifier: 'gen',
    isset: false,
    sort: 1,
    categories: 'bible-ot',
    short: {
      ru: '',
    },
  },
  {
    identifier: 'exo',
    isset: false,
    sort: 2,
    categories: 'bible-ot',
  },
  {
    identifier: 'lev',
    isset: false,
    sort: 3,
    categories: 'bible-ot',
  },
  {
    identifier: 'num',
    isset: false,
    sort: 4,
    categories: 'bible-ot',
  },
  {
    identifier: 'deu',
    isset: false,
    sort: 5,
    categories: 'bible-ot',
  },
  {
    identifier: 'jos',
    isset: false,
    sort: 6,
    categories: 'bible-ot',
  },
  {
    identifier: 'jdg',
    isset: false,
    sort: 7,
    categories: 'bible-ot',
  },
  {
    identifier: 'rut',
    isset: false,
    sort: 8,
    categories: 'bible-ot',
  },
  {
    identifier: '1sa',
    isset: false,
    sort: 9,
    categories: 'bible-ot',
  },
  {
    identifier: '2sa',
    isset: false,
    sort: 10,
    categories: 'bible-ot',
  },
  {
    identifier: '1ki',
    isset: false,
    sort: 11,
    categories: 'bible-ot',
  },
  {
    identifier: '2ki',
    isset: false,
    sort: 12,
    categories: 'bible-ot',
  },
  {
    identifier: '1ch',
    isset: false,
    sort: 13,
    categories: 'bible-ot',
  },
  {
    identifier: '2ch',
    isset: false,
    sort: 14,
    categories: 'bible-ot',
  },
  {
    identifier: 'ezr',
    isset: false,
    sort: 15,
    categories: 'bible-ot',
  },
  {
    identifier: 'neh',
    isset: false,
    sort: 16,
    categories: 'bible-ot',
  },
  {
    identifier: 'est',
    isset: false,
    sort: 17,
    categories: 'bible-ot',
  },
  {
    identifier: 'job',
    isset: false,
    sort: 18,
    categories: 'bible-ot',
  },
  {
    identifier: 'psa',
    isset: false,
    sort: 19,
    categories: 'bible-ot',
  },
  {
    identifier: 'pro',
    isset: false,
    sort: 20,
    categories: 'bible-ot',
  },
  {
    identifier: 'ecc',
    isset: false,
    sort: 21,
    categories: 'bible-ot',
  },
  {
    identifier: 'sng',
    isset: false,
    sort: 22,
    categories: 'bible-ot',
  },
  {
    identifier: 'isa',
    isset: false,
    sort: 23,
    categories: 'bible-ot',
  },
  {
    identifier: 'jer',
    isset: false,
    sort: 24,
    categories: 'bible-ot',
  },
  {
    identifier: 'lam',
    isset: false,
    sort: 25,
    categories: 'bible-ot',
  },
  {
    identifier: 'ezk',
    isset: false,
    sort: 26,
    categories: 'bible-ot',
  },
  {
    identifier: 'dan',
    isset: false,
    sort: 27,
    categories: 'bible-ot',
  },
  {
    identifier: 'hos',
    isset: false,
    sort: 28,
    categories: 'bible-ot',
  },
  {
    identifier: 'jol',
    isset: false,
    sort: 29,
    categories: 'bible-ot',
  },
  {
    identifier: 'amo',
    isset: false,
    sort: 30,
    categories: 'bible-ot',
  },
  {
    identifier: 'oba',
    isset: false,
    sort: 31,
    categories: 'bible-ot',
  },
  {
    identifier: 'jon',
    isset: false,
    sort: 32,
    categories: 'bible-ot',
  },
  {
    identifier: 'mic',
    isset: false,
    sort: 33,
    categories: 'bible-ot',
  },
  {
    identifier: 'nam',
    isset: false,
    sort: 34,
    categories: 'bible-ot',
  },
  {
    identifier: 'hab',
    isset: false,
    sort: 35,
    categories: 'bible-ot',
  },
  {
    identifier: 'zep',
    isset: false,
    sort: 36,
    categories: 'bible-ot',
  },
  {
    identifier: 'hag',
    isset: false,
    sort: 37,
    categories: 'bible-ot',
  },
  {
    identifier: 'zec',
    isset: false,
    sort: 38,
    categories: 'bible-ot',
  },
  {
    identifier: 'mal',
    isset: false,
    sort: 39,
    categories: 'bible-ot',
  },
  {
    identifier: 'mat',
    isset: false,
    sort: 40,
    categories: 'bible-nt',
  },
  {
    identifier: 'mrk',
    isset: false,
    sort: 41,
    categories: 'bible-nt',
  },
  {
    identifier: 'luk',
    isset: false,
    sort: 42,
    categories: 'bible-nt',
  },
  {
    identifier: 'jhn',
    isset: false,
    sort: 43,
    categories: 'bible-nt',
  },
  {
    identifier: 'act',
    isset: false,
    sort: 44,
    categories: 'bible-nt',
  },
  {
    identifier: 'jas',
    isset: false,
    sort: 59,
    categories: 'bible-nt',
  },
  {
    identifier: '1pe',
    isset: false,
    sort: 60,
    categories: 'bible-nt',
  },
  {
    identifier: '2pe',
    isset: false,
    sort: 61,
    categories: 'bible-nt',
  },
  {
    identifier: '1jn',
    isset: false,
    sort: 62,
    categories: 'bible-nt',
  },
  {
    identifier: '2jn',
    isset: false,
    sort: 63,
    categories: 'bible-nt',
  },
  {
    identifier: '3jn',
    isset: false,
    sort: 64,
    categories: 'bible-nt',
  },
  {
    identifier: 'jud',
    isset: false,
    sort: 65,
    categories: 'bible-nt',
  },
  {
    identifier: 'rom',
    isset: false,
    sort: 45,
    categories: 'bible-nt',
  },
  {
    identifier: '1co',
    isset: false,
    sort: 46,
    categories: 'bible-nt',
  },
  {
    identifier: '2co',
    isset: false,
    sort: 47,
    categories: 'bible-nt',
  },
  {
    identifier: 'gal',
    isset: false,
    sort: 48,
    categories: 'bible-nt',
  },
  {
    identifier: 'eph',
    isset: false,
    sort: 49,
    categories: 'bible-nt',
  },
  {
    identifier: 'php',
    isset: false,
    sort: 50,
    categories: 'bible-nt',
  },
  {
    identifier: 'col',
    isset: false,
    sort: 51,
    categories: 'bible-nt',
  },
  {
    identifier: '1th',
    isset: false,
    sort: 52,
    categories: 'bible-nt',
  },
  {
    identifier: '2th',
    isset: false,
    sort: 53,
    categories: 'bible-nt',
  },
  {
    identifier: '1ti',
    isset: false,
    sort: 54,
    categories: 'bible-nt',
  },
  {
    identifier: '2ti',
    isset: false,
    sort: 55,
    categories: 'bible-nt',
  },
  {
    identifier: 'tit',
    isset: false,
    sort: 56,
    categories: 'bible-nt',
  },
  {
    identifier: 'phm',
    isset: false,
    sort: 57,
    categories: 'bible-nt',
  },
  {
    identifier: 'heb',
    isset: false,
    sort: 58,
    categories: 'bible-nt',
  },
  {
    identifier: 'rev',
    isset: false,
    sort: 66,
    categories: 'bible-nt',
  },
  {
    identifier: 'obs',
    isset: false,
    sort: 70,
    categories: 'obs',
  },
];
export const bibles_abbrv = {
  gen: { ru: 'Быт' },
  exo: { ru: 'Исх' },
  lev: { ru: 'Лев' },
  num: { ru: 'Чис' },
  deu: { ru: 'Втор' },
  jos: { ru: 'Нав' },
  jdg: { ru: 'Суд' },
  rut: { ru: 'Руфь' },
  '1sa': { ru: '1Цар' },
  '2sa': { ru: '2Цар' },
  '1ki': { ru: '3Цар' },
  '2ki': { ru: '4Цар' },
  '1ch': { ru: '1Пар' },
  '2ch': { ru: '2Пар' },
  ezr: { ru: 'Эзр' },
  neh: { ru: 'Неем' },
  est: { ru: 'Эсф' },
  job: { ru: 'Иов' },
  psa: { ru: 'Пс' },
  pro: { ru: 'Притч' },
  ecc: { ru: 'Эккл' },
  sng: { ru: 'Песн' },
  jer: { ru: 'Иер' },
  lam: { ru: 'Плач' },
  isa: { ru: 'Ис' },
  ezk: { ru: 'Иез' },
  dan: { ru: 'Дан' },
  hos: { ru: 'Ос' },
  jol: { ru: 'Иоил' },
  amo: { ru: 'Амос' },
  oba: { ru: 'Авд' },
  jon: { ru: 'Ион' },
  mic: { ru: 'Мих' },
  nam: { ru: 'Наум' },
  hab: { ru: 'Авв' },
  zep: { ru: 'Соф' },
  hag: { ru: 'Агг' },
  zec: { ru: 'Зах' },
  mal: { ru: 'Мал' },
  mat: { ru: 'Мф' },
  mrk: { ru: 'Мк' },
  luk: { ru: 'Лк' },
  jhn: { ru: 'Ин' },
  act: { ru: 'Деян' },
  rom: { ru: 'Рим' },
  '1co': { ru: '1Кор' },
  '2co': { ru: '2Кор' },
  gal: { ru: 'Гал' },
  eph: { ru: 'Еф' },
  php: { ru: 'Флп' },
  col: { ru: 'Кол' },
  '1th': { ru: '1Фес' },
  '2th': { ru: '2Фес' },
  '1ti': { ru: '1Тим' },
  '2ti': { ru: '2Тим' },
  tit: { ru: 'Тит' },
  phm: { ru: 'Флм' },
  heb: { ru: 'Евр' },
  jas: { ru: 'Иак' },
  '1pe': { ru: '1Петр' },
  '2pe': { ru: '2Петр' },
  '1jn': { ru: '1Ин' },
  '2jn': { ru: '2Ин' },
  '3jn': { ru: '3Ин' },
  jud: { ru: 'Иуд' },
  rev: { ru: 'Откр' },
};

export const getAbbr = (bookId, lang) => {
  return lang && bookId !== 'obs' ? bibles_abbrv[bookId][lang] : bookId;
};
