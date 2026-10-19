#!/usr/bin/env node
/**
 * Generates original SVG illustrations for Settled Paws.
 * Stylized geometric dogs / training scenes — no photoreal people.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imgRoot = path.join(root, "public/images");

const C = {
  cream: "#f7f5f0",
  creamDark: "#efeae2",
  ink: "#1c2a24",
  forest: "#2f5d50",
  forestDark: "#244a40",
  sage: "#4a7a68",
  sageLight: "#a9bfb3",
  sagePale: "#e5ede8",
  amber: "#f5d9a8",
  sky: "#d4e8ee",
  white: "#ffffff",
  coral: "#e8a598",
};

function wrap(w, h, body, bg = C.cream) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <rect width="${w}" height="${h}" fill="${bg}" rx="24"/>
  ${body}
</svg>
`;
}

function dog(x, y, scale = 1, color = C.forest, earColor = C.forestDark) {
  const s = scale;
  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <!-- body -->
    <ellipse cx="40" cy="52" rx="28" ry="18" fill="${color}"/>
    <!-- head -->
    <circle cx="68" cy="38" r="16" fill="${color}"/>
    <!-- ears -->
    <ellipse cx="58" cy="26" rx="6" ry="10" fill="${earColor}" transform="rotate(-20 58 26)"/>
    <ellipse cx="76" cy="26" rx="6" ry="10" fill="${earColor}" transform="rotate(20 76 26)"/>
    <!-- snout -->
    <ellipse cx="78" cy="42" rx="8" ry="6" fill="${C.creamDark}"/>
    <circle cx="82" cy="40" r="2" fill="${C.ink}"/>
    <!-- eye -->
    <circle cx="72" cy="34" r="2.2" fill="${C.ink}"/>
    <!-- legs -->
    <rect x="22" y="62" width="7" height="16" rx="3" fill="${earColor}"/>
    <rect x="36" y="62" width="7" height="16" rx="3" fill="${earColor}"/>
    <rect x="48" y="62" width="7" height="16" rx="3" fill="${earColor}"/>
    <rect x="58" y="60" width="7" height="18" rx="3" fill="${earColor}"/>
    <!-- tail -->
    <path d="M14 48 Q4 36 12 30" fill="none" stroke="${earColor}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

function puppy(x, y, scale = 0.75) {
  return dog(x, y, scale, C.sage, C.forest);
}

function crate(x, y, scale = 1) {
  const s = scale;
  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <rect x="0" y="10" width="70" height="50" rx="4" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2.5"/>
    <line x1="14" y1="10" x2="14" y2="60" stroke="${C.sageLight}" stroke-width="2"/>
    <line x1="28" y1="10" x2="28" y2="60" stroke="${C.sageLight}" stroke-width="2"/>
    <line x1="42" y1="10" x2="42" y2="60" stroke="${C.sageLight}" stroke-width="2"/>
    <line x1="56" y1="10" x2="56" y2="60" stroke="${C.sageLight}" stroke-width="2"/>
    <line x1="0" y1="28" x2="70" y2="28" stroke="${C.sageLight}" stroke-width="2"/>
    <line x1="0" y1="44" x2="70" y2="44" stroke="${C.sageLight}" stroke-width="2"/>
    <rect x="0" y="58" width="70" height="6" rx="2" fill="${C.forest}"/>
  </g>`;
}

function mat(x, y, w = 90, h = 18) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${C.amber}" stroke="${C.forest}" stroke-width="1.5"/>`;
}

function leash(x1, y1, x2, y2) {
  return `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 20} ${x2} ${y2}" fill="none" stroke="${C.forest}" stroke-width="3" stroke-linecap="round"/>`;
}

function building(x, y) {
  return `
  <g transform="translate(${x},${y})">
    <rect x="0" y="20" width="50" height="70" rx="3" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
    <rect x="8" y="30" width="12" height="12" rx="1" fill="${C.sky}"/>
    <rect x="28" y="30" width="12" height="12" rx="1" fill="${C.sky}"/>
    <rect x="8" y="50" width="12" height="12" rx="1" fill="${C.sky}"/>
    <rect x="28" y="50" width="12" height="12" rx="1" fill="${C.sky}"/>
    <rect x="18" y="70" width="14" height="20" fill="${C.forest}"/>
  </g>`;
}

function door(x, y) {
  return `
  <g transform="translate(${x},${y})">
    <rect x="0" y="0" width="36" height="70" rx="2" fill="${C.creamDark}" stroke="${C.forest}" stroke-width="2.5"/>
    <circle cx="28" cy="36" r="3" fill="${C.forest}"/>
  </g>`;
}

function car(x, y) {
  return `
  <g transform="translate(${x},${y})">
    <rect x="10" y="20" width="80" height="28" rx="8" fill="${C.sage}" stroke="${C.forest}" stroke-width="2"/>
    <path d="M28 20 L38 6 H62 L72 20" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
    <circle cx="30" cy="50" r="8" fill="${C.ink}"/>
    <circle cx="70" cy="50" r="8" fill="${C.ink}"/>
    <circle cx="30" cy="50" r="3.5" fill="${C.sageLight}"/>
    <circle cx="70" cy="50" r="3.5" fill="${C.sageLight}"/>
  </g>`;
}

function bed(x, y) {
  return `
  <g transform="translate(${x},${y})">
    <ellipse cx="50" cy="28" rx="48" ry="20" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
    <ellipse cx="50" cy="24" rx="36" ry="12" fill="${C.amber}"/>
  </g>`;
}

function toy(x, y) {
  return `
  <g transform="translate(${x},${y})">
    <circle cx="12" cy="12" r="12" fill="${C.coral}"/>
    <circle cx="12" cy="12" r="4" fill="${C.cream}"/>
  </g>`;
}

function rain(x, y) {
  return `
  <g transform="translate(${x},${y})" stroke="${C.sage}" stroke-width="2" stroke-linecap="round">
    <line x1="0" y1="0" x2="-4" y2="14"/><line x1="14" y1="4" x2="10" y2="18"/>
    <line x1="28" y1="0" x2="24" y2="14"/><line x1="42" y1="6" x2="38" y2="20"/>
  </g>`;
}

function pawPrint(x, y, s = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${s})" fill="${C.sageLight}" opacity="0.5">
    <ellipse cx="0" cy="8" rx="7" ry="5"/>
    <circle cx="-8" cy="-2" r="3.5"/><circle cx="-2" cy="-6" r="3.5"/>
    <circle cx="5" cy="-6" r="3.5"/><circle cx="10" cy="-1" r="3.5"/>
  </g>`;
}

function write(rel, content) {
  const full = path.join(imgRoot, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  return rel;
}

// --- Hero ---
write(
  "site/hero.svg",
  wrap(
    800,
    520,
    `
  ${pawPrint(60, 80, 1.4)}
  ${pawPrint(700, 400, 1.2)}
  ${pawPrint(720, 60, 0.9)}
  <rect x="480" y="120" width="240" height="280" rx="20" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="3"/>
  <rect x="510" y="160" width="50" height="50" rx="6" fill="${C.sky}"/>
  <rect x="580" y="160" width="50" height="50" rx="6" fill="${C.sky}"/>
  <rect x="650" y="160" width="40" height="50" rx="6" fill="${C.sky}"/>
  <rect x="510" y="230" width="50" height="50" rx="6" fill="${C.sky}"/>
  <rect x="580" y="230" width="50" height="50" rx="6" fill="${C.sky}"/>
  ${mat(80, 380, 320, 24)}
  ${dog(120, 280, 1.6)}
  ${puppy(280, 310, 1.1)}
  <text x="80" y="90" font-family="Georgia, serif" font-size="28" fill="${C.forest}" font-weight="600">Settled at home</text>
  <text x="80" y="124" font-family="system-ui,sans-serif" font-size="16" fill="${C.ink}" opacity="0.7">Calm plans for real apartments</text>
`,
    C.cream
  )
);

write(
  "site/og-default.svg",
  wrap(
    1200,
    630,
    `
  ${pawPrint(80, 100, 2)}
  ${pawPrint(1050, 480, 1.8)}
  ${dog(180, 220, 2.8)}
  ${mat(160, 480, 420, 36)}
  <text x="620" y="280" font-family="Georgia, serif" font-size="64" fill="${C.forest}" font-weight="600">Settled Paws</text>
  <text x="620" y="340" font-family="system-ui,sans-serif" font-size="28" fill="${C.ink}" opacity="0.75">Calm, practical dog training</text>
  <text x="620" y="380" font-family="system-ui,sans-serif" font-size="28" fill="${C.ink}" opacity="0.75">for real homes</text>
`,
    C.cream
  )
);

// Categories
const categories = {
  "puppy-basics": () =>
    wrap(640, 360, `${puppy(80, 120, 1.8)}${toy(320, 220)}${mat(60, 280, 200, 20)}${pawPrint(480, 80, 1.5)}
    <text x="360" y="160" font-family="Georgia,serif" font-size="32" fill="${C.forest}">Puppy Basics</text>
    <text x="360" y="200" font-family="system-ui,sans-serif" font-size="16" fill="${C.ink}" opacity="0.7">First weeks at home</text>`),
  "house-manners-barking": () =>
    wrap(640, 360, `${door(80, 80)}${dog(160, 160, 1.5)}${mat(280, 280, 160, 18)}
    <text x="360" y="150" font-family="Georgia,serif" font-size="28" fill="${C.forest}">House Manners</text>
    <text x="360" y="190" font-family="system-ui,sans-serif" font-size="16" fill="${C.ink}" opacity="0.7">&amp; quiet living</text>`),
  "separation-alone-time": () =>
    wrap(640, 360, `${crate(80, 140, 1.8)}${dog(100, 150, 1.1)}${pawPrint(420, 100, 1.3)}
    <circle cx="480" cy="200" r="40" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
    <text x="468" y="208" font-family="system-ui" font-size="28" fill="${C.forest}">⏱</text>
    <text x="360" y="300" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Alone Time</text>`),
  "leash-outdoor": () =>
    wrap(640, 360, `${building(40, 80)}${dog(160, 180, 1.4)}${leash(250, 210, 360, 160)}
    <circle cx="380" cy="150" r="10" fill="${C.forest}"/>
    ${pawPrint(500, 280, 1.2)}
    <text x="400" y="240" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Leash &amp; Outdoor</text>`),
  "tools-gear": () =>
    wrap(640, 360, `${crate(60, 120, 1.5)}${bed(280, 200)}${toy(480, 160)}
    <text x="280" y="120" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Tools &amp; Gear</text>
    <text x="280" y="155" font-family="system-ui,sans-serif" font-size="15" fill="${C.ink}" opacity="0.7">Crates, harnesses, enrichment</text>`),
};

for (const [slug, fn] of Object.entries(categories)) {
  write(`categories/${slug}.svg`, fn());
}

// Article-specific scenes
const articles = {
  "crate-training-day-night-schedule": {
    featured: () =>
      wrap(800, 450, `${crate(120, 140, 2.2)}${puppy(160, 160, 1.3)}
      <circle cx="560" cy="140" r="36" fill="${C.amber}"/><text x="548" y="148" font-size="28">☀</text>
      <circle cx="640" cy="140" r="36" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="626" y="148" font-size="28">☾</text>
      <text x="480" y="280" font-family="Georgia,serif" font-size="30" fill="${C.forest}">Day &amp; night</text>
      <text x="480" y="318" font-family="system-ui" font-size="16" fill="${C.ink}" opacity="0.7">crate schedule</text>`),
    figures: [
      () =>
        wrap(720, 320, `<text x="40" y="50" font-family="Georgia,serif" font-size="22" fill="${C.forest}">Intro week ladder</text>
        ${[1, 2, 3, 4, 5].map((n, i) => `<rect x="${60 + i * 120}" y="${100 + (4 - i) * 12}" width="90" height="${80 + i * 20}" rx="8" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${90 + i * 120}" y="${160 + (4 - i) * 8}" font-family="system-ui" font-size="14" fill="${C.forest}">${["Door open", "10 sec", "1 min", "5 min", "Room exit"][i]}</text>`).join("")}`),
      () =>
        wrap(720, 280, `${crate(80, 80, 1.6)}${puppy(110, 95, 1)}
        <text x="320" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Night tips</text>
        <text x="320" y="140" font-family="system-ui" font-size="15" fill="${C.ink}">• Crate in bedroom first weeks</text>
        <text x="320" y="168" font-family="system-ui" font-size="15" fill="${C.ink}">• Last potty right before bed</text>
        <text x="320" y="196" font-family="system-ui" font-size="15" fill="${C.ink}">• Quiet settle, not late play</text>`),
    ],
  },
  "alone-time-protocol-separation-anxiety": {
    featured: () =>
      wrap(800, 450, `${crate(100, 160, 2)}${dog(130, 175, 1.2)}
      <path d="M420 200 Q500 120 580 200" fill="none" stroke="${C.sageLight}" stroke-width="4" stroke-dasharray="8 6"/>
      <circle cx="600" cy="200" r="50" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="3"/>
      <text x="575" y="210" font-family="system-ui" font-size="22" fill="${C.forest}">Leave</text>
      <text x="420" y="320" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Graded absences</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Duration ladder (example)</text>
        ${["Keys only", "Door open", "30 sec out", "2 min", "5+ min"].map((t, i) => `<g transform="translate(${50 + i * 130},80)"><circle cx="40" cy="40" r="36" fill="${i < 3 ? C.sagePale : C.amber}" stroke="${C.forest}" stroke-width="2"/><text x="40" y="45" text-anchor="middle" font-size="11" fill="${C.ink}">${t}</text></g>`).join("")}`),
      () =>
        wrap(720, 260, `${dog(80, 80, 1.3)}
        <text x="280" y="90" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Departure cues to desensitize</text>
        <text x="280" y="130" font-size="15" fill="${C.ink}">Keys · Shoes · Bag · Jacket · Door click</text>
        <text x="280" y="165" font-size="15" fill="${C.ink}">Practice cues without leaving until boring</text>`),
    ],
  },
  "apartment-barking-triggers-quieting-plan": {
    featured: () =>
      wrap(800, 450, `${building(80, 80)}${dog(200, 200, 1.5)}
      <circle cx="380" cy="160" r="28" fill="${C.coral}" opacity="0.85"/><text x="368" y="168" font-size="22">!</text>
      <path d="M360 140 Q400 80 440 140" fill="none" stroke="${C.coral}" stroke-width="3"/>
      <text x="480" y="220" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Quieting plan</text>
      <text x="480" y="258" font-size="16" fill="${C.ink}" opacity="0.7">Triggers → manage → train</text>`),
    figures: [
      () =>
        wrap(720, 300, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Common apartment triggers</text>
        ${["Hallway", "Elevator", "Doorbell", "Alone"].map((t, i) => `<rect x="${50 + i * 165}" y="90" width="140" height="120" rx="12" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${120 + i * 165}" y="160" text-anchor="middle" font-size="15" fill="${C.ink}">${t}</text>`).join("")}`),
      () =>
        wrap(720, 240, `${mat(80, 140, 200, 20)}${dog(100, 60, 1.2)}
        <text x="360" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Quiet settle station</text>
        <text x="360" y="140" font-size="15" fill="${C.ink}">Mat away from the front door</text>
        <text x="360" y="168" font-size="15" fill="${C.ink}">White noise + pre-stuffed chew</text>`),
    ],
  },
  "apartment-potty-training-without-yard": {
    featured: () =>
      wrap(800, 450, `${building(60, 60)}${dog(200, 220, 1.4)}
      <ellipse cx="520" cy="280" rx="80" ry="40" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
      <text x="490" y="286" font-size="14" fill="${C.forest}">Potty spot</text>
      <text x="420" y="140" font-family="Georgia,serif" font-size="28" fill="${C.forest}">No-yard plan</text>`),
    figures: [
      () =>
        wrap(720, 260, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Elevator logistics</text>
        <text x="40" y="90" font-size="15" fill="${C.ink}">1. Leash + treat pouch ready before lift</text>
        <text x="40" y="120" font-size="15" fill="${C.ink}">2. Short sit while doors open</text>
        <text x="40" y="150" font-size="15" fill="${C.ink}">3. Straight to designated spot—no long sniff tour first</text>
        ${dog(480, 100, 1.2)}`),
      () =>
        wrap(720, 240, `<rect x="60" y="60" width="200" height="120" rx="10" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
        <text x="100" y="130" font-size="16" fill="${C.forest}">Pad / balcony</text>
        <rect x="320" y="60" width="200" height="120" rx="10" fill="${C.amber}" stroke="${C.forest}" stroke-width="2"/>
        <text x="360" y="130" font-size="16" fill="${C.forest}">Street walk</text>
        <text x="560" y="120" font-size="14" fill="${C.ink}">Pick one primary</text>`),
    ],
  },
  "beginner-harnesses-crates-buying-guide": {
    featured: () =>
      wrap(800, 450, `${crate(80, 140, 1.8)}${dog(320, 180, 1.5)}
      <path d="M420 220 Q480 180 520 240" fill="none" stroke="${C.forest}" stroke-width="4"/>
      <rect x="500" y="220" width="40" height="28" rx="6" fill="${C.sage}"/>
      <text x="560" y="200" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Gear that fits</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Harness shapes</text>
        ${["Y-front", "Vest", "Step-in"].map((t, i) => `<g transform="translate(${80 + i * 200},90)"><ellipse cx="50" cy="50" rx="45" ry="35" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="50" y="55" text-anchor="middle" font-size="14" fill="${C.ink}">${t}</text></g>`).join("")}`),
      () =>
        wrap(720, 240, `${crate(100, 60, 1.4)}
        <text x="320" y="90" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Crate sizing</text>
        <text x="320" y="130" font-size="15" fill="${C.ink}">Stand · turn · stretch — not a bathroom wing</text>
        <text x="320" y="160" font-size="15" fill="${C.ink}">Use a divider while growing</text>`),
    ],
  },
  "car-travel-vet-visit-calm-anxious-dogs": {
    featured: () =>
      wrap(800, 450, `${car(120, 200)}${dog(200, 160, 1.1)}
      <rect x="520" y="140" width="180" height="160" rx="12" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
      <text x="560" y="220" font-size="16" fill="${C.forest}">Vet calm</text>
      <text x="540" y="250" font-size="14" fill="${C.ink}">Cooperative care</text>`),
    figures: [
      () =>
        wrap(720, 260, `${car(80, 80)}${dog(140, 50, 0.9)}
        <text x="360" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Car steps</text>
        <text x="360" y="140" font-size="15" fill="${C.ink}">Engine off → treats in car → short drives</text>
        <text x="360" y="170" font-size="15" fill="${C.ink}">Secure with crash-tested harness or crate</text>`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Clinic game plan</text>
        <text x="40" y="100" font-size="15" fill="${C.ink}">Wait in car if lobby is chaotic</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Mat + high-value food for exams</text>
        <text x="40" y="160" font-size="15" fill="${C.ink}">Ask for cooperative care / fear-free handling</text>
        ${dog(480, 80, 1.2)}`),
    ],
  },
  "choosing-dog-bed-quiet-settle-place": {
    featured: () =>
      wrap(800, 450, `${bed(160, 200)}${dog(180, 140, 1.5)}
      <text x="480" y="220" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Quiet place</text>
      <text x="480" y="260" font-size="16" fill="${C.ink}" opacity="0.7">Bed + settle cue</text>`),
    figures: [
      () =>
        wrap(720, 260, `${bed(80, 100)}${dog(100, 50, 1.1)}
        <text x="360" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Placement tips</text>
        <text x="360" y="140" font-size="15" fill="${C.ink}">Visible but out of traffic</text>
        <text x="360" y="170" font-size="15" fill="${C.ink}">Not blocking the front door</text>`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Bed types</text>
        ${["Orthopedic", "Bolster", "Cooling mat"].map((t, i) => `<rect x="${50 + i * 220}" y="90" width="180" height="90" rx="10" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${140 + i * 220}" y="140" text-anchor="middle" font-size="14" fill="${C.ink}">${t}</text>`).join("")}`),
    ],
  },
  "counter-surfing-kitchen-manners": {
    featured: () =>
      wrap(800, 450, `
      <rect x="80" y="200" width="320" height="40" rx="4" fill="${C.creamDark}" stroke="${C.forest}" stroke-width="2"/>
      <rect x="100" y="160" width="40" height="40" rx="4" fill="${C.coral}"/>
      ${dog(200, 220, 1.5)}
      <path d="M280 200 L300 160" stroke="${C.forest}" stroke-width="2" stroke-dasharray="4"/>
      <text x="480" y="220" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Paws off counters</text>`),
    figures: [
      () =>
        wrap(720, 260, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Management first</text>
        <text x="40" y="95" font-size="15" fill="${C.ink}">Clear counters · closed trash · baby gate</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Practice leave-it away from the kitchen first</text>
        ${mat(400, 160, 180, 18)}${dog(420, 70, 1.1)}`),
      () =>
        wrap(720, 240, `${dog(80, 80, 1.2)}
        <text x="280" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Kitchen settle</text>
        <text x="280" y="140" font-size="15" fill="${C.ink}">Mat job while you cook = paid employment</text>`),
    ],
  },
  "doorway-manners-guests-no-bolting": {
    featured: () =>
      wrap(800, 450, `${door(120, 100)}${mat(200, 320, 140, 18)}${dog(210, 220, 1.4)}
      <text x="420" y="200" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Wait at the door</text>
      <text x="420" y="240" font-size="16" fill="${C.ink}" opacity="0.7">No bolting · polite greets</text>`),
    figures: [
      () =>
        wrap(720, 280, `${door(60, 40)}${mat(140, 200, 120, 16)}${dog(150, 110, 1.1)}
        <text x="360" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Door drill</text>
        <text x="360" y="140" font-size="15" fill="${C.ink}">1. Sit / settle on mat</text>
        <text x="360" y="170" font-size="15" fill="${C.ink}">2. Open door a crack → reward stillness</text>
        <text x="360" y="200" font-size="15" fill="${C.ink}">3. Release only on cue</text>`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Guest protocol</text>
        <text x="40" y="100" font-size="15" fill="${C.ink}">Leash for real guests until fluent</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Guests ignore dog until calm</text>
        <text x="40" y="160" font-size="15" fill="${C.ink}">Delivery: treat scatter away from door</text>`),
    ],
  },
  "elevator-hallway-etiquette-apartment-dogs": {
    featured: () =>
      wrap(800, 450, `${building(80, 60)}
      <rect x="200" y="160" width="70" height="110" rx="4" fill="${C.sage}" stroke="${C.forest}" stroke-width="2"/>
      ${dog(300, 220, 1.3)}${leash(360, 250, 420, 200)}
      <text x="480" y="240" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Elevator calm</text>`),
    figures: [
      () =>
        wrap(720, 260, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Hallway spacing</text>
        ${dog(80, 100, 1)}${dog(280, 100, 1)}
        <path d="M180 140 L240 140" stroke="${C.forest}" stroke-width="3" stroke-dasharray="6"/>
        <text x="400" y="140" font-size="15" fill="${C.ink}">U-turn before nose-to-nose</text>`),
      () =>
        wrap(720, 240, `<rect x="80" y="60" width="80" height="120" rx="4" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
        ${dog(100, 100, 0.9)}
        <text x="220" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Cab rules</text>
        <text x="220" y="140" font-size="15" fill="${C.ink}">Sit in corner · short leash · wait for exit space</text>`),
    ],
  },
  "enrichment-toys-boredom-busters-apartment-dogs": {
    featured: () =>
      wrap(800, 450, `${toy(140, 160)}${toy(220, 220)}${toy(180, 280)}
      ${dog(320, 180, 1.6)}
      <text x="520" y="220" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Brain work</text>
      <text x="520" y="258" font-size="16" fill="${C.ink}" opacity="0.7">Puzzles · chews · scent</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Enrichment menu</text>
        ${["Food puzzle", "Lick mat", "Snuffle", "Chew"].map((t, i) => `<rect x="${50 + i * 165}" y="90" width="140" height="100" rx="12" fill="${i % 2 ? C.amber : C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${120 + i * 165}" y="150" text-anchor="middle" font-size="14" fill="${C.ink}">${t}</text>`).join("")}`),
      () =>
        wrap(720, 240, `${dog(80, 80, 1.2)}${toy(220, 140)}
        <text x="320" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Quiet enrichment</text>
        <text x="320" y="140" font-size="15" fill="${C.ink}">Prefer lick/snuffle over squeaky chaos after 9pm</text>`),
    ],
  },
  "leave-it-drop-it-reliable-training": {
    featured: () =>
      wrap(800, 450, `${dog(160, 180, 1.6)}
      <circle cx="380" cy="220" r="24" fill="${C.coral}"/>
      <path d="M340 200 L300 160" stroke="${C.forest}" stroke-width="3" stroke-linecap="round"/>
      <text x="360" y="155" font-size="18" fill="${C.forest}">Leave it</text>
      <text x="480" y="240" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Reliable cues</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Leave-it stages</text>
        ${["Covered treat", "Open hand", "Floor", "Walk past"].map((t, i) => `<g transform="translate(${60 + i * 160},90)"><circle cx="50" cy="50" r="42" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="50" y="55" text-anchor="middle" font-size="12" fill="${C.ink}">${t}</text></g>`).join("")}`),
      () =>
        wrap(720, 240, `${dog(80, 70, 1.2)}
        <circle cx="260" cy="140" r="18" fill="${C.amber}"/>
        <text x="320" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Drop it trade</text>
        <text x="320" y="140" font-size="15" fill="${C.ink}">Show better item → cue → swap → praise</text>`),
    ],
  },
  "loose-leash-training-reactive-dogs-apartments": {
    featured: () =>
      wrap(800, 450, `${building(40, 80)}${dog(180, 200, 1.4)}${leash(280, 230, 400, 180)}
      ${dog(480, 200, 1.2)}
      <text x="280" y="360" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Loose leash · city calm</text>`),
    figures: [
      () =>
        wrap(720, 260, `${dog(60, 80, 1.1)}${leash(160, 120, 280, 100)}
        <text x="320" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Engagement game</text>
        <text x="320" y="140" font-size="15" fill="${C.ink}">Name → look → mark → treat at hip</text>
        <text x="320" y="170" font-size="15" fill="${C.ink}">Practice indoors before busy sidewalks</text>`),
      () =>
        wrap(720, 240, `${dog(80, 90, 1)}${dog(400, 90, 1)}
        <path d="M200 140 L360 140" stroke="${C.sageLight}" stroke-width="4" stroke-dasharray="8"/>
        <text x="220" y="200" font-size="15" fill="${C.ink}">Parallel walk at a working distance</text>`),
    ],
  },
  "mat-settle-training-hyper-puppy": {
    featured: () =>
      wrap(800, 450, `${mat(160, 300, 280, 28)}${puppy(200, 180, 1.6)}
      <text x="500" y="220" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Settle on mat</text>
      <text x="500" y="260" font-size="16" fill="${C.ink}" opacity="0.7">For hyper puppies</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Settle ladder</text>
        ${["4 paws", "Sit", "Down", "Duration"].map((t, i) => `<rect x="${60 + i * 155}" y="${100 + i * 8}" width="130" height="80" rx="10" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${125 + i * 155}" y="${145 + i * 8}" text-anchor="middle" font-size="14" fill="${C.ink}">${t}</text>`).join("")}`),
      () =>
        wrap(720, 240, `${mat(80, 150, 200, 20)}${puppy(110, 60, 1.1)}
        <text x="360" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Real-life uses</text>
        <text x="360" y="140" font-size="15" fill="${C.ink}">Meals · guests · Zoom calls · TV</text>`),
    ],
  },
  "multi-dog-household-introductions-home": {
    featured: () =>
      wrap(800, 450, `${dog(140, 180, 1.4)}${dog(340, 190, 1.3)}
      <path d="M260 230 L300 230" stroke="${C.sageLight}" stroke-width="4" stroke-dasharray="6"/>
      <text x="500" y="230" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Thoughtful intros</text>`),
    figures: [
      () =>
        wrap(720, 260, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Intro order</text>
        <text x="40" y="95" font-size="15" fill="${C.ink}">1. Parallel outdoor walks</text>
        <text x="40" y="125" font-size="15" fill="${C.ink}">2. Neutral yard / lobby sniff</text>
        <text x="40" y="155" font-size="15" fill="${C.ink}">3. Indoors with doors open + management</text>
        ${dog(480, 80, 1.1)}`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Resource tips</text>
        <text x="40" y="100" font-size="15" fill="${C.ink}">Separate bowls · extra beds · gated quiet zones</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Supervise toys until peaceful sharing is proven</text>`),
    ],
  },
  "newly-adopted-rescue-first-two-weeks": {
    featured: () =>
      wrap(800, 450, `${bed(140, 220)}${dog(160, 160, 1.5)}
      <rect x="480" y="140" width="220" height="160" rx="16" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/>
      <text x="520" y="210" font-family="Georgia,serif" font-size="22" fill="${C.forest}">First 2 weeks</text>
      <text x="510" y="250" font-size="14" fill="${C.ink}">Decompress · routine</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Decompression checklist</text>
        <text x="40" y="95" font-size="15" fill="${C.ink}">☐ Quiet rooms  ☐ Predictable walks  ☐ One caretaker lead</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">☐ Vet check booked  ☐ No dog-park pressure yet</text>
        ${dog(480, 100, 1.2)}`),
      () =>
        wrap(720, 240, `${crate(60, 60, 1.3)}${dog(90, 70, 0.9)}
        <text x="280" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Safe base camp</text>
        <text x="280" y="140" font-size="15" fill="${C.ink}">Crate or gated room = reset button</text>`),
    ],
  },
  "puppy-biting-redirection": {
    featured: () =>
      wrap(800, 450, `${puppy(160, 180, 1.7)}${toy(380, 240)}
      <path d="M320 220 Q350 200 370 230" stroke="${C.forest}" stroke-width="3" fill="none"/>
      <text x="480" y="220" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Redirect the bite</text>`),
    figures: [
      () =>
        wrap(720, 260, `${puppy(60, 80, 1.2)}${toy(240, 140)}
        <text x="360" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Bite plan</text>
        <text x="360" y="140" font-size="15" fill="${C.ink}">Ouch → freeze → toy offer → praise chewing toy</text>`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Prevention</text>
        <text x="40" y="100" font-size="15" fill="${C.ink}">Scheduled naps · enrichment · no rough hand play</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">If over-aroused: short timeout behind baby gate</text>`),
    ],
  },
  "puppy-first-30-days-at-home": {
    featured: () =>
      wrap(800, 450, `${puppy(140, 180, 1.7)}${mat(120, 340, 220, 22)}${toy(360, 280)}
      <text x="480" y="200" font-family="Georgia,serif" font-size="28" fill="${C.forest}">First 30 days</text>
      <text x="480" y="240" font-size="16" fill="${C.ink}" opacity="0.7">Routines that stick</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Week themes</text>
        ${["Settle", "Potty", "Crate", "Social"].map((t, i) => `<rect x="${50 + i * 165}" y="90" width="140" height="100" rx="12" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${120 + i * 165}" y="130" text-anchor="middle" font-size="13" fill="${C.forest}">Week ${i + 1}</text><text x="${120 + i * 165}" y="160" text-anchor="middle" font-size="14" fill="${C.ink}">${t}</text>`).join("")}`),
      () =>
        wrap(720, 240, `${puppy(80, 70, 1.1)}
        <text x="280" y="90" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Daily skeleton</text>
        <text x="280" y="130" font-size="15" fill="${C.ink}">Potty · meal · play · nap · short training · evening wind-down</text>`),
    ],
  },
  "puppy-night-waking-sleep-training": {
    featured: () =>
      wrap(800, 450, `
      <circle cx="620" cy="100" r="40" fill="${C.amber}" opacity="0.5"/>
      ${crate(120, 160, 2)}${puppy(160, 180, 1.2)}
      <text x="480" y="260" font-family="Georgia,serif" font-size="28" fill="${C.forest}">Night sleep plan</text>`),
    figures: [
      () =>
        wrap(720, 260, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Night checklist</text>
        <text x="40" y="95" font-size="15" fill="${C.ink}">Last potty · calm evening · crate near bed · boring wake-ups</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Ignore demand barking; respond to real potty needs</text>
        ${puppy(500, 100, 1)}`),
      () =>
        wrap(720, 240, `${crate(80, 60, 1.3)}${puppy(110, 75, 0.85)}
        <text x="300" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Age-honest expectations</text>
        <text x="300" y="140" font-size="15" fill="${C.ink}">Young puppies need night potty breaks—plan them</text>`),
    ],
  },
  "rainy-day-indoor-exercise-plans": {
    featured: () =>
      wrap(800, 450, `${rain(100, 40)}${rain(200, 60)}${rain(300, 40)}
      ${dog(180, 200, 1.5)}${toy(400, 260)}
      <text x="480" y="230" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Rainy-day plans</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Indoor circuit</text>
        ${["Snuffle", "Trick set", "Chase toy", "Settle"].map((t, i) => `<rect x="${50 + i * 165}" y="90" width="140" height="100" rx="12" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2"/><text x="${120 + i * 165}" y="150" text-anchor="middle" font-size="14" fill="${C.ink}">${t}</text>`).join("")}`),
      () =>
        wrap(720, 240, `${dog(80, 80, 1.2)}
        <text x="280" y="100" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Noise-aware play</text>
        <text x="280" y="140" font-size="15" fill="${C.ink}">Skip thunderous fetch in thin-walled apartments</text>`),
    ],
  },
  "walking-past-dogs-without-reactivity": {
    featured: () =>
      wrap(800, 450, `${dog(120, 200, 1.4)}${dog(480, 200, 1.4)}
      ${leash(220, 230, 300, 180)}
      <path d="M320 220 Q400 160 460 220" fill="none" stroke="${C.sageLight}" stroke-width="3" stroke-dasharray="8"/>
      <text x="280" y="360" font-family="Georgia,serif" font-size="26" fill="${C.forest}">Pass without drama</text>`),
    figures: [
      () =>
        wrap(720, 260, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Working distance</text>
        ${dog(80, 100, 1)}${dog(420, 100, 1)}
        <text x="220" y="200" font-size="14" fill="${C.ink}">Stay where your dog can still think</text>`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Pattern games</text>
        <text x="40" y="100" font-size="15" fill="${C.ink}">U-turn · treat magnet · look-at-that → look-at-me</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Exit before threshold—success is boring</text>
        ${dog(500, 80, 1.1)}`),
    ],
  },
  "when-to-hire-professional-trainer": {
    featured: () =>
      wrap(800, 450, `${dog(160, 180, 1.5)}
      <rect x="420" y="140" width="260" height="180" rx="16" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="3"/>
      <text x="470" y="220" font-family="Georgia,serif" font-size="22" fill="${C.forest}">Pro help</text>
      <text x="450" y="260" font-size="14" fill="${C.ink}">Force-free · credentialed</text>`),
    figures: [
      () =>
        wrap(720, 280, `<text x="40" y="45" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Red flags for DIY-only</text>
        <text x="40" y="95" font-size="15" fill="${C.ink}">Aggression · panic when alone · sudden behavior change</text>
        <text x="40" y="125" font-size="15" fill="${C.ink}">Bite history · resource guarding that escalates</text>
        ${dog(500, 100, 1.2)}`),
      () =>
        wrap(720, 240, `<text x="40" y="50" font-family="Georgia,serif" font-size="20" fill="${C.forest}">Who to hire</text>
        <text x="40" y="100" font-size="15" fill="${C.ink}">Look for force-free / LIMA language + clear credentials</text>
        <text x="40" y="130" font-size="15" fill="${C.ink}">Veterinary behaviorist for severe anxiety / aggression</text>`),
    ],
  },
};

let count = 0;
const manifest = {};

for (const [slug, art] of Object.entries(articles)) {
  const featuredPath = `articles/${slug}-featured.svg`;
  write(featuredPath, art.featured());
  count++;
  const figs = [];
  art.figures.forEach((fn, i) => {
    const p = `articles/${slug}-fig-${i + 1}.svg`;
    write(p, fn());
    figs.push(p);
    count++;
  });
  manifest[slug] = {
    image: `/images/${featuredPath}`,
    figures: figs.map((f) => `/images/${f}`),
  };
}

fs.writeFileSync(
  path.join(root, "scripts/image-manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log(`Generated ${count} article images + hero/categories/og`);
console.log(`Manifest keys: ${Object.keys(manifest).length}`);
