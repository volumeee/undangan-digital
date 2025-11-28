-- Seed data for development and testing

-- Insert sample users (these would normally be created via auth)
INSERT INTO public.profiles (id, name, phone) VALUES
('00000000-0000-0000-0000-000000000001', 'John Doe', '+628123456789'),
('00000000-0000-0000-0000-000000000002', 'Jane Smith', '+628987654321');

-- Insert sample invitations
INSERT INTO public.invitations (
  slug,
  event_type,
  owner_id,
  title,
  groom,
  bride,
  date,
  location,
  story,
  gallery,
  theme_config,
  guest_count,
  active_days,
  total_price,
  status
) VALUES
(
  'wedding-john-jane-2024',
  'wedding',
  '00000000-0000-0000-0000-000000000001',
  'Pernikahan John & Jane',
  '{"name": "John Doe", "father": "Robert Doe", "mother": "Mary Doe", "photo": ""}',
  '{"name": "Jane Smith", "father": "William Smith", "mother": "Elizabeth Smith", "photo": ""}',
  '{"akad": "2024-12-15T09:00:00Z", "resepsi": "2024-12-15T19:00:00Z"}',
  '{"akad": "Masjid Jami Al-Hikmah, Jakarta", "resepsi": "Ballroom Hotel Grand Indonesia, Jakarta", "mapUrl": "https://maps.google.com/?q=Hotel+Grand+Indonesia"}',
  'Kisah cinta kami dimulai dari pertemanan yang tumbuh menjadi kasih sayang yang mendalam. Setelah 3 tahun berpacaran, kami memutuskan untuk menempuh hidup baru bersama.',
  ARRAY['https://picsum.photos/seed/wedding1/800/600.jpg', 'https://picsum.photos/seed/wedding2/800/600.jpg', 'https://picsum.photos/seed/wedding3/800/600.jpg'],
  '{"color": {"primary": "#d4a574", "secondary": "#8b7355", "background": "#faf8f5"}, "typography": {"headingFont": "Playfair Display", "bodyFont": "Montserrat"}, "background": {"type": "color", "value": "#faf8f5"}, "music": {"enabled": true, "autoplay": true, "showPlayer": true, "startVolume": 0.3, "url": ""}, "sections": {"akad": true, "resepsi": true, "loveStory": true, "gallery": true, "gift": true, "protocol": true, "liveStream": false}, "labels": {"akad": "Akad Nikah", "resepsi": "Resepsi", "loveStory": "Love Story", "gallery": "Galeri", "gift": "Hadiah", "protocol": "Protokol Kesehatan", "liveStream": "Live Stream"}, "animation": "slow", "locale": "id"}',
  150,
  30,
  325000,
  'published'
),
(
  'engagement-mike-sarah-2024',
  'engagement',
  '00000000-0000-0000-0000-000000000002',
  'Lamaran Mike & Sarah',
  '{"name": "Mike Johnson", "father": "David Johnson", "mother": "Sarah Johnson", "photo": ""}',
  '{"name": "Sarah Williams", "father": "James Williams", "mother": "Jennifer Williams", "photo": ""}',
  '{"akad": "2024-11-20T10:00:00Z"}',
  '{"akad": "Rumah Makan Padang Sederhana, Bandung", "mapUrl": "https://maps.google.com/?q=Rumah+Makan+Padang+Sederhana+Bandung"}',
  'Setelah setahun bersama, kami siap melangkah ke jenjang yang lebih serius. Doakan kami ya!',
  ARRAY['https://picsum.photos/seed/engagement1/800/600.jpg', 'https://picsum.photos/seed/engagement2/800/600.jpg'],
  '{"color": {"primary": "#8b7355", "secondary": "#d4a574", "background": "#f5f5f5"}, "typography": {"headingFont": "Dancing Script", "bodyFont": "Lato"}, "background": {"type": "color", "value": "#f5f5f5"}, "music": {"enabled": true, "autoplay": false, "showPlayer": true, "startVolume": 0.5, "url": ""}, "sections": {"akad": true, "resepsi": false, "loveStory": true, "gallery": true, "gift": false, "protocol": false, "liveStream": false}, "labels": {"akad": "Acara Lamaran", "resepsi": "Resepsi", "loveStory": "Our Story", "gallery": "Moments", "gift": "Gifts", "protocol": "Protocol", "liveStream": "Live"}, "animation": "slow", "locale": "id"}',
  50,
  7,
  200000,
  'published'
),
(
  'aqiqah-baby-ahmad-2024',
  'aqiqah',
  '00000000-0000-0000-0000-000000000001',
  'Aqiqah Baby Ahmad',
  '{"name": "Ahmad Rizki", "father": "Budi Santoso", "mother": "Siti Nurhaliza", "photo": ""}',
  null,
  '{"akad": "2024-12-01T09:00:00Z"}',
  '{"akad": "Masjid Al-Ikhlas, Tangerang", "mapUrl": "https://maps.google.com/?q=Masjid+Al-Ikhlas+Tangerang"}',
  'Alhamdulillah, kami bersyukur atas kelahiran putra pertama kami. Mohon doa untuk kesehatan dan masa depannya.',
  ARRAY['https://picsum.photos/seed/aqiqah1/800/600.jpg', 'https://picsum.photos/seed/aqiqah2/800/600.jpg', 'https://picsum.photos/seed/aqiqah3/800/600.jpg'],
  '{"color": {"primary": "#22c55e", "secondary": "#16a34a", "background": "#f0fdf4"}, "typography": {"headingFont": "Poppins", "bodyFont": "Inter"}, "background": {"type": "color", "value": "#f0fdf4"}, "music": {"enabled": false, "autoplay": false, "showPlayer": false, "startVolume": 0.3, "url": ""}, "sections": {"akad": true, "resepsi": false, "loveStory": false, "gallery": true, "gift": true, "protocol": false, "liveStream": false}, "labels": {"akad": "Acara Aqiqah", "resepsi": "Resepsi", "loveStory": "Love Story", "gallery": "Galeri", "gift": "Hadiah", "protocol": "Protocol", "liveStream": "Live"}, "animation": "fast", "locale": "id"}',
  100,
  14,
  260000,
  'published'
);

-- Insert sample guests
INSERT INTO public.guests (invitation_id, name, phone, email, group_name, status, unique_link) VALUES
(1, 'Andi Wijaya', '+628111111111', 'andi@example.com', 'Family', 'sent', 'https://undangan.mu/inv/wedding-john-jane-2024?to=andi-wijaya'),
(1, 'Siti Aminah', '+628222222222', 'siti@example.com', 'Friends', 'opened', 'https://undangan.mu/inv/wedding-john-jane-2024?to=siti-aminah'),
(1, 'Budi Pratama', '+628333333333', null, 'Coworkers', 'rsvp-yes', 'https://undangan.mu/inv/wedding-john-jane-2024?to=budi-pratama'),
(1, 'Dewi Lestari', '+628444444444', 'dewi@example.com', 'Family', 'pending', 'https://undangan.mu/inv/wedding-john-jane-2024?to=dewi-lestari'),
(2, 'Rudi Hermawan', '+628555555555', 'rudi@example.com', 'Friends', 'sent', 'https://undangan.mu/inv/engagement-mike-sarah-2024?to=rudi-hermawan'),
(2, 'Lisa Permata', '+628666666666', 'lisa@example.com', 'Family', 'rsvp-yes', 'https://undangan.mu/inv/engagement-mike-sarah-2024?to=lisa-permata');

-- Insert sample guest book entries
INSERT INTO public.guest_book (invitation_id, guest_name, message, photo, reaction, is_visible) VALUES
(1, 'Andi Wijaya', 'Selamat untuk John dan Jane! Semoga menjadi keluarga yang samawa selamanya. Aamiin.', null, '❤️', true),
(1, 'Siti Aminah', 'Masya Allah, pasangan yang serasi banget! Semoga pernikahannya lancar dan bahagia selalu.', null, '💕', true),
(1, 'Budi Pratama', 'Congrats bro! Semoga bahagia selalu bersama Jane. Sampai jumpa di hari H!', null, '🎉', true),
(1, 'Dewi Lestari', 'Selamat menempuh hidup baru kak Jane! Semoga menjadi istri yang sholehah dan bahagia selalu.', null, '🙏', true),
(2, 'Rudi Hermawan', 'Selamat ya Mike & Sarah! Semoga langgeng sampai maut memisahkan.', null, '🎊', true),
(2, 'Lisa Permata', 'Selamat untuk sahabatku Sarah! Semoga menjadi keluarga yang harmonis dan bahagia.', null, '💐', true);

-- Insert sample payments
INSERT INTO public.payments (id, invitation_id, order_id, amount, status, payment_type, transaction_id, payment_details) VALUES
('pay_wedding_001', 1, 'INV-1701234567890', 325000, 'success', 'credit_card', 'TXN-1234567890', '{"approval_code": "123456", "bank": "bni", "masked_card": "411111-1111"}'),
('pay_engagement_001', 2, 'INV-1701234567891', 200000, 'success', 'bank_transfer', 'TXN-1234567891', '{"va_number": "1234567890", "bank": "bca"}'),
('pay_aqiqah_001', 3, 'INV-1701234567892', 260000, 'pending', 'ewallet', null, '{"ewallet_type": "gopay", "phone": "+628123456789"}');