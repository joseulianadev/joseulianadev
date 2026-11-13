/**
 * Gera os cards SVG animados do README em /cards.
 *
 *   node scripts/render-cards.mjs
 *
 * O GitHub remove <style> e <script> do markdown, mas um SVG carregado por
 * <img> roda o próprio <style> e as animações SMIL. Então: layout no
 * markdown, visual dentro dos SVGs. Para mudar um texto, edite CONTENT
 * abaixo e rode o script de novo.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CONTENT = {
  kicker: 'BELO HORIZONTE, MG — DISPONÍVEL PARA ESTÁGIO',
  first: 'JOSÉ VICTOR',
  last: 'Uliana',
  role: 'DESENVOLVEDOR DE SOFTWARE EM FORMAÇÃO · ENG. DE SOFTWARE — PUC MINAS',
  delivered: 3,
  semester: { current: 2, total: 8 },
  email: 'ulianajosee@gmail.com',
  projects: [
    { name: 'ALPHASYNC', sub: 'Gestão de ambulâncias', stack: 'REACT · NODE.JS · POSTGRESQL', live: true },
    { name: 'SPORTSLAB', sub: 'Gestão esportiva', stack: 'REACT 19 · VITE · SUPABASE' },
    { name: 'BARBEARIA', sub: 'Agenda e caixa', stack: 'REACT · FIREBASE' },
    { name: 'LOGSYNC', sub: 'Jornadas de motoristas', stack: 'PYTHON' },
    { name: 'PORTFÓLIO', sub: 'Cena 3D contínua', stack: 'REACT THREE FIBER · TYPESCRIPT · GSAP', open: true },
  ],
};

const C = { ink: '#0e0d0c', bone: '#ebe6da', accent: '#ff4a1c', muted: '#a39d90', line: '#34322e', dark: '#11100e' };
const fonts = JSON.parse(readFileSync(new URL('./fonts.json', import.meta.url), 'utf8'));
const OUT = new URL('../cards/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const two = (n) => String(n).padStart(2, '0');

/** <style> comum: fontes embutidas + keyframes compartilhados. */
function style(use, extra = '') {
  const faces = use
    .map((k) => `@font-face{font-family:'${k}';src:url(data:font/woff2;base64,${fonts[k]}) format('woff2');}`)
    .join('');
  return `<style>${faces}
.d{font-family:'display','Arial Narrow',sans-serif;font-weight:800;font-stretch:62%;letter-spacing:-.01em}
.s{font-family:'serif',Georgia,serif;font-style:italic}
.m{font-family:'mono',ui-monospace,monospace;font-weight:500;letter-spacing:.09em}
.up{animation:up .95s cubic-bezier(.16,1,.3,1) both}
.pop{transform-box:fill-box;transform-origin:center;animation:pop .7s cubic-bezier(.2,1.4,.4,1) both}
.draw{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 1.6s cubic-bezier(.77,0,.18,1) both}
.grow{transform-box:fill-box;transform-origin:left;animation:grow 1.1s cubic-bezier(.77,0,.18,1) both}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.2s ease-out infinite}
.nudge{animation:nudge 1.8s ease-in-out infinite}
@keyframes up{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:none}}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes grow{from{transform:scaleX(0)}to{transform:none}}
@keyframes pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.2);opacity:0}}
@keyframes nudge{0%,100%{transform:none}50%{transform:translateX(5px)}}
${extra}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.draw{stroke-dashoffset:0}}
</style>`;
}

const svg = (w, h, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">${body}</svg>\n`;

const d = (s) => `style="animation-delay:${s.toFixed(2)}s"`;

/* ───────────── núcleo de fragmentos (o mesmo objeto do portfólio) ───────────── */
function shards(cx, cy, R) {
  const t = (1 + Math.sqrt(5)) / 2;
  let verts = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t],
    [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const norm = (v) => {
    const l = Math.hypot(...v);
    return v.map((x) => x / l);
  };
  verts = verts.map(norm);
  // uma subdivisão: 20 → 80 faces
  const mid = (a, b) => norm([0, 1, 2].map((i) => (verts[a][i] + verts[b][i]) / 2));
  const next = [];
  for (const [a, b, c] of faces) {
    const i = verts.length;
    verts.push(mid(a, b), mid(b, c), mid(c, a));
    next.push([a, i, i + 2], [b, i + 1, i], [c, i + 2, i + 1], [i, i + 1, i + 2]);
  }
  faces = next;
  // gira para um ângulo interessante
  const rot = ([x, y, z]) => {
    const a = 0.5, b = 0.42;
    const x1 = x * Math.cos(a) + z * Math.sin(a);
    const z1 = -x * Math.sin(a) + z * Math.cos(a);
    return [x1, y * Math.cos(b) - z1 * Math.sin(b), y * Math.sin(b) + z1 * Math.cos(b)];
  };
  const P = verts.map(rot);
  const light = norm([0.5, 0.8, 0.6]);
  const out = [];
  for (const f of faces) {
    const [A, B, D] = f.map((i) => P[i]);
    const n = norm([0, 1, 2].map((i) => A[i] + B[i] + D[i]));
    if (n[2] < 0.04) continue;
    const c = [0, 1].map((i) => (A[i] + B[i] + D[i]) / 3);
    const pts = [A, B, D]
      .map((p) => [cx + (c[0] + (p[0] - c[0]) * 0.9) * R, cy - (c[1] + (p[1] - c[1]) * 0.9) * R])
      .map((p) => p.map((v) => v.toFixed(1)).join(','))
      .join(' ');
    const lit = Math.max(0, n[0] * light[0] + n[1] * light[1] + n[2] * light[2]);
    const k = Math.min(1, Math.pow(1 - n[2], 1.6) * 1.05 + lit * 0.22);
    const col = [58, 24, 16].map((v, i) => Math.round(v + ([255, 74, 28][i] - v) * k));
    const order = (c[0] + 1) * 0.5 + (1 - c[1]) * 0.5;
    out.push(
      `<polygon class="pop" points="${pts}" fill="rgb(${col})" ${d(0.5 + order * 0.9)}/>`,
    );
  }
  return out.join('');
}

/* ───────────── hero ───────────── */
function hero() {
  const body = `
${style(['display', 'serif', 'mono'])}
<defs>
  <linearGradient id="shine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="0">
    <stop offset="0" stop-color="${C.accent}"/><stop offset=".5" stop-color="#ffd0bf"/><stop offset="1" stop-color="${C.accent}"/>
    <animateTransform id="sh" attributeName="gradientTransform" type="translate" from="-260 0" to="900 0" dur="1.5s" begin="2.2s;sh.end+5s" fill="freeze"/>
  </linearGradient>
  <clipPath id="frame"><rect width="880" height="330" rx="18"/></clipPath>
</defs>
<rect width="880" height="330" rx="18" fill="${C.ink}"/>
<g clip-path="url(#frame)">
  <g fill="none" stroke="${C.muted}" stroke-opacity=".45" stroke-width="1">
    <ellipse class="draw" pathLength="1" cx="700" cy="166" rx="205" ry="64" transform="rotate(-14 700 166)" ${d(0.3)}/>
    <ellipse class="draw" pathLength="1" cx="700" cy="166" rx="150" ry="182" transform="rotate(24 700 166)" ${d(0.6)}/>
  </g>
  <circle cx="700" cy="166" r="40" fill="${C.accent}" class="pop" ${d(0.4)}/>
  ${shards(700, 166, 122)}
  <circle cx="507" cy="118" r="3" fill="${C.muted}">
    <animateTransform attributeName="transform" type="rotate" from="0 700 166" to="360 700 166" dur="26s" repeatCount="indefinite"/>
  </circle>
</g>
<g class="up" ${d(0.1)}>
  <circle cx="48" cy="52" r="4" fill="${C.accent}"/>
  <circle cx="48" cy="52" r="4" fill="${C.accent}" class="pulse"/>
  <text x="64" y="56" class="m" font-size="11.5" fill="${C.bone}">${esc(CONTENT.kicker)}</text>
</g>
<text x="41" y="166" class="d up" font-size="104" fill="${C.bone}" ${d(0.25)}>${esc(CONTENT.first)}</text>
<text x="110" y="256" class="s up" font-size="112" fill="url(#shine)" ${d(0.42)}>${esc(CONTENT.last)}</text>
<text x="44" y="298" class="m up" font-size="10.5" fill="${C.muted}" ${d(0.7)}>${esc(CONTENT.role)}</text>`;
  return svg(880, 330, body, `José Victor Uliana — ${CONTENT.role}. ${CONTENT.kicker}`);
}

/* contador: o CSS não troca texto, então cada valor é um <text> ligado por SMIL */
function counter(to, attrs, start = 0.7, step = 0.16) {
  let out = '';
  for (let i = 0; i <= to; i++) {
    const last = i === to;
    const begin = (start + i * step).toFixed(2);
    out += `<text ${attrs} visibility="hidden">${two(i)}<set attributeName="visibility" to="visible" begin="${begin}s" ${last ? 'fill="freeze"' : `dur="${step}s"`}/></text>`;
  }
  return out;
}

/* ───────────── três blocos ───────────── */
function tile({ bg, fg, soft, kicker, big, label, foot, extra = '', border = false, aria }) {
  const body = `
${style(['display', 'mono'], `.tile{transform-box:fill-box;transform-origin:50% 100%;animation:swing 1.1s cubic-bezier(.2,1.3,.4,1) both}
@keyframes swing{0%{opacity:0;transform:translateY(40px) rotate(-3deg)}100%{opacity:1;transform:none}}`)}
<g class="tile">
  <rect x="1" y="1" width="418" height="258" rx="18" fill="${bg}" ${border ? `stroke="${C.line}" stroke-width="2"` : ''}/>
  <text x="30" y="46" class="m" font-size="13" fill="${soft}">${kicker}</text>
  ${big}
  <text x="30" y="196" class="m up" font-size="12.5" fill="${fg}" ${d(0.9)}>${label}</text>
  ${extra}
  <g class="up" ${d(1.1)}>
    <text x="30" y="232" class="m" font-size="12" fill="${soft}">${foot}</text>
    <path class="nudge" d="M358 228h26m-9-8 9 8-9 8" fill="none" stroke="${fg}" stroke-width="2"/>
  </g>
</g>`;
  return svg(420, 260, body, aria);
}

function tiles() {
  const { delivered, semester, email } = CONTENT;
  const segW = 40;
  const segs = Array.from({ length: semester.total }, (_, i) => {
    const x = 30 + i * (segW + 5);
    const done = i < semester.current;
    return (
      `<rect x="${x}" y="206" width="${segW}" height="6" fill="${C.dark}" opacity=".18"/>` +
      (done ? `<rect class="grow" x="${x}" y="206" width="${segW}" height="6" fill="${C.accent}" ${d(1.2 + i * 0.2)}/>` : '')
    );
  }).join('');

  return {
    'entrego.svg': tile({
      bg: C.accent, fg: C.dark, soft: '#45170a', kicker: '01 — ENTREGO',
      big: counter(delivered, `x="26" y="160" class="d" font-size="132" fill="${C.dark}"`),
      label: 'APLICAÇÕES PARA CLIENTES REAIS', foot: 'VER OS PROJETOS',
      aria: `${delivered} aplicações entregues para clientes reais. Ver os projetos.`,
    }),
    'estudo.svg': tile({
      bg: C.bone, fg: C.dark, soft: '#5a554b', kicker: '02 — ESTUDO',
      big:
        counter(semester.current, `x="26" y="160" class="d" font-size="132" fill="${C.dark}"`) +
        `<text x="172" y="160" class="d up" font-size="62" fill="#5a554b" ${d(1)}>/ ${two(semester.total)}</text>`,
      label: 'PERÍODOS · ENG. DE SOFTWARE', foot: 'PUC MINAS · 2026 — 2029',
      extra: segs,
      aria: `${semester.current}º de ${semester.total} períodos de Engenharia de Software na PUC Minas.`,
    }).replace('y="196" class="m up"', 'y="190" class="m up"'),
    'contato.svg': tile({
      bg: C.ink, fg: C.bone, soft: C.muted, kicker: '03 — CONTATO', border: true,
      big:
        `<text x="27" y="112" class="d up" font-size="62" fill="${C.bone}" ${d(0.5)}>ABERTO A</text>` +
        `<text x="27" y="166" class="d up" font-size="62" fill="${C.accent}" ${d(0.65)}>ESTÁGIO</text>` +
        `<circle cx="372" cy="42" r="6" fill="${C.accent}"/><circle cx="372" cy="42" r="6" fill="${C.accent}" class="pulse"/>`,
      label: 'REMOTO OU PRESENCIAL EM BH', foot: email.toUpperCase(),
      aria: `Aberto a estágio, remoto ou presencial em Belo Horizonte. ${email}`,
    }),
  };
}

/* ───────────── projetos ───────────── */
function projects() {
  const rows = CONTENT.projects;
  const top = 96;
  const rh = 64;
  const H = top + rows.length * rh + 26;
  const list = rows
    .map((p, i) => {
      const y = top + i * rh;
      const t = 0.35 + i * 0.14;
      const tag = p.live ? 'EM PRODUÇÃO' : p.open ? 'CÓDIGO ABERTO' : '';
      return `
<rect class="grow" x="40" y="${y}" width="800" height="1" fill="${C.line}" ${d(t)}/>
<g class="up" ${d(t + 0.1)}>
  <text x="40" y="${y + 40}" class="m" font-size="11.5" fill="${C.accent}">${two(i + 1)}</text>
  <text x="84" y="${y + 44}" class="d" font-size="34" fill="${C.bone}">${esc(p.name)}</text>
  <text x="300" y="${y + 43}" class="s" font-size="24" fill="${C.muted}">${esc(p.sub)}</text>
  <text x="840" y="${y + (tag ? 34 : 41)}" class="m" font-size="10.5" fill="${C.bone}" text-anchor="end">${esc(p.stack)}</text>
  ${tag ? `<text x="840" y="${y + 51}" class="m" font-size="9.5" fill="${C.accent}" text-anchor="end">● ${tag}</text>` : ''}
</g>`;
    })
    .join('');
  const body = `
${style(['display', 'serif', 'mono'])}
<rect width="880" height="${H}" rx="18" fill="${C.ink}"/>
<g class="up" ${d(0.1)}>
  <text x="40" y="50" class="m" font-size="11.5" fill="${C.accent}">04</text>
  <rect x="68" y="46" width="70" height="1" fill="${C.muted}"/>
  <text x="152" y="50" class="m" font-size="11.5" fill="${C.muted}">PROJETOS</text>
  <text x="840" y="50" class="m" font-size="11.5" fill="${C.muted}" text-anchor="end">NENHUM É PROJETO DE GAVETA</text>
</g>
${list}`;
  return svg(880, H, body, 'Projetos: ' + rows.map((p) => `${p.name} (${p.sub}; ${p.stack})`).join('; '));
}

const files = { 'hero.svg': hero(), ...tiles(), 'projetos.svg': projects() };
for (const [name, content] of Object.entries(files)) {
  writeFileSync(new URL(name, OUT), content);
  console.log(name, (content.length / 1024).toFixed(0) + ' KB');
}
