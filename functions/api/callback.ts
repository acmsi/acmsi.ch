interface Env {
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
}

interface Context {
  request: Request
  env: Env
}

interface GitHubTokenResponse {
  access_token?: string
  error?: string
  error_description?: string
}

function renderBody(
  status: 'success' | 'error',
  content: Record<string, unknown>,
): Blob {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `
  return new Blob([html])
}

export async function onRequest(context: Context): Promise<Response> {
  const { request, env } = context
  const client_id = env.GITHUB_CLIENT_ID
  const client_secret = env.GITHUB_CLIENT_SECRET

  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'acmsi-oauth',
          accept: 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      },
    )
    const result: GitHubTokenResponse = await response.json()

    if (result.error) {
      return new Response(
        renderBody('error', result as Record<string, unknown>),
        {
          headers: { 'content-type': 'text/html;charset=UTF-8' },
          status: 401,
        },
      )
    }

    return new Response(
      renderBody('success', { token: result.access_token, provider: 'github' }),
      {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 200,
      },
    )
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(message, { status: 500 })
  }
}
