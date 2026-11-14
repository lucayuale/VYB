/* Athlete-requested content; all business information lives in config.js. */
(() => {
 'use strict';
 const config=window.VYB_CONFIG;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const $=id=>document.getElementById(id);
 let observer,frames=new Set();
 const local=v=>typeof v==='object'?(v[document.documentElement.lang]||v.es):v;
 const node=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 function format(value,metric){return (metric.prefix||'')+new Intl.NumberFormat(document.documentElement.lang==='es'?'es-AR':'en-US').format(value)+(metric.suffix||'');}
 function animate(element,metric){
  if(reduced.matches){element.textContent=format(metric.value,metric);return;}
  let start;
  function step(time){
   if(!element.isConnected)return;
   start??=time;
   const progress=Math.min(1,(time-start)/1400);
   element.textContent=format(Math.round(metric.value*(1-Math.pow(1-progress,3))),metric);
   if(progress<1){const id=requestAnimationFrame(t=>{frames.delete(id);step(t);});frames.add(id);}
  }
  const id=requestAnimationFrame(t=>{frames.delete(id);step(t);});frames.add(id);
 }
 function refresh(){
  observer?.disconnect();frames.forEach(cancelAnimationFrame);frames.clear();
  $('coaching-paragraphs').replaceChildren(...config.coaching.paragraphs.map(p=>node('p','',local(p))));
  $('coaching-pillars').replaceChildren(...config.coaching.pillars.map(p=>node('li','',local(p))));
  const link=$('coaching-link');
  const message=encodeURIComponent(local(config.coaching.message));
  if(config.contact.whatsapp){link.href='https://wa.me/'+config.contact.whatsapp.replace(/\D/g,'')+'?text='+message;link.target='_blank';link.rel='noopener noreferrer';}
  else if(config.contact.email){link.href='mailto:'+config.contact.email+'?subject='+message;link.removeAttribute('target');}
  else {link.href='#contact';link.removeAttribute('target');}
  const holder=$('reach-metrics');holder.replaceChildren();
  if('IntersectionObserver' in window && !reduced.matches)observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const card=entry.target;animate(card.querySelector('strong'),config.reachMetrics[Number(card.dataset.metric)]);observer.unobserve(card);
  }),{threshold:.3});
  config.reachMetrics.forEach((metric,i)=>{
   const card=node('div','reach-metric');card.dataset.metric=String(i);
   // Assistive technology reads the final number once, rather than every animation frame.
   const number=node('strong','',format(metric.value,metric));number.setAttribute('aria-hidden','true');
   const accessible=node('span','sr-only',format(metric.value,metric));
   card.append(number,accessible,node('p','',local(metric.label)));holder.append(card);
   if(observer&&!reduced.matches)observer.observe(card);
  });
  window.ABMotion?.refresh();
 }
 window.ABUpdates={refresh};refresh();reduced.addEventListener('change',refresh);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('.fight-video').forEach(v=>v.pause());});
})();
