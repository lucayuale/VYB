# VYB — Web oficial · SEO y presentación institucional (12/11/2026)

Paquete completo listo para subir al **repositorio de GitHub de la web oficial**. Preparado a partir de la última versión con Instagram y los diez demos, sin eliminar el formulario ni la lógica de los idiomas.

## Qué cambia

- Verificación de Search Console en `index.html`: etiqueta exacta `google-site-verification`, sin modificaciones.
- Nueva sección **Nosotros** en la portada: Luca Yuale y Valentín Bertuccelli, estudiantes de Ingeniería en Sistemas de Información en la UTN; Rosario, Argentina. No se afirma que se hayan recibido.
- Nueva sección **Servicios** con enlaces a páginas informativas indexables y bilingües: Basic, Booking y Custom.
- Páginas estáticas en `/es/...` y `/en/...` para servicios + «Nosotros», con contenido propio en cada idioma, metadatos, canonical y enlaces `hreflang` cruzados.
- Sitemap actualizado con la portada y las 8 páginas nuevas. `robots.txt` correcto.
- Preguntas frecuentes honestas: quiénes somos, diferencia entre demos y clientes reales, modalidad 50/50 y mantenimiento informado en el presupuesto.
- Marcado estructurado Organization en la portada (fundadores, Rosario, Instagram); páginas internas con WebPage/Service. Sin reseñas inventadas ni promesas de ranking.
- Se conservan: las 10 demos, el enlace de Instagram, la web EN/ES, Formspree, el email comercial y las imágenes existentes.

## Publicar en GitHub

1. Hacé una copia de seguridad del estado actual del repositorio si querés poder volver atrás.
2. Abrí este ZIP y **subí el CONTENIDO de `VYB-main/` a la raíz del repositorio**, reemplazando archivos con el mismo nombre. No dejes `VYB-main/` como una carpeta nueva dentro del repo.
3. Asegurate de incluir las nuevas carpetas `es/` y `en/` y el archivo `seo-pages.css`, además de los archivos anteriores.
4. Confirmá el commit. Si Cloudflare está conectado a ese repositorio, esperá a que el despliegue figure como exitoso. Si no hay conexión automática, publicá la versión por tu método habitual.
5. Abrí el sitio y revisá navegación, contacto, selector EN/ES y diez demos.

## Verificación de Google

Una vez PUBLICADA la nueva versión y accesible, entrá a Search Console y hacé clic en **Verificar** en el método «Etiqueta HTML». No quites la etiqueta después. Si falla, comprobá que la página principal real contiene la etiqueta al ver el código fuente.

## Sitemap e indexación

En Search Console > Sitemaps, agregá `sitemap.xml`. La URL resultante será:

https://vyb.vybstudydesign.workers.dev/sitemap.xml

Inspeccioná la portada y algunas páginas nuevas y, cuando Google las pueda rastrear, solicitá indexación si corresponde. La indexación y la posición en resultados no están garantizadas ni son inmediatas.

## URLs nuevas

- ES Nosotros: https://vyb.vybstudydesign.workers.dev/es/nosotros/
- EN About: https://vyb.vybstudydesign.workers.dev/en/about/
- ES Diseño web: https://vyb.vybstudydesign.workers.dev/es/diseno-web/
- EN Web design: https://vyb.vybstudydesign.workers.dev/en/web-design/
- ES Reservas: https://vyb.vybstudydesign.workers.dev/es/reservas-online/
- EN Booking: https://vyb.vybstudydesign.workers.dev/en/online-booking/
- ES Personalizadas: https://vyb.vybstudydesign.workers.dev/es/desarrollo-web-personalizado/
- EN Custom: https://vyb.vybstudydesign.workers.dev/en/custom-web-development/

## Importante para el futuro dominio `.com`

Cuando compremos el dominio, tendremos que actualizar las URLs de `index.html`, `config.js`, las 8 páginas nuevas, `robots.txt` y `sitemap.xml`, configurar redirecciones y dar de alta el nuevo dominio en Search Console. No se debe cambiar sólo el dominio visible y dejar los canonical anteriores.

## Pruebas

Las pruebas locales no publican nada. Con Node instalado ejecutá en `VYB-main/`:

```sh
node tests/verify.mjs
node tests/verify-catalog.mjs
node tests/verify-demos.mjs
node tests/verify-form.mjs
node tests/verify-analytics.mjs
node tests/verify-seo.mjs
```
