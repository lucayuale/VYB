import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>readFile(path.join(root,f),'utf8');
const context={window:{}};
for(const file of ['config.js','content.js'])vm.runInNewContext(await read(file),context);
const c=context.window.VYB_CONFIG,t=context.window.VYB_COPY;
assert.equal(c.projects.length,11);
assert.equal(c.defaultLanguage,'en');
for(const lang of ['es','en']){
 assert.ok(t[lang].catalogMore&&t[lang].catalogLess);
 assert.ok(t[lang].catalogShowing.includes('{shown}')&&t[lang].catalogShowing.includes('{total}'));
}
const html=await read('index.html');
assert.match(html,/id="catalog-more"[^>]*aria-controls="project-grid"[^>]*aria-expanded="false"[^>]*hidden/);
assert.ok(html.indexOf('src="motion.js"')<html.indexOf('src="app.js"'));
const baseline=JSON.parse(await read('tests/preserved-config.json'));
const current = JSON.parse(JSON.stringify(c));
assert.equal(current.projects.pop().id, 'moveform');
assert.equal(current.categories.pop().id, 'apparel');
assert.deepEqual(current.seo.title, baseline.seo.title);
assert.deepEqual(current.seo.description, {
  en: baseline.seo.description.en.replace('Explore ten industry demos', 'Explore our industry demos'),
  es: baseline.seo.description.es.replace('Explorá diez demos', 'Explorá nuestras demos')
});
current.seo.description = baseline.seo.description;
assert.deepEqual(current,baseline,'Existing business configuration or demos changed');
console.log('PASS: previous demos and business configuration preserved; default EN, bilingual compact-catalog controls and JS-independent hidden button. Interactive expansion is covered by browser QA.');
