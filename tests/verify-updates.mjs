import assert from 'node:assert/strict';
import {readFile,access,stat} from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=f=>readFile(new URL(f,root),'utf8');
const ctx={window:{}};vm.runInNewContext(await read('config.js'),ctx);
const c=ctx.window.VYB_CONFIG;
assert.equal(c.language.default,'es');assert.equal(c.fightClips.length,6);
assert.equal(c.fightClips.filter(x=>x.src).length,5);
assert.equal(c.fightClips[0].src,'');assert.equal(c.coaching.graduationDate,'2025-11-28');
for(const clip of c.fightClips){for(const lang of ['es','en'])assert.ok(clip.title[lang]&&clip.description[lang]);if(clip.src){assert.match(clip.src,/^assets\/videos\/[a-z0-9-]+\.mp4$/);await access(new URL(clip.src,root));await access(new URL(clip.poster,root));assert.ok((await stat(new URL(clip.src,root))).size<10e6);}}
const html=await read('index.html');assert.ok(!html.includes('athlete-inset'));
assert.ok(html.indexOf('id="coaching"')>html.indexOf('id="career"'));
assert.ok(html.indexOf('id="coaching"')<html.indexOf('id="next"'));
const app=await read('app.js');assert.match(app,/video\.preload='none'/);assert.match(app,/video\.controls=true/);assert.match(app,/other\.pause\(\)/);
const updates=await read('updates.js');assert.match(updates,/prefers-reduced-motion/);assert.match(updates,/IntersectionObserver/);assert.match(updates,/aria-hidden/);
assert.deepEqual(Array.from(c.reachMetrics,x=>x.value),[13000,10000,3000,619000,312000]);
console.log('PASS: bilingual coaching, six milestones/five local videos, no inset, optimized media, native playback, historical metrics and reduced-motion support.');
