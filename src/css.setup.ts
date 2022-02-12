import setup from "quarks_css"
import { THEME_DEFAULT, THEME_DARK } from "./themes"

const {
  css,
  styled,
  keyframes,
  globalCss,
  getCssText,
  applyTheme,
  createTheme,
} = setup({
  prefix: "q",
  theme: THEME_DEFAULT,
})

const darkTheme = createTheme(THEME_DARK)
const defaultTheme = createTheme(THEME_DEFAULT)

export {
  css,
  styled as default,
  keyframes,
  globalCss,
  getCssText,
  applyTheme,
  createTheme,
  darkTheme,
  defaultTheme,
}

// p: (value: any) => ({
//     paddingTop: value,
//     paddingBottom: value,
//     paddingLeft: value,
//     paddingRight: value,
//   }),
//   pt: (value: any) => ({
//     paddingTop: value,
//   }),
//   pr: (value: any) => ({
//     paddingRight: value,
//   }),
//   pb: (value: any) => ({
//     paddingBottom: value,
//   }),
//   pl: (value: any) => ({
//     paddingLeft: value,
//   }),
//   px: (value: any) => ({
//     paddingLeft: value,
//     paddingRight: value,
//   }),
//   py: (value: any) => ({
//     paddingTop: value,
//     paddingBottom: value,
//   }),

//   m: (value: any) => ({
//     marginTop: value,
//     marginBottom: value,
//     marginLeft: value,
//     marginRight: value,
//   }),
//   mt: (value: any) => ({
//     marginTop: value,
//   }),
//   mr: (value: any) => ({
//     marginRight: value,
//   }),
//   mb: (value: any) => ({
//     marginBottom: value,
//   }),
//   ml: (value: any) => ({
//     marginLeft: value,
//   }),
//   mx: (value: any) => ({
//     marginLeft: value,
//     marginRight: value,
//   }),
//   my: (value: any) => ({
//     marginTop: value,
//     marginBottom: value,
//   }),

//   ta: (value: any) => ({ textAlign: value }),

//   fd: (value: any) => ({ flexDirection: value }),
//   fw: (value: any) => ({ flexWrap: value }),

//   ai: (value: any) => ({ alignItems: value }),
//   ac: (value: any) => ({ alignContent: value }),
//   jc: (value: any) => ({ justifyContent: value }),
//   as: (value: any) => ({ alignSelf: value }),
//   fg: (value: any) => ({ flexGrow: value }),
//   fs: (value: any) => ({ flexShrink: value }),
//   fb: (value: any) => ({ flexBasis: value }),

//   bc: (value: keyof typeof theme['colors'] | (string & {})) => ({
//     backgroundColor: value,
//   }),

//   br: (value: keyof typeof theme['radii'] | (string & {})) => ({
//     borderRadius: value,
//   }),
//   btrr: (value: keyof typeof theme['radii'] | (string & {})) => ({
//     borderTopRightRadius: value,
//   }),
//   bbrr: (value: keyof typeof theme['radii'] | (string & {})) => ({
//     borderBottomRightRadius: value,
//   }),
//   bblr: (value: keyof typeof theme['radii'] | (string & {})) => ({
//     borderBottomLeftRadius: value,
//   }),
//   btlr: (value: keyof typeof theme['radii'] | (string & {})) => ({
//     borderTopLeftRadius: value,
//   }),

//   bs: (value: any) => ({ boxShadow: value }),

//   lh: (value: any) => ({ lineHeight: value }),

//   ox: (value: any) => ({ overflowX: value }),
//   oy: (value: any) => ({ overflowY: value }),

//   pe: (value: any) => ({ pointerEvents: value }),
//   us: (value: any) => ({ userSelect: value }),

//   // size: (value: keyof typeof theme['sizes'] | (string & {})) => ({
//   //   width: value,
//   //   height: value,
//   // }),

//   linearGradient: (value: any) => ({
//     backgroundImage: `linear-gradient(${value})`,
//   }),

// default: (rule: string) => rule,
//   bp1: (rule: string) => `@media (min-width: 520px) { ${rule} }`,
//   bp2: (rule: string) => `@media (min-width: 900px) { ${rule} }`,
//   bp3: (rule: string) => `@media (min-width: 1200px) { ${rule} }`,
//   bp4: (rule: string) => `@media (min-width: 1800px) { ${rule} }`,
//   motion: (rule: string) => `@media (prefers-reduced-motion) { ${rule} }`,
//   hover: (rule: string) => `@media (hover: hover) { ${rule} }`,
//   dark: (rule: string) => `@media (prefers-color-scheme: dark) { ${rule} }`,
//   light: (rule: string) => `@media (prefers-color-scheme: light) { ${rule} }`,
