import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>readFile(path.join(root,f),'utf8');
const html=await read('index.html');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'IDs duplicated');
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 const v=m[1];if(v.startsWith('#'))assert.ok(ids.includes(v.slice(1)),'Broken anchor '+v);
 else if(!/^(https:|mailto:|data:)/.test(v))await access(path.join(root,v));
}
const context={window:{}};vm.runInNewContext(await read('config.js'),context);
vm.runInNewContext(await read('app.js'),context);
const c=context.window.VYB_CONFIG,h=context.window.VYB_ATHLETE_HELPERS;
assert.equal(c.language.default,'es');
assert.deepEqual(Object.keys(c.translations.es).sort(),Object.keys(c.translations.en).sort());
for(const m of html.matchAll(/data-i18n="([^"]+)"/g))for(const lang of ['es','en'])assert.ok(c.translations[lang][m[1]],`${lang} missing ${m[1]}`);
for(const photo of c.gallery)await access(path.join(root,photo.src));
assert.equal(h.selectImages(c.gallery,'all').length,c.gallery.length);
for(const category of ['competition','journey'])assert.ok(h.selectImages(c.gallery,category).every(x=>x.category===category));
assert.equal(h.nextIndex(0,-1,3),2);assert.equal(h.nextIndex(2,1,3),0);
assert.equal(h.https('javascript:alert(1)'),'');assert.equal(h.https('https://user:pass@example.com'),'');
const preserved=JSON.parse(await read('tests/preserved-files.sha256.json'));
for(const [name,hash]of Object.entries(preserved))assert.equal(createHash('sha256').update(await readFile(path.join(root,name))).digest('hex'),hash,'Changed preserved source '+name);
console.log('PASS: local resources/anchors, bilingual keys and ES default, gallery helpers, safe URLs; original styles and all photographs preserved byte for byte; configuration intentionally updated from athlete corrections.');
