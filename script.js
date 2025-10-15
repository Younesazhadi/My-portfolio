/*
  Interactions du portfolio
  - Navigation fluide + lien actif
  - Menu mobile accessible
  - Révélation au scroll
  - Barres de progression animées
  - Effet machine à écrire
  - Form validation (client-side)
  - Mode sombre persistant (localStorage)
*/

// Utils: throttle for scroll handlers
function throttle(fn, wait) {
  let last = 0; let timeout;
  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timeout) { clearTimeout(timeout); timeout = null; }
      last = now; fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => { last = Date.now(); timeout = null; fn.apply(this, args); }, remaining);
    }
  };
}

// Smooth scroll and active link
const navLinks = Array.from(document.querySelectorAll('.nav__link'));
const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

function setActiveLink() {
  const scrollPos = window.scrollY + 120; // offset for sticky header
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    if (scrollPos >= sec.offsetTop) {
      const id = `#${sec.id}`;
      navLinks.forEach(a => a.removeAttribute('aria-current'));
      const active = navLinks.find(a => a.getAttribute('href') === id);
      if (active) active.setAttribute('aria-current', 'page');
      break;
    }
  }
}

navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu if open
        closeMobileMenu();
      }
    }
  });
});

window.addEventListener('scroll', throttle(setActiveLink, 100));
window.addEventListener('load', setActiveLink);

// Mobile menu toggle
const toggleBtn = document.querySelector('.nav__toggle');
const navList = document.getElementById('nav-list');

function closeMobileMenu() {
  if (!toggleBtn) return;
  navList?.classList.remove('is-open');
  toggleBtn.setAttribute('aria-expanded', 'false');
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    navList?.classList.toggle('is-open');
  });
}

// Reveal on scroll using IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress > span[data-width]');

const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 }) : null;

revealEls.forEach(el => io?.observe(el));

// Animate progress bars when skills section visible
const skillsSection = document.getElementById('competences');
if (skillsSection) {
  const skillsObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width') || '0%';
          // trigger reflow to restart transition
          bar.style.width = '0%';
          requestAnimationFrame(() => requestAnimationFrame(() => { 
            bar.style.width = targetWidth;
          }));
        });
        observer.unobserve(skillsSection);
      }
    });
  }, { threshold: 0.24 }) : null;
  skillsObserver?.observe(skillsSection);
}

// Typewriter effect
function typewriter(el, text, speed = 80, delay = 300) {
  if (!el) return;
  el.textContent = '';
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent = text.slice(0, i++);
      if (i > text.length) clearInterval(timer);
    }, speed);
  }, delay);
}

const tw = document.querySelector('.typewriter');
if (tw) typewriter(tw, tw.getAttribute('data-text') || 'YOUNES EL AZHADI');

// Robust avatar loader: try several filenames then fallback
const avatarImg = document.querySelector('.avatar');
if (avatarImg) {
  const candidates = [
    'assets/portrait.jpg',
    'assets/portrait.jpeg',
    'assets/portrait.png',
    'assets/portrait.JPG',
    'assets/portrait.PNG',
    'assets/portrait-placeholder.svg'
  ];
  let idx = 0;
  const tried = new Set();
  function tryNext() {
    while (idx < candidates.length && tried.has(candidates[idx])) idx++;
    if (idx < candidates.length) {
      tried.add(candidates[idx]);
      avatarImg.src = candidates[idx] + (idx < candidates.length - 1 ? `?v=${Date.now()}` : '');
    }
  }
  avatarImg.addEventListener('error', () => {
    idx++;
    tryNext();
  });
  // If initial src differs from first candidate, keep it, otherwise start the sequence
  const initial = avatarImg.getAttribute('src') || '';
  if (initial.includes('assets/portrait.jpg')) {
    tryNext();
  }
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  localStorage.setItem('theme', theme);
  if (themeToggle) themeToggle.querySelector('.theme-toggle__icon').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Initialize theme: localStorage -> system preference -> default light
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  setTheme(storedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

themeToggle?.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
});

// removed layout toggle logic

// Contact form removed - now using direct contact cards


// Sélection du bouton
const btnUp = document.getElementById("btnUp");

// Quand on scroll vers le bas de 200px -> afficher le bouton
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btnUp.style.display = "block";
  } else {
    btnUp.style.display = "none";
  }
};

// Quand on clique -> remonter en haut en douceur
btnUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
