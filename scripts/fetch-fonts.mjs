/**
 * Baixa só os glifos usados nos cards e grava em scripts/fonts.json (base64).
 * SVG dentro de <img> não carrega fonte externa — por isso ela vai embutida.
 * Rode de novo só se trocar de fonte:  node scripts/fetch-fonts.mjs
 */
import { writeFileSync } from 'node:fs';

const TEXT =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~' +
  'ÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúçºª—–·→↗“”';

const FONTS = {
  display: 'Archivo:wdth,wght@62,800',
  serif: 'Instrument+Serif:ital@1',
  mono: 'JetBrains+Mono:wght@500',
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const out = {};

for (const [key, family] of Object.entries(FONTS)) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(TEXT)}`,
    { headers: { 'User-Agent': UA } },
  ).then((r) => r.text());
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`sem URL de fonte para ${key}:\n${css}`);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  out[key] = buf.toString('base64');
  console.log(key, (buf.length / 1024).toFixed(1) + ' KB');
}

writeFileSync(new URL('./fonts.json', import.meta.url), JSON.stringify(out));
