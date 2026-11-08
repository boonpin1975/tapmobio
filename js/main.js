// ===================================================
// TAPMOBIO — Main JavaScript
// ===================================================

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Intersection Observer: fade-in animations ---- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .about-card, .tech-category, .process-step, .feature-item, .contact-detail'
);

// Set initial state
fadeElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${(index % 6) * 0.1}s, transform 0.6s ease ${(index % 6) * 0.1}s`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

/* ---- Hero stats counter animation ---- */
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = start + (target - start) * eased;

    if (el.dataset.suffix === '+') {
      el.textContent = Math.floor(current) + '+';
    } else if (el.dataset.suffix === 'M+') {
      el.textContent = (current / 1000000).toFixed(1).replace('.0', '') + 'M+';
    } else {
      el.textContent = el.dataset.original;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ---- Contact form submission handler ---- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = '⏳ Sending...';
    btn.disabled = true;

    // Simulate async submission
    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10B981, #06B6D4)';

      // Reset form
      this.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1500);
  });
}

/* ---- Tech pills hover sparkle effect ---- */
document.querySelectorAll('.tech-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.08)';
  });
  pill.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});

/* ---- Active nav link highlight on scroll ---- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        link.style.color = '#818CF8';
      } else {
        link.style.color = '';
      }
    }
  });
}, { passive: true });

console.log('%c📱 Tapmobio', 'color: #818CF8; font-size: 20px; font-weight: 900;');
console.log('%cAndroid App Developers — hello@tapmobio.com', 'color: #94A3B8; font-size: 12px;');

