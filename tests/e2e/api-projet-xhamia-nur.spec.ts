import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import yaml from 'js-yaml'

function loadProjectData() {
  const file = readFileSync(
    resolve('src/content/projects/acquisition-mosquee-nur.md'),
    'utf-8',
  )
  const frontmatter = file.split('---')[1]
  const data = yaml.load(frontmatter) as {
    objectif: number
    montant_leve: number
    derniere_maj: Date
  }
  const pourcentage =
    Math.round((data.montant_leve / data.objectif) * 100 * 10) / 10
  return {
    objectif: data.objectif,
    montant_leve: data.montant_leve,
    pourcentage,
    derniere_maj: new Date(data.derniere_maj).toISOString(),
  }
}

test('GET /api/projet-xhamia-nur returns project data', async ({ request }) => {
  const expected = loadProjectData()
  const response = await request.get('/api/projet-xhamia-nur')

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toBe('application/json')
  expect(response.headers()['access-control-allow-origin']).toBe('*')
  expect(response.headers()['cache-control']).toBe('public, max-age=3600')

  const data = await response.json()
  expect(data).toEqual(expected)
})
