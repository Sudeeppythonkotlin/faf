import { mark } from "./brand.js";
// Registers the service worker and powers every "Install app" button (any element with the data-install attribute).
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

let deferred = window.__bip || null; // the browser's install prompt, when it offers one
addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferred = e; window.__bip = e; });
addEventListener("appinstalled", () => { deferred = null; window.__bip = null; hideButtons(); });

const ua = navigator.userAgent;
export const isStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const inApp = () => /FBAN|FBAV|Instagram|Snapchat|WhatsApp|LinkedInApp|Line\/|MicroMessenger/i.test(ua);

function hideButtons() { document.querySelectorAll("[data-install]").forEach((el) => (el.hidden = true)); }

function steps() {
  if (inApp()) return { title: "Open FAF in your browser first", list: ["Tap the menu (⋮ or ⋯) at the top or bottom right of this screen.", "Choose <b>Open in browser</b> (or Chrome / Safari).", "Then tap <b>Get the app</b> again."] };
  if (isIOS()) return { title: "Add FAF to your iPhone", list: ["Open this page in <b>Safari</b>.", "Tap the <b>Share</b> button (a square with an arrow) at the bottom.", "Scroll down and tap <b>Add to Home Screen</b>.", "Tap <b>Add</b>. FAF now sits on your home screen."] };
  return { title: "Add FAF to your phone", list: ["Open this page in <b>Chrome</b>.", "Tap the menu (<b>⋮</b>) at the top right.", "Tap <b>Install app</b> or <b>Add to Home screen</b>.", "Tap <b>Install</b>. FAF now sits on your home screen."] };
}

function showSheet() {
  const s = steps();
  const wrap = document.createElement("div");
  wrap.className = "sheetwrap";
  wrap.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${s.title}">
    <div class="sheetmark">${mark("look")}</div>
    <h2>${s.title}</h2>
    <ol>${s.list.map((x) => `<li>${x}</li>`).join("")}</ol>
    <p class="hint">It's free and uses almost no space. It opens like any other app.</p>
    <button class="btn" id="sheetClose">Got it</button></div>`;
  const close = () => wrap.remove();
  wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
  document.body.appendChild(wrap);
  wrap.querySelector("#sheetClose").onclick = close;
  wrap.querySelector("#sheetClose").focus();
  addEventListener("keydown", function esc(e) { if (e.key === "Escape") { close(); removeEventListener("keydown", esc); } });
}

export async function installApp() {
  if (deferred) {
    deferred.prompt();
    const choice = await deferred.userChoice.catch(() => ({ outcome: "dismissed" }));
    deferred = null; window.__bip = null;
    if (choice.outcome === "accepted") hideButtons();
    return choice.outcome;
  }
  showSheet(); // browsers that can't prompt (iPhone, in-app browsers, others): show the steps
  return "sheet";
}

function wire() {
  document.querySelectorAll("[data-install]").forEach((el) => {
    if (isStandalone()) { el.hidden = true; return; }
    el.addEventListener("click", (e) => { e.preventDefault(); installApp(); });
  });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire); else wire();
