const STORAGE_KEY = "invitationData";

function readFromPage() {
  const el = (id) => document.getElementById(id);
  const text = (id) => el(id)?.textContent?.trim() ?? "";
  const htmlToText = (id) => {
    const node = el(id);
    if (!node) return "";
    const temp = document.createElement('div');
    temp.innerHTML = node.innerHTML || "";
    // Normalize line breaks from <br> to \n
    temp.querySelectorAll('br').forEach(b => b.replaceWith('\n'));
    return (temp.textContent || '').trim();
  };
  const linkText = (id, prefix) => {
    const node = el(id);
    if (!node) return "";
    const href = node.getAttribute("href") || "";
    if (href.startsWith(prefix)) return href.slice(prefix.length).trim();
    return node.textContent?.trim() ?? "";
  };
  const heroParts = text("hero-date-line").split("·").map((s) => s.trim());

  return {
    brideName: text("bride-name"),
    groomName: text("groom-name"),
    inviteLabel: text("invite-label"),
    inviteText: text("invite-text"),
    weddingDate: text("wedding-date") || heroParts[0] || "",
    weddingYear: text("wedding-year") || heroParts[1] || "",
    weddingTime: text("wedding-time"),
    countdownISO: el("countdown-iso")?.value?.trim() || "",
    venueName: text("venue-name"),
    venueAddress: htmlToText("venue-address"),
    mapDirectionsAddress: "",
    rsvpLabel: text("rsvp-label"),
    rsvpContact: linkText("rsvp-contact", "mailto:"),
    rsvpPhone: linkText("rsvp-phone", "tel:"),
    detailVenue: htmlToText("detail-venue"),
    detailTime: htmlToText("detail-time"),
    detailDress: text("detail-dress"),
    detailReception: htmlToText("detail-reception"),
    mapVenue: text("map-venue"),
    galleryCaption1: text("gallery-caption-1"),
    galleryCaption2: text("gallery-caption-2"),
    galleryCaption3: text("gallery-caption-3"),
    galleryCaption4: text("gallery-caption-4"),
  };
}

function getDefaultConfig() {
  const c = window.INVITATION_CONFIG || {};
  return {
    brideName: c.brideName || "Bride",
    groomName: c.groomName || "Groom",
    inviteLabel: c.inviteLabel || "",
    inviteText: c.inviteText || "",
    weddingDate: c.weddingDate || "",
    weddingYear: c.weddingYear || "",
    weddingTime: c.weddingTime || "",
    countdownISO: c.countdownISO || "2026-09-27T10:30:00+05:30",
    venueName: c.venueName || "",
    venueAddress: c.venueAddress || "",
    mapDirectionsAddress:
      c.mapDirectionsAddress ||
      "SS Mahal, 191, Pammal Main Rd, Lakshmi Narayana Nagar, Pammal, Chennai, Tamil Nadu 600075",
    mapVenue: c.mapVenue || c.venueName || "",
    mapLatitude: c.mapLatitude ?? 12.9754,
    mapLongitude: c.mapLongitude ?? 80.132,
    mapGoogleUrl: c.mapGoogleUrl || "",
    bismillah: c.bismillah || "",
    bismillahEnglish: c.bismillahEnglish || "",
    countdownSubtitle: c.countdownSubtitle || "until our Nikah",
    invitationDua:
      c.invitationDua ||
      "May Allah bless this union and grant us a life filled with peace, mercy, and love.",
    footerDua: c.footerDua || "",
    footerThanks: c.footerThanks || "",
    rsvpLabel: c.rsvpLabel || "",
    rsvpContact: c.rsvpContact || "",
    rsvpPhone: c.rsvpPhone || "",
    detailVenue: c.detailVenue || "",
    detailTime: c.detailTime || "",
    detailDress: c.detailDress || "",
    detailReception: c.detailReception || "",
    galleryCaption1: c.galleryCaption1 || "",
    galleryCaption2: c.galleryCaption2 || "",
    galleryCaption3: c.galleryCaption3 || "",
    galleryCaption4: c.galleryCaption4 || "",
    // hero media
    heroVideo: c.heroVideo || "",
    heroPoster: c.heroPoster || "",
  };
}

function mergeNonEmpty(base, overrides) {
  const out = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== "" && value !== null && value !== undefined) out[key] = value;
  }
  return out;
}

function loadData() {
  const base = mergeNonEmpty(getDefaultConfig(), readFromPage());
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed._savedFromEditor === true) {
        const { _savedFromEditor, ...savedData } = parsed;
        return mergeNonEmpty(base, savedData);
      }
    }
  } catch (_) {}
  return base;
}

function displayAddress(data) {
  return (data.venueAddress || "").trim();
}

function nl2br(text) {
  return String(text || "").replace(/\n/g, "<br>");
}

function updateDisplay(data) {
  const couple = `${data.groomName} & ${data.brideName}`;
  const shortAddr = displayAddress(data);

  document.getElementById("bride-name").textContent = data.brideName;
  document.getElementById("groom-name").textContent = data.groomName;
  document.getElementById("nav-brand").textContent = couple;
  document.getElementById("footer-names").textContent = couple;
  const envelopeNames = document.getElementById("envelope-names");
  if (envelopeNames) envelopeNames.textContent = couple;

  document.getElementById("invite-label").textContent = data.inviteLabel;
  document.getElementById("invite-text").textContent = data.inviteText;
  document.getElementById("hero-date-line").textContent =
    `${data.weddingDate} · ${data.weddingYear}`;
  document.getElementById("wedding-date").textContent = data.weddingDate;
  document.getElementById("wedding-year").textContent = data.weddingYear;
  document.getElementById("wedding-time").textContent = data.weddingTime;
  document.getElementById("venue-name").textContent = data.venueName;
  document.getElementById("venue-address").innerHTML = nl2br(shortAddr);

  const showcaseName = document.getElementById("venue-showcase-name");
  const showcaseMeta = document.getElementById("venue-showcase-meta");
  if (showcaseName) showcaseName.textContent = data.venueName;
  if (showcaseMeta) showcaseMeta.textContent = `27 September ${data.weddingYear} · 10:30 AM`;

  const rsvpLabelEl = document.getElementById("rsvp-label");
  if (rsvpLabelEl) rsvpLabelEl.textContent = data.rsvpLabel;
  const emailEl = document.getElementById("rsvp-contact");
  if (emailEl) {
    emailEl.textContent = data.rsvpContact;
    emailEl.href = `mailto:${data.rsvpContact}`;
  }
  const phoneEl = document.getElementById("rsvp-phone");
  if (phoneEl) {
    phoneEl.textContent = data.rsvpPhone;
    phoneEl.href = `tel:${(data.rsvpPhone || "").replace(/\s/g, "")}`;
  }

  document.getElementById("detail-venue").innerHTML = nl2br(data.detailVenue);
  document.getElementById("detail-time").innerHTML = nl2br(data.detailTime);
  document.getElementById("detail-dress").textContent = data.detailDress;
  document.getElementById("detail-reception").innerHTML = nl2br(data.detailReception);

  document.getElementById("map-venue").textContent = data.mapVenue;
  document.getElementById("map-address").textContent = shortAddr.replace(/\n/g, ", ");

  const countdownUntil = document.getElementById("countdown-until");
  if (countdownUntil) countdownUntil.textContent = data.countdownSubtitle || "until our Nikah";

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  };
  setText("envelope-bismillah", data.bismillah);
  setText("envelope-bismillah-en", data.bismillahEnglish);
  setText("hero-bismillah", data.bismillah);
  setText("invitation-dua", data.invitationDua);
  setText("footer-dua", data.footerDua);
  setText("footer-thanks", data.footerThanks);

  document.getElementById("gallery-caption-1").textContent = data.galleryCaption1;
  document.getElementById("gallery-caption-2").textContent = data.galleryCaption2;
  document.getElementById("gallery-caption-3").textContent = data.galleryCaption3;
  document.getElementById("gallery-caption-4").textContent = data.galleryCaption4;

  // Hero media: update video source & poster
  try {
    const video = document.querySelector('.hero-video');
    if (video) {
      const srcNode = video.querySelector('source');
      if (data.heroVideo) {
        if (srcNode) srcNode.src = data.heroVideo;
        else video.insertAdjacentHTML('afterbegin', `<source src="${data.heroVideo}" type="video/mp4">`);
      }
      if (data.heroPoster) video.setAttribute('poster', data.heroPoster);
      const fallback = video.querySelector('.hero-video-fallback');
      if (fallback) fallback.src = data.heroPoster || fallback.src;
      video.load && video.load();
    }
  } catch (e) {
    // ignore
  }

  document.title = `Wedding ${couple}`;

  const isoInput = document.getElementById("countdown-iso");
  if (isoInput && data.countdownISO) isoInput.value = data.countdownISO;
}

let venueMap = null;

function renderVenueMap(data) {
  const mapElement = document.getElementById("venue-map");
  if (!mapElement) return;

  if (!window.L) {
    mapElement.textContent = "Interactive map unavailable. Use Open in Google Maps below.";
    mapElement.classList.add("map-unavailable");
    return;
  }

  const latitude = parseFloat(data.mapLatitude) || 12.9754;
  const longitude = parseFloat(data.mapLongitude) || 80.132;

  if (venueMap) venueMap.remove();
  mapElement.textContent = "";
  mapElement.classList.remove("map-unavailable");

  venueMap = window.L.map(mapElement, {
    center: [latitude, longitude],
    zoom: 16,
    scrollWheelZoom: false,
    zoomControl: true,
  });

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(venueMap);

  window.L.marker([latitude, longitude], {
    title: data.mapVenue || "SS Mahal Pammal",
    alt: data.mapVenue || "SS Mahal Pammal",
  }).addTo(venueMap);

  setTimeout(() => venueMap?.invalidateSize(), 250);
}

let countdownTimer = null;

function resolveCountdownTarget(isoString) {
  if (isoString) {
    const parsed = new Date(isoString).getTime();
    if (!Number.isNaN(parsed)) return parsed;
  }
  return new Date(2026, 8, 28, 10, 30, 0).getTime();
}

function startCountdown(isoString) {
  const target = resolveCountdownTarget(isoString);
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");
  if (!daysEl) return;

  function pulseIfChanged(el, value) {
    const next = String(value).padStart(2, "0");
    if (el.textContent === next) return;
    el.textContent = next;
    el.classList.remove("tick");
    void el.offsetWidth;
    el.classList.add("tick");
  }

  function tick() {
    const diff = Math.max(0, target - Date.now());
    pulseIfChanged(daysEl, Math.floor(diff / 86400000));
    pulseIfChanged(hoursEl, Math.floor((diff % 86400000) / 3600000));
    pulseIfChanged(minutesEl, Math.floor((diff % 3600000) / 60000));
    pulseIfChanged(secondsEl, Math.floor((diff % 60000) / 1000));
  }

  tick();
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(tick, 1000);
}

const music = {
  audio: null,
  toggle: null,
  targetVolume: 0.55,
  fadeTimer: null,
  init() {
    this.audio = document.getElementById("bg-music");
    this.toggle = document.getElementById("music-toggle");
    if (!this.audio || !this.toggle) return;
    this.audio.volume = 0;
    this.toggle.addEventListener("click", () => {
      if (this.audio.paused) this.play();
      else this.pause();
    });
  },
  fadeTo(target, onDone) {
    if (!this.audio) return;
    if (this.fadeTimer) clearInterval(this.fadeTimer);
    const step = (target - this.audio.volume) / 24;
    this.fadeTimer = setInterval(() => {
      let v = this.audio.volume + step;
      if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
        v = target;
        clearInterval(this.fadeTimer);
        this.fadeTimer = null;
        if (onDone) onDone();
      }
      this.audio.volume = Math.min(1, Math.max(0, v));
    }, 60);
  },
  play() {
    if (!this.audio) return;
    const p = this.audio.play();
    const onPlaying = () => {
      this.toggle?.classList.add("playing");
      this.toggle?.setAttribute("aria-pressed", "true");
      this.fadeTo(this.targetVolume);
    };
    if (p && typeof p.then === "function") {
      p.then(onPlaying).catch(() => {
        this.toggle?.classList.remove("playing");
        this.toggle?.setAttribute("aria-pressed", "false");
      });
    } else {
      onPlaying();
    }
  },
  pause() {
    if (!this.audio) return;
    this.fadeTo(0, () => this.audio.pause());
    this.toggle?.classList.remove("playing");
    this.toggle?.setAttribute("aria-pressed", "false");
  },
};

function openInvitation() {
  document.getElementById("envelope-overlay")?.classList.add("is-open");
  document.body.classList.add("invitation-open");
  sessionStorage.setItem("invitationOpened", "1");
  music.play();
  setTimeout(() => venueMap?.invalidateSize(), 700);
}

function initEnvelope() {
  if (sessionStorage.getItem("invitationOpened") === "1") {
    document.getElementById("envelope-overlay")?.classList.add("is-open");
    document.body.classList.add("invitation-open");
    return;
  }
  document.getElementById("open-invite-btn")?.addEventListener("click", openInvitation);
}

const SECTION_ANIMATIONS = [
  {
    id: "countdown",
    selectors: ".section-title, .section-subtitle, .countdown-item",
  },
  {
    id: "invitation",
    selectors:
      ".section-title, .card-eyebrow, .invite-text, .islamic-blessing, .date-block, .venue-block",
  },
  {
    id: "details",
    selectors: ".section-title, .section-subtitle, .detail-card",
  },
  {
    id: "location",
    selectors: ".section-title, .section-subtitle, .map-header",
  },
  {
    id: "gallery",
    selectors: ".section-title, .section-subtitle, .gallery-item",
  },
];

function initSectionAnimations() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stagger = prefersReduced ? 0 : 0.11;

  SECTION_ANIMATIONS.forEach(({ id, selectors }) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.classList.add("section-animate");
    section.querySelectorAll(selectors).forEach((el, index) => {
      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", `${index * stagger}s`);
      if (el.classList.contains("detail-card")) {
        el.classList.add(index % 2 === 0 ? "reveal-from-left" : "reveal-from-right");
      }
    });

    if (prefersReduced) {
      section.classList.add("is-visible");
      return;
    }

    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggle so sections re-animate (open/close) as they scroll in and out
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: "-8% 0px -12% 0px" }
    ).observe(section);
  });
}

function initDecorReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .querySelectorAll(
      ".venue-showcase-section, .illustration-section, .divider-ornament, .footer-swans"
    )
    .forEach((node, index) => {
      node.classList.add("reveal");
      node.style.setProperty("--reveal-delay", `${index * 0.05}s`);
      if (prefersReduced) {
        node.classList.add("visible");
        return;
      }
      new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
        { threshold: 0.12 }
      ).observe(node);
    });
}

function initActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { threshold: [0.2, 0.45, 0.65], rootMargin: "-20% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initInteractiveCards() {
  document.querySelectorAll(".detail-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => card.classList.toggle("is-pressed"));
    card.addEventListener("blur", () => card.classList.remove("is-pressed"));
  });

  document.querySelectorAll(".countdown-item").forEach((item) => {
    item.addEventListener("mouseenter", () => item.classList.add("is-hovered"));
    item.addEventListener("mouseleave", () => item.classList.remove("is-hovered"));
  });
}

function initGalleryInteractions() {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("mouseenter", () => item.classList.add("is-hovered"));
    item.addEventListener("mouseleave", () => item.classList.remove("is-hovered"));
  });
}

function fillAdminForm(data) {
  const fields = [
    ["edit-bride-name", data.brideName],
    ["edit-groom-name", data.groomName],
    ["edit-invite-label", data.inviteLabel],
    ["edit-invite-text", data.inviteText],
    ["edit-wedding-date", data.weddingDate],
    ["edit-wedding-year", data.weddingYear],
    ["edit-wedding-time", data.weddingTime],
    ["edit-countdown-iso", data.countdownISO],
    ["edit-rsvp-label", data.rsvpLabel],
    ["edit-rsvp-contact", data.rsvpContact],
    ["edit-rsvp-phone", data.rsvpPhone],
    ["edit-venue-name", data.venueName],
    ["edit-venue-address", data.venueAddress],
    ["edit-detail-venue", data.detailVenue],
    ["edit-detail-time", data.detailTime],
    ["edit-detail-dress", data.detailDress],
    ["edit-detail-reception", data.detailReception],
    ["edit-map-venue", data.mapVenue],
    ["edit-map-directions-address", data.mapDirectionsAddress],
    ["edit-map-latitude", data.mapLatitude],
    ["edit-map-longitude", data.mapLongitude],
    ["edit-gallery-caption-1", data.galleryCaption1],
    ["edit-gallery-caption-2", data.galleryCaption2],
    ["edit-gallery-caption-3", data.galleryCaption3],
    ["edit-gallery-caption-4", data.galleryCaption4],
    ["edit-hero-video", data.heroVideo],
    ["edit-hero-poster", data.heroPoster],
  ];
  fields.forEach(([id, val]) => {
    const node = document.getElementById(id);
    if (node) node.value = val ?? "";
  });
}

function collectFormData() {
  return {
    brideName: document.getElementById("edit-bride-name").value.trim(),
    groomName: document.getElementById("edit-groom-name").value.trim(),
    inviteLabel: document.getElementById("edit-invite-label").value.trim(),
    inviteText: document.getElementById("edit-invite-text").value.trim(),
    weddingDate: document.getElementById("edit-wedding-date").value.trim(),
    weddingYear: document.getElementById("edit-wedding-year").value.trim(),
    weddingTime: document.getElementById("edit-wedding-time").value.trim(),
    countdownISO: document.getElementById("edit-countdown-iso").value.trim(),
    rsvpLabel: document.getElementById("edit-rsvp-label").value.trim(),
    rsvpContact: document.getElementById("edit-rsvp-contact").value.trim(),
    rsvpPhone: document.getElementById("edit-rsvp-phone").value.trim(),
    venueName: document.getElementById("edit-venue-name").value.trim(),
    venueAddress: document.getElementById("edit-venue-address").value.trim(),
    detailVenue: document.getElementById("edit-detail-venue").value.trim(),
    detailTime: document.getElementById("edit-detail-time").value.trim(),
    detailDress: document.getElementById("edit-detail-dress").value.trim(),
    detailReception: document.getElementById("edit-detail-reception").value.trim(),
    mapVenue: document.getElementById("edit-map-venue").value.trim(),
    mapDirectionsAddress: document.getElementById("edit-map-directions-address").value.trim(),
    mapLatitude: document.getElementById("edit-map-latitude").value.trim(),
    mapLongitude: document.getElementById("edit-map-longitude").value.trim(),
    galleryCaption1: document.getElementById("edit-gallery-caption-1").value.trim(),
    galleryCaption2: document.getElementById("edit-gallery-caption-2").value.trim(),
    galleryCaption3: document.getElementById("edit-gallery-caption-3").value.trim(),
    galleryCaption4: document.getElementById("edit-gallery-caption-4").value.trim(),
    heroVideo: document.getElementById("edit-hero-video").value.trim(),
    heroPoster: document.getElementById("edit-hero-poster").value.trim(),
  };
}

function openAdmin() {
  fillAdminForm(loadData());
  document.getElementById("admin-panel").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeAdmin() {
  document.getElementById("admin-panel").hidden = true;
  document.body.style.overflow = "";
}

function switchTab(tabName, btn) {
  document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  document.getElementById(`${tabName}-tab`)?.classList.add("active");
  btn?.classList.add("active");
}

function saveChanges() {
  const data = { ...collectFormData(), _savedFromEditor: true };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateDisplay(data);
  renderVenueMap(data);
  startCountdown(data.countdownISO);
  showNotification("Saved!");
  closeAdmin();
}

function resetToConfigFile() {
  localStorage.removeItem(STORAGE_KEY);
  const data = mergeNonEmpty(getDefaultConfig(), readFromPage());
  updateDisplay(data);
  renderVenueMap(data);
  startCountdown(data.countdownISO);
  fillAdminForm(data);
  showNotification("Reset to config.js & index.html.");
}

function downloadConfig() {
  const blob = new Blob([JSON.stringify(loadData(), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "invitation-config.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function showNotification(message) {
  const n = document.createElement("div");
  n.className = "notification";
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-map-link]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = el.getAttribute("href");
    });
  });

  const data = loadData();
  updateDisplay(data);
  renderVenueMap(data);
  startCountdown(data.countdownISO);
  music.init();
  initEnvelope();
  initSectionAnimations();
  initDecorReveal();
  initActiveNav();
  initInteractiveCards();
  initGalleryInteractions();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navLinks.classList.toggle('collapsed', !isOpen);
    });
    // close nav on link click
    navLinks.querySelectorAll('.nav-link').forEach((l) => l.addEventListener('click', () => {
      navLinks.classList.remove('open'); navLinks.classList.add('collapsed');
    }));
  }

  // Lightbox for gallery images
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  function openLightbox(src, caption, alt) {
    if (!lightbox) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCaption.textContent = caption || '';
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    lbCaption.textContent = '';
  }
  document.querySelectorAll('.gallery-img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      const src = img.src;
      const fig = img.closest('figure');
      const caption = fig?.querySelector('figcaption')?.textContent || img.alt || '';
      openLightbox(src, caption, img.alt || '');
    });
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lbImg) closeLightbox();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  document.getElementById("admin-open-btn")?.addEventListener("click", openAdmin);
  document.getElementById("admin-close-btn")?.addEventListener("click", closeAdmin);
  document.getElementById("save-btn")?.addEventListener("click", saveChanges);
  document.getElementById("download-btn")?.addEventListener("click", downloadConfig);
  document.getElementById("reset-config-btn")?.addEventListener("click", resetToConfigFile);
  document.getElementById("admin-panel")?.addEventListener("click", (e) => {
    if (e.target.id === "admin-panel") closeAdmin();
  });
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab, btn));
  });
  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
      e.preventDefault();
      const panel = document.getElementById("admin-panel");
      panel.hidden ? openAdmin() : closeAdmin();
    }
  });
});
