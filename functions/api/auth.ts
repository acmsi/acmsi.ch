interface Env {
  GITHUB_CLIENT_ID: string
}

interface Context {
  request: Request
  env: Env
}

export async function onRequest(context: Context): Promise<Response> {
  const { request, env } = context
  const client_id = env.GITHUB_CLIENT_ID

  try {
    const url = new URL(request.url)
    const redirectUrl = new URL('https://github.com/login/oauth/authorize')
    redirectUrl.searchParams.set('client_id', client_id)
    redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback')
    redirectUrl.searchParams.set('scope', 'repo user')
    redirectUrl.searchParams.set(
      'state',
      crypto.getRandomValues(new Uint8Array(12)).join(''),
    )
    return Response.redirect(redirectUrl.href, 301)
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(message, { status: 500 })
  }
}
