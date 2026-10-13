
/* ---------- Navbar dropdown ---------- */
(function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const list = document.querySelector(".menu-list");
  if (!toggle || !list) return;

  const setOpen = (open) => {
    list.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!list.classList.contains("open"));
  });
  document.addEventListener("click", () => setOpen(false));
  list.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* ---------- Hero carousel ---------- */
(function initCarousel() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const slides = [...hero.querySelectorAll(".slide")];
  const dots = [...hero.querySelectorAll(".dot")];
  const INTERVAL = 5000;
  let index = 0;
  let timer = null;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle("active", n === index);
      s.setAttribute("aria-hidden", String(n !== index));
    });
    dots.forEach((d, n) => {
      d.classList.toggle("active", n === index);
      d.setAttribute("aria-current", n === index ? "true" : "false");
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => show(index + 1), INTERVAL);
  }
  function stop() {
    clearInterval(timer);
  }

  hero.querySelector(".arrow.prev").addEventListener("click", () => { show(index - 1); start(); });
  hero.querySelector(".arrow.next").addEventListener("click", () => { show(index + 1); start(); });
  dots.forEach((d, n) => d.addEventListener("click", () => { show(n); start(); }));

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);

  show(0);
  start();
})();

/* ---------- Show / hide password ---------- */
document.querySelectorAll(".show-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.textContent = showing ? "Show" : "Hide";
    btn.setAttribute("aria-pressed", String(!showing));
  });
});

/* ---------- Form helpers ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, message) {
  const msg = document.getElementById(input.id + "-error");
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (msg) msg.textContent = message || "";
}

/* ---------- Login ---------- */
(function initLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  const email = form.elements.email;
  const password = form.elements.password;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    if (!EMAIL_RE.test(email.value.trim())) {
      setError(email, "Enter a valid email address, like name@example.com.");
      ok = false;
    } else setError(email, "");

    if (password.value.length < 6) {
      setError(password, "Password must be at least 6 characters.");
      ok = false;
    } else setError(password, "");

    if (!ok) return;

    alert("Login successful");
    window.location.href = "home.html";
  });
})();

/* ---------- Register ---------- */
(function initRegister() {
  const form = document.getElementById("register-form");
  if (!form) return;

  const { name, email, password, confirm } = form.elements;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    if (name.value.trim().length < 2) { setError(name, "Enter your full name."); ok = false; }
    else setError(name, "");

    if (!EMAIL_RE.test(email.value.trim())) { setError(email, "Enter a valid email address, like name@example.com."); ok = false; }
    else setError(email, "");

    if (password.value.length < 6) { setError(password, "Password must be at least 6 characters."); ok = false; }
    else setError(password, "");

    if (confirm.value !== password.value) { setError(confirm, "Passwords don't match."); ok = false; }
    else setError(confirm, "");

    if (!ok) return;

    alert("Account created. Please sign in.");
    window.location.href = "login.html";
  });
})();
