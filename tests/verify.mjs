import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>readFile(path.join(root,f),'utf8');
const ctx={window:{}};
for(const f of ['config.js','content.js'])vm.runInNewContext(await read(f),ctx);
const c=ctx.window.VYB_CONFIG,t=ctx.window.VYB_COPY,html=await read('index.html'),app=await read('app.js');
assert.equal(c.defaultLanguage,'en');assert.match(html,/<html lang="en"/);
assert.deepEqual(Object.keys(t.es).sort(),Object.keys(t.en).sort());
const expected=['Bareberia-demo','Cosmetica-demo','Gym-demo','Nails-demo','Restaurante-demo','Mecanico-demo','Boda-demo'];
assert.equal(c.projects.length,7);assert.equal(c.categories.length,7);
assert.equal(new Set(c.projects.map(p=>p.id)).size,7);
for(let i=0;i<7;i++){
 const p=c.projects[i];assert.equal(p.url,'https://lucayuale.github.io/'+expected[i]+'/');assert.equal(p.published,true);
 for(const lang of ['en','es'])assert.ok(p.description[lang] && p.type[lang]);
 if(p.screenshot)await access(path.join(root,p.screenshot));
}
const base=app.slice(app.indexOf('  const copy =')+14,app.indexOf('\n\n  Object.assign')).trim().replace(/;$/,'');
const legacy=vm.runInNewContext('('+base+')');
for(const key of [...html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map(m=>m[1]))
 for(const lang of ['en','es'])assert.ok(t[lang][key] || legacy[lang][key],`${lang} missing ${key}`);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
 const value=m[1];if(/^(https?:|mailto:|data:)/.test(value))continue;
 await access(path.join(root,value));
}
for(const m of html.matchAll(/href="#([^"\s]+)"/g))assert.ok(ids.includes(m[1]),'broken anchor '+m[1]);
for(const mode of ['basic','booking','custom'])assert.ok(html.includes('data-quote="'+mode+'"'));
assert.ok(c.contact.form.enabled && c.contact.form.formId==='mjyyzaly' && c.contact.form.recipientConfirmed);
assert.equal(c.contact.email,'vybstudydesign@gmail.com');assert.equal(c.social.instagram,'');
assert.ok(!c.analytics.cloudflare.enabled&&!c.analytics.plausible.enabled);
assert.match(html,/og:image/);assert.match(html,/og:locale/);assert.match(html,/twitter:card/);assert.match(html,/<link rel="canonical"/);
assert.match(html,/<form inert method="post"/);assert.ok(!/(href="(?:tel:|https:\/\/wa\.me))/.test(html));
assert.match(await read('styles.css'),/prefers-reduced-motion/);
assert.equal(t.en.emailLabel,'Email address *');assert.notEqual(t.en.emailLabel,t.en.directEmailLabel);
console.log('PASS: root resources/anchors, seven exact demos, bilingual keys, EN default, quote links, active contact preserved, analytics off, SEO and no-JS guard.');
