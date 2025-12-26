import type { APIRoute } from 'astro'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from 'astro:env/server'

export const prerender = false

export const GET: APIRoute = async ({ url, redirect }) => {
  const data = {
    code: url.searchParams.get('code'),
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
  }

  try {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const body = await response.json()

    const content = {
      token: body.access_token,
      provider: 'github',
    }

    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(content)}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      </script>
    `

    return new Response(script, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (err) {
    console.error(err)
    return redirect('/?error=oauth_failed')
  }
}
