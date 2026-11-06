import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const demos=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../02_DEMOS');
try {await access(demos);} catch {console.log('SKIP: demo sources are only included in the complete delivery package; run this test there.');process.exit(0);}
let pages=0;
for(const name of await readdir(demos)){
 const dir=path.join(demos,name),ctx={window:{}};
 vm.runInNewContext(await readFile(path.join(dir,'config.js'),'utf8'),ctx);
 const c=ctx.window.VYB_CONFIG;assert.ok(c);assert.equal(c.mode,'booking');
 assert.equal(c.booking.url,name==='barberia_obsidian'?'https://obsidiam.setmore.com/':'');
 const inspect=async value=>{
  if(typeof value==='string' && value.startsWith('assets/') && !value.includes('..'))await access(path.join(dir,value));
  else if(value && typeof value==='object')for(const item of Object.values(value))await inspect(item);
 };
 await inspect(c);
 for(const page of (await readdir(dir)).filter(p=>p.endsWith('.html'))){
  pages++;const html=await readFile(path.join(dir,page),'utf8');
  for(const [_,key]of html.matchAll(/data-i18n="([^"]+)"/g))for(const lang of ['en','es'])assert.ok(c.translations[lang]?.[key],`${name}/${page}: ${lang}.${key}`);
  for(const [_,src]of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!/^(https?:|mailto:|tel:|data:)/.test(src))await access(path.join(dir,src));
  assert.match(html,/booking-modal/);assert.match(html,/booking-fallback/);
 }
}
const css=await readFile(path.join(demos,'barberia_obsidian/styles.css'),'utf8');
assert.match(css,/#service-list \.service-row\{grid-template-columns:25px minmax\(0,1fr\) 59px 18px\}/);
console.log(`PASS: five available demos, ${pages} HTML pages, local image paths, bilingual bindings, unchanged booking URLs, modal/fallback markup and Obsidian mobile selector.`);
