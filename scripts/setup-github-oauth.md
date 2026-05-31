# GitHub OAuth App setup (one-time)

Create manually at: https://github.com/settings/developers

| Field | Value |
|-------|-------|
| Application name | `carclean2026blog-cms` |
| Homepage URL | `https://carclean2026blog.vercel.app` |
| Authorization callback URL | `https://carclean2026blog.vercel.app/api/callback` |

Then run (replace values):

```powershell
cd c:\Users\yu\Desktop\antiLP\project-integration\carclean2026blog
vercel link --project carclean2026blog --yes
echo YOUR_CLIENT_ID | vercel env add GITHUB_CLIENT_ID production
echo YOUR_CLIENT_SECRET | vercel env add GITHUB_CLIENT_SECRET production
vercel --prod
```
