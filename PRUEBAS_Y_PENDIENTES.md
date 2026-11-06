# Pruebas y pendientes — 6 de noviembre de 2026

## Estado de las fuentes

Se inspeccionó el ZIP adjunto y se preservó su estructura. La fuente principal es 01_WEB_OFICIAL_ACTUAL. No se restauró la v4 histórica. No se modificó el ZIP original ni repositorios remotos.

HTTP de los siete enlaces: 200 durante la revisión. Los index.html, app.js y config.js remotos de las cinco demos fuente coinciden byte a byte con los adjuntos antes de editar. Esto no equivale a comparar todos los recursos de cada repositorio.

Boda-demo devuelve el mismo sitio de taller mecánico que Mecanico-demo: título “Tu Taller | Taller mecánico con turnos online”. Se confirmó visualmente en navegador. No se lo marca como una demo de bodas validada. La tarjeta mantiene su enlace exacto y advierte la incidencia. Faltan fuentes reales de Bodas/Mecánica en el adjunto para corregir sus publicaciones sin reconstruir proyectos.

La URL oficial workers.dev no pudo verificarse por HTTP desde este entorno (403). Se probó localmente la fuente oficial adjunta; no se afirma que el despliegue remoto haya sido actualizado ni probado.

## Pruebas automatizadas ejecutadas

- tools/prepare.mjs: preparación del HTML inicial EN y metadatos; ejecución repetida produce el mismo hash.
- tests/verify.mjs: rutas y recursos, anclas/IDs, siete URLs exactas y estados, categorías, claves bilingües, idioma predeterminado, tres botones de servicio, correo/Formspree activos conservados, analítica desactivada, SEO y protección sin JS.
- tests/verify-form.mjs: campos obligatorios, correo, descripción, servicio, longitudes; endpoint HTTPS restringido; configuración pendiente aislada sin red; honeypot; payload; respuesta aceptada; error HTTP; JSON incorrecto; desconexión; timeout; HTTP 429. Transporte simulado: ningún correo real enviado.
- tests/verify-analytics.mjs: apagado inicial, DNT, hostname de producción, dominio incorrecto, nombres/propiedades permitidos, ausencia de datos de la consulta y evento de aceptación con transporte simulado.
- tests/verify-demos.mjs: cinco demos, 17 páginas HTML, recursos locales configurados, claves ES/EN, modal/enlace alternativo y URLs de reservas conservadas; corrección CSS de Obsidian.
- node --check: todos los .js/.mjs actuales de web y cinco demos.
- Copias extraídas de los ZIP: recursos y suites repetidas en rutas con espacios. Prueba CRC e inventario de archivos de cada ZIP.

## Pruebas de navegador ejecutadas (Chrome)

Web oficial:
- Primera apertura sin preferencia: EN; cambio inmediato ES/EN, atributo lang y preferencia ES después de recargar.
- Siete filtros individuales: una tarjeta por categoría; Todos: siete. Enlaces de config intactos. Aviso bilingüe de la incidencia de Bodas visible.
- Basic/Booking/Custom: preselección del formulario; enfoque del primer campo. Se comprobó Custom de forma aislada además de la secuencia de botones.
- Formulario vacío y correo inválido: errores correctos; cambio de idioma actualiza los errores ya visibles.
- Contacto directo mailto al correo configurado; privacidad enlazada. No se pulsó un envío válido hacia el proveedor.
- Menú móvil abre, cierra con Escape; estado aria-expanded correcto. FAQ abre. Navegación y botón móvil de presupuesto visibles según contexto.
- Escritorio y vistas estrechas mediante iframe de 320, 390, 768 y 1024 px. Anchos útiles con scrollbar: 305, 375, 753 y 1009; scrollWidth igual a clientWidth en cada caso. No es emulación de hardware físico.
- Captura de escritorio inspeccionada: estética, logo y composición conservados con el nuevo CTA.
- Consola inspeccionada sin errores relevantes atribuibles al sitio; se excluyen mensajes de extensiones ajenas.

Demos disponibles:
- Portadas de las cinco revisadas en vista estrecha; Cosmetica, Gym, Restaurante y Nails mostraron correctamente sus avisos de reserva no configurada al usar su CTA.
- Obsidian: modal visible, iframe y enlace alternativo apuntan a https://obsidiam.setmore.com/; cierre con Escape y foco de vuelta al botón.
- Obsidian antes: scrollWidth 309 vs clientWidth 305. Después de corregir prioridad de columnas: ambos 305; rejilla 25 / 134 / 59 / 18 px en la prueba.
- Menú móvil verificado en Obsidian, Cosmetica y Restaurante. Cambio ES verificado en Restaurante y Nails; cobertura de traducciones de cinco demos comprobada por prueba estática.
- Se preservaron bytes de todos los archivos de demos excepto styles.css de Obsidian. No se cambió ningún precio, servicio o URL de reservas.

## Rendimiento

La web oficial ya usaba fuentes de sistema y capturas locales WebP de aproximadamente 26–54 KB; se conservaron. No se agregaron imágenes ni fuentes remotas. Se mantuvo lazy loading y se añadió decodificación asíncrona a las capturas, con dimensiones explícitas existentes. Analítica remota desactivada, sin solicitudes nuevas a proveedores de estadísticas hasta configurarla.

JavaScript total sin comprimir: 44.363 → 51.224 bytes, incluyendo nueva analítica opcional. Comparación gzip conjunta orientativa: 14.266 → 16.409 bytes (no representa transferencia exacta del hosting). No se promete una mejora numérica de velocidad: se optimizó comportamiento y se mantuvo una carga liviana. No se ejecutó Lighthouse ni se midieron Core Web Vitals reales. Las fuentes externas y fotos remotas heredadas de algunas demos se preservan; dependen de sus proveedores.

## Pendientes externos / manuales

1. Corregir contenido publicado de Boda-demo usando las fuentes reales de bodas; no hay fuentes en esta entrega.
2. Probar recepción real de Formspree con una consulta controlada y revisar destinatario, spam, cuota, antispam y CAPTCHA si corresponde. Los flags activos se preservan, no son certificación de funcionamiento de la cuenta.
3. Activar y verificar paneles de analítica solo si se decide utilizarlos; no se creó cuenta ni se contrató plan. Leer ANALITICAS.md.
4. Publicar manualmente en los repositorios correctos y comprobar la versión alojada/imagen social/caché. No se suministró la configuración real de despliegue del Worker.
5. Pruebas en celulares físicos, Safari/iOS, otros navegadores y tecnologías asistivas completas. No se certifica conformidad WCAG ni auditoría legal.
6. No se completó ninguna reserva real ni se probaron correos, confirmaciones/cancelaciones de Setmore en esta revisión. Tampoco se navegaron visualmente todas las subpáginas/galerías o combinaciones de configuración; se ejecutaron las comprobaciones estáticas indicadas.
