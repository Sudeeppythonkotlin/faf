import { findUniversityById, INTERESTS } from "./universities.js";
import { renderAvatar } from "./avatar.js";
import { PLATFORMS } from "./social.js";

export const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const LABELS = Object.fromEntries(INTERESTS);

// bottom navigation: Discover | Profile | Settings
export function mountNav(active) {
  const items = [["home", "home.html", "🔎", "Discover"], ["me", "me.html", "👤", "Profile"], ["settings", "settings.html", "⚙️", "Settings"]];
  const n = document.createElement("nav");
  n.className = "bnav";
  n.innerHTML = items.map(([id, href, ic, name]) => `<a href="${href}" class="${id === active ? "on" : ""}"><span>${ic}</span>${name}</a>`).join("");
  document.body.appendChild(n);
  document.body.classList.add("has-nav");
}

// the signed-in user's own profile card
export function myCardHtml(p, socialDocs) {
  const uni = findUniversityById(p.universityId);
  const chips = socialDocs.map((d) => { const pl = PLATFORMS.find((x) => x.id === d.id); return pl ? `${pl.icon} ${pl.label}${d.data.visible === false ? " (hidden)" : ""}` : ""; });
  return `
    <div class="card" style="text-align:center">
      <div class="preview sm">${renderAvatar(p.avatarConfig)}</div>
      <b style="margin-top:10px;font-size:20px">${esc(p.displayName)}, ${esc(p.age)}</b>
      <span>${esc(p.collegeName)}<br>${esc(uni ? uni.name : "")}${uni ? " · " + esc(uni.state) : ""}</span>
      <p style="margin-top:10px;font-size:14px">${(p.interests || []).map((i) => esc(LABELS[i] || i)).join(" · ")}</p>
      <p style="margin-top:10px;font-size:14px">${chips.join("<br>")}</p>
    </div>`;
}
