// FAF avatar: a small config object -> SVG string. Every value is validated, so any user's config is safe to render.
export const SKIN = ["#FFE3CF", "#F7CDA8", "#EBB68A", "#D49A6A", "#B97A4B", "#9A5E36", "#744324", "#4F2C18"];
export const HAIRC = ["#1B1B1F", "#3B2416", "#6B4423", "#A5712F", "#D9A441", "#B5472B", "#A8ADB5", "#4D3DF7"];
export const BG = ["#E3DCFF", "#C4F2E4", "#FFE2C7", "#FFD9E2", "#D3E5FF", "#FFF2BF", "#E6E6EA", "#CFEFD0"];
export const TOPC = ["#4D3DF7", "#17182C", "#19C39A", "#F2545B", "#FFB020", "#3B82F6", "#FFFFFF", "#F4A6C0"];

export const GROUPS = [["face", "Face"], ["hair", "Hair"], ["outfit", "Outfit"], ["bg", "Backdrop"]];
export const OPTIONS = [
  { g: "face", key: "skin", label: "Skin tone", colors: SKIN },
  { g: "face", key: "eyes", label: "Eyes", opts: [["open", "Open"], ["happy", "Happy"], ["wink", "Wink"], ["wide", "Wide"], ["sleepy", "Sleepy"]] },
  { g: "face", key: "mouth", label: "Smile", opts: [["smile", "Smile"], ["grin", "Grin"], ["smirk", "Smirk"], ["calm", "Calm"], ["wow", "Wow"]] },
  { g: "face", key: "beard", label: "Facial hair", opts: [["none", "None"], ["stubble", "Stubble"], ["moustache", "Moustache"], ["beard", "Beard"]] },
  { g: "face", key: "marks", label: "Freckles", opts: [["none", "None"], ["freckles", "Freckles"]] },
  { g: "hair", key: "hair", label: "Hair style", opts: [["short", "Short"], ["sidepart", "Side part"], ["long", "Long"], ["ponytail", "Ponytail"], ["curly", "Curly"], ["afro", "Afro"], ["bun", "Bun"], ["buzz", "Buzz"], ["bald", "None"]] },
  { g: "hair", key: "hairColor", label: "Hair colour", colors: HAIRC },
  { g: "outfit", key: "top", label: "Clothing", opts: [["tee", "T-shirt"], ["hoodie", "Hoodie"], ["collar", "Shirt"], ["kurta", "Kurta"]] },
  { g: "outfit", key: "topColor", label: "Clothing colour", colors: TOPC },
  { g: "outfit", key: "hat", label: "Headwear", opts: [["none", "None"], ["cap", "Cap"], ["beanie", "Beanie"], ["turban", "Turban"], ["scarf", "Scarf"]] },
  { g: "outfit", key: "glasses", label: "Glasses", opts: [["none", "None"], ["round", "Round"], ["square", "Square"], ["sun", "Shades"]] },
  { g: "bg", key: "bg", label: "Backdrop colour", colors: BG },
];

export const defaultAvatar = () => ({ skin: 2, eyes: "open", mouth: "smile", beard: "none", marks: "none", hair: "short", hairColor: 1, top: "tee", topColor: 0, hat: "none", glasses: "none", bg: 0 });

export function randomAvatar() {
  const c = {};
  for (const o of OPTIONS) c[o.key] = o.colors ? Math.floor(Math.random() * o.colors.length) : o.opts[Math.floor(Math.random() * o.opts.length)][0];
  // keep random avatars friendly: mostly no beard / headwear / glasses
  if (Math.random() < 0.6) c.beard = "none";
  if (Math.random() < 0.6) c.hat = "none";
  if (Math.random() < 0.5) c.glasses = "none";
  if (Math.random() < 0.7) c.marks = "none";
  return c;
}

function clean(cfg) {
  const d = defaultAvatar(), out = {};
  for (const o of OPTIONS) {
    const v = cfg ? cfg[o.key] : undefined;
    if (o.colors) out[o.key] = Number.isInteger(v) && v >= 0 && v < o.colors.length ? v : d[o.key];
    else out[o.key] = o.opts.some(([id]) => id === v) ? v : d[o.key];
  }
  // older avatars used these names
  if (cfg && cfg.eyes === "dots") out.eyes = "open";
  if (cfg && cfg.mouth === "neutral") out.mouth = "calm";
  if (cfg && cfg.mouth === "open") out.mouth = "wow";
  return out;
}

const INK = "#2B2118", LIP = "#3A1F1F";

export function renderAvatar(config) {
  const c = clean(config);
  const skin = SKIN[c.skin], hc = HAIRC[c.hairColor], bg = BG[c.bg], tc = TOPC[c.topColor];
  const scarf = c.hat === "scarf";
  const head = "M54 90 C54 60 72 42 100 42 C128 42 146 60 146 90 C146 122 128 148 100 148 C72 148 54 122 54 90 Z";
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Avatar"><rect width="200" height="200" fill="${bg}"/>`;

  // ---- hair behind the head ----
  if (!scarf) {
    if (c.hair === "long") s += `<path d="M48 96 C40 40 76 26 100 26 C124 26 160 40 152 96 L160 172 Q142 184 128 160 L72 160 Q58 184 40 172 Z" fill="${hc}"/>`;
    if (c.hair === "ponytail") s += `<path d="M138 66 C176 58 184 112 162 142 C158 124 150 108 142 96 Z" fill="${hc}"/><circle cx="141" cy="74" r="4.5" fill="#FFC21A" stroke="${INK}" stroke-width="1.5"/>`;
    if (c.hair === "curly") s += [[60,72,17],[70,50,18],[90,40,19],[112,38,19],[132,48,18],[142,66,17],[144,88,14],[56,92,14]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hc}"/>`).join("");
    if (c.hair === "afro") s += `<circle cx="100" cy="76" r="60" fill="${hc}"/>`;
    if (c.hair === "bun") s += `<circle cx="100" cy="30" r="16" fill="${hc}"/><path d="M90 30 Q100 22 110 30" stroke="rgba(0,0,0,.25)" stroke-width="2.5" fill="none"/>`;
  }

  // ---- body ----
  s += `<path d="M20 200 C22 166 52 158 80 156 L120 156 C148 158 178 166 180 200 Z" fill="${tc}"/>`;
  if (c.top === "hoodie") s += `<path d="M62 152 C58 128 72 118 84 130 L116 130 C128 118 142 128 138 152 L130 170 Q100 184 70 170Z" fill="${tc}" stroke="rgba(0,0,0,.22)" stroke-width="2.5"/><path d="M62 152 C58 128 72 118 84 130 L116 130 C128 118 142 128 138 152 L130 170 Q100 184 70 170Z" fill="rgba(0,0,0,.14)"/>`;
  // neck
  s += `<path d="M86 134 L86 162 Q100 172 114 162 L114 134 Z" fill="${skin}"/><path d="M86 140 Q100 158 114 140 L114 152 Q100 164 86 152Z" fill="rgba(0,0,0,.10)"/>`;
  // neckline + details
  if (c.top === "tee") s += `<path d="M80 156 Q100 178 120 156 Z" fill="${skin}"/><path d="M80 156 Q100 178 120 156" stroke="rgba(0,0,0,.2)" stroke-width="2.5" fill="none"/>`;
  if (c.top === "hoodie") s += `<path d="M84 160 Q100 176 116 160 Z" fill="${skin}"/><path d="M92 172 L90 194 M108 172 L110 194" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linecap="round"/>`;
  if (c.top === "collar") s += `<path d="M82 156 Q100 176 118 156 Z" fill="${skin}"/><path d="M80 154 L100 178 L88 184 L72 160 Z M120 154 L100 178 L112 184 L128 160 Z" fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
  if (c.top === "kurta") s += `<path d="M84 156 Q100 172 116 156 Z" fill="${skin}"/><path d="M84 156 Q100 172 116 156" stroke="rgba(0,0,0,.25)" stroke-width="2.5" fill="none"/><path d="M100 170 L100 200" stroke="rgba(0,0,0,.22)" stroke-width="3"/>${[178, 188, 198].map((y) => `<circle cx="100" cy="${y}" r="2.6" fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`).join("")}`;

  // ---- head ----
  s += `<ellipse cx="53" cy="99" rx="7" ry="10" fill="${skin}"/><ellipse cx="147" cy="99" rx="7" ry="10" fill="${skin}"/><ellipse cx="53" cy="100" rx="3" ry="5" fill="rgba(0,0,0,.1)"/><ellipse cx="147" cy="100" rx="3" ry="5" fill="rgba(0,0,0,.1)"/>`;
  s += `<path d="${head}" fill="${skin}"/>`;
  s += `<circle cx="71" cy="113" r="8" fill="#FF6F7F" opacity=".2"/><circle cx="129" cy="113" r="8" fill="#FF6F7F" opacity=".2"/>`;
  if (c.marks === "freckles") s += [[70,106],[77,110],[84,107],[116,107],[123,110],[130,106],[76,116],[124,116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="rgba(110,60,25,.5)"/>`).join("");

  // ---- facial hair (before the mouth) ----
  if (c.beard === "stubble") s += `<path d="M56 100 Q56 148 100 150 Q144 148 144 100 Q140 124 100 128 Q60 124 56 100Z" fill="${hc}" opacity=".18"/>`;
  if (c.beard === "beard") s += `<path d="M55 102 Q52 154 100 158 Q148 154 145 102 Q140 118 120 121 Q100 126 80 121 Q60 118 55 102Z" fill="${hc}"/><ellipse cx="100" cy="127" rx="15" ry="8" fill="${skin}"/>`;

  // ---- eyes ----
  const L = 80, R = 120, ey = 97, brow = `stroke="${INK}" stroke-width="3.6" stroke-linecap="round" fill="none" opacity=".85"`;
  s += `<path d="M69 82 Q80 75 91 81 M109 81 Q120 75 131 82" ${brow}/>`;
  const openEye = (x, r = 8, ir = 5) => `<ellipse cx="${x}" cy="${ey}" rx="${r}" ry="${r + 1}" fill="#fff"/><circle cx="${x + 1}" cy="${ey + 1}" r="${ir}" fill="${INK}"/><circle cx="${x + 3}" cy="${ey - 2}" r="1.7" fill="#fff"/><path d="M${x - r - 1} ${ey - 3} Q${x} ${ey - r - 6} ${x + r + 1} ${ey - 3}" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const happyEye = (x) => `<path d="M${x - 9} ${ey + 2} Q${x} ${ey - 9} ${x + 9} ${ey + 2}" stroke="${INK}" stroke-width="3.8" fill="none" stroke-linecap="round"/>`;
  if (c.eyes === "open") s += openEye(L) + openEye(R);
  if (c.eyes === "wide") s += openEye(L, 9.5, 6) + openEye(R, 9.5, 6);
  if (c.eyes === "happy") s += happyEye(L) + happyEye(R);
  if (c.eyes === "wink") s += openEye(L) + happyEye(R);
  if (c.eyes === "sleepy") s += `<path d="M70 98 Q80 104 90 98 M110 98 Q120 104 130 98" stroke="${INK}" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M70 98 L66 94 M130 98 L134 94" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;

  // ---- nose + mouth ----
  s += `<path d="M96 107 Q100 114 104 107" stroke="rgba(60,30,10,.35)" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  if (c.beard === "moustache" || c.beard === "beard") s += `<path d="M82 120 Q91 112 100 117 Q109 112 118 120 Q109 123 100 120 Q91 123 82 120Z" fill="${hc}"/>`;
  if (c.mouth === "smile") s += `<path d="M86 124 Q100 138 114 124" stroke="${LIP}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
  if (c.mouth === "grin") s += `<path d="M84 122 Q100 146 116 122 Z" fill="#fff" stroke="${LIP}" stroke-width="3" stroke-linejoin="round"/><path d="M92 135 Q100 130 108 135 Q100 141 92 135Z" fill="#F28B9B"/>`;
  if (c.mouth === "smirk") s += `<path d="M88 129 Q101 134 115 121" stroke="${LIP}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
  if (c.mouth === "calm") s += `<path d="M90 128 L110 128" stroke="${LIP}" stroke-width="3.6" stroke-linecap="round"/>`;
  if (c.mouth === "wow") s += `<ellipse cx="100" cy="130" rx="7" ry="8.5" fill="#7A2E3A"/>`;

  // ---- hair in front ----
  if (!scarf) {
    const fringe = `<path d="M52 92 C46 46 76 32 102 34 C132 36 152 54 148 92 C146 78 140 66 124 62 C108 58 84 60 70 68 C60 74 55 82 52 92Z" fill="${hc}"/>`;
    if (["short", "long", "ponytail", "bun"].includes(c.hair)) s += fringe;
    if (c.hair === "sidepart") s += `<path d="M52 94 C44 48 74 30 104 32 C136 34 154 56 148 94 C146 76 136 62 118 58 C100 68 72 66 58 82 C55 86 53 90 52 94Z" fill="${hc}"/><path d="M118 58 C106 46 84 44 66 62" stroke="rgba(0,0,0,.25)" stroke-width="2.5" fill="none"/>`;
    if (c.hair === "curly") s += [[78,58,11],[98,54,12],[118,58,11],[64,72,9],[134,72,9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hc}"/>`).join("");
    if (c.hair === "afro") s += `<path d="M54 90 C50 56 76 42 100 42 C124 42 150 56 146 90 C142 72 128 62 100 62 C72 62 58 72 54 90Z" fill="${hc}"/>`;
    if (c.hair === "buzz") s += `<path d="M56 84 C54 54 76 42 100 42 C124 42 146 54 144 84 C138 68 124 62 100 62 C76 62 62 68 56 84Z" fill="${hc}" opacity=".72"/>`;
  }

  // ---- glasses ----
  const gl = `stroke="${INK}" stroke-width="3.2"`;
  if (c.glasses === "round") s += `<circle cx="${L}" cy="${ey}" r="14" fill="rgba(255,255,255,.3)" ${gl}/><circle cx="${R}" cy="${ey}" r="14" fill="rgba(255,255,255,.3)" ${gl}/><path d="M94 96 Q100 92 106 96 M66 94 L56 91 M134 94 L144 91" ${gl} fill="none" stroke-linecap="round"/>`;
  if (c.glasses === "square") s += `<rect x="65" y="85" width="30" height="24" rx="6" fill="rgba(255,255,255,.3)" ${gl}/><rect x="105" y="85" width="30" height="24" rx="6" fill="rgba(255,255,255,.3)" ${gl}/><path d="M95 94 L105 94 M65 92 L56 90 M135 92 L144 90" ${gl} fill="none" stroke-linecap="round"/>`;
  if (c.glasses === "sun") s += `<rect x="63" y="85" width="34" height="25" rx="9" fill="${INK}"/><rect x="103" y="85" width="34" height="25" rx="9" fill="${INK}"/><path d="M97 93 L103 93" stroke="${INK}" stroke-width="3.2"/><path d="M69 91 L77 89 M109 91 L117 89" stroke="rgba(255,255,255,.55)" stroke-width="2.4" stroke-linecap="round"/>`;

  // ---- headwear (uses the clothing colour) ----
  const edge = `stroke="rgba(0,0,0,.22)" stroke-width="2.4"`;
  if (c.hat === "cap") s += `<path d="M50 76 C50 38 76 28 100 28 C124 28 150 38 150 76 Z" fill="${tc}" ${edge}/><path d="M112 72 L170 78 Q174 90 158 90 L108 82 Z" fill="${tc}" ${edge}/><circle cx="100" cy="29" r="3.2" fill="rgba(0,0,0,.25)"/>`;
  if (c.hat === "beanie") s += `<path d="M50 74 C50 26 78 22 100 22 C122 22 150 26 150 74 Z" fill="${tc}" ${edge}/><rect x="48" y="62" width="104" height="16" rx="7" fill="${tc}" ${edge}/><path d="M60 62 L60 78 M74 62 L74 78 M88 62 L88 78 M102 62 L102 78 M116 62 L116 78 M130 62 L130 78 M144 62 L144 78" stroke="rgba(0,0,0,.14)" stroke-width="2"/><circle cx="100" cy="20" r="8" fill="${tc}" ${edge}/>`;
  if (c.hat === "turban") s += `<path d="M46 82 C42 34 76 20 100 20 C124 20 158 34 154 82 C142 66 124 60 100 60 C76 60 58 66 46 82Z" fill="${tc}" ${edge}/><path d="M52 64 C80 44 120 44 148 64 M50 74 C84 54 118 54 150 74 M68 40 C90 32 114 34 132 44" stroke="rgba(0,0,0,.2)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M94 36 Q100 26 108 38" stroke="rgba(0,0,0,.2)" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (scarf) s += `<path fill-rule="evenodd" fill="${tc}" ${edge} d="M46 96 C40 40 74 22 100 22 C126 22 160 40 154 96 C154 130 152 152 144 172 L56 172 C48 152 46 130 46 96Z M62 92 C62 64 78 50 100 50 C122 50 138 64 138 92 C138 122 124 152 100 152 C76 152 62 122 62 92Z"/><path d="M60 150 Q100 170 140 150" stroke="rgba(0,0,0,.15)" stroke-width="3" fill="none"/>`;

  return s + "</svg>";
}
