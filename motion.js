/* VYB motion: native, event-driven and optional. No content depends on animation. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 961px) and (hover: hover)');
  const registered = new Set();
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.art-frame');
  let observer = null, scheduled = false, heroVisible = true;
  const selectors = '.reveal:not(.hero-copy), .hero-copy > *, .service-paths-head, .service-paths > .section-kicker, .catalog-filters, .benefits > h2, .comparison-head, .compare-layout > *, .quote-actions > *, .statement-overline, .statement-line, .contact-form-wrap, .faq > div:first-child';
  function show(el) { el.classList.add('is-visible'); observer?.unobserve(el); }
  function refresh() {
    for (const el of registered) if (!el.isConnected) { observer?.unobserve(el); registered.delete(el); }
    document.querySelectorAll(selectors).forEach(el => {
      if (el.hidden) { observer?.unobserve(el); return; }
      if (registered.has(el)) { if (!el.classList.contains('is-visible')) observer?.observe(el); return; }
      if (el.parentElement.closest('.vyb-reveal')) return;
      registered.add(el); el.classList.add('vyb-reveal');
      const siblings = [...el.parentElement.children].filter(x => x.matches(selectors));
      const index = Math.max(0, siblings.indexOf(el));
      const delay = el.parentElement.classList.contains('hero-copy') ? Math.min(index, 4) * 85 : (innerWidth > 700 ? index % 3 * 75 : 0);
      el.style.setProperty('--vyb-delay', `${delay}ms`);
      if (reduced.matches || !observer || el.getBoundingClientRect().bottom < 0) show(el);
      else observer.observe(el);
    });
  }
  function paint() {
    scheduled = false;
    document.querySelector('.site-header')?.classList.toggle('has-scrolled', scrollY > 35);
    const shift = !reduced.matches && desktop.matches && heroVisible && !document.hidden ? Math.min(14, scrollY * .03) : 0;
    art?.style.setProperty('--vyb-drift', `${shift}px`);
  }
  function queue() { if (!scheduled) { scheduled = true; requestAnimationFrame(paint); } }
  try {
    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); }), { threshold: .08, rootMargin: '0px 0px -24px 0px' });
      if (hero) new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; queue(); }).observe(hero);
      const contact = document.querySelector('.contact');
      if (contact) new IntersectionObserver(entries => { contact.classList.toggle('orbit-active', entries[0].isIntersecting); }).observe(contact);
    }
    window.VYBMotion = { refresh };
    root.classList.add('vyb-motion-ready'); refresh(); paint();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue, { passive: true });
    document.addEventListener('visibilitychange', queue);
    desktop.addEventListener('change', queue);
    reduced.addEventListener('change', () => { if (reduced.matches) registered.forEach(show); queue(); });
    document.addEventListener('focusin', event => { let el = event.target.closest('.vyb-reveal'); while (el) { show(el); el = el.parentElement.closest('.vyb-reveal'); } });
    document.addEventListener('click', event => {
      const a = event.target.closest('a[href^="#"]');
      if (!a || a.hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      target?.querySelectorAll('.vyb-reveal:not([hidden])').forEach(show);
    });
  } catch (error) {
    root.classList.remove('vyb-motion-ready'); registered.forEach(show);
    console.warn('Visual enhancement unavailable; content stays visible.', error);
  }
})();
