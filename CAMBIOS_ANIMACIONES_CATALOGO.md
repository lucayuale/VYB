# VYB — animaciones y catálogo compacto · 14/11/2026

Base: último ZIP disponible `VYB_Web_Oficial_SEO_Nosotros_Google_2026-11-12.zip`. Se mantiene el sitio existente y sus diez demos, servicios, configuración comercial, idiomas, formulario y páginas SEO. No se publicó ningún cambio remoto.

## Qué se agregó

- Entrada escalonada del hero y revelado del logo, con detalles suaves en el marco de marca. Desplazamiento de máximo 14 px en escritorio; sin parallax en celular.
- Entradas progresivas en servicios, catálogo, modalidades, proceso y CTA final. Hover y foco discretos en botones y tarjetas. El fondo animado de contacto se pausa fuera de pantalla.
- Catálogo: dos tarjetas iniciales; la flecha agrega otras dos por pulsación (2 → 4 → 6 → 8 → 10). Al completar, cambia a «Mostrar menos diseños». No hay reproducción automática ni scroll secuestrado.
- Al seleccionar un rubro se reinicia la selección compacta. Si hay una sola demo, no aparece el botón. El idioma conserva el estado de expansión y actualiza botones y contador.
- Se conservan las diez URLs exactas y los filtros. No se agregan dependencias.
- Movimiento reducido: contenidos visibles sin desplazamiento o animación. Sin JS, el contenido estático sigue visible y los controles del catálogo permanecen ocultos, como corresponde al catálogo generado por JS.

## Rutas para actualizar GitHub

| Archivo desde la raíz | Acción |
|---|---|
| `index.html` | Reemplazar |
| `app.js` | Reemplazar |
| `content.js` | Reemplazar |
| `motion.css` | Agregar |
| `motion.js` | Agregar |
| `README.md` | Reemplazar con instrucciones actualizadas |
| `CAMBIOS_ANIMACIONES_CATALOGO.md` | Agregar |
| `PRUEBAS_ANIMACIONES_CATALOGO.md` | Agregar |
| `tests/verify-motion-catalog.mjs` | Agregar |
| `tests/preserved-config.json` | Agregar |

No hay archivos que eliminar. `styles.css`, `config.js`, `form.js`, `analytics.js`, recursos, sitemap y páginas ES/EN de servicios y Nosotros permanecen sin cambios. La fuente del catálogo sigue siendo `config.js`. El tamaño del bloque se puede ajustar en `app.js`, constante `CATALOG_PAGE_SIZE` (actualmente 2).

## Publicación

Extraer el ZIP. Subir los archivos anteriores a las mismas rutas del repositorio; no subir el ZIP como página ni crear una carpeta envolvente. También se puede subir el contenido completo extraído, que conserva el proyecto. Mantener el método de despliegue de Cloudflare existente. Si está conectado a GitHub, el commit activará el despliegue habitual. Si se publica manualmente, usar la raíz extraída como carpeta estática.

No hace falta npm install, build ni una nueva configuración de hosting. `tools/prepare.mjs` sigue siendo compatible y ya se ejecutó en esta entrega. Si luego se modifica contenido/configuración y se quiere refrescar el HTML inicial: `node tools/prepare.mjs`.

No se enviaron formularios reales ni se modificaron cuentas de terceros. La configuración activa de Formspree se conservó intacta.
