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
assert.equal(c.projects.length,10);
assert.equal(c.defaultLanguage,'en');
for(const lang of ['es','en']){
 assert.ok(t[lang].catalogMore&&t[lang].catalogLess);
 assert.ok(t[lang].catalogShowing.includes('{shown}')&&t[lang].catalogShowing.includes('{total}'));
}
const html=await read('index.html');
assert.match(html,/id="catalog-more"[^>]*aria-controls="project-grid"[^>]*aria-expanded="false"[^>]*hidden/);
assert.ok(html.indexOf('src="motion.js"')<html.indexOf('src="app.js"'));
const baseline=JSON.parse(await read('tests/preserved-config.json'));
assert.deepEqual(JSON.parse(JSON.stringify(c)),baseline,'Business configuration changed');
console.log('PASS: ten demos and business configuration preserved; default EN, bilingual compact-catalog controls and JS-independent hidden button. Interactive expansion is covered by browser QA.');
