// FAF brand pieces: the mascot (a curious pass card), the icon set and platform badges.
const INK = "#16184A", BLUE = "#2B3AF2", CORAL = "#FF5A3C", PAPER = "#EEF0F8";

// The mascot: an ID card with a lanyard slot and two curious eyes. A second ink (coral) sits slightly off-register behind it.
export const mark = (cls = "") => `<svg class="mark ${cls}" viewBox="0 0 48 48" aria-hidden="true">
  <rect x="10" y="8" width="34" height="38" rx="9" fill="${CORAL}"/>
  <rect x="5" y="3" width="34" height="38" rx="9" fill="${BLUE}"/>
  <rect x="16" y="8" width="12" height="3.6" rx="1.8" fill="${PAPER}"/>
  <ellipse cx="15.5" cy="24" rx="6" ry="7.4" fill="${PAPER}"/><ellipse cx="29.5" cy="24" rx="6" ry="7.4" fill="${PAPER}"/>
  <circle class="pupil" cx="17.5" cy="25" r="3" fill="${INK}"/><circle class="pupil" cx="31.5" cy="25" r="3" fill="${INK}"/></svg>`;

// Eyes follow the finger or cursor on any mascot marked "live"
export function trackEyes() {
  const set = (x, y) => document.querySelectorAll(".mark.live").forEach((m) => {
    const r = m.getBoundingClientRect(); const dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1;
    m.style.setProperty("--lx", (dx / d).toFixed(2)); m.style.setProperty("--ly", (dy / d).toFixed(2));
  });
  addEventListener("pointermove", (e) => set(e.clientX, e.clientY), { passive: true });
  addEventListener("touchstart", (e) => { const t = e.touches[0]; if (t) set(t.clientX, t.clientY); }, { passive: true });
}

const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  sliders: '<path d="M4 6h9M19 6h1M4 12h3M13 12h7M4 18h11M21 18h-1"/><circle cx="16" cy="6" r="2.2"/><circle cx="10" cy="12" r="2.2"/><circle cx="18" cy="18" r="2.2"/>',
  pencil: '<path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path d="M14 6l3 3"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4M9 9.5h.01M15 9.5h.01"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>',
  door: '<path d="M5 21V4h9v17M3 21h13"/><path d="M17 8l4 4-4 4M21 12h-8"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z"/>',
  building: '<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  share: '<path d="M12 15V3M8 7l4-4 4 4M5 12v8h14v-8"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/>',
};
export const icon = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
export const hydrateIcons = (root = document) => root.querySelectorAll("[data-i]").forEach((el) => { el.innerHTML = icon(el.dataset.i, Number(el.dataset.s) || 22); });
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => hydrateIcons()); else hydrateIcons();

// platform badge: a coloured monogram instead of an emoji
export const badge = (id, mono) => `<i class="pf pf-${id}">${mono}</i>`;
