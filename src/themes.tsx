export function createColors(
  key: string,
  hue: number,
  saturation: number,
  lightness: number,
  dark: boolean = false
) {
  return [...new Array(10)]
    .map((_, i) => i * 10)
    .reduce(
      (a, b) => ({
        ...a,
        [`${key}${b === 0 ? "" : b}`]: `hsl(${hue},${saturation}%,${
          b === 0
            ? lightness
            : dark
            ? Math.round((b * (lightness - 100)) / 100 + (100 - lightness))
            : Math.round((b * (100 - lightness)) / 100 + lightness)
        }%)`,
      }),
      {}
    )
}

const LIGHTNESS = 60

export const THEME_DEFAULT = {
  colors: {
    white: "hsl(0,0%,100%)",
    black: "hsl(0,0%,0%)",
    bg1: "hsl(0,0%,100%)",
    bg2: "hsl(228, 70%, 98.5%)",
    bg3: "hsl(228, 90%, 98%)",
    text1: "hsl(0,0%,0%)",
    text2: "hsl(0,0%,30%)",
    text3: "hsl(0,0%,100%)",
    text4: "hsl(0,0%,70%)",
    transparent: "hsla(0,0%,100%, 0)",

    ...createColors("gray", 0, 0, 60),
    ...createColors("grayDark", 0, 0, 40, true),
    ...createColors("grayLight", 0, 0, 80),

    ...createColors("error", 3, 85, LIGHTNESS),

    ...createColors("color1", 248, 89, LIGHTNESS),
    ...createColors("color1Dark", 248, 89, LIGHTNESS, true),

    ...createColors("color2", 50, 100, LIGHTNESS),
    ...createColors("color2Dark", 50, 100, LIGHTNESS, true),

    ...createColors("color3", 150, 55, LIGHTNESS),
    ...createColors("color3Dark", 150, 55, LIGHTNESS, true),

    ...createColors("color4", 200, 79, LIGHTNESS),
    ...createColors("color4Dark", 200, 79, LIGHTNESS, true),
  },
  space: {
    none: "0px",
    xs: "3px",
    s: "6px",
    m: "8px",
    l: "16px",
    xl: "24px",
    xxl: "48px",
  },
  fontSizes: {
    caption: "12px",
    button: "14px",
    default: "16px",
    body1: "14px",
    body2: "16px",

    subtitle1: "14px",
    subtitle2: "16px",

    h1: "96px",
    h2: "60px",
    h3: "48px",
    h4: "34px",
    h5: "24px",
    h6: "20px",

    s: "14px",
    m: "16px",
    l: "20px",
    xl: "30px",
  },
  fontWeights: {
    thin: "100",
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
    black: "900",
  },
  lineHeights: {
    default: "auto",
    caption: "1.66em",
    button: "1.5em",
    body1: "1.5em",
    body2: "1.43em",
    subtitle1: "1.75em",
    subtitle2: "1.57em",

    h1: "1.16em",
    h2: "1.2em",
    h3: "1.16em",
    h4: "1.12em",
    h5: "1.33em",
    h6: "1.6em",
  },
  zIndices: {
    1: 1,
    2: 10,
    3: 100,
    4: 1000,
    max: 1000000000,
  },
  radii: {
    1: "3px",
    2: "5px",
    3: "7px",
    4: "10px",
    round: "50%",
    pill: "100vw",
  },
  shadows: {
    1: "0px 0px 40px 10px hsl(0,0%,20%, 0.1), 0px 0px 20px 5px hsl(0,0%,20%, 0.1), 0px 0px 10px 0px hsl(0,0%,20%, 0.1)",
    s: "0px 0px 2px hsl(260deg 100% 70% / 0.7)",
    m: `0px 0px 2px hsl(0deg 0% 50% / 0.333),
			0px 0px 4px hsl(0deg 0% 50% / 0.333),
			0px 0px 6px hsl(260deg 100% 70% / 0.333)
		`,
    l: `0px 0px 4px hsl(0deg 0% 50% / 0.1),
			0px 0px 8px hsl(0deg 0% 50% / 0.1),
			0px 10px 16px hsl(260deg 100% 70% / 0.1),
			0px 10px 32px hsl(0deg 0% 50% / 0.1),
			0px 10px 48px hsl(0deg 0% 45% / 0.1)
		`,
    xl: `0px 0px 2px hsl(248deg 89% 45% / 0.1),
			 0px 0px 4px hsl(0deg 0% 50% / 0.1),
			 0px 0px 8px hsl(0deg 0% 50% / 0.1),
			 0px 0px 16px hsl(0deg 0% 50% / 0.1),
			 0px 0px 32px hsl(248deg 89% 45% / 0.1),
			 0px 0px 48px hsl(0deg 0% 50% / 0.1),
			 0px 0px 64px hsl(0deg 0% 50% / 0.1),
			 0px 0px 78px hsl(248deg 89% 45% / 0.1)
		`,
    none: "hsl(0,0%,40%) 0px 0px 0px 0px",
  },
  borderWidths: {
    1: "1px",
    2: "2px",
    3: "3px",
    4: "4px",
  },
  sizes: {
    0: "0px",
    1: "6px",
    2: "8px",
    3: "16px",
    4: "32px",
    5: "64px",
    6: "96px",
    7: "128px",
    8: "196px",
    9: "256px",
  },
  fonts: {
    untitled: "Untitled Sans, -apple-system, system-ui, sans-serif",
    mono: "Söhne Mono, menlo, monospace",
  },
  borders: {},
  transitions: {},
  borderStyles: {},
  letterSpacings: {},
}

export const THEME_DARK = {
  colors: {
    ...createColors("black", 40, 30, 0),
    ...createColors("error", 57, 96, 60),
  },
}
