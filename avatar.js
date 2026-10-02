// FAF avatar: a small config object -> SVG string. Values are validated, so any user's config is safe to render.
export const SKIN = ["#FFE0C7", "#F5C9A0", "#E0A878", "#C68642", "#8D5524", "#5C3A21"];
export const HAIRC = ["#1B1B1B", "#4A2C17", "#8B5A2B", "#D6A85F", "#B5382B", "#9AA0A6", "#6C47FF"];
export const BG = ["#EDE7FF", "#DFF7EF", "#FFE9D6", "#FFE0EC", "#DCEBFF", "#FFF6C9"];
export const TOPC = ["#6C47FF", "#14122B", "#2DD4A8", "#F2545B", "#FFB020", "#3B82F6", "#FFFFFF"];

export const OPTIONS = [
  { key: "skin", label: "Skin tone", colors: SKIN },
  { key: "hair", label: "Hair style", opts: [["short", "Short"], ["long", "Long"], ["curly", "Curly"], ["buzz", "Buzz"], ["bun", "Bun"], ["bald", "None"]] },
  { key: "hairColor", label: "Hair colour", colors: HAIRC },
  { key: "eyes", label: "Eyes", opts: [["dots", "Classic"], ["happy", "Happy"], ["wide", "Wide"], ["sleepy", "Sleepy"]] },
  { key: "mouth", label: "Mouth", opts: [["smile", "Smile"], ["grin", "Grin"], ["neutral", "Calm"], ["open", "Wow"]] },
  { key: "top", label: "Clothing", opts: [["tee", "T-shirt"], ["hoodie", "Hoodie"], ["collar", "Shirt"]] },
  { key: "topColor", label: "Clothing colour", colors: TOPC },
  { key: "glasses", label: "Glasses", opts: [["none", "None"], ["round", "Round"], ["square", "Square"], ["sun", "Shades"]] },
  { key: "hat", label: "Hat", opts: [["none", "None"], ["cap", "Cap"], ["beanie", "Beanie"]] },
  { key: "bg", label: "Background", colors: BG },
];

export const defaultAvatar = () => ({ skin: 1, hair: "short", hairColor: 1, eyes: "dots", mouth: "smile", top: "tee", topColor: 0, glasses: "none", hat: "none", bg: 0 });

export function randomAvatar() {
  const c = {};
  for (const o of OPTIONS) c[o.key] = o.colors ? Math.floor(Math.random() * o.colors.length) : o.opts[Math.floor(Math.random() * o.opts.length)][0];
  return c;
}

function clean(cfg) {
  const d = defaultAvatar(), out = {};
  for (const o of OPTIONS) {
    const v = cfg ? cfg[o.key] : undefined;
    if (o.colors) out[o.key] = Number.isInteger(v) && v >= 0 && v < o.colors.length ? v : d[o.key];
    else out[o.key] = o.opts.some(([id]) => id === v) ? v : d[o.key];
  }
  return out;
}

export function renderAvatar(config) {
  const c = clean(config);
  const skin = SKIN[c.skin], hc = HAIRC[c.hairColor], bg = BG[c.bg], tc = TOPC[c.topColor];
  const ink = "#222";
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="avatar"><rect width="200" height="200" fill="${bg}"/>`;

  // hair behind head
  if (c.hair === "long") s += `<path d="M50 90 Q44 34 100 32 Q156 34 150 90 L158 156 Q140 166 134 140 L66 140 Q60 166 42 156 Z" fill="${hc}"/>`;
  if (c.hair === "curly") s += [[60,76,17],[76,52,19],[100,44,19],[124,52,19],[140,76,17],[54,98,13],[146,98,13]].map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hc}"/>`).join("");
  if (c.hair === "bun") s += `<circle cx="100" cy="30" r="15" fill="${hc}"/>`;

  // neck + clothing
  s += `<rect x="87" y="132" width="26" height="30" fill="${skin}"/>`;
  s += `<path d="M26 200 Q28 158 72 152 L128 152 Q172 158 174 200 Z" fill="${tc}"/>`;
  s += `<path d="M84 152 Q100 172 116 152 Z" fill="${skin}"/>`;
  if (c.top === "hoodie") s += `<path d="M76 152 Q100 180 124 152" stroke="rgba(0,0,0,.25)" stroke-width="6" fill="none"/><path d="M94 172 L94 192 M106 172 L106 192" stroke="rgba(0,0,0,.3)" stroke-width="3"/>`;
  if (c.top === "collar") s += `<path d="M84 152 L100 174 L88 178 L76 156 Z M116 152 L100 174 L112 178 L124 156 Z" fill="#fff" stroke="#ccc" stroke-width="1.5"/>`;

  // head
  s += `<circle cx="54" cy="96" r="8" fill="${skin}"/><circle cx="146" cy="96" r="8" fill="${skin}"/>`;
  s += `<ellipse cx="100" cy="92" rx="46" ry="52" fill="${skin}"/>`;

  // eyes
  const L = 80, R = 120, ey = 92;
  s += `<path d="M70 78 Q80 73 90 78 M110 78 Q120 73 130 78" stroke="${hc}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if (c.eyes === "dots") s += `<circle cx="${L}" cy="${ey}" r="4.5" fill="${ink}"/><circle cx="${R}" cy="${ey}" r="4.5" fill="${ink}"/>`;
  if (c.eyes === "happy") s += `<path d="M72 94 Q80 84 88 94 M112 94 Q120 84 128 94" stroke="${ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if (c.eyes === "wide") s += [L, R].map((x) => `<circle cx="${x}" cy="${ey}" r="8" fill="#fff" stroke="${ink}" stroke-width="2"/><circle cx="${x}" cy="${ey}" r="3.5" fill="${ink}"/>`).join("");
  if (c.eyes === "sleepy") s += `<path d="M72 93 L88 93 M112 93 L128 93" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>`;

  // mouth
  if (c.mouth === "smile") s += `<path d="M84 118 Q100 134 116 118" stroke="${ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if (c.mouth === "grin") s += `<path d="M82 115 Q100 142 118 115 Z" fill="#fff" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`;
  if (c.mouth === "neutral") s += `<path d="M88 122 L112 122" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>`;
  if (c.mouth === "open") s += `<ellipse cx="100" cy="123" rx="8" ry="7" fill="#7A2E2E"/>`;

  // hair in front
  const fringe = `<path d="M53 84 Q50 38 100 36 Q150 38 147 84 Q140 62 100 60 Q60 62 53 84 Z" fill="${hc}"/>`;
  if (["short", "long", "curly", "bun"].includes(c.hair)) s += fringe;
  if (c.hair === "buzz") s += `<path d="M55 80 Q56 44 100 42 Q144 44 145 80 Q138 66 100 64 Q62 66 55 80 Z" fill="${hc}" opacity=".7"/>`;

  // glasses
  if (c.glasses === "round") s += `<circle cx="${L}" cy="${ey}" r="13" fill="none" stroke="${ink}" stroke-width="3"/><circle cx="${R}" cy="${ey}" r="13" fill="none" stroke="${ink}" stroke-width="3"/><path d="M93 92 L107 92" stroke="${ink}" stroke-width="3"/>`;
  if (c.glasses === "square") s += `<rect x="66" y="82" width="28" height="22" rx="4" fill="none" stroke="${ink}" stroke-width="3"/><rect x="106" y="82" width="28" height="22" rx="4" fill="none" stroke="${ink}" stroke-width="3"/><path d="M94 92 L106 92" stroke="${ink}" stroke-width="3"/>`;
  if (c.glasses === "sun") s += `<rect x="64" y="82" width="32" height="22" rx="7" fill="${ink}"/><rect x="104" y="82" width="32" height="22" rx="7" fill="${ink}"/><path d="M96 90 L104 90" stroke="${ink}" stroke-width="3"/>`;

  // hat (uses clothing colour)
  if (c.hat === "cap") s += `<path d="M52 70 Q54 28 100 28 Q146 28 148 70 Z" fill="${tc}" stroke="rgba(0,0,0,.2)" stroke-width="2"/><path d="M110 66 L170 72 Q172 80 160 80 L108 74 Z" fill="${tc}" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`;
  if (c.hat === "beanie") s += `<path d="M52 72 Q52 24 100 24 Q148 24 148 72 Z" fill="${tc}" stroke="rgba(0,0,0,.2)" stroke-width="2"/><rect x="50" y="62" width="100" height="14" rx="6" fill="${tc}" stroke="rgba(0,0,0,.25)" stroke-width="2"/><circle cx="100" cy="22" r="7" fill="${tc}" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`;

  return s + "</svg>";
}
