# Pruebas y límites

## Ejecutadas

- Sintaxis `app.js` y `motion.js`: PASS.
- `node tools/prepare.mjs`: PASS. HTML inicial EN y metadatos preparados.
- Suites existentes: verify-analytics, verify-catalog, verify-form, verify-seo y verify: PASS. Formulario y fallos de transporte probados con mocks; no se envió correo real.
- Nueva suite verify-motion-catalog: PASS. Configuración comercial completa idéntica a la base, diez demos y controles bilingües.
- verify-demos: SKIP explícito, pues este repositorio contiene enlaces a demos externas, no sus fuentes. No se afirma haber probado internamente sus reservas.
- Chrome: expansión real 2/4/6/8/10 y contracción a 2 con Enter; filtro Fitness muestra una tarjeta y oculta la flecha; All restaura dos. Contador y botón se traducen a ES. PASS.
- Persistencia de idioma: cambio ES/EN y recarga mantienen la selección. Primera visita sin preferencia usa EN. PASS.
- Seis contenedores responsive: 320, 375, 390, 768, 1024 y 1440 px, con dos demos visibles y sin desbordamiento horizontal. Área útil 15 px menor donde aparece barra vertical.
- Menú móvil: apertura real y cierre con Escape antes de abandonar el foco del iframe. PASS.
- Modalidades: Booking selecciona la presentación correcta; presupuesto Personalizada preselecciona `custom` en el formulario. Envío vacío muestra mensaje de validación. No se enviaron datos externos.
- Fixture local de movimiento reducido (forzando la rama JS y las reglas CSS equivalentes): cero elementos pendientes, logo sin animación y contenido visible. Sin JS: hero visible y sin controles ficticios del catálogo. Las fixtures no se incluyen en la entrega.
- No se observaron errores de aplicación. El navegador de pruebas informa errores propios de su extensión, ajenos a la página.
- Configuración, estilos anteriores, fotos y ocho páginas SEO comparados byte por byte con el ZIP base. Sin modificaciones.
- Integridad CRC y contenido del ZIP comprobados.

## Pendientes

- Revisión en Safari/iOS y un Android físico: las pruebas responsive se realizaron con Chrome y contenedores de distintos anchos.
- Preferencia nativa del sistema operativo para movimiento reducido: se validó por fixture equivalente, no cambiando la configuración del sistema.
- Entrega real por Formspree y publicación en la URL pública: no ejecutadas. Se mantiene el proveedor existente.
- No se realizó auditoría Lighthouse ni se afirma una puntuación. No se incorporaron dependencias, fuentes ni recursos remotos nuevos.
