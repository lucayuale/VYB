# Corrección del indicador del menú

El indicador anterior conservaba la última sección pasada incluso fuera de ella. Ahora solo marca la sección que está debajo del encabezado y se recalcula al desplegar el catálogo, cambiar idioma o modificar el tamaño de la ventana. Se evita el hover persistente en pantallas táctiles.

Reemplazar `app.js` y `motion.css`. El ZIP también contiene el proyecto completo. No requiere compilación.

Prueba: `node tests/verify-navigation.mjs`. Validación automatizada aprobada; esta corrección no se comprobó en navegador.
