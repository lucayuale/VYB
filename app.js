(() => {
  const copy = {
    es: {
      skip:"Saltar al contenido", menu:"Menú", menuOpen:"Abrir menú", menuClose:"Cerrar menú", navVision:"Enfoque", navProjects:"Proyectos", navProcess:"Proceso", navContact:"Contacto", heroEyebrow:"ESTUDIO DIGITAL INDEPENDIENTE", heroLine1:"Tu marca.", heroLine2:"En su mejor versión.", heroLede:"Diseñamos páginas web con identidad, pensadas para que cada negocio se vea tan bien como trabaja.", heroPrimary:"Explorar proyectos", heroSecondary:"Conocé VYB", heroFootnote:"DISEÑO · DESARROLLO · ACOMPAÑAMIENTO", artCaption:"UNA PRESENCIA PROPIA", artSide:"HECHO PARA<br>DESTACARSE", scroll:"SEGUIR EXPLORANDO", introKicker:"LO QUE NOS MUEVE", introTitle:"No hacemos páginas para llenar espacio. Creamos presencia.", introBody:"Cada negocio tiene algo que lo hace distinto. Lo convertimos en una experiencia digital clara, cuidada y fácil de recorrer, para que las personas entiendan quién sos y qué ofrecés desde el primer momento.", projectsKicker:"SELECCIÓN VYB", projectsTitle:"Ideas con carácter.<br><em>Listas para crecer.</em>", projectsIntro:"Diseños creados para distintos rubros, con una misma atención al detalle. Cada proyecto puede adaptarse a la identidad de su negocio.", projectsNote:"Los enlaces de las demos se agregarán cuando estén publicados.", openProject:"Abrir demo", linkPending:"Enlace próximo", statementOverline:"UNA BUENA WEB SE NOTA.", statementLine:"Y también se siente.", approachKicker:"SIMPLE, DESDE EL PRIMER DÍA", approachTitle:"Un proceso claro.<br><em>Un resultado propio.</em>", approachIntro:"Trabajamos en etapas simples para que siempre sepas qué estamos haciendo y qué sigue.", step1Title:"Nos conocemos", step1Body:"Entendemos tu negocio, tus objetivos y qué querés transmitir.", step2Title:"Diseñamos tu web", step2Body:"Definimos una identidad digital y organizamos la información para que sea fácil de usar.", step3Title:"La ponemos en marcha", step3Body:"Revisamos juntos cada detalle y te acompañamos para que esté lista para mostrarse.", contactKicker:"EL PRÓXIMO PASO", contactOverline:"¿TENÉS UNA IDEA?", contactTitle:"Hagamos que<br><em>se vea.</em>", contactBody:"Estamos preparando nuestros canales de contacto. Mientras tanto, podés recorrer los proyectos y conocer el estilo de VYB.", contactButton:"Ver proyectos", contactMeta:"DISEÑO DIGITAL PARA NEGOCIOS CON VISIÓN", footerNote:"Diseño web con identidad.", backTop:"VOLVER ARRIBA"
    },
    en: {
      skip:"Skip to content", menu:"Menu", menuOpen:"Open menu", menuClose:"Close menu", navVision:"Approach", navProjects:"Projects", navProcess:"Process", navContact:"Contact", heroEyebrow:"INDEPENDENT DIGITAL STUDIO", heroLine1:"Your brand.", heroLine2:"At its best.", heroLede:"We design distinctive websites that help every business look as good as the work it does.", heroPrimary:"Explore projects", heroSecondary:"Meet VYB", heroFootnote:"DESIGN · DEVELOPMENT · SUPPORT", artCaption:"A PRESENCE OF YOUR OWN", artSide:"MADE TO<br>STAND OUT", scroll:"KEEP EXPLORING", introKicker:"WHAT MOVES US", introTitle:"We don’t make websites to fill space. We create presence.", introBody:"Every business has something that sets it apart. We turn that into a clear, thoughtful digital experience, so people understand who you are and what you offer from the first moment.", projectsKicker:"THE VYB SELECTION", projectsTitle:"Ideas with character.<br><em>Ready to grow.</em>", projectsIntro:"Designs made for different industries, with the same attention to detail. Each project can be tailored to a business’s own identity.", projectsNote:"Demo links will be added once the pages are published.", openProject:"Open demo", linkPending:"Link coming soon", statementOverline:"A GOOD WEBSITE STANDS OUT.", statementLine:"And feels right, too.", approachKicker:"SIMPLE FROM DAY ONE", approachTitle:"A clear process.<br><em>A result of your own.</em>", approachIntro:"We work in simple stages, so you always know what we’re doing and what comes next.", step1Title:"We get to know you", step1Body:"We learn about your business, your goals, and what you want to express.", step2Title:"We design your website", step2Body:"We shape a digital identity and organize the information to make it easy to use.", step3Title:"We bring it to life", step3Body:"We review every detail together and help get your website ready to go live.", contactKicker:"THE NEXT STEP", contactOverline:"HAVE AN IDEA?", contactTitle:"Let’s make it<br><em>visible.</em>", contactBody:"We’re preparing our contact channels. In the meantime, explore the projects and get to know VYB’s style.", contactButton:"View projects", contactMeta:"DIGITAL DESIGN FOR BUSINESSES WITH VISION", footerNote:"Web design with identity.", backTop:"BACK TO TOP"
    }
  };

  Object.assign(copy.es, window.VYB_COPY?.es);
  Object.assign(copy.en, window.VYB_COPY?.en);
  let activeFilter = "all";
  let selectedMode = "basic";
  const CATALOG_PAGE_SIZE = 2;
  let visibleProjects = CATALOG_PAGE_SIZE;


  const config = window.VYB_CONFIG || { projects: [] };
  const langButton = document.querySelector(".language-toggle");
  const nav = document.querySelector(".main-nav");
  const menuButton = document.querySelector(".menu-toggle");
  const projectGrid = document.querySelector("#project-grid");
  const safeUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const parsed = new URL(value, window.location.href);
      if (parsed.username || parsed.password) return "";
      if (parsed.protocol === "https:" || (parsed.origin === window.location.origin && value.startsWith("/"))) return parsed.href;
    } catch { /* invalid or incomplete link: show the placeholder */ }
    return "";
  };

  const text = (key) => copy[document.documentElement.lang][key] || key;
  const node = (tag, className, value) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = value;
    return el;
  };
  function localImage(value) {
    return typeof value === "string" && /^assets\/[a-zA-Z0-9_./-]+\.(webp|png|jpe?g|avif)$/i.test(value) && !value.split("/").includes("..") ? value : "";
  }
  function renderProjects(lang) {
    projectGrid.replaceChildren();
    const projects = (Array.isArray(config.projects) ? config.projects : []).filter(project => activeFilter === "all" || project.category === activeFilter);
    document.querySelector("#catalog-count").textContent = `${projects.length} ${text(projects.length === 1 ? "designCountOne" : "designCount")}`;
    if (!projects.length) projectGrid.append(node("p", "catalog-empty", text("empty")));
    projects.forEach((project, index) => {
      const projectName = typeof project.name === "string" ? project.name : (project.name?.[lang] || project.name?.es || "VYB");
      const card = node("article", `project-card reveal theme-${/^(obsidian|cosmetica|gym|nails|restaurant|mechanic|wedding|tattoo|yoga|pet-grooming)$/.test(project.theme) ? project.theme : "default"}`);
      card.style.setProperty("--card-order", String(index));
      const visual = node("div", "project-visual");
      const imagePath = localImage(project.screenshot);
      if (imagePath) {
        const img = node("img", "project-screenshot"); img.src = imagePath; img.alt = project.screenshotAlt?.[lang] || projectName; img.loading = "lazy"; img.decoding = "async"; img.width = 800; img.height = 600; visual.append(img); visual.append(node("span", "concept-label", text("screenshotLabel")));
      } else {
        const preview = node("div", "site-preview"); preview.setAttribute("aria-hidden", "true");
        const top = node("div", "preview-top"); top.append(node("strong", "", projectName), node("span", "", "—  —  •"));
        const body = node("div", "preview-body");
        const words = node("div", "preview-words"); words.append(node("small", "", text("previewTag")), node("b", "", projectName));
        words.append(node("span", "preview-rule"), node("span", "preview-rule short"), node("i", "preview-button", text("previewExplore")));
        const art = node("div", "preview-art"); art.append(node("span"), node("i")); body.append(words, art);
        const mini = node("div", "preview-tiles"); for (let i=0;i<3;i++) mini.append(node("span"));
        preview.append(top,body,mini); visual.append(preview);
        visual.append(node("span", "concept-label", text(project.published === true ? "illustrativePreview" : "concept")));
      }
      const details = node("div", "project-details");
      details.append(node("span", "project-category", project.type?.[lang] || ""), node("h3", "", projectName), node("p", "project-description", project.description?.[lang] || project.line?.[lang] || ""));
      const url = project.published === true ? safeUrl(project.url) : "";
      const action = node(url ? "a" : "span", url ? "project-link" : "project-pending", url ? text("openProject") : text("linkPending"));
      if (url) { action.dataset.demo = project.id; action.href = url; action.target = "_blank"; action.rel = "noopener noreferrer"; action.setAttribute("aria-label", `${text("openProject")}: ${projectName}`); }
      const meta = node("div", "project-availability");
      meta.append(node("span", url ? "availability live" : "availability pending", text(url ? "publishedLabel" : "linkPending")),node("span", "mode-label",project.mode === "booking" ? "Booking" : (project.published === true ? text("demoSiteLabel") : text("plannedMode"))));
      details.prepend(meta);
      if(project.notice?.[lang])details.append(node("p","project-notice",project.notice[lang]));
      details.append(action); card.append(visual, details); projectGrid.append(card);
    });
    syncCatalog();
  }
  function syncCatalog() {
    const cards = [...projectGrid.querySelectorAll('.project-card')];
    cards.forEach((card, index) => { card.hidden = index >= visibleProjects; });
    const shown = Math.min(visibleProjects, cards.length);
    const label = text('catalogShowing').replace('{shown}', shown).replace('{total}', cards.length);
    document.querySelector('#catalog-count').textContent = label;
    const button = document.querySelector('#catalog-more');
    button.hidden = cards.length <= CATALOG_PAGE_SIZE;
    button.setAttribute('aria-expanded', String(shown > CATALOG_PAGE_SIZE));
    const full = shown === cards.length;
    button.querySelector('[data-catalog-label]').textContent = text(full ? 'catalogLess' : 'catalogMore');
    button.querySelector('[data-catalog-arrow]').textContent = full ? '↑' : '↓';
    window.VYBMotion?.refresh();
  }
  document.querySelector('#catalog-more').addEventListener('click', () => {
    const total = projectGrid.querySelectorAll('.project-card').length;
    const collapse = visibleProjects >= total;
    visibleProjects = collapse ? CATALOG_PAGE_SIZE : visibleProjects + CATALOG_PAGE_SIZE;
    syncCatalog();
    if (collapse) document.querySelector('.catalog-filters').scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });

  function updateMode() {
    document.querySelectorAll("[data-mode]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mode === selectedMode)));
    document.querySelectorAll("[data-column]").forEach(cell => cell.classList.toggle("selected-column", cell.dataset.column === selectedMode));
    document.querySelector("#mode-name").textContent = selectedMode === "custom" ? text("customName").toUpperCase() : selectedMode.toUpperCase();
    document.querySelector("#mode-title").textContent = text(`${selectedMode}Title`);
    document.querySelector("#mode-description").textContent = text(`${selectedMode}Body`);
    document.querySelector(".mode-story").dataset.selected = selectedMode;
    document.querySelector("#selected-quote").dataset.quote = selectedMode;
  }

  function setLanguage(lang) {
    const selected = lang === "en" ? "en" : "es";
    document.documentElement.lang = selected;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (copy[selected][key] !== undefined) node.innerHTML = copy[selected][key];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.alt = copy[selected][el.dataset.i18nAlt] || "VYB"; });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const key = node.dataset.i18nAria;
      if (copy[selected][key]) node.setAttribute("aria-label", copy[selected][key]);
    });
    document.querySelectorAll("[data-local-href-en][data-local-href-es]").forEach(link => {
      link.setAttribute("href", link.dataset[selected === "es" ? "localHrefEs" : "localHrefEn"]);
    });
    langButton.querySelector(".lang-current").textContent = selected.toUpperCase();
    langButton.querySelector(".lang-next").textContent = selected === "es" ? "EN" : "ES";
    langButton.setAttribute("aria-label", selected === "es" ? "Cambiar idioma a inglés" : "Switch language to Spanish");
    try { localStorage.setItem("vyb-language", selected); } catch { /* storage may be disabled */ }
    renderFilters();
    renderProjects(selected);
    updateMode();
    document.title = config.seo?.title?.[selected] || "VYB";
    const description = config.seo?.description?.[selected] || "";
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    syncMenu();
    document.dispatchEvent(new CustomEvent("vyb:language"));
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content",selected === "es" ? "es_AR" : "en_US");
  }

  function revealNew() {
    if (window.VYBMotion) window.VYBMotion.refresh();
    else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  langButton.addEventListener("click", () => setLanguage(document.documentElement.lang === "es" ? "en" : "es"));
  const mobileQuery = window.matchMedia("(max-width: 700px)");
  function syncMenu() {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    nav.inert = mobileQuery.matches && !open;
    document.body.classList.toggle("nav-open",mobileQuery.matches && open);
    menuButton.setAttribute("aria-label", text(open ? "menuClose" : "menuOpen"));
  }
  function closeMenu(restoreFocus = false) {
    nav.classList.remove("is-open"); menuButton.setAttribute("aria-expanded", "false");
    menuButton.dataset.i18nAria = "menuOpen"; syncMenu();
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open);
    menuButton.dataset.i18nAria = open ? "menuClose" : "menuOpen"; syncMenu();
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true); });
  document.addEventListener("click", event => { if (!event.target.closest(".site-header")) closeMenu(); });
  mobileQuery.addEventListener("change", () => closeMenu());
  function renderFilters() {
    const holder=document.querySelector('.catalog-filters'); holder.replaceChildren();
    const categories=[{id:'all',label:{es:copy.es.all,en:copy.en.all}},...(config.categories||[])];
    for(const category of categories){
      const button=node('button','',category.label?.[document.documentElement.lang]||category.id);
      button.type='button';button.dataset.filter=category.id;button.setAttribute('aria-pressed',String(category.id===activeFilter));
      button.addEventListener('click',()=>{activeFilter=category.id;visibleProjects=CATALOG_PAGE_SIZE;renderFilters();renderProjects(document.documentElement.lang);holder.querySelectorAll('button').forEach(b=>{if(b.dataset.filter===activeFilter)b.focus();});});holder.append(button);
    }
  }
  document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => { selectedMode = button.dataset.mode; updateMode(); }));
  const canonical = safeUrl(config.seo?.canonicalUrl);
  if (canonical && canonical.startsWith("https://")) {
    let link = document.querySelector('link[rel="canonical"]'); if(!link){link=document.createElement("link");link.rel="canonical";document.head.append(link);} link.href=canonical;
  }
  const navSections = [...nav.querySelectorAll('a[href^="#"]')].map(link => ({link, section:document.querySelector(link.getAttribute("href"))}));
  let ticking = false;
  function updateActive() {
    let current = null;
    const marker = document.querySelector('.site-header').getBoundingClientRect().bottom + 40;
    navSections.forEach(item => {
      const rect = item.section.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) current = item;
    });
    navSections.forEach(item => { if (item === current) item.link.setAttribute("aria-current","location"); else item.link.removeAttribute("aria-current"); });
    ticking = false;
  }
  function scheduleActive() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateActive); }
  }
  window.addEventListener("scroll", scheduleActive, {passive:true});
  window.addEventListener("resize", scheduleActive, {passive:true});
  // Catalog expansion, translations and image loading can move sections without scrolling.
  if ('ResizeObserver' in window) {
    const navLayoutObserver = new ResizeObserver(scheduleActive);
    document.querySelectorAll('main, main section, .site-header').forEach(section => navLayoutObserver.observe(section));
  }
  updateActive();
  document.querySelector("#year").textContent = new Date().getFullYear();

  let initial = config.defaultLanguage === "en" ? "en" : "es";
  try { const stored = localStorage.getItem("vyb-language"); if (["en","es"].includes(stored)) initial = stored; } catch { /* keep configured default */ }
  setLanguage(initial);
  revealNew();
  const mobileQuote = document.querySelector('.mobile-quote');
  if ('IntersectionObserver' in window) {
    const visibility = new Map();
    const quoteObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target.id,entry.isIntersecting));
      mobileQuote.hidden = Boolean(visibility.get('inicio') || visibility.get('contacto'));
    });
    ['inicio','contacto'].forEach(id => quoteObserver.observe(document.getElementById(id)));
  }
})();
