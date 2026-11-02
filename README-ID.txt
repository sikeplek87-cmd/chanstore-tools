CHANSTORE TOOLS — PANDUAN CEPAT (HP ANDROID)
================================================

ISI
- Website statis, 12 halaman tools + beranda + halaman Tentang/Privasi/Kontak.
- SEO dasar: title, description, canonical, sitemap.xml, robots.txt, schema.
- Tidak membutuhkan database, VPS, Node.js, atau biaya hosting.
- Sebagian fitur memproses file di browser.
- QR Code memakai API pihak ketiga (QR Server), sehingga teks QR dikirim ke layanan tersebut.
- Kompres PDF BELUM AKTIF. Jangan mengiklankan fitur ini sebagai fitur jadi.
- Tidak ada akun admin atau panel admin karena website ini statis. Edit file lewat editor teks di HP.

PENTING SEBELUM ONLINE
1. Buka kontak.html dan ganti alamat email contoh.
2. Periksa domain canonical. Template ini disiapkan untuk https://chanstore.my.id.
3. Tes setiap tools di browser HP.
4. Fitur iklan masih berupa slot kosong. Jangan tempel kode iklan sebelum akun penyedia iklan disetujui.
5. Google AdSense tidak menjamin penerimaan atau penghasilan. Perlu konten bermanfaat, kebijakan lengkap, dan trafik.

CARA GRATIS ONLINE DENGAN CLOUDFLARE PAGES VIA HP
A. Siapkan akun GitHub dan Cloudflare (gratis).
B. Di GitHub, buat repository baru bernama chanstore-tools.
C. Upload semua ISI folder ZIP ini ke root repository (bukan folder ZIP-nya).
   Di HP: buka github.com lewat Chrome, aktifkan "Situs desktop" bila perlu.
D. Di Cloudflare Dashboard:
   Workers & Pages > Create > Pages > Connect to Git.
   Hubungkan GitHub dan pilih repository chanstore-tools.
   Framework preset: None.
   Build command: kosongkan.
   Build output directory: / (atau . sesuai tampilan dashboard).
   Klik Deploy.
E. Setelah deploy, Cloudflare memberi alamat sementara *.pages.dev. Tes alamat itu.
F. Sambungkan domain:
   Pages project > Custom domains > Set up a custom domain.
   Masukkan chanstore.my.id dan ikuti instruksi DNS Cloudflare.
   Jika domain dikelola di registrar lain, ubah nameserver ke nameserver yang diberikan Cloudflare, atau ikuti metode DNS yang ditampilkan dashboard.
   Jangan menghapus record email/MX jika domain dipakai untuk email. Ikuti instruksi Cloudflare dengan teliti.
G. Setelah domain aktif, buka https://chanstore.my.id/sitemap.xml.
H. Daftarkan https://chanstore.my.id di Google Search Console sebagai Domain property.
   Verifikasi dengan TXT record DNS yang diberikan Google.
   Kirim sitemap.xml.

CARA UPDATE DARI HP
- Edit file di repository GitHub melalui browser.
- Commit perubahan.
- Cloudflare Pages akan deploy ulang otomatis.

MONETISASI REALISTIS
- Trafik Google perlu waktu dan tidak dijamin. Fokus pada pengalaman pengguna dan konten orisinal.
- Ajukan AdSense hanya setelah situs punya konten berguna, navigasi, kontak, privasi, dan tidak ada halaman kosong/fitur palsu.
- Jangan klik iklan sendiri, jangan membeli trafik bot, dan jangan menjanjikan pendapatan.
- Affiliate hanya setelah mendaftar program resmi; beri disclosure bahwa link dapat menghasilkan komisi.
- Domain dan hosting gratis tidak berarti pendapatan otomatis.

FITUR AKTIF
Gabung PDF, gambar ke PDF, kompres gambar, ubah ukuran gambar, QR Code, link WhatsApp,
kalkulator diskon, kalkulator keuntungan, password generator, penghitung kata, konversi data.
Kompres PDF adalah placeholder dan belum aktif.
