import type { APIRoute } from 'astro'
import { getProjectSummary } from '@/lib/content'

export const prerender = false

export const GET: APIRoute = async () => {
  const summary = await getProjectSummary()

  if (!summary) {
    return new Response(JSON.stringify({ error: 'Projet non trouvé' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(
    JSON.stringify({
      objectif: summary.total_objectif,
      montant_leve: summary.total_leve,
      pourcentage: summary.pourcentage_global,
      derniere_maj: summary.derniere_maj_globale,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    },
  )
}
