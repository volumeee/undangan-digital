# Cara Membuat Cloudflare Pages Project

## Error yang Anda Alami:
```
Project not found. The specified project name does not match any of your existing projects.
```

Ini berarti project `undangan-digital` belum ada di Cloudflare Pages Anda.

## Solusi: Buat Project Manual di Dashboard

### Langkah 1: Login dan Buat Project

1. **Login ke Cloudflare Dashboard:**
   - Buka: https://dash.cloudflare.com/
   - Login dengan email yang sama dengan Account ID di GitHub Secrets

2. **Pilih Account yang Benar:**
   - Pastikan Anda login ke account yang Account ID-nya sudah di-set di GitHub Secrets
   - Lihat di sidebar, klik account dropdown jika punya multiple accounts

3. **Buka Pages:**
   - Klik **Workers & Pages** di sidebar kiri
   - Atau langsung ke: https://dash.cloudflare.com/?to=/:account/pages

4. **Create New Project:**
   - Klik **Create application**
   - Pilih tab **Pages**
   - Klik **Upload assets** (Direct Upload)

5. **Set Project Name:**
   - Project name: **`undangan-digital`** (harus PERSIS sama!)
   - Klik **Create project**

6. **Upload Dummy File (Temporary):**
   - Drag & drop file HTML sederhana atau skip
   - Ini hanya untuk create project, nanti akan di-override oleh GitHub Actions

### Langkah 2: Verifikasi Account ID

**PENTING:** Pastikan Account ID di GitHub Secrets sama dengan account yang baru buat project!

1. **Lihat Account ID di Cloudflare:**
   - Di Cloudflare Dashboard, pilih salah satu domain/site
   - Scroll ke bawah di sidebar kanan
   - Copy **Account ID** (format: `abc123def456...`)

2. **Bandingkan dengan GitHub Secrets:**
   - Buka: https://github.com/volumeee/undangan-digital/settings/secrets/actions
   - Edit `CLOUDFLARE_ACCOUNT_ID`
   - Pastikan nilainya SAMA PERSIS dengan Account ID di step 1

### Langkah 3: Verifikasi API Token

API Token harus punya permission untuk account yang benar:

1. **Cek API Token:**
   - Buka: https://dash.cloudflare.com/profile/api-tokens
   - Cari token yang dipakai untuk GitHub Actions

2. **Pastikan Permission:**
   - Account > Cloudflare Pages > Edit ✅
   - Pastikan token ini untuk account yang sama dengan Account ID

3. **Jika Ragu, Buat Token Baru:**
   - Klik **Create Token**
   - Pilih template **Edit Cloudflare Workers**
   - Atau custom dengan permissions:
     - Account Resources > Cloudflare Pages > Edit
   - Copy token baru
   - Update `CLOUDFLARE_API_TOKEN` di GitHub Secrets

### Langkah 4: Test Deployment

Setelah project dibuat dan secrets benar:

1. **Re-run GitHub Actions:**
   - Buka: https://github.com/volumeee/undangan-digital/actions
   - Pilih workflow yang failed
   - Klik **Re-run all jobs**

2. **Atau Push Commit Baru:**
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

## Troubleshooting

### Masih Error: "Project not found"
- ❌ Project name typo (harus `undangan-digital` persis)
- ❌ Account ID salah (check lagi di Cloudflare)
- ❌ API Token untuk account berbeda

### Error: "Insufficient permissions"
- ❌ API Token tidak punya permission Cloudflare Pages > Edit
- ✅ Buat token baru dengan template "Edit Cloudflare Workers"

### Cara Verify Project Sudah Ada:

```bash
# Set API token temporary
export CLOUDFLARE_API_TOKEN="your_token"

# List semua projects
npx wrangler pages project list
```

Harusnya muncul `undangan-digital` di list.

## Alternative: Buat Project via CLI

Jika Anda punya API token:

```bash
# Set token
export CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"

# Buat project
npx wrangler pages project create undangan-digital --production-branch=main

# Verify
npx wrangler pages project list
```

---

**Setelah project dibuat, GitHub Actions akan berhasil deploy!** 🚀
