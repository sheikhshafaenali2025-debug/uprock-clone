// Preloader logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-triggered animations
const animatedElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
animatedElements.forEach(el => observer.observe(el));

// Fade/zoom effect on hero background
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollY = window.scrollY;
  hero.style.transform = `scale(${1 + scrollY * 0.0005})`;
  hero.style.opacity = `${1 - scrollY * 0.0003}`;
});

// Back to Top button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
backToTopBtn.addEventListener('click', () => {
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});

// Highlight active nav link + fade section backgrounds
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
      // Fade in active section background
      if (section.classList.contains('section-bg')) {
        section.classList.add('active');
      }
    } else {
      if (section.classList.contains('section-bg')) {
        section.classList.remove('active');
      }
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});
// Custom cursor movement
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.background = 'rgba(250, 204, 21, 0.2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '25px';
    cursor.style.height = '25px';
    cursor.style.background = 'transparent';
  });
});