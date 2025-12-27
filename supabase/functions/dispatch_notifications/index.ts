import { serve } from 'std/server';

serve(async (req) => {
  try {
    const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN');
    const REPO_OWNER = Deno.env.get('GITHUB_REPO_OWNER');
    const REPO_NAME = Deno.env.get('GITHUB_REPO_NAME');
    const WORKFLOW_FILE = Deno.env.get('GITHUB_WORKFLOW_FILE') || 'process-notifications.yml';
    const REF = Deno.env.get('GITHUB_REF') || 'production';

    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) return new Response(JSON.stringify({ error: 'Missing GitHub env vars' }), { status: 500 });

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
    const body = JSON.stringify({ ref: REF });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.status === 204) {
      return new Response(JSON.stringify({ ok: true, message: 'Workflow dispatched' }), { status: 200 });
    }

    const text = await res.text();
    return new Response(JSON.stringify({ error: text }), { status: res.status });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});