# Setup Auto Deployment ke Cloudflare Pages

Dokumen ini berisi langkah-langkah untuk mengaktifkan auto deployment ke Cloudflare Pages setiap kali Anda push ke branch `main`.

## ✅ Yang Sudah Dikonfigurasi

Project ini sudah memiliki:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Konfigurasi Nuxt untuk Cloudflare Pages (`nitro.preset: 'cloudflare-pages'`)
- ✅ Wrangler configuration (`wrangler.toml`)
- ✅ Build output directory yang benar (`dist`)

## 🔧 Yang Perlu Anda Setup

### 1. Dapatkan Cloudflare API Token dan Account ID

#### Cara Mendapatkan API Token:
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Klik profile icon (kanan atas) > **My Profile**
3. Pilih menu **API Tokens**
4. Klik **Create Token**
5. Pilih template **"Edit Cloudflare Workers"** atau **"Create Custom Token"**
6. Jika custom, berikan permissions:
   - Account > Cloudflare Pages > Edit
   - Zone > Zone > Read (optional)
7. Klik **Continue to summary** > **Create Token**
8. **COPY TOKEN** ini (hanya muncul sekali!)

#### Cara Mendapatkan Account ID:
1. Di Cloudflare Dashboard, pilih salah satu site/project Anda
2. Scroll kebawah di halaman Overview
3. Di sidebar kanan, lihat **Account ID** (biasanya berisi hash seperti `abc123def456...`)
4. Copy Account ID tersebut

### 2. Setup GitHub Secrets

1. Buka repository GitHub Anda: https://github.com/volumeee/undangan-digital
2. Klik **Settings** > **Secrets and variables** > **Actions**
3. Klik **New repository secret**
4. Tambahkan secrets berikut satu per satu:

| Secret Name | Nilai | Keterangan |
|-------------|-------|------------|
| `CLOUDFLARE_API_TOKEN` | Token dari langkah 1 | API token untuk deploy ke Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID dari langkah 1 | ID akun Cloudflare Anda |
| `SUPABASE_URL` | URL Supabase project | Contoh: https://xxxxx.supabase.co |
| `SUPABASE_ANON_KEY` | Anon/Public key Supabase | Bisa didapat di Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_KEY` | Service role key Supabase | ⚠️ **Jangan share!** Production only |
| `MIDTRANS_SERVER_KEY` | Server key Midtrans | Dari Midtrans Dashboard |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans | Dari Midtrans Dashboard |
| `FONNTE_API_KEY` | API key Fonnte | Untuk WhatsApp gateway |

**Catatan:** `GITHUB_TOKEN` sudah otomatis tersedia, tidak perlu ditambahkan manual.

### 3. Buat Project di Cloudflare Pages (Opsional tapi Direkomendasikan)

Walaupun GitHub Actions akan otomatis membuat project jika belum ada, lebih baik buat dulu secara manual:

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Klik **Pages** di sidebar
3. Klik **Create a project**
4. Pilih **Direct Upload** (bukan "Connect to Git")
5. Beri nama project: **`undangan-digital`** (harus sama dengan `projectName` di workflow)
6. Klik **Create project**

#### Tambahkan Environment Variables di Cloudflare Pages:

1. Buka project **undangan-digital** di Cloudflare Pages
2. Klik **Settings** > **Environment variables**
3. Tambahkan variable berikut untuk **Production** dan **Preview**:

| Variable Name | Nilai |
|---------------|-------|
| `NUXT_PUBLIC_SUPABASE_URL` | URL Supabase project |
| `NUXT_PUBLIC_SUPABASE_KEY` | Anon key Supabase |
| `SUPABASE_SERVICE_KEY` | Service role key (Production only) |
| `MIDTRANS_SERVER_KEY` | Server key Midtrans |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans |
| `FONNTE_API_KEY` | API key Fonnte |
| `NODE_VERSION` | `20` atau `22` |

### 4. Test Auto Deployment

1. Commit dan push perubahan ke branch `main`:
   ```bash
   git add .
   git commit -m "Setup auto deployment"
   git push origin main
   ```

2. Cek GitHub Actions:
   - Buka repository di GitHub
   - Klik tab **Actions**
   - Lihat workflow **"Deploy to Cloudflare Pages"** sedang berjalan
   - Tunggu sampai selesai (biasanya 2-5 menit)

3. Jika berhasil:
   - ✅ Build akan selesai dengan checkmark hijau
   - ✅ Aplikasi otomatis ter-deploy ke Cloudflare Pages
   - ✅ URL akan tersedia di format: `https://undangan-digital.pages.dev`

### 5. Troubleshooting

#### Error: "Failed to create deployment"
- ❌ **Penyebab:** API Token salah atau tidak punya permission
- ✅ **Solusi:** Buat ulang API Token dengan permission yang benar

#### Error: "Could not find account"
- ❌ **Penyebab:** Account ID salah
- ✅ **Solusi:** Cek kembali Account ID di Cloudflare Dashboard

#### Error: "Missing environment variables"
- ❌ **Penyebab:** Secrets di GitHub belum di-set
- ✅ **Solusi:** Pastikan semua secrets sudah ditambahkan di GitHub Settings

#### Build Success tapi Website Error 500
- ❌ **Penyebab:** Environment variables di Cloudflare Pages belum di-set
- ✅ **Solusi:** Tambahkan environment variables di Cloudflare Pages Settings

## 🚀 Workflow Auto Deployment

Setelah setup selesai, workflow otomatis berjalan ketika:

1. **Push ke branch `main`:**
   - Install dependencies
   - Run linting
   - Run type checking
   - Build aplikasi
   - Deploy ke Cloudflare Pages (Production)

2. **Pull Request ke branch `main`:**
   - Install dependencies
   - Run linting
   - Run type checking
   - Build aplikasi
   - **TIDAK** deploy (hanya test build)

## 📝 Custom Domain (Opsional)

Setelah deploy berhasil, Anda bisa menambahkan custom domain:

1. Di Cloudflare Pages project > **Custom domains**
2. Klik **Set up a custom domain**
3. Masukkan domain Anda (misal: `undanganku.com`)
4. Ikuti instruksi untuk setup DNS
5. Tunggu SSL certificate otomatis di-generate

## 🔄 Deployment Manual (Jika Perlu)

Jika ingin deploy manual tanpa GitHub Actions:

```bash
# Build project
npm run build

# Deploy ke Cloudflare Pages
npm run deploy
```

## 📚 Resource Tambahan

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Nuxt Cloudflare Deployment](https://nuxt.com/deploy/cloudflare)

---

**Selamat! Auto deployment Anda sudah siap! 🎉**

Setiap kali Anda push ke `main`, aplikasi akan otomatis ter-deploy ke Cloudflare Pages.
