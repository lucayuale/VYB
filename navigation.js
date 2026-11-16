/* Legacy entry URLs converge on the same bilingual landing page. */
(() => {
 'use strict';
 const routes={
  '/es/nosotros':['es','#nosotros'], '/en/about':['en','#nosotros'],
  '/es/diseno-web':['es','#modalidades'], '/en/web-design':['en','#modalidades'],
  '/es/reservas-online':['es','#modalidades'], '/en/online-booking':['en','#modalidades'],
  '/es/desarrollo-web-personalizado':['es','#modalidades'], '/en/custom-web-development':['en','#modalidades']
 };
 const route=routes[location.pathname.replace(/\/$/,'')];
 if(!route)return;
 try{localStorage.setItem('vyb-language',route[0]);}catch{/* URL also carries the language when storage is unavailable. */}
 const target=new URL('/',location.href);target.searchParams.set('lang',route[0]);target.hash=route[1];
 if(/reserva|online-booking/.test(location.pathname))target.searchParams.set('mode','booking');
 if(/personalizado|custom-web/.test(location.pathname))target.searchParams.set('mode','custom');
 location.replace(target.href);
})();
