import { test } from 'node:test'
import assert from 'node:assert/strict'
import { categories, projects, filterProjects } from '../lib/projects.ts'
import { SIGNS } from '../components/world/world-data.ts'
import { parseQuality, renderingBudget, TOUR } from '../lib/world-settings.ts'

test('every existing project is available with complete presentation and a unique id', () => {
  assert.deepEqual(projects.map(p => p.id), SIGNS.filter(s => s.kind === 'project').map(s => s.id))
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length)
  for (const project of projects) {
    assert.ok(categories.includes(project.category))
    assert.ok(project.summary && project.highlight && project.highlightLabel)
    assert.ok(project.bullets.length)
  }
})

test('blank and whitespace-only search retain the full catalog', () => {
  assert.equal(filterProjects('All work', '').length, projects.length)
  assert.equal(filterProjects('All work', '  \n ').length, projects.length)
})

test('search matches technology case-insensitively across multiple words', () => {
  assert.deepEqual(filterProjects('All work', '  PYTORCH   QLORA ').map(p => p.id), ['vqa-disagree'])
  assert.deepEqual(filterProjects('All work', 'arm assembly').map(p => p.id), ['arcade'])
})

test('category and search are combined, including a genuine empty state', () => {
  assert.deepEqual(filterProjects('Hardware', 'python'), [])
  assert.deepEqual(filterProjects('Robotics', 'vision').map(p => p.id), ['davatar'])
  assert.deepEqual(filterProjects('All work', 'there-is-no-such-project'), [])
})

test('each project belongs to exactly one category filter', () => {
  const all = categories.slice(1).flatMap(category => filterProjects(category, ''))
  assert.equal(all.length, projects.length)
  assert.equal(new Set(all.map(p => p.id)).size, projects.length)
})

test('every project deep link resolves to an existing world destination', () => {
  for (const project of projects) assert.ok(SIGNS.find(sign => sign.id === project.id))
})

test('stored graphics settings reject corrupted or stale preferences', () => {
  for (const value of [null, '', 'ultra', 'null', '<script>']) assert.equal(parseQuality(value), 'auto')
  assert.equal(parseQuality('high'), 'high')
  assert.equal(parseQuality('battery'), 'battery')
})

test('automatic graphics lower cost on constrained devices', () => {
  const normal = renderingBudget('auto', false)
  const constrained = renderingBudget('auto', true)
  assert.ok(constrained.dpr < normal.dpr)
  assert.equal(constrained.shadows, false)
  assert.equal(normal.shadows, true)
  assert.ok(normal.shadowSize < 1536)
})

test('explicit high and battery modes override the device heuristic', () => {
  assert.equal(renderingBudget('high', true).mode, 'high')
  assert.equal(renderingBudget('high', true).dpr, 1.5)
  assert.equal(renderingBudget('battery', false).mode, 'battery')
  assert.equal(renderingBudget('battery', false).shadows, false)
})

test('the complete guided tour has valid, distinct stops and ends at contact', () => {
  assert.equal(TOUR[0], 'about')
  assert.equal(TOUR.at(-1), 'contact')
  assert.equal(new Set(TOUR).size, TOUR.length)
  for (const id of TOUR) assert.ok(SIGNS.find(sign => sign.id === id))
})
