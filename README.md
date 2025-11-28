# UndanganKu - Undangan Digital Premium Indonesia

Platform SaaS undangan digital modern dengan Nuxt 3, Supabase, Midtrans, dan WhatsApp Gateway.

## 🚀 Fitur Utama

- **Multi-Event Support**: Pernikahan, Lamaran, Aqiqah, Ulang Tahun, Corporate
- **Deep Customization Engine**: Kustomisasi warna, font, musik, layout tanpa kode
- **Real-Time Pricing Calculator**: Harga dinamis berdasarkan tamu dan durasi
- **WhatsApp Blast**: Kirim undangan ke ribuan tamu dengan satu klik
- **Guest Management**: RSVP, buku tamu digital, import/export CSV
- **Payment Integration**: Midtrans Snap untuk pembayaran aman
- **SEO Optimized**: SSR/SSG hybrid untuk performa terbaik
- **Responsive Design**: Mobile-first dengan preview real-time

## 🛠 Tech Stack

- **Frontend**: Nuxt 3.14+, Vue 3, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Database**: Supabase (PostgreSQL 15, Row Level Security)
- **Payment**: Midtrans Snap
- **WhatsApp**: Fonnte Gateway
- **Deployment**: Cloudflare Pages + Supabase Edge Functions

## 📦 Instalasi

1. Clone repository
```bash
git clone https://github.com/username/undangan-digital.git
cd undangan-digital
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env dengan credentials Anda
```

4. Setup Supabase
```bash
# Import migration dan seed data
supabase db push
```

5. Jalankan development server
```bash
npm run dev
```

## 🏗️ Struktur Proyek

```
├── components/
│   ├── builder/          # Builder components
│   ├── invitation/       # Public invitation components
│   └── ui/              # Reusable UI components
├── pages/
│   ├── builder/[slug]   # Invitation builder
│   ├── inv/[slug]       # Public invitation page
│   └── dashboard        # User dashboard
├── server/api/          # API routes
├── stores/              # Pinia stores
├── types/               # TypeScript definitions
└── supabase/           # Database migrations & seeds
```

## 💰 Model Harga

Formula: `totalPrice = basePrice + (guestCount × costPerPax) + (activeDays × costPerDay)`

- Base Price: Rp 75.000
- Cost per Pax: Rp 2.500 (10-2000 tamu)
- Cost per Day: Rp 1.000 (7-365 hari)

## 🔧 Konfigurasi

### Supabase Setup
1. Buat project baru di [Supabase](https://supabase.com)
2. Run migration dari `supabase/migrations/`
3. Setup storage policies untuk file uploads
4. Enable Row Level Security (RLS)

### Midtrans Setup
1. Buat account di [Midtrans](https://midtrans.com)
2. Konfigurasi Snap API
3. Set server key dan client key di environment variables

### WhatsApp Gateway (Fonnte)
1. Register di [Fonnte](https://fonnte.com)
2. Setup API key untuk blast messages

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy ke Cloudflare Pages
1. Connect repository ke Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `.output/public`
4. Setup environment variables

## 📱 Mobile Preview

Builder includes real-time mobile preview dengan postMessage communication untuk instant updates tanpa reload.

## 🎨 Tema & Kustomisasi

- 6 preset themes: Elegant Rose, Minimal Floral, Royal Gold, Rustic Wood, Modern Geometric, Vintage Lace
- Custom color palettes dengan HEX input
- Google Fonts integration (Playfair Display, Montserrat, Dancing Script, dll)
- Background patterns dan custom uploads
- Music autoplay dengan volume control

## 📊 Analytics & Monitoring

- Guest tracking dengan unique links
- RSVP analytics
- Real-time guest book dengan Supabase Realtime
- Payment status tracking

## 🔒 Security

- Row Level Security (RLS) di semua tabel
- Server-side payment token generation
- File upload validation
- Input sanitization
- CORS configuration

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes dengan conventional commits
4. Push ke branch
5. Create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file untuk details.

## 📞 Support

Untuk support atau pertanyaan:
- Email: support@undangan.ku
- Documentation: [docs.undangan.ku](https://docs.undangan.ku)
- Issues: [GitHub Issues](https://github.com/username/undangan-digital/issues)

---

Dibuat dengan ❤️ di Indonesia 🇮🇩