// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE NAV TOGGLE ──
const navToggle = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

function openMobileNav() {
  navLinksEl.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Tutup menu navigasi');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  navLinksEl.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Buka menu navigasi');
  document.body.style.overflow = '';
}
navToggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.contains('open');
  isOpen ? closeMobileNav() : openMobileNav();
});
navOverlay.addEventListener('click', closeMobileNav);
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinksEl.classList.contains('open')) {
    closeMobileNav();
    navToggle.focus();
  }
});
// Close mobile menu automatically if the viewport is resized to desktop width
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && navLinksEl.classList.contains('open')) {
    closeMobileNav();
  }
});

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── PROJECT DESCRIPTION "SELENGKAPNYA" TOGGLE ──
function setupDescToggle(el) {
  // remove any toggle button from a previous run (e.g. on resize)
  const existingBtn = el.nextElementSibling;
  if (existingBtn && existingBtn.classList.contains('desc-toggle')) {
    existingBtn.remove();
  }
  el.classList.remove('expanded');

  // measure full (unclamped) height vs current clamped height
  el.classList.add('measuring');
  const fullHeight = el.scrollHeight;
  el.classList.remove('measuring');
  const clampedHeight = el.clientHeight;

  if (fullHeight > clampedHeight + 4) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'desc-toggle';
    btn.textContent = 'Selengkapnya';
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const isExpanded = el.classList.toggle('expanded');
      btn.textContent = isExpanded ? 'Sembunyikan' : 'Selengkapnya';
      btn.setAttribute('aria-expanded', String(isExpanded));
    });
    el.insertAdjacentElement('afterend', btn);
  }
}

function initDescToggles() {
  document.querySelectorAll('.project-card-desc, .project-featured-desc').forEach(setupDescToggle);
}

window.addEventListener('load', initDescToggles);

let descResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(descResizeTimer);
  descResizeTimer = setTimeout(initDescToggles, 300);
});

// ── KEYBOARD SUPPORT FOR CLICKABLE CARDS (cert cards, project shots) ──
document.querySelectorAll('[role="button"][onclick]').forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});

// ── LIGHTBOX ──
const certData = {
  cert1: { title: 'Belajar Membuat Front-End Web untuk Pemula', sub: 'Dicoding Indonesia · 25 April 2026 · ID: 0LZ0YRO93X65' },
  cert2: { title: 'Belajar Dasar Pemrograman Web',             sub: 'Dicoding Indonesia · 15 Maret 2026 · ID: JMZVO9033XN9' },
  cert3: { title: 'Belajar Dasar Pemrograman JavaScript',      sub: 'Dicoding Indonesia · 19 April 2026' },
  cert4: { title: 'Belajar Dasar Cloud dan Gen Ai di AWS',     sub: 'Dicoding Indonesia · 08 Juli 2026 · ID: XYZ789ABC123' },
  cert5: { title: 'Memulai Pemograman dengan Python',     sub: 'Dicoding Indonesia · 21 Agustus 2026 · ID: GRX50GW9RZ0M' },
  cert6: { title: 'Belajar Penggunaan Generative AI',     sub: 'Dicoding Indonesia · 25 Mei 2026 · ID: 4EXGTD8OEPRL' },
};

// Setiap project bisa punya lebih dari 1 foto — tinggal tambah path di array "photos".
// Urutan foto mengikuti urutan di array ini (paling atas = foto pertama tampil).
const projectData = {
  proj1: { title: 'Simulasi Jaringan Enterprise dengan VLAN & OSPF',       photos: ['img/networking-vlan-ospf-topologi.webp','img/networking-vlan-ospf-3.webp','img/networking-vlan-ospf-2.webp','img/networking-vlan-ospf-4.webp','img/networking-vlan-ospf-5.webp','img/networking-vlan-ospf-6.webp','img/networking-vlan-ospf-7.webp'] },
  proj10: { title: 'Keamanan Jaringan Multi-Site (VLAN, ACL &amp; Port Security)', photos: ['img/keamanan-jaringan-topologi.webp','img/keamanan-jaringan-vlan-brief.webp','img/keamanan-jaringan-acl-config.webp','img/keamanan-jaringan-ping-antar-vlan.webp','img/keamanan-jaringan-ping-guest-blocked-1.webp','img/keamanan-jaringan-ping-guest-blocked-2.webp','img/keamanan-jaringan-ping-guest-staff.webp','img/keamanan-jaringan-ping-staff2-gateway.webp','img/keamanan-jaringan-ping-crosssite.webp'] },
  proj2: { title: 'Game Suit Gunting Kertas Batu',   photos: ['img/game-suit-batu-kertas.webp'] },
  proj3: { title: 'Rekap Nilai Rapor',               photos: ['img/rekap-nilai-rapor-1.webp', 'img/rekap-nilai-rapor-2.webp'] },
  proj4: { title: 'Deteksi Sandi Morse',             photos: ['img/computer-vision-morse-1.webp','img/computer-vision-morse-2.webp','img/computer-vision-morse-3.webp','img/computer-vision-morse-4.webp'] },
  proj5: { title: 'Website Profile Kabupaten',       photos: ['img/web-profil-sumedang.webp'] },
  proj6: { title: 'Caption AI UMKM',                 photos: ['img/caption-ai-umkm-1.webp','img/caption-ai-umkm-2.webp'] },
  proj7: { title: 'Dashboard AI UMKM',               photos: ['img/dashboard-umkm-ai-1.webp', 'img/dashboard-umkm-ai-2.webp'] },
  proj8: { title: 'Sistem Absensi RFID — Absensi Otomatis Berbasis IoT', photos: ['img/iot-rfid-absensi-1.webp','img/iot-rfid-absensi-2.webp','img/iot-rfid-absensi-3.webp','img/iot-rfid-absensi-4.webp','img/iot-rfid-absensi-5.webp','img/iot-rfid-absensi-6.webp','img/iot-rfid-absensi-7.webp'] },
  proj9: { title: 'Secure Login System (Python + Argon2)', photos: ['img/secure-login-argon2-menu.webp','img/secure-login-argon2-lockout.webp','img/secure-login-argon2-berhasil.webp'] }
};

let currentGallery = null;
let currentIndex = 0;

function openLightbox(id) {
  const data = certData[id];
  currentGallery = null; // sertifikat tidak pakai galeri multi-foto
  document.getElementById('lightbox-title').textContent = data.title;
  document.getElementById('lightbox-sub').textContent   = data.sub;

  const srcImg = document.getElementById(id + '-img');
  const lbImg  = document.getElementById('lightbox-img');
  const lbPh   = document.getElementById('lightbox-placeholder');

  if (srcImg) {
    lbImg.src = srcImg.src;
    lbImg.alt = srcImg.alt;
    lbImg.style.display = 'block';
    lbPh.style.display  = 'none';
  } else {
    lbImg.style.display = 'none';
    lbPh.style.display  = 'flex';
    document.getElementById('lightbox-placeholder-icon').textContent = '🏅';
    document.getElementById('lightbox-placeholder-text').textContent = 'Foto sertifikat belum ditambahkan';
  }

  setLightboxNavVisibility(false);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openProjectLightbox(id) {
  const data = projectData[id];
  currentGallery = data.photos;
  currentIndex = 0;
  document.getElementById('lightbox-title').textContent = data.title;
  renderGalleryImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderGalleryImage() {
  const lbImg = document.getElementById('lightbox-img');
  const lbPh  = document.getElementById('lightbox-placeholder');
  const sub   = document.getElementById('lightbox-sub');
  const dots  = document.getElementById('lightbox-dots');

  if (!currentGallery || currentGallery.length === 0) {
    lbImg.style.display = 'none';
    lbPh.style.display  = 'flex';
    document.getElementById('lightbox-placeholder-icon').textContent = '🖼️';
    document.getElementById('lightbox-placeholder-text').textContent = 'Screenshot belum ditambahkan';
    sub.textContent = '';
    setLightboxNavVisibility(false);
    return;
  }

  lbImg.src = currentGallery[currentIndex];
  lbImg.alt = '';
  lbImg.style.display = 'block';
  lbPh.style.display  = 'none';

  const multi = currentGallery.length > 1;
  sub.textContent = multi ? `Foto ${currentIndex + 1} dari ${currentGallery.length}` : '';
  setLightboxNavVisibility(multi);

  dots.innerHTML = '';
  if (multi) {
    currentGallery.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'lightbox-dot' + (i === currentIndex ? ' active' : '');
      dot.onclick = (e) => { e.stopPropagation(); currentIndex = i; renderGalleryImage(); };
      dots.appendChild(dot);
    });
  }
}

function setLightboxNavVisibility(show) {
  document.getElementById('lightbox-prev').style.display = show ? 'flex' : 'none';
  document.getElementById('lightbox-next').style.display = show ? 'flex' : 'none';
  document.getElementById('lightbox-dots').style.display  = show ? 'flex' : 'none';
}

function lightboxPrev(e) {
  e.stopPropagation();
  if (!currentGallery || currentGallery.length < 2) return;
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  renderGalleryImage();
}

function lightboxNext(e) {
  e.stopPropagation();
  if (!currentGallery || currentGallery.length < 2) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  renderGalleryImage();
}

function closeLightbox(e) {
  const lb = document.getElementById('lightbox');
  if (!e || e.target === lb || e.currentTarget.classList.contains('lightbox-close')) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.key === 'ArrowLeft')  lightboxPrev(e);
  if (e.key === 'ArrowRight') lightboxNext(e);
});

// ── LIGHTBOX SWIPE (mobile) ──
const lightboxInner = document.querySelector('.lightbox-inner');
let touchStartX = 0;
lightboxInner.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
lightboxInner.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx > 0) lightboxPrev(e); else lightboxNext(e);
  }
});

// ── CONTACT FORM ──
const contactForm    = document.getElementById('contact-form');
const nameInput       = document.getElementById('contact-name');
const emailInput      = document.getElementById('contact-email');
const messageInput    = document.getElementById('contact-message');
const formStatus      = document.getElementById('form-status');

function setFieldError(input, errorEl, message) {
  if (message) {
    input.classList.add('has-error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  } else {
    input.classList.remove('has-error');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = nameInput.value.trim();
  const email   = emailInput.value.trim();
  const message = messageInput.value.trim();
  const btn     = contactForm.querySelector('.form-btn');

  const errName    = document.getElementById('err-name');
  const errEmail   = document.getElementById('err-email');
  const errMessage = document.getElementById('err-message');

  setFieldError(nameInput, errName, name ? '' : 'Mohon isi nama Anda.');
  setFieldError(emailInput, errEmail, !email ? 'Mohon isi email Anda.' : (!isValidEmail(email) ? 'Masukkan email yang valid.' : ''));
  setFieldError(messageInput, errMessage, message ? '' : 'Mohon isi pesan Anda.');

  if (!name || !email || !isValidEmail(email) || !message) {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    return;
  }

  formStatus.textContent = '';
  formStatus.className = 'form-status';
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/mwvajqrr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      formStatus.textContent = '✓ Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.';
      formStatus.className = 'form-status success';
      contactForm.reset();
      btn.textContent = 'Kirim Pesan →';
      btn.disabled = false;
    } else {
      throw new Error('Gagal');
    }
  } catch {
    formStatus.textContent = 'Pesan gagal terkirim. Coba lagi ya!';
    formStatus.className = 'form-status error';
    btn.textContent = 'Kirim Pesan →';
    btn.disabled = false;
  }
});
                                                                         
