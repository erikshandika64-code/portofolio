//  NAVBAR SCROLL 
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

//  REVEAL ON SCROLL 
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

//  PROJECT DESC TOGGLE ("Lihat selengkapnya") 
document.querySelectorAll('.project-card-desc').forEach(desc => {
  const btn = desc.nextElementSibling;
  if (!btn || !btn.classList.contains('project-desc-toggle')) return;

  // Sembunyikan tombol kalau teksnya gak kepotong 
  if (desc.scrollHeight <= desc.clientHeight + 1) {
    btn.classList.add('hidden');
    return;
  }

  btn.addEventListener('click', () => {
    const isExpanded = desc.classList.toggle('expanded');
    btn.textContent = isExpanded ? 'Sembunyikan' : 'Lihat selengkapnya';
  });
});

//  SKILL BARS ANIMATION 
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = (parseFloat(bar.dataset.width) * 100) + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => barObserver.observe(bar));

//  LIGHTBOX 
const certData = {
  cert1: { title: 'Belajar Membuat Front-End Web untuk Pemula', sub: 'Dicoding Indonesia · 25 April 2026 · ID: 0LZ0YRO93X65' },
  cert2: { title: 'Belajar Dasar Pemrograman Web',             sub: 'Dicoding Indonesia · 15 Maret 2026 · ID: JMZVO9033XN9' },
  cert3: { title: 'Belajar Dasar Pemrograman JavaScript',      sub: 'Dicoding Indonesia · 19 April 2026' },
  cert4: { title: 'Belajar Dasar Cloud dan Gen Ai di AWS',     sub: 'Dicoding Indonesia · 08 Juli 2026 · ID: XYZ789ABC123' },
};

//slide 
const projectData = {
  proj1: { title: 'Simulasi Jaringan Kantor Pusat-Cabang dengan VLAN dan OSPF',       photos: ['img/projek-cisco.png','img/cisco3.png','img/cisco2.png','img/cisco4.png','img/cisco5.png','img/cisco6.png','img/cisco7.png'] },
  proj2: { title: 'Game Suit Gunting Kertas Batu',   photos: ['img/suit.png'] },
  proj3: { title: 'Rekap Nilai Rapor',               photos: ['img/rekapnilai1.png', 'img/rekapnilai2.png'] },
  proj4: { title: 'Deteksi Sandi Morse',             photos: ['img/cv5.jpg','img/cv4.jpg','img/cv3.jpg','img/cv1.jpg'] },
  proj5: { title: 'Website Profile Kabupaten',       photos: ['img/web-sumedang.png'] },
  proj6: { title: 'Caption AI UMKM',                 photos: ['img/caption-ai.png','img/caption-ai2.png'] },
  proj7: { title: 'Dashboard AI UMKM',               photos: ['img/dashboard-umkm-ai.png', 'img/dashboard-umkm-ai2.png'] },
};

let currentGallery = null;
let currentIndex = 0;

function openLightbox(id) {
  const data = certData[id];
  currentGallery = null; 
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

//  LIGHTBOX SWIPE (mobile) 
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

//  CONTACT FORM 
document.querySelector('.form-btn').addEventListener('click', async () => {
  const name    = document.querySelector('.form-input[data-field="name"]').value.trim();
  const email   = document.querySelector('.form-input[data-field="email"]').value.trim();
  const message = document.querySelector('.form-textarea').value.trim();
  const btn     = document.querySelector('.form-btn');

  if (!name || !email) {
    alert('Mohon isi nama dan email terlebih dahulu.');
    return;
  }
  if (!message) {
    alert('Mohon isi pesan terlebih dahulu.');
    return;
  }

  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/mwvajqrr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      btn.textContent = '✓ Pesan Terkirim!';
      document.querySelector('.form-input[data-field="name"]').value = '';
      document.querySelector('.form-input[data-field="email"]').value = '';
      document.querySelector('.form-textarea').value = '';
      setTimeout(() => {
        btn.textContent = 'Kirim Pesan →';
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Gagal');
    }
  } catch {
    alert('Pesan gagal terkirim. Coba lagi ya!');
    btn.textContent = 'Kirim Pesan →';
    btn.disabled = false;
  }
});
