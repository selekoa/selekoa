import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

// Guard for docs/design-tokens.md: colours live in src/tokens.css only, and
// every colour token there has a light and a dark value.
const root = join(import.meta.dirname, '..');
const tokensFile = join(root, 'tokens.css');

function stylesheets(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return stylesheets(path);
    return entry.name.endsWith('.css') ? [path] : [];
  });
}

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Declarations inside rule bodies, so selectors never count as values. */
function declarations(css: string) {
  const found: { property: string; value: string }[] = [];
  for (const block of stripComments(css).matchAll(/\{([^{}]*)\}/g))
    for (const part of block[1].split(';')) {
      const colon = part.indexOf(':');
      if (colon < 0) continue;
      found.push({
        property: part.slice(0, colon).trim(),
        value: part.slice(colon + 1).trim(),
      });
    }
  return found;
}

const namedColours = new Set(
  `aliceblue antiquewhite aqua aquamarine azure beige bisque black
  blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse
  chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan
  darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta
  darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen
  darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink
  deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen
  fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey
  honeydew hotpink indianred indigo ivory khaki lavender lavenderblush
  lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow
  lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen
  lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime
  limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid
  mediumpurple mediumseagreen mediumslateblue mediumspringgreen
  mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin
  navajowhite navy oldlace olive olivedrab orange orangered orchid
  palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff
  peru pink plum powderblue purple rebeccapurple red rosybrown royalblue
  saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue
  slateblue slategray slategrey snow springgreen steelblue tan teal thistle
  tomato turquoise violet wheat white whitesmoke yellow yellowgreen
  canvas canvastext linktext visitedtext activetext buttonface buttontext
  buttonborder field fieldtext highlight highlighttext graytext mark marktext`.split(
    /\s+/,
  ),
);
const colourFunction =
  /(?:^|[^\w-])(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark)\(/i;

/** The literal colours in one declaration value, if any. */
function literalColours(value: string): string[] {
  const found = [...value.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((m) => m[0]);
  const fn = colourFunction.exec(value);
  if (fn) found.push(fn[1] + '()');
  // Words outside var() names: var(--color-page) is not the colour "page".
  const words = value.replace(/var\([^)]*\)/g, ' ').split(/[^a-zA-Z-]+/);
  for (const word of words)
    if (namedColours.has(word.toLowerCase())) found.push(word);
  return found;
}

describe('design tokens', () => {
  it('finds literal colours in values and ignores token references', () => {
    expect(literalColours('1px solid #bd6b3e')).toEqual(['#bd6b3e']);
    expect(literalColours('rgb(0 0 0 / 50%)')).toEqual(['rgb()']);
    expect(literalColours('white')).toEqual(['white']);
    expect(literalColours('1px solid var(--color-border)')).toEqual([]);
    expect(literalColours('transparent')).toEqual([]);
    expect(literalColours('currentColor')).toEqual([]);
  });

  it('keeps every literal colour in src/tokens.css', () => {
    const offences = stylesheets(root)
      .filter((file) => file !== tokensFile)
      .flatMap((file) =>
        declarations(readFileSync(file, 'utf8')).flatMap(
          ({ property, value }) =>
            literalColours(value).map(
              (colour) =>
                `${relative(root, file)}: ${property}: ${value} (${colour})`,
            ),
        ),
      );
    expect(offences).toEqual([]);
  });

  it('gives every colour token a light and a dark value', () => {
    const tokens = declarations(readFileSync(tokensFile, 'utf8')).filter(
      ({ property }) => property.startsWith('--color-'),
    );
    expect(tokens.length).toBeGreaterThan(20);
    for (const { property, value } of tokens)
      expect(value, `${property} needs light-dark(light, dark)`).toMatch(
        /^light-dark\(#[0-9a-f]{3,8}, #[0-9a-f]{3,8}\)$/i,
      );
  });

  it('uses only colour tokens that are defined', () => {
    const defined = new Set(
      declarations(readFileSync(tokensFile, 'utf8')).map((d) => d.property),
    );
    const used = new Set(
      stylesheets(root).flatMap((file) =>
        [
          ...stripComments(readFileSync(file, 'utf8')).matchAll(
            /var\((--(?:color|font|text|heading|space|radius)-[\w-]+)/g,
          ),
        ].map((m) => m[1]),
      ),
    );
    expect([...used].filter((name) => !defined.has(name))).toEqual([]);
  });
});
