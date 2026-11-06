# Actualización manual en GitHub / Cloudflare

## Repositorio de la web oficial

El nombre del repositorio que alimenta `vyb.vybstudydesign.workers.dev` no se proporcionó. Las rutas exactas indicadas en CAMBIOS_GITHUB.md son relativas a la raíz pública actual (donde están index.html y config.js). No se debe inventar otro repositorio ni modificar el Worker mediante este paquete.

1. Hacer una copia o commit de respaldo del estado actual.
2. Extraer VYB_WEB_OFICIAL_LISTA_PARA_GITHUB_2026-11-06.zip. Su raíz ya contiene index.html y los archivos del sitio; **no subir la carpeta 01_WEB_OFICIAL_ACTUAL como un nivel adicional**.
3. En el repositorio correcto, reemplazar los seis archivos modificados y agregar los nuevos indicados en CAMBIOS_GITHUB.md respetando sus rutas. Puede copiarse el paquete completo sobre la carpeta pública actual, conservando archivos de despliegue que no están en la entrega.
4. Con Node disponible, ejecutar `node tools/prepare.mjs` y las tres pruebas oficiales. No necesita npm install ni build de framework.
5. Hacer commit mediante GitHub web o tu herramienta habitual. No borrar wrangler.json/jsonc/toml, workflows, bindings u otra configuración de hosting existente: no se incluyó en el material adjunto ni se ha reconstruido.
6. Si Cloudflare está conectado a GitHub, esperar al despliegue del commit; verificar qué rama y carpeta publica el proyecto actual. Para una nueva configuración estática usar la raíz de estos archivos como assets, sin backend propio. No asumir que este ZIP cambia por sí solo el Worker.
7. Si se utiliza Cloudflare Pages, la salida es esta raíz estática; el paso opcional de preparación es `node tools/prepare.mjs`. Conservar la configuración efectiva de tu proyecto.
8. Verificar la web publicada, consola, ambos idiomas, siete enlaces, formulario, metadatos y recepción real del correo. Hacer recarga forzada para descartar caché. Si un archivo sigue viejo, revisar el despliegue/caché de Cloudflare antes de cambiar código.

## Repositorio lucayuale/Bareberia-demo

El ZIP VYB_BARBERIA_CORRECCION_MOVIL_GITHUB_2026-11-06.zip contiene la demo completa sin niveles extra. **Único archivo modificado: `styles.css` en la raíz.** Reemplazar ese archivo; el resto se incluye como copia completa para respaldo/ejecución. App, config, HTML, URL Setmore y precios conservan sus bytes originales.

GitHub → Bareberia-demo → Add file / Upload files → subir styles.css → Commit. Mantener la configuración actual de Settings → Pages (rama/carpeta vigentes). Esperar a que finalice el despliegue. Probar /Bareberia-demo/ en vista móvil y abrir/cerrar el modal sin hacer una reserva real.

## Otras demos

No hay archivos para reemplazar en Cosmetica-demo, Gym-demo, Restaurante-demo ni Nails-demo: sus fuentes se conservan intactas en el paquete completo. No desplegar de nuevo por esta entrega.

Mecanico-demo y Boda-demo no tienen fuentes en el ZIP adjunto. Boda-demo requiere corregir su contenido publicado (actualmente es un taller). Se mantienen ambas URLs y no se inventan archivos para esos repositorios.

Ninguna actualización remota se realizó durante este trabajo.
