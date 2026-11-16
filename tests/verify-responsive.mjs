import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const read=f=>readFile(new URL('../'+f,import.meta.url),'utf8');
const css=await read('seo-pages.css'),styles=await read('styles.css'),app=await read('app.js'),navigation=await read('navigation.js');
assert.match(css,/grid-template-columns:minmax\(0,1fr\)/);assert.match(css,/\.seo-frame\{min-width:0;max-width:100%\}/);
assert.ok(!/overflow-x\s*:\s*(hidden|clip)/.test(css),'SEO overflow must not be masked');
assert.match(styles,/overflow-y:auto;overscroll-behavior-y:contain/);assert.match(styles,/100dvh/);assert.match(styles,/\.main-nav a\{flex-shrink:0\}/);
assert.match(app,/updateMenuViewport/);assert.match(app,/documentElement\.classList\.toggle\("nav-open"/);
const routes=[['es/nosotros','es','#nosotros',null],['en/about','en','#nosotros',null],['es/diseno-web','es','#modalidades',null],['en/web-design','en','#modalidades',null],['es/reservas-online','es','#modalidades','booking'],['en/online-booking','en','#modalidades','booking'],['es/desarrollo-web-personalizado','es','#modalidades','custom'],['en/custom-web-development','en','#modalidades','custom']];
for(const[path,lang,hash,mode]of routes){
 const html=await read(path+'/index.html');assert.ok(html.includes('<script src="/navigation.js"></script>'));
 let target,stored;const context={URL,location:{pathname:'/'+path+'/',href:'https://vyb.vybstudydesign.workers.dev/'+path+'/',replace:value=>target=value},localStorage:{setItem:(key,value)=>{stored=value}}};
 vm.runInNewContext(navigation,context);const url=new URL(target);assert.equal(url.pathname,'/');assert.equal(url.hash,hash);assert.equal(url.searchParams.get('lang'),lang);assert.equal(url.searchParams.get('mode'),mode);assert.equal(stored,lang);
 context.localStorage.setItem=()=>{throw Error('storage blocked')};vm.runInNewContext(navigation,context);assert.ok(target);
}
const html=await read('index.html');for(const match of html.matchAll(/data-local-href-(?:en|es)="([^"]+)"/g))assert.ok(match[1].startsWith('#'));
assert.match(app,/history\.replaceState/);
console.log('PASS: shrinkable mobile grids, scrollable viewport-limited menu, eight same-page legacy routes in ES/EN (including blocked storage), local section links.');
