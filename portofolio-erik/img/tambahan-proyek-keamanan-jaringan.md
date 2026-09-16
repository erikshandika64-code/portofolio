# Cara Menambahkan Proyek "Keamanan Jaringan (VLAN, ACL, Port Security)" ke Portofolio

## 1. Upload gambar
Taruh 9 file `.webp` yang sudah dikirim ke folder `img/` di project kamu (folder yang sama dengan `networking-vlan-ospf-topologi.webp` dll).

## 2. Tambahkan entri gallery di `script.js`
Cari baris `proj1: { title: ... }` di `script.js`, lalu tambahkan baris baru **setelahnya** (sebelum tanda kurung tutup objek):

```js
proj10: { title: 'Keamanan Jaringan Multi-Site (VLAN, ACL &amp; Port Security)', photos: ['img/keamanan-jaringan-topologi.webp','img/keamanan-jaringan-vlan-brief.webp','img/keamanan-jaringan-acl-config.webp','img/keamanan-jaringan-ping-antar-vlan.webp','img/keamanan-jaringan-ping-guest-blocked-1.webp','img/keamanan-jaringan-ping-guest-blocked-2.webp','img/keamanan-jaringan-ping-guest-staff.webp','img/keamanan-jaringan-ping-staff2-gateway.webp','img/keamanan-jaringan-ping-crosssite.webp'] }
```

## 3. Tambahkan grup baru + card di `index.html`
Cari bagian `<div class="project-group-label reveal">` yang isinya "Cybersecurity" (sekitar baris 397-448 di `index.html`). Tambahkan grup baru **sebelum** grup Cybersecurity itu (supaya proyek networking-security ini muncul duluan, tepat setelah proyek unggulan VLAN+OSPF):

```html
<div class="project-group-label reveal">
  <i class="fa-solid fa-network-wired"></i> Networking &amp; Security
</div>
<div class="projects-grid">
  <!-- Project: Keamanan Jaringan Multi-Site -->

  <div class="project-card reveal">
    <div
      class="project-card-shot"
      onclick="openProjectLightbox('proj10')"
      role="button"
      tabindex="0"
      aria-label="Lihat galeri screenshot Keamanan Jaringan Multi-Site"
    >
      <div class="project-shot-placeholder">
        <img
          src="img/keamanan-jaringan-topologi.webp"
          alt="Screenshot topologi Keamanan Jaringan Multi-Site dengan VLAN, ACL, dan Port Security di Cisco Packet Tracer"
          loading="lazy"
        />
      </div>
    </div>
    <div class="project-card-body">
      <div class="project-card-title-row">
        <i class="fa-solid fa-shield-halved project-card-icon"></i>
        <h3 class="project-card-title">Keamanan Jaringan Multi-Site</h3>
      </div>
      <span class="project-tag">Networking &amp; Security</span>
      <p class="project-card-desc">
        Masalah: sebuah kantor pusat dan cabang butuh jaringan yang
        tersegmentasi per departemen sekaligus aman dari akses lintas
        VLAN yang tidak seharusnya. Pendekatan: merancang topologi
        dua site di Cisco Packet Tracer dengan segmentasi VLAN (Admin,
        Staff, Server, Guest), port security (sticky MAC, violation
        shutdown) di setiap access port, Access Control List untuk
        membatasi VLAN Guest agar tidak bisa mengakses VLAN Admin dan
        Server, serta static routing multi-site melalui WAN. Seluruh
        skenario pengujian — konektivitas antar VLAN, pemblokiran ACL,
        dan komunikasi antar site — berhasil sesuai rancangan. Project
        ini melatih saya memahami keamanan jaringan berlapis
        (defense in depth), bukan cuma konektivitas dasar.
      </p>
      <div class="project-card-actions">
        <a
          href="#"
          target="_blank"
          rel="noopener"
          class="project-btn project-btn-full"
          >GitHub</a
        >
      </div>
    </div>
  </div>
</div>
```

**Catatan:**
- Ganti `href="#"` di tombol GitHub dengan link repo proyek ini kalau sudah kamu push ke GitHub.
- Urutan foto di gallery (`proj10`): topologi → VLAN brief → ACL config → ping antar VLAN → ping Guest diblokir (2x) → ping Guest ke Staff → ping gateway Site 2 → ping cross-site.
- Semua penamaan file & gaya deskripsi sudah disesuaikan dengan pola yang sudah ada di situs kamu (format "Masalah → Pendekatan → Hasil" seperti card Secure Login System).
