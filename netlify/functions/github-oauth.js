export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
  const redirectUri = `${url.origin}/.netlify/identity/callback`;

  if (url.pathname === "/.netlify/identity/callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Missing code", { status: 400 });
    }
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri
      })
    });
    const tokenData = await tokenRes.json();
    const html = `
<script>
window.opener.postMessage(${JSON.stringify(tokenData)}, "*");
window.close();
</script>
    `;
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  }
  return new Response("ok");
}
