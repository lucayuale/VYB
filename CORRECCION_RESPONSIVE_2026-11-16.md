# VYB · Responsive y navegación unificada

Base: VYB_WEB_SUBRAYADO_ACTIVO_CORREGIDO.zip, última entrega disponible. No se publicaron cambios remotos ni se modificaron repositorios de demos.

## Qué se corrigió

1. Las ocho páginas internas compartían un problema de tamaño intrínseco: el marco del logo combinaba relación de aspecto y altura mínima con un grid cuyo mínimo automático impedía encoger la columna. A 390 px de marco de prueba, el contenido útil era de 375 px pero la página llegaba a 451 px. Se corrigieron las columnas con minmax(0,1fr), los mínimos de los elementos y el ancho del marco. Los espacios verticales porcentuales de los grids móviles se reemplazaron por espacios fijos para evitar que las filas salgan de su contenedor. No se añadió overflow-x:hidden a esas páginas.
2. El menú de Inicio tenía overflow:hidden y topes de altura fijos, además de reglas posteriores que aumentaban el espacio entre enlaces. Ahora la altura depende del viewport y del encabezado real; el menú tiene scroll propio, los enlaces no se comprimen y se evita el encadenamiento del scroll. Se bloquea el scroll de fondo mientras está abierto y se restaura al cerrar. Escape y selección de un enlace conservan su funcionamiento.
3. Los campos de presupuesto pueden encogerse dentro de sus grids; botones y acciones se ajustan al ancho móvil.
4. Por la aclaración final del usuario, la experiencia visible es una sola landing: los enlaces de presentación y servicios apuntan a #nosotros y #modalidades. Los servicios seleccionan Basic, Booking o Custom según corresponde. Inicio y Presupuesto siguen siendo secciones de la misma página.
5. Las ocho direcciones antiguas ES/EN se conservan para compatibilidad y, con JavaScript, llevan a la landing y a su sección. La entrada conserva el idioma y la modalidad; las pistas de URL se consumen para que futuras recargas respeten la elección guardada. Si JavaScript está desactivado, permanece el contenido estático original con el responsive corregido. Esta compatibilidad usa navegación del navegador, no una redirección HTTP 301; no se cambió el Worker ni su configuración de servidor.

No se cambiaron textos comerciales, colores, precios, destinos de demos, proveedor del formulario ni recursos visuales. Las animaciones existentes permanecen. Los ajustes de layout se limitan a los breakpoints móviles/tablet existentes. Se mantuvieron las páginas estáticas y sus metadatos como respaldo; la navegación normal ya no abre otra interfaz.

## Archivos modificados (rutas relativas a la raíz pública)

- styles.css: menú desplazable, límite dinámico, bloqueo de fondo y tamaños del formulario móvil.
- seo-pages.css: corrección de grids, marco del logo, botones, navegación y cortes de texto largos.
- app.js: altura disponible del menú, navegación de servicios y compatibilidad de idioma/modalidad para entradas antiguas.
- index.html: destinos internos y modalidad asociada a enlaces de servicios.
- es/nosotros/index.html
- en/about/index.html
- es/diseno-web/index.html
- en/web-design/index.html
- es/reservas-online/index.html
- en/online-booking/index.html
- es/desarrollo-web-personalizado/index.html
- en/custom-web-development/index.html

En esas ocho páginas solo se añadió la carga de navigation.js al comienzo del head. Su texto se conserva.

## Archivos nuevos

- navigation.js: compatibilidad de las ocho direcciones antiguas con una sola landing.
- tests/verify-responsive.mjs: comprobaciones de navegación, configuración y reglas esenciales.
- tests/resultados-responsive-2026-11-16.json: mediciones de Chrome de esta entrega.
- CORRECCION_RESPONSIVE_2026-11-16.md: este informe.

No se eliminó ningún archivo. La documentación anterior describe versiones previas; este documento tiene prioridad para esta actualización.

## Pruebas efectuadas

- Chrome real: ocho páginas estáticas de respaldo × seis anchos útiles exactos: 320, 360, 375, 390, 414 y 768 px. En las 48 mediciones, scrollWidth = clientWidth. Se usaron copias locales de QA sin activar la navegación de compatibilidad; no se incluyen esas copias en el ZIP.
- Landing ES y EN × los mismos seis anchos: otras 12 mediciones aprobadas. Los campos del formulario están dentro del ancho disponible.
- Navegación real desde las ocho entradas antiguas: landing correcta, idioma ES/EN y modalidad Booking/Custom cuando corresponde.
- Menú en viewport de 220 px de alto: scroll interno 191 px; desplazamiento de la página de fondo 0 px. Último enlace accesible. También se revisó el menú completo a altura normal.
- Apertura/cierre, cierre al seleccionar un enlace, Escape, selector de idiomas y navegación a Inicio: aprobados.
- Botones de presupuesto Custom y Booking: selección del servicio verificada. Campos vacíos: mensajes y marcas de validación. No se enviaron consultas reales.
- Comparación geométrica escritorio: 15 elementos de la página Nosotros a 1440 px (secciones, títulos, marco y botones) idénticos antes/después.
- Suites existentes verify-analytics, verify-catalog, verify-form, verify-motion-catalog, verify-navigation, verify-seo y verify.mjs: aprobadas. verify-responsive: aprobada. verify-demos: SKIP, porque aquí no están los fuentes de los repositorios de demos.
- Consola: no se observaron errores propios de la aplicación; el navegador de QA reporta errores de su extensión ajenos al sitio.
- ZIP: archivos completos y CRC verificados.

Pendiente: teléfono físico, Safari/iOS y comprobación posterior al despliegue real. Las pruebas móviles se realizaron con viewport de Chrome mediante iframe, no emulación de un teléfono físico. Las pruebas de correo y analíticas usan transportes simulados en sus suites; no acreditan entrega real de un correo.

## Actualizar GitHub y Cloudflare

1. Guardar un commit/copia de respaldo del repositorio oficial de VYB.
2. Extraer el ZIP y copiar su contenido a la raíz pública existente, reemplazando los archivos de la lista y agregando navigation.js. Mantener las carpetas es/ y en/ con sus rutas exactas. No borrar configuración de Cloudflare, wrangler o workflows que ya tenga tu repositorio: no estaban en el ZIP original.
3. No requiere npm install ni compilación. Si el despliegue actual ejecuta node tools/prepare.mjs, conservarlo; la herramienta mantiene los enlaces internos de esta entrega.
4. Hacer commit. Si Cloudflare está conectado al repositorio, esperar al despliegue de la rama configurada. Conservar el comando y directorio de publicación vigentes; este paquete no cambia el hosting.
5. Recargar con Ctrl+F5 y comprobar Inicio, Nosotros, Presupuesto, menú y ambas lenguas. Probar también /es/nosotros y /en/about: deben conducir a la misma landing con idioma correspondiente.

## Probar en Windows PowerShell

```powershell
Expand-Archive -LiteralPath "$HOME\Downloads\VYB_WEB_RESPONSIVE_NAVEGACION_UNIFICADA_2026-11-16.zip" -DestinationPath "$HOME\Downloads\VYB-Responsive-2026-11-16"
Set-Location "$HOME\Downloads\VYB-Responsive-2026-11-16"
py -m http.server 8104 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8104/ y mantener la consola abierta. Detener con Ctrl+C.

Pruebas opcionales con Node:

```powershell
node .\tests\verify-responsive.mjs
node .\tests\verify-seo.mjs
node .\tests\verify-form.mjs
```
