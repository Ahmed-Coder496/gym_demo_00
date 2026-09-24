const NAV_LINKS = [
  ["About", "about.html"],
  ["Programs", "programs.html"],
  ["Membership", "membership.html"],
  ["Trainers", "trainers.html"],
  ["Results", "reviews.html"],
  ["Visit", "visit.html"],
  ["FAQ", "faq.html"],
  ["Contact", "contact.html"]
];

function renderSiteShell() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const header = document.getElementById("siteHeader");
  const footer = document.getElementById("siteFooter");
  const modal = document.getElementById("siteModal");

  if (header) {
    header.innerHTML = `<header class="nav" id="nav"><div class="nav__inner">
      <a href="index.html" class="nav__brand"><span class="nav__mark">IF</span><span class="nav__word">IRON<em>FORGE</em></span></a>
      <nav class="nav__links" id="navLinks">${NAV_LINKS.map(([label, href]) => `<a href="${href}" class="${currentPage === href ? "is-active" : ""}">${label}</a>`).join("")}</nav>
      <div class="nav__actions"><a href="tel:+923000000000" class="nav__phone"><span>+92 300 0000000</span></a><a href="trial.html" class="btn btn--rust nav__cta">Book free trial</a></div>
      <button class="nav__burger" id="navBurger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div></header>`;
  }

  if (footer) {
    footer.innerHTML = `<footer class="footer"><div class="footer__inner"><div class="footer__brand"><span class="nav__mark">IF</span><span class="nav__word">IRON<em>FORGE</em></span><p>Coach-led strength, conditioning and recovery training in Karachi.</p></div><div class="footer__col"><h4>Explore</h4><a href="about.html">About</a><a href="programs.html">Programs</a><a href="membership.html">Membership</a><a href="trainers.html">Trainers</a></div><div class="footer__col"><h4>Gym</h4><a href="reviews.html">Results</a><a href="visit.html">Visit</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div><div class="footer__col"><h4>Get in touch</h4><a href="tel:+923000000000">+92 300 0000000</a><a href="mailto:info@ironforge.pk">info@ironforge.pk</a><a href="visit.html">Khayaban-e-Shahbaz, DHA, Karachi</a></div></div><div class="footer__bottom"><span>© 2026 Ironforge. All rights reserved.</span></div></footer>`;
  }

  if (modal) {
    modal.innerHTML = `<div class="modal" id="successModal"><div class="modal__card"><div class="modal__check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none"/><path fill="none" d="M14 27l7 7 17-17"/></svg></div><h3>Trial session requested</h3><p>Thank you, <span id="modalName">there</span>. A coach will call you shortly to lock in your slot.</p><button class="btn btn--rust" id="modalClose">Done</button></div></div><a href="https://wa.me/923000000000" target="_blank" rel="noopener" class="float-wa" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32" width="26" height="26"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.6.8 5 2.1 7L3 29l6.7-2.3c1.9 1.1 4.1 1.7 6.3 1.7 7 0 12.7-5.6 12.7-12.6C28.7 8.6 23 3 16 3zm0 22.9c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.4 1.3-3.9-.3-.4a10.2 10.2 0 0 1-1.6-5.5C5.5 9.8 10.2 5.1 16 5.1S26.5 9.8 26.5 15.6 21.8 25.9 16 25.9zm5.8-7.6c-.3-.2-1.9-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.7 1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.6 2 .8 2.8.8 3.8.7.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5z"/></svg></a>`;
  }

  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  window.addEventListener("scroll", () => nav?.classList.toggle("is-scrolled", window.scrollY > 40), { passive: true });
  burger?.addEventListener("click", () => nav?.classList.toggle("is-open"));
  document.querySelectorAll(".nav__links a").forEach(link => link.addEventListener("click", () => nav?.classList.remove("is-open")));
}

renderSiteShell();
