import type { APIRoute } from 'astro'
import { GITHUB_CLIENT_ID } from 'astro:env/server'

export const prerender = false

export const GET: APIRoute = ({ url, redirect }) => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: url.origin + '/api/callback',
    scope: 'repo user',
    state: crypto.getRandomValues(new Uint8Array(12)).join(''),
  })

  return redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
  )
}
