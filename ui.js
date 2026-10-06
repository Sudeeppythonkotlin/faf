import { isStandalone } from "./install.js";
import { findUniversityById, INTERESTS } from "./universities.js";
import { renderAvatar, BG } from "./avatar.js";
import { icon, badge } from "./brand.js";
export { badge };

export const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const LABELS = Object.fromEntries(INTERESTS);

// bottom dock: Discover | Profile | Settings
export function mountNav(active) {
  const items = [["home", "home.html", "search", "Discover"], ["me", "me.html", "user", "Profile"], ["settings", "settings.html", "sliders", "Settings"]];
  const n = document.createElement("nav");
  n.className = "bnav"; n.setAttribute("aria-label", "Main");
  n.innerHTML = items.map(([id, href, ic, name]) => `<a href="${href}" class="${id === active ? "on" : ""}" ${id === active ? 'aria-current="page"' : ""}>${icon(ic, 22)}${name}</a>`).join("");
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

// a decorative barcode, different for every person (not a real code)
function barcode(seed) {
  let h = 2166136261; for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  let x = 0, out = "";
  for (let i = 0; i < 46 && x < 158; i++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    const w = 1 + (h % 3), gap = 1 + ((h >>> 5) % 3);
    out += `<rect x="${x}" y="0" width="${w}" height="34"/>`; x += w + gap;
  }
  return `<svg class="barcode" viewBox="0 0 160 34" preserveAspectRatio="none" fill="#16184A" aria-hidden="true">${out}</svg>`;
}

// the campus pass: used for people you find, your own profile and the landing page examples
export function passHtml(d, { shared = [], links = "", label = "Campus pass" } = {}) {
  const uni = findUniversityById(d.universityId);
  const ints = (d.interests || []).filter((i) => LABELS[i]);
  const bgi = d.avatarConfig && Number.isInteger(d.avatarConfig.bg) && BG[d.avatarConfig.bg] ? d.avatarConfig.bg : 0;
  return `<article class="pass reveal" style="--tint:${BG[bgi]}">
    <div class="pass-top"><span class="slot"></span><span>${esc(label)}</span><em>faf</em></div>
    <div class="pass-body">
      <div class="photo"><span class="tape"></span>${renderAvatar(d.avatarConfig)}</div>
      <div class="pass-id">
        <h2 class="pass-name">${esc(d.displayName)}<small>${esc(d.age)}</small></h2>
        <dl class="pass-rows">
          <div><dt>College</dt><dd>${esc(d.collegeName)}</dd></div>
          ${uni ? `<div><dt>University</dt><dd>${esc(uni.name)}</dd></div><div><dt>State</dt><dd>${esc(uni.state)}</dd></div>` : ""}
        </dl>
      </div>
    </div>
    ${ints.length ? `<div class="tags">${ints.map((i) => `<span class="tag">${esc(LABELS[i])}</span>`).join("")}</div>` : ""}
    ${shared.length ? `<p class="shared">You both like ${shared.map((i) => esc(LABELS[i])).join(", ")}</p>` : ""}
    <div class="pass-stub">${links}${barcode((d.displayName || "") + (d.universityId || "") + (d.age || ""))}</div>
  </article>`;
}

// After logging out: the installed app goes to the login screen, the website goes to the landing page
export const goAfterLogout = () => { location.href = isStandalone() ? "welcome.html" : "index.html"; };
