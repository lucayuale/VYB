# Barroso — animaciones integradas · 14/11/2026

Base: ZIP original `Barroso-main.zip`. Esta entrega corresponde exclusivamente al proyecto de Agustín Barroso.

## Archivos para GitHub

| Ruta desde la raíz del repositorio | Acción | Cambio |
|---|---|---|
| `index.html` | Reemplazar | Carga de `motion.css` y `motion.js` antes del código principal. |
| `app.js` | Reemplazar | Reutiliza un único controlador de apariciones y registra fotos nuevas al filtrar la galería o cambiar idioma. |
| `motion.js` | Agregar | IntersectionObserver, entradas escalonadas, rAF por eventos, foco por teclado y preferencia de movimiento reducido. |
| `motion.css` | Agregar | Fade-up, microinteracciones, portada, encabezado y entrada del lightbox. |
| `README.md` | Reemplazar | Instrucciones actualizadas. |
| `CAMBIOS_ANIMACIONES.md` | Agregar | Este resumen y pasos de publicación. |
| `PRUEBAS_ANIMACIONES.md` | Agregar | Resultados y límites de QA. |
| `tests/verify-motion.mjs` | Agregar | Verificador sin dependencias. |
| `tests/preserved-files.sha256.json` | Agregar | Referencia de integridad de los recursos preservados. |

No se elimina ningún archivo. `config.js`, `styles.css` y las ocho fotos de `assets/` son idénticos byte por byte al original. La paleta sigue siendo carbón, marfil y rojo coral de Barroso, sin sustituirla por la paleta de la agencia. No se cambiaron datos deportivos, fechas, textos, enlaces, contactos ni las traducciones.

## Qué cambia al navegar

- Portada: entrada de nombre, subtítulo y botones con una secuencia corta y foto con fade. Desplazamiento de foto limitado a 12 px, únicamente en escritorio con puntero fino.
- Trayectoria, agenda, galería, sponsors y contacto: apariciones al entrar al viewport y delays breves por grupos. Las cifras permanecen estáticas; no se agregan contadores artificiales.
- Botones, tarjetas, flechas y menú: respuestas discretas al hover y foco. El lightbox mantiene navegación, cierre Escape y recuperación del foco.
- No hay librerías, fuentes, imágenes ni servicios nuevos. Las animaciones no usan scroll hijacking, scroll horizontal ni bucles requestAnimationFrame permanentes. Se mantienen el scroll normal y la configuración ES inicial con preferencia guardada.
- Sin JavaScript o ante fallo del controlador visual, el CSS no oculta el contenido. Con movimiento reducido se muestran los elementos sin desplazamientos ni animaciones.

## Publicar manualmente

1. Extraer el ZIP; sus archivos publicables están directamente en la raíz.
2. En el repositorio de Barroso, abrir **Add file → Upload files** y reemplazar los archivos de la tabla conservando las rutas. Se puede subir el contenido completo extraído; nunca el ZIP como sustituto de `index.html`.
3. Confirmar que `index.html`, `app.js`, `config.js`, `styles.css`, `motion.js`, `motion.css` y `assets/` quedan en la raíz que GitHub Pages ya utiliza.
4. Hacer commit. Conservar la configuración de Pages existente. Esperar la publicación y recargar con Ctrl+F5.
5. Revisar ES/EN, menú, fotos y contactos en la URL pública.

No hace falta instalar paquetes, ejecutar npm ni compilar. No se modificó ni publicó ningún repositorio remoto.
