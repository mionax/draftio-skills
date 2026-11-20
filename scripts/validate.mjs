import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const errors = []

function fail(message) {
  errors.push(message)
}

function readJson(path) {
  const raw = readFileSync(path, 'utf8')
  try {
    return JSON.parse(raw)
  } catch (error) {
    fail(`${path}: invalid JSON (${error.message})`)
    return null
  }
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const fields = {}
  for (const line of match[1].split(/\r?\n/)) {
    const hit = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/)
    if (hit) fields[hit[1]] = hit[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return fields
}

const manifest = readJson('plugin.json')
if (manifest) {
  for (const key of ['$schema', 'name', 'version', 'description']) {
    if (!manifest[key]) fail(`plugin.json: missing "${key}"`)
  }
  if (manifest.repository && !manifest.repository.includes('draftio')) {
    fail('plugin.json: repository should point at the Draftio org/repos')
  }
}

const skillsDir = 'skills'
for (const entry of readdirSync(skillsDir)) {
  const dir = join(skillsDir, entry)
  if (!statSync(dir).isDirectory()) continue

  const skillPath = join(dir, 'SKILL.md')
  let raw
  try {
    raw = readFileSync(skillPath, 'utf8')
  } catch {
    fail(`${skillPath}: missing`)
    continue
  }

  const fields = parseFrontmatter(raw)
  if (!fields) {
    fail(`${skillPath}: missing YAML frontmatter`)
    continue
  }
  if (fields.name !== entry) fail(`${skillPath}: name "${fields.name}" must match directory "${entry}"`)
  if (!fields.description) fail(`${skillPath}: missing description (agents use it to decide when to load)`)
  if ((fields.description ?? '').length < 40) fail(`${skillPath}: description is too short to be useful`)
}

for (const manifestPath of ['.claude-plugin/plugin.json', '.codex-plugin/plugin.json']) {
  const value = readJson(manifestPath)
  if (!value) continue
  for (const key of ['name', 'version', 'description']) {
    if (!value[key]) fail(`${manifestPath}: missing "${key}"`)
  }
}

for (const name of ['xiaohongshu-cover', 'product-shot', 'youtube-thumbnail', 'infographic-map']) {
  const examplePath = join('examples', `${name}.md`)
  try {
    const raw = readFileSync(examplePath, 'utf8')
    if (raw.trimStart().startsWith('---')) fail(`${examplePath}: examples are plain docs, drop the frontmatter`)
  } catch {
    fail(`${examplePath}: missing (examples must stay in sync with the site)`)
  }
}

try {
  readFileSync('install.sh', 'utf8')
} catch {
  fail('install.sh: missing')
}

for (const readme of ['README.md', 'README.en.md']) {
  let raw
  try {
    raw = readFileSync(readme, 'utf8')
  } catch {
    fail(`${readme}: missing (both language versions must exist)`)
    continue
  }
  const other = readme === 'README.md' ? 'README.en.md' : 'README.md'
  if (!raw.includes(`](${other})`)) fail(`${readme}: must link to ${other}`)
}

if (errors.length > 0) {
  console.error(`validation failed with ${errors.length} problem(s):`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

console.log('ok: manifest and skills are valid')
