// Social platforms: we store only a clean handle and build the link ourselves (never store raw URLs).
export const PLATFORMS = [
  { id: "instagram", mono: "IG", label: "Instagram", icon: "📸", ph: "username", hint: "Your Instagram username" },
  { id: "snapchat", mono: "SC", label: "Snapchat", icon: "👻", ph: "username", hint: "Your Snapchat username" },
  { id: "linkedin", mono: "in", label: "LinkedIn", icon: "💼", ph: "profile link or name-123", hint: "Paste your profile link" },
  { id: "discord", mono: "DC", label: "Discord", icon: "🎮", ph: "username", hint: "Your Discord username" },
];

// returns a clean handle string, or null if invalid
export function normalizeHandle(platform, input) {
  let v = String(input || "").trim();
  if (!v) return null;
  if (platform === "linkedin") {
    const m = v.match(/linkedin\.com\/in\/([A-Za-z0-9\-_%]+)/i);
    if (m) v = m[1]; else v = v.replace(/^\/+|\/+$/g, "");
    return /^[A-Za-z0-9\-_%]{3,100}$/.test(v) ? v : null;
  }
  v = v.replace(/^https?:\/\/(www\.)?(instagram\.com|snapchat\.com\/add)\//i, "").replace(/[/?].*$/, "").replace(/^@/, "");
  if (platform === "instagram") return /^[A-Za-z0-9._]{1,30}$/.test(v) ? v : null;
  if (platform === "snapchat") return /^[A-Za-z0-9._-]{3,15}$/.test(v) ? v : null;
  if (platform === "discord") { v = v.toLowerCase(); return /^[a-z0-9._]{2,32}$/.test(v) ? v : null; }
  return null;
}

// link for a stored handle (Discord has no public link: show the username to copy)
export function linkFor(platform, handle) {
  const h = encodeURIComponent(handle);
  if (platform === "instagram") return "https://instagram.com/" + h;
  if (platform === "snapchat") return "https://www.snapchat.com/add/" + h;
  if (platform === "linkedin") return "https://www.linkedin.com/in/" + h;
  return null;
}
