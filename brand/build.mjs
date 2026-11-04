// Turns brand/tokens.json into the two files every Norka product reads:
//   dist/norka-brand.css — CSS variables (--norka-*) for the web apps (ERP web, Norka AI web)
//   dist/norka-brand.ts  — the same values as a typed object for the mobile app
// Run: node brand/build.mjs   (brand/sync.sh runs it, then copies the files into each product)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const t = JSON.parse(readFileSync(join(here, 'tokens.json'), 'utf8'))
const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
const HEADER = 'GENERATED from Norka-Website/brand/tokens.json — do not edit here; edit tokens.json and run brand/sync.sh'

const vars = (obj, prefix) => Object.entries(obj).map(([k, v]) => `  --norka-${prefix}${kebab(k)}: ${v};`).join('\n')
const css = `/* ${HEADER} */
:root {
${vars(t.blue, 'blue-')}
${Object.entries(t.radius).map(([k, v]) => `  --norka-radius-${k}: ${v}px;`).join('\n')}
  --norka-font: ${t.font.stack};
${vars(t.status, '')}
${vars(t.light, '')}
}
/* dark: apps opt in with their own selector by copying these into it, or use .norka-dark */
.norka-dark, :root[data-theme="dark"] {
${vars(t.dark, '')}
}
`
const ts = `// ${HEADER}
export const NorkaBrand = ${JSON.stringify({ name: t.name, font: t.font, radius: t.radius, blue: t.blue, light: t.light, dark: t.dark, status: t.status }, null, 2)} as const;
`
mkdirSync(join(here, 'dist'), { recursive: true })
writeFileSync(join(here, 'dist', 'norka-brand.css'), css)
writeFileSync(join(here, 'dist', 'norka-brand.ts'), ts)
console.log('brand: dist/norka-brand.css + dist/norka-brand.ts')
