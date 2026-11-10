# VYB — Incorporación de Fiverr (10/11/2026)

Esta actualización agrega a la web oficial un enlace al primer servicio publicado de VYB en Fiverr:

https://www.fiverr.com/s/odWEb28

## Qué se modificó

- `index.html`: sección destacada "VYB también está en Fiverr" antes de Contacto; botón para abrir el Gig en otra pestaña; enlace discreto en el pie de página.
- `styles.css`: estilos oscuros/dorados, composición responsive y estados de los enlaces.
- `content.js`: textos español/inglés para la sección y para su accesibilidad.
- `tests/verify.mjs`: comprobaciones de los dos enlaces, traducciones y atributos seguros de los enlaces externos.
- `README.md`: esta nota de actualización.
- `CAMBIOS_FIVERR_GITHUB.md`: instrucciones de publicación.

No se cambiaron `config.js`, `app.js`, `form.js`, `analytics.js`, las imágenes, los enlaces de las diez demos ni la configuración de publicación de Cloudflare.

## Subir a GitHub

1. Confirmar que estás en el repositorio que publica la **web oficial de VYB**, no en los repositorios individuales de las demos.
2. Guardar un respaldo del estado actual o dejar un commit identificable.
3. Descomprimir este ZIP. Su raíz contiene directamente `index.html`, `styles.css`, `content.js` y el resto de archivos del sitio; **no crear una carpeta `VYB-main` adicional en GitHub**.
4. Desde **Add file → Upload files**, subir los archivos modificados (`index.html`, `styles.css`, `content.js`, `README.md`, `tests/verify.mjs`) y agregar `CAMBIOS_FIVERR_GITHUB.md`.
5. Hacer **Commit changes**. Mantener sin cambios los archivos y la configuración existente de GitHub Actions, Cloudflare, Worker o Pages que no estén en el ZIP.
6. Esperar a que termine el despliegue que ya tengas configurado. Si no existe un despliegue automático, seguir tu procedimiento habitual de publicación.
7. Abrir https://vyb.vybstudydesign.workers.dev/ en una pestaña privada. Verificar la sección de Fiverr, el idioma inglés y español, la navegación móvil, las demos y el formulario existente sin enviar una consulta real por accidente.

## Pruebas opcionales antes de publicar

Con Node.js 20 o superior, dentro de la carpeta descomprimida:

```bash
node tests/verify.mjs
node tests/verify-catalog.mjs
node tests/verify-form.mjs
node tests/verify-analytics.mjs
```

No requiere instalación de paquetes ni compilación. Los enlaces de Fiverr abren la página externa con `target="_blank"` y `rel="noopener noreferrer"`.

**Importante:** este ZIP no realiza cambios en GitHub, Fiverr ni Cloudflare por sí mismo. El servicio de Fiverr y la gestión de sus pedidos permanecen en la plataforma Fiverr; el formulario de presupuesto propio de VYB sigue siendo un canal independiente.
