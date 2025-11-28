# Fix Cloudflare API Token Permission

## Error yang Terjadi:
```
Authentication error [code: 10000]
```

API Token Anda tidak punya permission untuk Cloudflare Pages.

## Informasi Account Anda:
- Email: **bagus251001@gmail.com**
- Account ID: **a66e2a7351ca758a188de37b70556b23**
- Role: Super Administrator ✅

## Solusi: Buat API Token Baru

### Langkah 1: Buat API Token dengan Permission yang Benar

1. **Buka API Tokens:**
   - Login ke: https://dash.cloudflare.com/profile/api-tokens
   - Klik **Create Token**

2. **Pilih Template:**
   - Scroll ke bawah, pilih template: **"Edit Cloudflare Workers"**
   - Klik **Use template**

3. **Pastikan Permissions:**
   Token ini otomatis punya permissions:
   - ✅ Account > Cloudflare Pages > Edit
   - ✅ Account > Account Settings > Read
   - ✅ User > User Details > Read

4. **Set Account Resources:**
   - Di bagian **Account Resources**
   - Pilih: **Bagus251001@gmail.com's Account** (atau All accounts)
   - Klik **Continue to summary**

5. **Create Token:**
   - Review permissions
   - Klik **Create Token**
   - **COPY TOKEN** (hanya muncul sekali!)

### Langkah 2: Update GitHub Secrets

1. Buka: **https://github.com/volumeee/undangan-digital/settings/secrets/actions**

2. **Update atau Add Secrets:**

   | Secret Name | Value | Keterangan |
   |-------------|-------|------------|
   | `CLOUDFLARE_API_TOKEN` | Token baru dari step 1 | Edit/Replace yang lama |
   | `CLOUDFLARE_ACCOUNT_ID` | `a66e2a7351ca758a188de37b70556b23` | ✅ Sudah benar |

### Langkah 3: Buat Project Cloudflare Pages

Setelah token baru di-set, buat project via dashboard:

1. **Buka Cloudflare Pages:**
   - https://dash.cloudflare.com/a66e2a7351ca758a188de37b70556b23/pages

2. **Create Project:**
   - Klik **Create application**
   - Pilih tab **Pages**
   - Klik **Upload assets**

3. **Set Project Name:**
   - Project name: **`undangan-digital`**
   - Klik **Create project**

4. **Upload Dummy atau Skip:**
   - Upload file index.html sederhana atau skip
   - Ini hanya untuk initialize project

### Langkah 4: Deploy via GitHub Actions

1. **Re-run Workflow:**
   - Buka: https://github.com/volumeee/undangan-digital/actions
   - Pilih workflow yang failed
   - Klik **Re-run all jobs**

2. **Atau Push Commit Baru:**
   ```bash
   cd "/home/baguse/Documents/New Folder/undangan-digital"
   git commit --allow-empty -m "Fix API token and retry deployment"
   git push origin main
   ```

## Verification: Test Token Locally

Untuk memastikan token baru work:

```bash
# Set token baru
export CLOUDFLARE_API_TOKEN="your_new_token"

# Test: list projects
npx wrangler pages project list

# Jika belum ada project, buat:
npx wrangler pages project create undangan-digital --production-branch=main
```

## Alternative: Gunakan API Key (Tidak Recommended)

Jika tetap gagal, bisa pakai Global API Key (tapi kurang secure):

1. Buka: https://dash.cloudflare.com/profile/api-tokens
2. Scroll ke **API Keys**
3. Klik **View** pada **Global API Key**
4. Verifikasi password
5. Copy key

Tapi **jangan** pakai ini di production, lebih baik fix API Token!

---

## Summary Checklist:

- [ ] Buat API Token baru dengan template "Edit Cloudflare Workers"
- [ ] Update `CLOUDFLARE_API_TOKEN` di GitHub Secrets
- [ ] Verify `CLOUDFLARE_ACCOUNT_ID` = `a66e2a7351ca758a188de37b70556b23`
- [ ] Buat project `undangan-digital` di Cloudflare Pages dashboard
- [ ] Re-run GitHub Actions workflow

**Setelah semua checklist done, deployment akan berhasil!** 🚀
