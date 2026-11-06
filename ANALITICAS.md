# Estadísticas opcionales

## Decisión

Cloudflare Web Analytics sirve para visitas, páginas y rendimiento. Su documentación actual indica que todavía no admite eventos personalizados: no se afirma que mida por sí solo botones o formularios. La web es una landing: sus secciones no son páginas independientes.

Para medir conversiones se dejó **Plausible Events API** como opción adicional compatible con una web estática en Cloudflare/GitHub Pages. No necesita backend propio ni claves privadas en el navegador. Requiere cuenta y condiciones/plan del proveedor; no se contrató nada ni se promete uso gratuito permanente. Ambas opciones están apagadas, sin identificadores ficticios.

## Activar Cloudflare Web Analytics

1. En tu cuenta Cloudflare, Web Analytics → Add a site.
2. Registrar exactamente `vyb.vybstudydesign.workers.dev` (actualizar también canonical si cambiás dominio).
3. Elegir instalación manual, obtener el token público del snippet oficial.
4. En config.js, `analytics.cloudflare.token`: pegar solo el token público de 32 caracteres hexadecimales, y `enabled: true`.
5. Si Cloudflare ya inyecta el beacon automáticamente, dejar nuestra integración desactivada para no duplicar medición. En Pages se puede activar desde Metrics → Web Analytics y desplegar nuevamente. En Workers, verificar la configuración efectiva de la cuenta; no se asume inyección automática.
6. Publicar, navegar y verificar recepción de datos en el panel. La carga del beacon solo se habilita en HTTPS y en el hostname de canonical; las previsualizaciones locales no contaminan estadísticas.

La integración usa exclusivamente el beacon oficial, no envía eventos inventados al endpoint RUM. Puede ser bloqueado por extensiones o preferencias. No permite medir visitas dentro de repos externos sin instrumentarlos aparte.

## Activar clics y conversiones con Plausible

1. Crear/usar una cuenta propia de Plausible y registrar el hostname oficial exacto.
2. En config.js, `analytics.plausible.domain`: hostname sin https ni rutas; `enabled: true`.
3. Esta integración envía directamente al Events API oficial: no añadir además otro snippet Plausible que duplique pageview. No insertar una API key ni secreto.
4. En Goals crear objetivos de evento con los nombres exactos: `Demo click`, `Quote click`, `Quote submit`, `Quote accepted`, `Email click`, `Section view`, `Catalogue filter`.
5. Las propiedades admitidas son únicamente IDs de proyecto/categoría, servicio (`basic`, `booking`, `custom`) y sección. Configurar su visualización de propiedades en el panel si el plan lo admite.
6. Publicar y confirmar eventos en el panel. Probar un envío real autorizado para `Quote accepted` solo después de comprobar el proveedor de formularios.

`pageview` cuenta la landing. `Section view` registra cada sección una vez por carga; no crea páginas ficticias. `Demo click` mide intención de abrir la demo, no que la persona haya completado su visita. `Quote submit` exige campos válidos y proveedor configurado. `Quote accepted` se emite solo al recibir aceptación de Formspree; no mide entrega de email ni contratación.

## Privacidad y límites

No se leen ni envían nombre, correo, negocio, descripción, contenido del formulario, query strings, referrer o identificadores persistentes. No se agregan cookies propias. Se respetan DNT y Global Privacy Control, y se informa la medición cuando está habilitada. Toda conexión con un proveedor expone datos técnicos de red del navegador conforme a su política; esto no equivale a una garantía legal de anonimato. Revisar privacidad y requisitos aplicables antes de activar.

Los bloqueadores y fallos de red pueden reducir conteos. No se bloquean navegación ni envío esperando estadísticas; no se reintenta para eludir bloqueadores. Las integraciones solo se probaron con transporte simulado, no con una cuenta de analítica activa.

Referencias oficiales consultadas el 6 de noviembre de 2026:
- https://developers.cloudflare.com/web-analytics/get-started/
- https://developers.cloudflare.com/web-analytics/faq/ (eventos personalizados: no soportados)
- https://plausible.io/docs/events-api
- https://plausible.io/docs/custom-event-goals
