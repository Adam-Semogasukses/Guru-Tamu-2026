/**
 * PORTFOLIO JAVASCRIPT ENGINE (ES6+)
 * Muhammad Adam Al Fatih - Siswa RPL SMK Telkom Lampung / Senior Web Developer
 * Replicating Carlos Sainz F1 dynamic architecture & micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. DATA REPOSITORY: PROJECTS & DETAILS
  const projectsData = {
    'telkom-attendance': {
      title: 'Telkom Smart Attendance (Presensi QR Code & Geofencing)',
      category: 'Sistem Sekolah & Fullstack',
      period: 'Tahun 2024 — Proyek Unggulan RPL',
      tech: ['PHP / Laravel', 'MySQL', 'JavaScript ES6', 'Camera QR Scanner', 'Tailwind CSS'],
      overview: 'Sistem presensi siswa digital real-time berbasis kode QR dinamis dengan enkripsi token berkala dan validasi geolokasi radius lingkungan SMK Telkom Lampung. Dibuat untuk menggantikan absensi manual kertas dengan keakuratan data presensi hingga detik.',
      features: [
        'Dynamic QR Code generator dengan refresh interval 15 detik (anti manipulasi tangkapan layar)',
        'Verifikasi geolokasi koordinat GPS SMK Telkom Lampung (radius akurat 50 meter)',
        'Dashboard real-time Guru Piket & Wali Kelas untuk memantau rekap ketidakhadiran (Hadir, Izin, Sakit, Alpa)',
        'Ekspor laporan bulanan otomatis format Excel & PDF untuk arsip kurikulum',
        'Notifikasi otomatis kehadiran langsung ke bot Telegram / WhatsApp orang tua'
      ],
      github: 'https://github.com/adam-alfatih/telkom-smart-attendance',
      demo: '#'
    },
    'digilib-telkom': {
      title: 'DigiLib SMK Telkom Lampung (Perpustakaan Digital)',
      category: 'Web App & Database',
      period: 'Tahun 2024 — Uji Kompetensi & Praktik',
      tech: ['JavaScript ES6', 'PHP Native OOP', 'MySQL Relational', 'HTML5 Semantic', 'CSS3 Grid'],
      overview: 'Platform perpustakaan daring dan peminjaman buku terintegrasi untuk civitas akademika SMK Telkom Lampung. Memfasilitasi katalog buku digital (E-Book), pencatatan sirkulasi peminjaman fisik dengan scan barcode buku, dan perhitungan denda otomatis.',
      features: [
        'Katalog buku interaktif dengan filter kategori (Teknologi, RPL, TKJ, Umum, Novel Edukatif)',
        'Sistem barcode scanner menggunakan webcam/kamera smartphone untuk proses peminjaman cepat',
        'Kalkulator denda otomatis keterlambatan pengembalian buku dengan reminder tenggat waktu',
        'Area baca E-Book online reader terproteksi hak cipta internal sekolah',
        'Analisis statistik buku terpopuler dan riwayat minat baca siswa'
      ],
      github: 'https://github.com/adam-alfatih/digilib-telkom-lampung',
      demo: '#'
    },
    'lms-taskhub': {
      title: 'RPL TaskHub & LMS (Learning Management System)',
      category: 'Fullstack Web App',
      period: 'Tahun 2023 — Kolaborasi Jurusan RPL',
      tech: ['Node.js', 'Express', 'JavaScript', 'Prisma ORM', 'CSS Glassmorphism'],
      overview: 'Portal pembelajaran daring terpadu untuk siswa jurusan Rekayasa Perangkat Lunak (RPL). Dilengkapi editor kode inline ringan, sistem unggah repositori tugas pemrograman, dan rubrik penilaian otomatis.',
      features: [
        'Sistem submission tugas pemrograman dengan integrasi link GitHub repositori & preview',
        'Inline code snippet viewer dengan syntax highlighting untuk memudahkan review guru produktif',
        'Forum diskusi tanya-jawab coding dan thread bug-fixing antar sesama siswa RPL',
        'Leaderboard poin keaktifan belajar siswa untuk meningkatkan motivasi belajar',
        'Autentikasi role-based bertingkat (Siswa, Guru Pembimbing, dan Admin Jurusan)'
      ],
      github: 'https://github.com/adam-alfatih/rpl-taskhub-lms',
      demo: '#'
    },
    'si-ukk-rpl': {
      title: 'SI-UKK RPL (Sistem Uji Kompetensi Keahlian)',
      category: 'Sistem Informasi Sekolah',
      period: 'Tahun 2024 — Standardisasi Kurikulum RPL',
      tech: ['PHP MVC', 'MySQL', 'JavaScript Charts', 'Bootstrap 5 / Custom CSS', 'FPDF Library'],
      overview: 'Aplikasi manajemen penilaian Uji Kompetensi Keahlian (UKK) untuk siswa kelas XII Rekayasa Perangkat Lunak SMK Telkom Lampung. Mengotomatiskan penilaian dari asesor eksternal industri dan asesor internal sekolah.',
      features: [
        'Input rubrik instrumen penilaian standar BNSP (Badan Nasional Sertifikasi Profesi)',
        'Perhitungan bobot nilai otomatis (Perencanaan, Proses Pembuatan, Pengujian, Presentasi)',
        'Penerbitan surat kelulusan kompetensi dan cetak sertifikat transkrip nilai UKK ber-QR legalitas',
        'Grafik statistik sebaran nilai kompetensi siswa per aspek pengujian'
      ],
      github: 'https://github.com/adam-alfatih/si-ukk-rpl-telkom',
      demo: '#'
    }
  };

  // 2. HEADER SCROLL & DYNAMIC FLOATING PILL
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. INTERSECTION OBSERVER FOR ACTIVE NAV LINK (SCROLL SPY)
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id], header[id]').forEach(sec => {
    navObserver.observe(sec);
  });

  // 4. MOBILE DRAWER NAVIGATION
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const isOpen = mobileNavDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav link
    mobileNavDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 5. LIVE WIB (LAMPUNG) CLOCK TICKER
  const liveClockElement = document.getElementById('liveClock');
  function updateLiveClock() {
    if (!liveClockElement) return;
    const now = new Date();
    // UTC+7 for Lampung / WIB
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const wibTime = new Date(utc + (3600000 * 7));

    const hours = String(wibTime.getHours()).padStart(2, '0');
    const minutes = String(wibTime.getMinutes()).padStart(2, '0');
    const seconds = String(wibTime.getSeconds()).padStart(2, '0');

    liveClockElement.textContent = `${hours}:${minutes}:${seconds} WIB`;
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // 6. ANIMATED NUMBER COUNTERS (TELEMETRY STATS)
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true;
          statNumbers.forEach(numEl => {
            const target = parseInt(numEl.getAttribute('data-target') || '0', 10);
            animateCount(numEl, target, 1600);
          });
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  function animateCount(element, target, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(easedProgress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    };
    window.requestAnimationFrame(step);
  }

  // 7. PROJECT FILTERING
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. PROJECT DETAIL MODAL DIALOG
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalPeriod = document.getElementById('modalPeriod');
  const modalOverview = document.getElementById('modalOverview');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalGithubLink = document.getElementById('modalGithubLink');

  document.querySelectorAll('.btn-detail-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project');
      const project = projectsData[projectId];

      if (project && projectModal) {
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalPeriod.textContent = project.period;
        modalOverview.textContent = project.overview;

        // Render features
        modalFeaturesList.innerHTML = '';
        project.features.forEach(feat => {
          const li = document.createElement('li');
          li.style.marginBottom = '0.5rem';
          li.style.color = '#d4d4d8';
          li.style.fontSize = '0.9rem';
          li.textContent = feat;
          modalFeaturesList.appendChild(li);
        });

        // Render tech chips
        modalTechStack.innerHTML = '';
        project.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-chip';
          span.textContent = t;
          modalTechStack.appendChild(span);
        });

        // GitHub link
        if (modalGithubLink) {
          modalGithubLink.setAttribute('href', project.github);
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 9. COPY EMAIL TO CLIPBOARD WITH TOAST
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3500);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'adam.alfatih.rpl@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email adam.alfatih.rpl@gmail.com berhasil disalin!');
      }).catch(() => {
        showToast('✓ adam.alfatih.rpl@gmail.com');
      });
    });
  }

  // 10. CONTACT FORM SUBMISSION SIMULATION
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>MENGIRIMKAN PESAN...</span>`;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('✓ Pesan terkirim! Terima kasih telah menghubungi Muhammad Adam Al Fatih.');
      }, 1200);
    });
  }

  // 11. REVEAL-ON-SCROLL ANIMATION OBSERVER
  const revealElements = document.querySelectorAll('.fade-in-section');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 12. SMOOTH SCROLL FOR ALL ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});
