# Actualización del catálogo VYB — 10 diseños

Se agregaron INKHAUS (tatuajes), ALUNA (yoga y pilates) y PAWS & CO. (peluquería canina), con los enlaces exactos proporcionados. Se mantienen sin cambios los siete proyectos anteriores, el contacto, Formspree, planes y analíticas. Las nuevas previsualizaciones son ilustrativas, con imágenes locales de las plantillas VYB; no son capturas de los sitios publicados.

## Archivos para reemplazar o agregar

- `index.html`
- `app.js`
- `styles.css`
- `content.js`
- `config.js`
- `tests/verify-catalog.mjs`
- `tests/verify.mjs`
- `assets/preview-tattoo.webp`
- `assets/preview-yoga.webp`
- `assets/preview-pet-grooming.webp`
- `CAMBIOS_CATALOGO_10.md` (nuevo documento)

No hay archivos que eliminar.

## Actualizar GitHub / Cloudflare

1. Guardar una copia del repositorio actual. Extraer el ZIP antes de usarlo.
2. En el repositorio de la web oficial, usar Add file → Upload files. Arrastrar el CONTENIDO extraído conservando carpetas y rutas. No cargar el ZIP ni crear una carpeta contenedora adicional.
3. Reemplazar los archivos indicados y confirmar el commit. No modificar los repositorios de las demos.
4. Si Cloudflare está conectado al repositorio, esperar su despliegue automático. Si se publica manualmente, subir los archivos estáticos de la raíz. No requiere compilación ni npm.
5. Probar los diez filtros y enlaces, idioma y formulario. El envío real de correo no fue ejecutado durante esta actualización.

## Probar en Windows PowerShell

```powershell
Expand-Archive -LiteralPath "$HOME\Downloads\VYB_WEB_OFICIAL_CATALOGO_10_DISENOS.zip" -DestinationPath "$HOME\Downloads\VYB_CATALOGO_10"
Set-Location "$HOME\Downloads\VYB_CATALOGO_10"
py -m http.server 8100 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8100/ y detener con Ctrl+C. Opcional: `node tools/prepare.mjs` actualiza el HTML inicial desde configuración y textos. Para agregar diseños, editar `config.js`, agregando proyecto y categoría; los estilos de previsualización están en `styles.css`.

## Verificación de esta entrega

- PASS: verify.mjs, verify-form.mjs, verify-analytics.mjs, verify-catalog.mjs. Los ensayos de envío son simulaciones controladas; no se envió correo.
- PASS: comparación de configuración original de los siete proyectos, contacto y analíticas. form.js y analytics.js son idénticos al original.
- Navegador: catálogo en escritorio, filtros nuevos, URL de enlace canino, traducción inmediata ES/EN, menú móvil. Vista móvil de 375 px: sin desbordamiento horizontal. Previsualización canina visible. Sin errores de la aplicación observados (la extensión del navegador emitió errores ajenos al sitio).
- SKIP: verify-demos.mjs requiere fuentes de demos que no están incluidas en el ZIP recibido. No se modificaron ni se volvieron a probar internamente esos sitios.
- La consulta externa de las tres páginas no estuvo disponible en el entorno. Sus destinos se verificaron en configuración contra los enlaces suministrados; no se afirma disponibilidad remota independiente.

Los documentos históricos de pruebas se conservan como referencia de la entrega previa; esta lista describe las comprobaciones de la presente actualización.
