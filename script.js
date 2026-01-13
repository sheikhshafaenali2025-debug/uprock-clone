// =====================
// Preloader animation
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader-section");

  // Hide preloader after sequence or on user interaction
  const hidePreloader = () => {
    if (!preloader) return;
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 400ms ease";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 420);
  };

  // Timeout fallback
  const preloaderTimeout = setTimeout(hidePreloader, 6500);

  // Allow user skip by click or keypress
  ["click", "keydown"].forEach(ev =>
    window.addEventListener(ev, () => {
      clearTimeout(preloaderTimeout);
      hidePreloader();
    }, { once: true })
  );
});

// =====================
// Header show/hide on scroll
// =====================
let lastScrollY = window.scrollY;
let header = document.querySelector(".header");
let animationState = "hidden";

// Start hidden for reveal effect
if (header) {
  header.classList.add("header-hidden");
}

function showHeader() {
  if (!header) return;
  header.classList.add("header-showing");
  header.classList.remove("header-hiding", "header-hidden");
  animationState = "showing";
  setTimeout(() => {
    header.classList.replace("header-showing", "header-shown");
    animationState = "shown";
  }, 600);
}

function hideHeader() {
  if (!header) return;
  header.classList.add("header-hiding");
  header.classList.remove("header-showing", "header-shown");
  animationState = "hiding";
  setTimeout(() => {
    header.classList.replace("header-hiding", "header-hidden");
    animationState = "hidden";
  }, 600);
}

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScrollY && animationState !== "hidden") {
    hideHeader();
  } else if (currentScroll < lastScrollY && animationState !== "shown") {
    showHeader();
  }
  lastScrollY = currentScroll;
});

// =====================
// IntersectionObserver fade-in for messages
// =====================
const messages = document.querySelectorAll(".message");
const msgObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);
messages.forEach(msg => msgObserver.observe(msg));

// =====================
// Navbar smooth scroll
// =====================
document.querySelectorAll(".nav_btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const selector = btn.getAttribute("href");
    const target = document.querySelector(selector);
    if (!target) return;

    // Compute offset accounting for header height
    const headerHeight = header?.getBoundingClientRect().height ?? 60;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: "smooth" });
  });
});

// =====================
// Stepper: How does it work? (with working Unsplash images)
// =====================
const steps = [
  {
    img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    title: "Turn on your device",
    text: "Hold the button and wait for the status animation."
  },
  {
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
    title: "Sync with the app",
    text: "Open the app and bring the device close to connect."
  },
  {
    img: "https://images.unsplash.com/photo-1522204502610-6cbf3a4b99b4?auto=format&fit=crop&w=800&q=80",
    title: "Personalize",
    text: "Choose a voice, name, and interaction preferences."
  },
  {
    img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
    title: "Communicate",
    text: "Double-click or say “Hello, Companion” to start."
  },
  {
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    title: "Reflect",
    text: "View summaries and insights in your profile."
  }
];

let idx = 0;
const imgEl = document.getElementById("how-image");
const textEl = document.getElementById("how-text");
const prevBtn = document.querySelector(".how-prev");
const nextBtn = document.querySelector(".how-next");
const dots = document.querySelectorAll(".dot");

function renderStep(i) {
  idx = i;
  if (imgEl) {
    imgEl.style.opacity = 0;
    setTimeout(() => {
      imgEl.src = steps[i].img;
      imgEl.style.opacity = 1;
    }, 200);
  }
  if (textEl)
    textEl.innerHTML = `<h4>${steps[i].title}</h4><p>${steps[i].text}</p>`;
  dots.forEach((d, di) => {
    d.classList.toggle("active", di === i);
    d.setAttribute("aria-selected", di === i ? "true" : "false");
  });
}

prevBtn?.addEventListener("click", () =>
  renderStep(Math.max(0, idx - 1))
);
nextBtn?.addEventListener("click", () =>
  renderStep(Math.min(steps.length - 1, idx + 1))
);
dots.forEach(d => d.addEventListener("click", () => renderStep(+d.dataset.step)));

renderStep(0);

// =====================
// Performance tweaks: pause offscreen videos
// =====================
const videos = document.querySelectorAll("video");
const videoObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const vid = entry.target;
      if (!(vid instanceof HTMLVideoElement)) return;
      if (entry.isIntersecting) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  },
  { threshold: 0.1 }
);
videos.forEach(v => videoObserver.observe(v));
