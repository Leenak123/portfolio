// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');

function openLightbox(src, title, issuer, year) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = title;
  document.getElementById('lightboxTitle').innerHTML = title;
  document.getElementById('lightboxIssuer').textContent = issuer;
  document.getElementById('lightboxYear').textContent = year;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== SCROLL & BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  highlightNav();
});

// ===== ACTIVE SIDEBAR HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const sidebarDots = document.querySelectorAll('.sidebar-dot');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  sidebarDots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.getAttribute('data-section') === current) {
      dot.classList.add('active');
    }
  });
}

// ===== PDF TOGGLE =====
function togglePdf(btn) {
  const panel = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.pdf-toggle.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    panel.classList.add('open');
  }
}

// ===== CONTACT FORM removed =====

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

document.querySelectorAll(
  '.skill-card, .cert-card, .timeline-item, .contact-item, .about-card, .stat'
).forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
  revealObserver.observe(el);
});
