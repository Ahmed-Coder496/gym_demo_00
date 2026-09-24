const CONFIG = { JSON_ENDPOINT: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE" };

const PROGRAMS = [
  { name: "Strength & Power", desc: "Barbell-based programming to build raw strength, tracked and progressed every session.", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" },
  { name: "HIIT Conditioning", desc: "High-intensity circuits built for fat loss and cardiovascular capacity in 45 minutes.", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop" },
  { name: "Boxing & Combat", desc: "Pad work, bag rounds and technique drills led by a former competitive boxer.", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop" },
  { name: "Mobility & Recovery", desc: "Guided stretching, breathwork and recovery sessions to keep you training pain-free.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" }
];
const PLANS = [
  { name: "Basic", price: 8500, features: ["Full gym floor access", "Standard class timings", "Locker room access"], featured: false },
  { name: "Pro", price: 15000, features: ["Everything in Basic", "2 sessions/month with a coach", "Priority class booking", "Monthly progress check-in"], featured: true },
  { name: "Elite", price: 28000, features: ["Everything in Pro", "Weekly 1-on-1 coaching", "Custom nutrition plan", "Recovery room access"], featured: false }
];
const TRAINERS = [
  { name: "Omer Farooq", role: "Head Strength Coach", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop" },
  { name: "Zara Sheikh", role: "HIIT & Conditioning", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop" },
  { name: "Danish Iqbal", role: "Boxing Coach", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop" },
  { name: "Mahnoor Baig", role: "Mobility & Recovery", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&auto=format&fit=crop" }
];
const REVIEWS = [
  { name: "Zainab Farooq", city: "Member since 2023", stars: 5, quote: "Dropped 12kg in five months. The coach actually adjusts the plan every couple of weeks instead of ignoring you." },
  { name: "Hassan Ali", city: "Member since 2022", stars: 5, quote: "Booked the free trial on the site on a Tuesday, was training by Thursday. No pushy sales calls at all." },
  { name: "Nida Yousuf", city: "Member since 2024", stars: 5, quote: "The boxing sessions with Danish are brutal in the best way. First gym I've actually stuck with." },
  { name: "Umar Sheikh", city: "Member since 2021", stars: 4, quote: "Elite plan is worth it if you want real 1-on-1 attention — my form improved more in a month than in years alone." }
];
const FAQS = [
  { q: "Is the trial session really free?", a: "Yes — one full coached session, no card required and no obligation to sign up afterwards." },
  { q: "Do I need to be fit to start?", a: "No. Every program starts with an assessment so your coach scales the first sessions to your current level." },
  { q: "Can I freeze or cancel my membership?", a: "Yes, memberships can be paused for up to 30 days per year, and cancelled any time with 7 days' notice." },
  { q: "Are group classes included in every plan?", a: "Full floor and class access is included in all three plans — Pro and Elite add dedicated coach time on top." },
  { q: "What should I bring to my first session?", a: "Just gym clothes and a water bottle. Towels and equipment are provided on-site." }
];

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
}), { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.querySelectorAll(".stat__num").forEach(el => {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = Number(el.dataset.count); const start = performance.now();
    const tick = now => { const progress = Math.min((now - start) / 1400, 1); el.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * target).toLocaleString(); if (progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); observer.disconnect();
  }), { threshold: 0.5 });
  observer.observe(el);
});

const programsGrid = document.getElementById("programsGrid");
if (programsGrid) {
  programsGrid.innerHTML = PROGRAMS.map((program, index) => `<article class="program reveal" style="transition-delay:${(index % 4) * 0.08}s"><div class="program__media"><img src="${program.img}" alt="${program.name}" loading="lazy"></div><div class="program__body"><h3 class="program__name">${program.name}</h3><p class="program__desc">${program.desc}</p><div class="program__foot"><a href="trial.html?program=${encodeURIComponent(program.name)}" class="program__link">Book this program →</a></div></div></article>`).join("");
  programsGrid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

const plansGrid = document.getElementById("plansGrid");
if (plansGrid) {
  plansGrid.innerHTML = PLANS.map(plan => `<div class="plan reveal ${plan.featured ? "plan--featured" : ""}"><div><h3 class="plan__name">${plan.name}</h3><div class="plan__price">PKR ${plan.price.toLocaleString()}<small> /month</small></div></div><ul class="plan__features">${plan.features.map(feature => `<li>${feature}</li>`).join("")}</ul><div class="plan__cta"><a href="trial.html?plan=${encodeURIComponent(plan.name)}" class="btn ${plan.featured ? "btn--rust" : "btn--ghost"} btn--block">Choose ${plan.name}</a></div></div>`).join("");
  plansGrid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

const trainersGrid = document.getElementById("trainersGrid");
if (trainersGrid) {
  trainersGrid.innerHTML = TRAINERS.map((trainer, index) => `<div class="trainer reveal" style="transition-delay:${(index % 4) * 0.08}s"><div class="trainer__photo"><img src="${trainer.img}" alt="${trainer.name}" loading="lazy"></div><h3 class="trainer__name">${trainer.name}</h3><p class="trainer__role">${trainer.role}</p></div>`).join("");
  trainersGrid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

const reviewsTrack = document.getElementById("reviewsTrack");
if (reviewsTrack) reviewsTrack.innerHTML = REVIEWS.map(review => `<div class="review"><div class="review__stars">${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}</div><p class="review__quote">"${review.quote}"</p><div class="review__who"><span class="review__avatar">${review.name.charAt(0)}</span><div><strong>${review.name}</strong><span>${review.city}</span></div></div></div>`).join("");

const faqList = document.getElementById("faqList");
if (faqList) {
  faqList.innerHTML = FAQS.map(faq => `<div class="faq__item"><button class="faq__q" aria-expanded="false"><span>${faq.q}</span><span class="faq__q-icon"></span></button><div class="faq__a"><p>${faq.a}</p></div></div>`).join("");
  faqList.addEventListener("click", event => {
    const question = event.target.closest(".faq__q"); if (!question) return;
    const item = question.closest(".faq__item"); const open = item.classList.contains("is-open");
    faqList.querySelectorAll(".faq__item").forEach(element => { element.classList.remove("is-open"); element.querySelector(".faq__a").style.maxHeight = null; element.querySelector(".faq__q").setAttribute("aria-expanded", "false"); });
    if (!open) { item.classList.add("is-open"); item.querySelector(".faq__a").style.maxHeight = `${item.querySelector(".faq__a").scrollHeight}px`; question.setAttribute("aria-expanded", "true"); }
  });
}

const trialForm = document.getElementById("trialForm");
if (trialForm) {
  const programSelect = document.getElementById("fProgram"); const planSelect = document.getElementById("fPlan"); const dateInput = document.getElementById("fDate"); const timeSelect = document.getElementById("fTime");
  programSelect.innerHTML = `<option value="">Select a program</option>${PROGRAMS.map(program => `<option value="${program.name}">${program.name}</option>`).join("")}`;
  planSelect.innerHTML = `<option value="">Not sure yet</option>${PLANS.map(plan => `<option value="${plan.name}">${plan.name} — PKR ${plan.price.toLocaleString()}/mo</option>`).join("")}`;
  const params = new URLSearchParams(location.search); if (params.has("program")) programSelect.value = params.get("program"); if (params.has("plan")) planSelect.value = params.get("plan");
  dateInput.min = new Date().toISOString().split("T")[0];
  const updateSummary = () => { document.getElementById("sumProgram").textContent = programSelect.value || "—"; document.getElementById("sumSlot").textContent = dateInput.value ? `${dateInput.value} · ${timeSelect.value}` : "—"; };
  programSelect.addEventListener("change", updateSummary); dateInput.addEventListener("change", updateSummary); timeSelect.addEventListener("change", updateSummary); updateSummary();
  trialForm.addEventListener("submit", async event => {
    event.preventDefault(); const data = Object.fromEntries(new FormData(trialForm).entries()); const required = ["fName", "fPhone", "fEmail", "fProgram", "fDate"]; let valid = true;
    required.forEach(id => { const field = document.getElementById(id); const empty = !field.value.trim(); field.closest(".field")?.classList.toggle("has-error", empty); if (empty) valid = false; });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.fEmail) || data.fPhone.replace(/\D/g, "").length < 10) valid = false; if (!valid) return;
    const submit = document.getElementById("trialSubmit"); submit.classList.add("is-loading"); submit.disabled = true;
    try { if (CONFIG.JSON_ENDPOINT && !CONFIG.JSON_ENDPOINT.startsWith("PASTE_")) await fetch(CONFIG.JSON_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ name: data.fName, phone: data.fPhone, email: data.fEmail, program: data.fProgram, plan: data.fPlan, preferredDate: data.fDate, preferredTime: data.fTime, notes: data.fNotes, submittedAt: new Date().toISOString() }) }); document.getElementById("modalName").textContent = data.fName.split(" ")[0]; document.getElementById("successModal").classList.add("is-open"); trialForm.reset(); updateSummary(); } catch (error) { console.error("Trial booking submission failed:", error); alert("Something went wrong. Please try again or reach us on WhatsApp."); } finally { submit.classList.remove("is-loading"); submit.disabled = false; }
  });
  document.getElementById("modalClose")?.addEventListener("click", () => document.getElementById("successModal")?.classList.remove("is-open"));
}
