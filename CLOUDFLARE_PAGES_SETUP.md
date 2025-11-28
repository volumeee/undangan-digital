# Cloudflare Pages Deployment Guide

This guide explains how to properly deploy the UndanganKu application to Cloudflare Pages.

## Important Notes

This project uses **Nuxt 3 with Cloudflare Pages preset**. The deployment process is different from Cloudflare Workers.

### Build Configuration

When Nuxt builds with `cloudflare-pages` preset, it generates:
- Static assets in `dist/` (client-side)
- Server functions in `dist/_worker.js/` (server-side rendering)
- Cloudflare Pages configuration files

## Cloudflare Pages Dashboard Setup

### 1. Connect Your Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Pages
2. Click "Create a project" > "Connect to Git"
3. Select your repository

### 2. Configure Build Settings

**IMPORTANT:** Use these exact settings:

- **Framework preset:** Nuxt.js (or select "None" and configure manually)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Deploy command:** Leave this **EMPTY** or use `npm run deploy`

### 3. Why Leave Deploy Command Empty?

The error you're seeing:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

This happens when someone sets the "Deploy command" to `npx wrangler deploy` (which is for Workers, not Pages).

**For Cloudflare Pages:**
- The platform automatically deploys the contents of your build output directory (`dist/`)
- You don't need a separate deploy command
- If you must use one, use: `npm run deploy` which runs `wrangler pages deploy dist`

### 4. Environment Variables

Set these in Cloudflare Pages > Settings > Environment variables:

**Production & Preview:**
- `NUXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NUXT_PUBLIC_SUPABASE_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key (Production only)
- `MIDTRANS_SERVER_KEY` - Midtrans server key
- `MIDTRANS_CLIENT_KEY` - Midtrans client key
- `FONNTE_API_KEY` - Fonnte WhatsApp API key
- `NODE_VERSION` - Set to `20` or `22`

### 5. Functions Configuration

Cloudflare Pages automatically enables Functions for your API routes when it detects them in your build output.

Your API routes in `server/api/` will be available at:
- `/api/payment/token`
- `/api/payment/notification`
- `/api/invitation/:slug`
- etc.

## Manual Deployment via CLI

If you prefer to deploy manually using the CLI:

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Application

```bash
npm run build
```

This creates the `dist/` directory with your Pages output.

### 3. Deploy to Cloudflare Pages

```bash
npm run deploy
```

Or directly:

```bash
npx wrangler pages deploy dist
```

You'll be prompted to:
1. Login to Cloudflare (if not already authenticated)
2. Select your account
3. Create or select a Pages project

## Continuous Deployment via GitHub Actions

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that:
1. Runs on push to `main` branch
2. Installs dependencies
3. Runs linting and type checking
4. Builds the application
5. Deploys to Cloudflare Pages using `cloudflare/pages-action@v1`

This is the recommended deployment method for production.

## Troubleshooting

### Error: "It looks like you've run a Workers-specific command in a Pages project"

**Solution:** Remove or fix the "Deploy command" in your Cloudflare Pages dashboard settings:
1. Go to Cloudflare Pages > Your Project > Settings > Build & deployments
2. Find "Deploy command"
3. Either leave it **empty** or set it to `npm run deploy`
4. Save and retry deployment

### Error: "Missing supabase url/key"

**Solution:** These warnings during build are normal if environment variables aren't set at build time. Make sure they're set in Cloudflare Pages dashboard for runtime.

### Error: Build output directory not found

**Solution:** Ensure your build command is `npm run build` and output directory is `dist` (not `.output/public`).

## Verification

After successful deployment:

1. **Check the build logs** - Should show successful Nitro build for cloudflare-pages preset
2. **Test static pages** - Your homepage and public pages should load
3. **Test SSR pages** - Dynamic invitation pages should render
4. **Test API routes** - Try calling `/api/payment/token` (should return 405 if GET is not allowed)
5. **Check Functions** - Cloudflare Pages > Your Project > Functions should show your API routes

## Migration from .output/public to dist

If you previously configured your project with `.output/public`:

1. Update Cloudflare Pages settings to use `dist` as output directory
2. Ensure `wrangler.toml` has `pages_build_output_dir = "dist"`
3. The `nuxt.config.ts` already uses `cloudflare-pages` preset which outputs to `dist`
4. Redeploy your project

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Nuxt Cloudflare Deployment](https://nuxt.com/deploy/cloudflare)
- [Nitro Cloudflare Pages Preset](https://nitro.unjs.io/deploy/providers/cloudflare)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## Support

If you continue to have issues:
1. Check the build logs in Cloudflare Pages dashboard
2. Verify all environment variables are set correctly
3. Ensure Node.js version is 20 or higher
4. Try a manual deployment via CLI to test locally first
