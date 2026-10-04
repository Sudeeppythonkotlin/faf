import "./install.js";
import { findUniversityById, INTERESTS } from "./universities.js";
import { renderAvatar, BG } from "./avatar.js";

export const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const LABELS = Object.fromEntries(INTERESTS);

const SVG = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const ICONS = {
  home: `<svg ${SVG}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  me: `<svg ${SVG}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>`,
  settings: `<svg ${SVG}><path d="M4 6h9M19 6h1M4 12h3M13 12h7M4 18h11M21 18h-1"/><circle cx="16" cy="6" r="2.2"/><circle cx="10" cy="12" r="2.2"/><circle cx="18" cy="18" r="2.2"/></svg>`,
};

// bottom navigation: Discover | Profile | Settings
export function mountNav(active) {
  const items = [["home", "home.html", "Discover"], ["me", "me.html", "Profile"], ["settings", "settings.html", "Settings"]];
  const n = document.createElement("nav");
  n.className = "bnav"; n.setAttribute("aria-label", "Main");
  n.innerHTML = items.map(([id, href, name]) => `<a href="${href}" class="${id === active ? "on" : ""}" ${id === active ? 'aria-current="page"' : ""}>${ICONS[id]}${name}</a>`).join("");
  document.body.appendChild(n);
  document.body.classList.add("has-nav");
}

// small message at the bottom of the screen
export function toast(msg, ms = 3200) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), ms);
}

// setup progress shown while the profile is still being completed
export function stepper(n) {
  const names = ["Your profile", "Your avatar", "Your links"];
  return `<div class="steps"><div class="bar">${names.map((_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</div><p>Step ${n} of 3: ${names[n - 1]}</p></div>`;
}

// the "campus pass": used for people you find and for your own profile
export function passHtml(d, { shared = [], links = "", label = "" } = {}) {
  const uni = findUniversityById(d.universityId);
  const ints = (d.interests || []).filter((i) => LABELS[i]);
  const bgi = d.avatarConfig && Number.isInteger(d.avatarConfig.bg) && BG[d.avatarConfig.bg] ? d.avatarConfig.bg : 0;
  return `<article class="pass reveal">
    <div class="pass-band" style="background:${BG[bgi]}"><span class="slot"></span>${label ? `<span class="pass-label">${esc(label)}</span>` : ""}</div>
    <div class="pass-av">${renderAvatar(d.avatarConfig)}</div>
    <h2 class="pass-name">${esc(d.displayName)}<span>${esc(d.age)}</span></h2>
    <p class="pass-college">${esc(d.collegeName)}</p>
    <p class="pass-uni">${esc(uni ? uni.name : "")}</p>
    ${uni ? `<span class="pass-state">${esc(uni.state)}</span>` : ""}
    ${ints.length ? `<div class="tags">${ints.map((i) => `<span class="tag">${esc(LABELS[i])}</span>`).join("")}</div>` : ""}
    ${shared.length ? `<p class="shared">You both like ${shared.map((i) => esc(LABELS[i])).join(", ")}</p>` : ""}
    ${links ? `<div class="pass-links">${links}</div>` : ""}
  </article>`;
}
