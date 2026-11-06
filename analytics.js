(() => {
  'use strict';
  const config = window.VYB_CONFIG || {};
  const settings = config.analytics || {};
  const allowedNames = new Set(['pageview','Demo click','Quote click','Quote submit','Quote accepted','Email click','Section view','Catalogue filter']);
  function payload(name, properties = {}) {
    if (!allowedNames.has(name)) return null;
    const props = {};
    const allow = {service:['basic','booking','custom'],section:['inicio','vision','proyectos','beneficios','modalidades','proceso','preguntas','contacto'],project:(config.projects || []).map(p=>p.id),category:['all',...(config.categories || []).map(c=>c.id)]};
    for (const [key, values] of Object.entries(allow)) if(values.includes(properties[key])) props[key]=properties[key];
    return {name,domain:settings.plausible?.domain,url:window.location.origin+'/',props};
  }
  window.VYB_ANALYTICS_HELPERS = {payload};
  const optedOut = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  let officialHost = '';
  try {officialHost = new URL(config.seo?.canonicalUrl).hostname;} catch {}
  if (optedOut || location.protocol !== 'https:' || location.hostname !== officialHost) return;
  const cloudflare = settings.cloudflare;
  if (cloudflare?.enabled && /^[a-f0-9]{32}$/i.test(cloudflare.token || '') && !document.querySelector('script[data-cf-beacon]')) {
    const script=document.createElement('script');script.defer=true;script.type='module';
    script.src='https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset.cfBeacon=JSON.stringify({token:cloudflare.token});document.head.append(script);
  }
  const plausible = settings.plausible;
  const ready = plausible?.enabled === true && plausible.domain === officialHost;
  if(settings.cloudflare?.enabled || ready) document.getElementById('analytics-privacy').hidden=false;
  if (!ready) return;
  function track(name, props) {
    const data=payload(name,props); if(!data)return;
    // No form values, query strings, referrer, cookies, or persistent identifiers.
    try { void fetch('https://plausible.io/api/event',{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(data),keepalive:true,credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{}); } catch {}
  }
  track('pageview');
  document.addEventListener('click',event=>{
    const a=event.target.closest('a,button');if(!a)return;
    if(a.dataset.demo)track('Demo click',{project:a.dataset.demo});
    else if(a.id==='commercial-email')track('Email click');
    else if(a.matches('[data-quote],a[href="#quote-form"],a.nav-contact'))track('Quote click',{service:a.dataset.quote});
    else if(a.dataset.filter)track('Catalogue filter',{category:a.dataset.filter});
  });
  document.addEventListener('vyb:quote-submit',e=>track('Quote submit',{service:e.detail?.service}));
  document.addEventListener('vyb:quote-success',e=>track('Quote accepted',{service:e.detail?.service}));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;track('Section view',{section:e.target.id});observer.unobserve(e.target);
    }),{threshold:.15});
    document.querySelectorAll('main section[id]').forEach(el=>observer.observe(el));
  }
})();
