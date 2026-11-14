# Agustín Barroso · Correcciones v3

## Cambios

- Se quitó la foto pequeña superpuesta en la presentación del atleta.
- Nueva sección de formación y asesorías después de Trayectoria: UGR, graduación del 28/11/2025, experiencia presencial/online y trabajo con personas y deportistas amateurs. Textos completos ES/EN; botón al WhatsApp ya configurado con mensaje específico. No se envían mensajes automáticamente.
- La galería principal ahora presenta los seis hitos indicados en el PDF, con cinco videos suministrados. El campeonato argentino amateur 2023 figura sin video y con aviso explícito: no se atribuyó otra grabación a ese evento.
- Filtros Todo / Etapa profesional / Etapa amateur. Reproductores HTML nativos, con audio y pantalla completa del navegador. Sin autoplay, preload=none, poster local, enlace alternativo al MP4 y mensaje de error. Un video se pausa al iniciar otro, cambiar idioma o filtrar. Se pausan al ocultar la pestaña.
- Comunidad: +13.000 seguidores, 10.000 TikTok, 3.000 Instagram, +619.000 visualizaciones TikTok y +312.000 vistas mensuales Instagram. Son cifras históricas provistas por el atleta, no mediciones actuales. Entrada progresiva y contador animado respetando movimiento reducido.
- Se conserva el hero, las imágenes principales, colores, sponsors, agenda, contactos y cinta horizontal de récords de la v2.

## Archivos para reemplazar en la raíz del repositorio

| Ruta | Acción |
| --- | --- |
| index.html | Reemplazar: sección de asesorías, métricas y archivos nuevos |
| config.js | Reemplazar: textos bilingües, hitos, videos, métricas y asesorías |
| app.js | Reemplazar: galería de videos y actualización de idioma |
| motion.js | Reemplazar: registrar nuevas tarjetas en las apariciones |
| updates.css | Agregar: estilos localizados y ajuste de filtros móviles |
| updates.js | Agregar: asesorías, métricas y contadores |
| assets/videos/ | Agregar: cinco MP4 y cinco posters JPG |
| tests/ | Actualizar para validación local; no es necesario publicarlo |
| README.md y ACTUALIZACION_CORRECCIONES.md | Documentación actualizada |

No hay que eliminar fotos antiguas. Se conservan sus bytes y su configuración para futuras reutilizaciones. El lightbox de fotografías anterior no se utiliza en las tarjetas de video: estas usan sus controles nativos.

## Recursos

Los cinco videos fueron suministrados por el usuario. Se conservan completos, con audio AAC, H.264 720×1280, 30 FPS y faststart. Duraciones aproximadas: 16,56 / 6,85 / 12,66 / 16,49 / 18,11 segundos. Se generaron posters de los propios videos. No se agregaron imágenes externas ni recursos generados. Los originales no se incluyen en el ZIP para evitar unos 241 MB de material duplicado.

## Configuración

En config.js: coaching contiene párrafos, pilares, graduación y mensaje; fightClips contiene fecha, título, descripción, categoría, src y poster; reachMetrics contiene valor, prefijo, sufijo y etiqueta ES/EN. Para agregar el video argentino 2023, copiarlo a assets/videos/ y completar src y poster del primer hito. Usar rutas relativas sin barra inicial.

Los servicios de asesorías se consultan directamente; no se agregaron planes, pagos, garantías ni formularios simulados. Las traducciones de las nuevas secciones están completas. Los textos grabados dentro de los videos originales permanecen en su idioma original.

## Pruebas realizadas

- node --check app.js / updates.js / motion.js: aprobado.
- node tests/verify-motion.mjs: aprobado. Recursos, anclas, traducciones, ES inicial y estilos/fotografías originales preservados mediante SHA-256.
- node tests/verify-updates.mjs: aprobado. Seis hitos, cinco videos y posters locales, ausencia de inset, datos de formación, cifras y configuración bilingüe.
- Chrome real: los cinco videos iniciaron reproducción y llegaron a readyState=4 sin errores; al reproducir otro, el anterior se pausó.
- Filtros: seis totales, cuatro profesionales, dos amateurs. Idioma ES/EN y persistencia tras recargar: aprobado.
- Menú móvil: apertura y cierre al navegar: aprobado.
- Vista mediante iframe de 320,390,768,1024 y1440 px: sin desbordamiento horizontal. Se corrigió el ancho de filtros en inglés y se usa una columna de videos en móviles pequeños.
- Se revisaron visualmente Asesorías, galería y métricas en escritorio/móvil. No se observaron errores propios de la aplicación en consola (el navegador registra errores de su extensión, ajenos al proyecto).
- ZIP final: comprobación CRC y presencia de todos los recursos.

Pendiente: video del campeonato argentino 2023; prueba en teléfono físico y Safari; verificación en el hosting luego de publicarlo. El modo movimiento reducido se revisó en código, sin cambiar la preferencia real del sistema. No se enviaron mensajes de WhatsApp ni correos. El usuario debe reconfirmar datos deportivos y métricas antes de publicar.
