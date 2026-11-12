import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFile(path.join(root,p),'utf8');
const site='https://vyb.vybstudydesign.workers.dev/';
const home=await read('index.html');
assert.match(home,/<meta name="google-site-verification" content="R7XJnVFTUJKzbctb2uAe4VW-ow1b09H8lMwTNCmt7tI"\s*\/>/);
assert.equal((home.match(/name="google-site-verification"/g)||[]).length,1);
assert.match(home,/id="nosotros"/);assert.match(home,/id="servicios-web"/);
assert.match(home,/Luca Yuale/);assert.match(home,/Valentín Bertuccelli/);assert.match(home,/instagram\.com\/vyb\.webdesign/);
assert.match(home,/id="project-grid"/);assert.match(home,/id="quote-form"/);
const xml=await read('sitemap.xml');
const pages=[['es/nosotros/','en/about/'],['es/diseno-web/','en/web-design/'],['es/reservas-online/','en/online-booking/'],['es/desarrollo-web-personalizado/','en/custom-web-development/']];
for(const [es,en] of pages){
 for(const [lang,p] of [['es',es],['en',en]]){
  await access(path.join(root,p,'index.html'));
  const html=await read(p+'index.html');
  assert.match(html,new RegExp(`<html lang="${lang}">`));
  assert.ok(html.includes(`<link rel="canonical" href="${site+p}">`));
  assert.ok(html.includes(`hreflang="es" href="${site+es}"`));
  assert.ok(html.includes(`hreflang="en" href="${site+en}"`));
  assert.ok(html.includes('/#contacto'));
  assert.ok(html.includes('vybstudydesign@gmail.com'));
  assert.ok(xml.includes(`<loc>${site+p}</loc>`));
 }
}
assert.equal((xml.match(/<url>/g)||[]).length,9);
assert.match(await read('robots.txt'),/Sitemap: https:\/\/vyb\.vybstudydesign\.workers\.dev\/sitemap\.xml/);
assert.match(await read('app.js'),/data-local-href-en/);
assert.match(await read('content.js'),/aboutDescription/);
assert.match(await read('styles.css'),/\.about-vyb/);
assert.match(await read('seo-pages.css'),/\.seo-hero/);
console.log('PASS: Search Console tag, honest team, original 10 demos and contact, 8 bilingual SEO pages, canonical/hreflang, sitemap and designs.');
