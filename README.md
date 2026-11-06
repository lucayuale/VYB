# VYB — Web oficial optimizada, 6 de noviembre de 2026

Esta carpeta es la web oficial estática actual, no una restauración de la v4 histórica. Conserva los siete enlaces, identidad oscura/dorada, logo, animaciones, planes Basic/Booking/Custom, formulario activo configurado e inglés inicial con preferencia EN/ES guardada. No se añadieron precios, testimonios, clientes ni garantías.

## Abrir en Windows

Extraer el ZIP completo. Desde PowerShell, si descargaste el paquete de la web oficial en Descargas:

```powershell
Expand-Archive -LiteralPath "$HOME\Downloads\VYB_WEB_OFICIAL_LISTA_PARA_GITHUB_2026-11-06.zip" -DestinationPath "$HOME\Downloads\VYB_WEB_OFICIAL_2026-11-06"
Set-Location "$HOME\Downloads\VYB_WEB_OFICIAL_2026-11-06"
py -m http.server 8096 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8096/ y dejar la consola abierta. Ctrl+C detiene el servidor. No abrir desde el ZIP. Si el puerto está ocupado, cambiarlo también en el navegador.

## Generación y pruebas

El sitio se publica directamente desde esta raíz: **no requiere npm, dist ni compilación**. Se agregó una herramienta liviana para actualizar el HTML inicial inglés y los metadatos desde la configuración/textos vigentes. Después de cambiar esos datos:

```powershell
node .\tools\prepare.mjs
node .\tests\verify.mjs
node .\tests\verify-form.mjs
node .\tests\verify-analytics.mjs
```

Node.js 20+ recomendado. Sin dependencias adicionales. `prepare.mjs` es idempotente y no borra directorios. No usar el build de la v4 histórica para generar esta versión: retrocedería al contenido antiguo.

`verify-demos.mjs` revisa las cinco fuentes adjuntas cuando existe la carpeta hermana `02_DEMOS`. Desde este ZIP independiente informa SKIP explícitamente; desde el paquete completo valida las 17 páginas. No copia ni mezcla proyectos.

## Configuración

- `config.js`: SEO/canonical, correo y Formspree, siete demos, categorías, Instagram vacío, estadísticas opcionales.
- `content.js`: textos y traducciones actuales; `app.js`: navegación, catálogo, comparación, idioma y textos heredados.
- `form.js`: validación y envío configurable, errores, timeout, estado pendiente y selección desde planes.
- `analytics.js`: integración opcional y eventos con propiedades limitadas, desactivados por defecto.
- `index.html`, `styles.css`, `assets/`: presentación y recursos.

Editar fuentes actuales, ejecutar prepare si cambian textos/configuración y volver a probar. La preferencia `vyb-language` se guarda localmente; no hay detección por país. Datos inválidos guardados no cambian el inglés predeterminado. Para revisar primera visita usar un perfil nuevo o borrar solo esa preferencia.

## Formulario y correo

Se conserva el correo `vybstudydesign@gmail.com` y el identificador público de Formspree ya configurado `mjyyzaly`. No son contraseñas. No se cambió el destinatario del panel ni se creó otra cuenta. El campo `recipientConfirmed` refleja la configuración recibida, **no una verificación nueva del proveedor**.

La configuración activa se encuentra en `contact.form`. El navegador solo acepta el endpoint oficial construido desde un ID alfanumérico. Cuenta con honeypot, validación de campos, bloqueo de doble envío, espera máxima de 15 segundos, manejo de HTTP 429, fallos y desconexión. Si el proveedor responde positivamente, se comunica aceptación para envío, no entrega garantizada en correo.

El formulario queda inerte hasta iniciar JavaScript para evitar envíos accidentales sin validación; el correo directo sigue disponible en el HTML. Los datos no se guardan en localStorage. El formulario no tiene base propia; Formspree aplica sus condiciones y retención. Su política de privacidad está enlazada.

Antes de utilizar campañas: revisar en el panel de Formspree el destinatario, cuotas, dominio autorizado, antispam y requisitos de CAPTCHA. Si el proveedor exige un desafío, debe configurarse su flujo oficial; no se añadió ni se desactivó un CAPTCHA. Hacer una consulta real controlada y confirmar recepción/spam. Esta entrega no envió consultas reales ni confirma entrega de correo.

## Catálogo e incidencia de Bodas

Los siete enlaces permanecen exactamente iguales. Las cinco capturas existentes se conservan con carga diferida y decodificación asíncrona. Mecánica y Bodas usan las ilustraciones existentes; no se inventaron capturas o proyectos.

**Incidencia detectada:** `https://lucayuale.github.io/Boda-demo/` publica una página de taller mecánico titulada “Tu Taller”, no la demo de bodas. Se comprobó por HTTP y en navegador. Se mantuvo el enlace y se agregó una advertencia bilingüe en la tarjeta para no presentarlo engañosamente. Corregir la publicación de ese repositorio cuando estén disponibles sus fuentes reales. No se desarrolló una demo nueva.

La configuración de cada proyecto sigue centralizada. Para modificar una tarjeta editar el objeto correspondiente: nombre, categoría, descripción ES/EN, URL y captura. `notice` permite mostrar avisos bilingües. No inventar URLs. Todos los enlaces externos de las tarjetas utilizan otra pestaña y rel seguro.

## Publicar manualmente

Ver `PUBLICAR_GITHUB.md`. El ZIP oficial contiene archivos de raíz para el repositorio que alimenta al Worker actual; su nombre y configuración de CI no estaban incluidos. Conservar los archivos de despliegue existentes (`wrangler`, workflows, bindings) y no sustituirlos por los de la v4 histórica. El paquete no modifica repositorios ni despliega por sí solo.
