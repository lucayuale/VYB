# Indicador activo del menú

Se eliminó la línea dorada permanente de Presupuesto. Todos los enlaces usan el mismo indicador, activado por aria-current según la sección visible. Pasar el mouse no crea una segunda línea; el foco por teclado conserva su contorno accesible.

Reemplazar styles.css, app.js y motion.css en la raíz del repositorio. El resto del proyecto conserva las animaciones y el catálogo compacto. No requiere instalación ni compilación.

Pruebas: node --check app.js; node tests/verify-navigation.mjs; node tests/verify-motion-catalog.mjs. Corrección validada por pruebas automáticas; revisión visual en navegador pendiente.
