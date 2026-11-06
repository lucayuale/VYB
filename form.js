(() => {
  'use strict';
  const emailValid = value => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  function validate(values) {
    const errors = {};
    if (!values.fullName?.trim()) errors.fullName = 'errorRequired';
    else if (values.fullName.trim().length < 2 || values.fullName.trim().length > 100) errors.fullName = 'errorName';
    if (!values.email?.trim()) errors.email = 'errorRequired';
    else if (!emailValid(values.email.trim())) errors.email = 'errorEmail';
    if ((values.business || '').length > 120) errors.business = 'errorBusiness';
    if (!['basic','booking','custom'].includes(values.service)) errors.service = 'errorService';
    if (!values.description?.trim()) errors.description = 'errorRequired';
    else if (values.description.trim().length < 20 || values.description.trim().length > 3000) errors.description = 'errorDescription';
    return errors;
  }
  function getEndpoint(config) {
    const form = config.contact?.form;
    if (form?.provider !== 'formspree' || form.enabled !== true || form.recipientConfirmed !== true || !/^[a-zA-Z0-9]{6,32}$/.test(form.formId || '')) return '';
    return 'https://formspree.io/f/' + form.formId;
  }
  async function send(config, values, options = {}) {
    const errors = validate(values);
    if (Object.keys(errors).length) return {status:'invalid',errors};
    const endpoint = getEndpoint(config);
    if (!endpoint) return {status:'pending'};
    if (values._gotcha) return {status:'error'};
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeoutMs || 15000);
    try {
      const request = options.fetchImpl || fetch;
      const response = await request(endpoint, {
        method:'POST', headers:{'Accept':'application/json','Content-Type':'application/json'},
        body:JSON.stringify({name:values.fullName.trim(),email:values.email.trim(),business:(values.business || '').trim(),service:values.service,description:values.description.trim(),language:values.language === 'es' ? 'es' : 'en',_subject:'VYB — Quote request',_gotcha:''}),
        signal:controller.signal, redirect:'error',credentials:'omit',referrerPolicy:'no-referrer'
      });
      const result = await response.json().catch(() => null);
      return {status:response.status === 429 ? 'ratelimit' : response.ok && result?.ok === true ? 'success' : 'error'};
    } catch { return {status:'network'}; }
    finally { clearTimeout(timer); }
  }
  window.VYB_FORM_HELPERS = {validate,getEndpoint,send,emailValid};
  if (typeof document === 'undefined') return;
  const config = window.VYB_CONFIG;
  const form = document.querySelector('#quote-form');
  const submit = document.querySelector('#form-submit');
  const status = document.querySelector('#form-status');
  form.removeAttribute('inert');
  let errors = {}, message = '', busy = false;
  const t = key => window.VYB_COPY[document.documentElement.lang === 'es' ? 'es' : 'en'][key] || key;
  const controls = ['fullName','email','business','service','description'];
  function render() {
    const ready = Boolean(getEndpoint(config));
    document.querySelector('#form-notice').textContent = t(ready ? 'formReady' : 'formPending');
    document.querySelector('[data-i18n=contactBody]').textContent = t(ready ? 'formContactReady' : 'contactBody');
    submit.disabled = busy;
    submit.textContent = t(busy ? 'formSending' : ready ? 'formSend' : 'formCheck');
    for (const name of controls) {
      document.querySelector('#error-'+name).textContent = errors[name] ? t(errors[name]) : '';
      form.elements[name].setAttribute('aria-invalid', String(Boolean(errors[name])));
    }
    status.textContent = message ? t(message) : '';
    form.setAttribute('aria-busy',String(busy));
  }
  document.addEventListener('vyb:language',render);
  document.addEventListener('click',event => {
    const link = event.target.closest('[data-quote]');
    if (!link) return;
    if (!['basic','booking','custom'].includes(link.dataset.quote)) return;
    event.preventDefault();
    form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    form.elements.service.value = link.dataset.quote;
    delete errors.service; render();
    form.elements.fullName.focus({preventScroll:true});
  });
  form.addEventListener('submit',async event => {
    event.preventDefault();
    if (busy) return;
    const values = Object.fromEntries(new FormData(form));
    values.language = document.documentElement.lang;
    errors = validate(values);
    if (Object.keys(errors).length) {
      message = 'formInvalid';render(); form.elements[Object.keys(errors)[0]].focus();return;
    }
    if (!getEndpoint(config)) {message='formValidPending';render();return;}
    document.dispatchEvent(new CustomEvent('vyb:quote-submit',{detail:{service:values.service}}));
    busy=true;message='';render();
    [...form.elements].forEach(el=>{el.disabled=true;});
    const result = await send(config,values);
    busy=false; [...form.elements].forEach(el=>{el.disabled=false;});
    message = {success:'formSuccess',pending:'formValidPending',network:'formNetwork',error:'formError',ratelimit:'formRateLimit'}[result.status] || 'formError';
    if (result.status === 'success') {document.dispatchEvent(new CustomEvent('vyb:quote-success',{detail:{service:values.service}}));form.reset();errors={};}
    render(); status.focus({preventScroll:true});
  });
  const email = document.querySelector('#commercial-email');
  email.hidden = !emailValid(config.contact?.email);
  if (emailValid(config.contact?.email)) {email.href='mailto:'+config.contact.email;email.textContent=config.contact.email;email.hidden=false;}
  const instagram=document.querySelector('#instagram-link');
  try {const url=new URL(config.social?.instagram);if(url.protocol==='https:' && ['instagram.com','www.instagram.com'].includes(url.hostname) && !url.username && !url.password && url.pathname!=='/'){instagram.href=url.href;instagram.hidden=false;}} catch {}
  render();
})();
