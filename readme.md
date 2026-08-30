# Sistem Absensi RFID — IoT + Cloud Integration

Sistem absensi otomatis berbasis kartu RFID yang menghubungkan perangkat IoT (ESP32 + RFID Reader) dengan database cloud secara real-time. Siswa cukup menempelkan kartu, kehadiran tercatat otomatis lengkap dengan jam, tanpa pencatatan manual.

Dibangun dari nol: perakitan hardware, pemrograman firmware ESP32, hingga backend dan frontend web.

## Fitur

- **Absensi otomatis via RFID** — tap kartu, tercatat langsung ke database
- **Dashboard real-time** — rekap kehadiran dengan filter tanggal, pencarian nama, dan filter status
- **Sistem izin/sakit digital** — pengajuan dengan upload bukti foto surat, diverifikasi oleh guru
- **Riwayat per siswa** — histori kehadiran 30 hari terakhir
- **Statistik kehadiran** — visualisasi grafik bulanan
- **Manajemen data siswa** — tambah/hapus data siswa langsung dari web
- **Export ke Excel** — unduh rekap kehadiran
- **Sistem pelaporan** — form lapor kesalahan absen atau bug, ditinjau oleh guru
- **Autentikasi & otorisasi** — akses administratif dilindungi Supabase Auth + Row Level Security

## Arsitektur

```
[Kartu RFID] → [ESP32 + RC522] → HTTP POST → [Supabase (PostgreSQL + Auth + Storage)] ← [Web Dashboard]
```

Perangkat ESP32 membaca UID kartu, mencocokkannya dengan data siswa, lalu mengirim data kehadiran langsung ke database cloud melalui REST API — tanpa server perantara. Web dashboard membaca data dari sumber yang sama secara real-time.

## Tech Stack

| Layer | Teknologi |
|---|---|
| Firmware IoT | ESP32 (C++ / Arduino Framework), RC522 RFID Reader, LCD 1602 I2C |
| Backend | Supabase (PostgreSQL, Auth, Storage, Row Level Security) |
| Frontend | HTML, CSS, JavaScript (vanilla, tanpa framework) |
| Library JS | supabase-js, Chart.js, SheetJS (xlsx) |

## Keamanan

- Row Level Security (RLS) diterapkan di level database, bukan hanya di sisi tampilan
- Data sensitif (alasan izin, foto surat) hanya dapat diakses akun terautentikasi
- Proteksi terhadap XSS pada seluruh input pengguna
- Bucket penyimpanan foto bersifat privat, diakses melalui signed URL sementara

## Instalasi

### 1. Setup Database

Buat project di [Supabase](https://supabase.com), lalu jalankan skema SQL yang tersedia di `/database/schema.sql` melalui SQL Editor.

### 2. Setup Firmware ESP32

Buka `/firmware/absensi.ino` di Arduino IDE, sesuaikan:

```cpp
const char* WIFI_SSID = "nama_wifi_kamu";
const char* WIFI_PASSWORD = "password_wifi_kamu";
const char* SUPABASE_URL = "https://xxxxx.supabase.co";
const char* SUPABASE_KEY = "anon_public_key_kamu";
```

Board: **ESP32 Dev Module**. Library yang dibutuhkan: `MFRC522`, `LiquidCrystal I2C`.

### 3. Setup Web

Sesuaikan `SUPABASE_URL` dan `SUPABASE_KEY` di `script.js`, lalu buka `index.html` (bisa langsung via Live Server atau deploy ke hosting statis seperti Netlify).

## Skema Rangkaian

ESP32 terhubung ke RC522 (via SPI) dan LCD 1602 I2C (via I2C). Detail pin dan diagram tersedia di `/docs/skema-rangkaian.png`.

## Status

Prototype fungsional — telah diuji dengan perangkat fisik dan terhubung ke database produksi. Beberapa arah pengembangan lanjutan: absensi per jam pelajaran, notifikasi otomatis ke orang tua, dan autentikasi biometrik.

## Dibuat oleh

Erik Shandika — Siswa TKJ, fokus di Networking, Cybersecurity, dan AI.