import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../analytics.js',import.meta.url),'utf8');
function run({enabled=false,dnt=false,host='vyb.vybstudydesign.workers.dev',domain=host}={}){
 const events={},sent=[],scripts=[];
 const window={location:{origin:'https://'+host}};
 window.VYB_CONFIG={seo:{canonicalUrl:'https://vyb.vybstudydesign.workers.dev/'},projects:[{id:'obsidian'}],categories:[{id:'barber'}],analytics:{plausible:{enabled,domain},cloudflare:{enabled:false}}};
 const doc={getElementById:()=>({hidden:true}),addEventListener:(name,fn)=>events[name]=fn};
 const context={URL,window,document:doc,navigator:{doNotTrack:dnt?'1':'0'},location:{protocol:'https:',hostname:host},fetch:(url,options)=>{sent.push({url,...JSON.parse(options.body)});return Promise.resolve({ok:true});}};
 vm.runInNewContext(source,context);return {helper:window.VYB_ANALYTICS_HELPERS,events,sent,scripts};
}
let r=run();assert.equal(r.sent.length,0);assert.equal(run({enabled:true,dnt:true}).sent.length,0);
assert.equal(run({enabled:true,host:'preview.example'}).sent.length,0);
assert.equal(run({enabled:true,domain:'other.example'}).sent.length,0);
r=run({enabled:true});assert.equal(r.sent[0].name,'pageview');
assert.equal(r.helper.payload('unknown'),null);
const p=r.helper.payload('Quote accepted',{service:'basic',email:'private@example.test',description:'private',section:'contacto',project:'unknown'});
assert.equal(p.props.service,'basic');assert.ok(!('email' in p.props)&&!('description' in p.props)&&!('project' in p.props));
r.events['vyb:quote-success']({detail:{service:'booking',email:'private@example.test'}});
assert.equal(r.sent.at(-1).name,'Quote accepted');assert.equal(r.sent.at(-1).props.service,'booking');
assert.ok(!JSON.stringify(r.sent).includes('private'));
assert.equal(p.url,'https://vyb.vybstudydesign.workers.dev/');
console.log('PASS: analytics disabled by default, DNT/preview/domain gates, event allow-list, no enquiry PII, success event (mock transport only).');
