Deploying dispatch_notifications Edge Function

1) Build & deploy function:
   - Install Supabase CLI and log in
   - From repo root: `supabase functions deploy dispatch_notifications --project-ref <your-project-ref>`

2) Set function secrets (required):
   - `supabase secrets set GITHUB_TOKEN=<token> GITHUB_REPO_OWNER=<owner> GITHUB_REPO_NAME=<repo> GITHUB_WORKFLOW_FILE=process-notifications.yml GITHUB_REF=production`

Notes:
- `GITHUB_TOKEN` must have `repo` or `workflow` scope to dispatch workflows (use a repo PAT stored as secret).
- Edge Function will POST to GitHub to trigger the `process-notifications.yml` workflow; the workflow uses repo secrets to run the job.
- Alternatively, you can call the Edge Function via curl: `curl -X POST https://<project>.functions.supabase.co/dispatch_notifications` (requires function is deployed and publicly accessible or authenticated via bearer token if you protected it).
