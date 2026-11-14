# Agustín Barroso · Web liviana v2

Español predeterminado, inglés seleccionable. El dosier se usó como referencia y no se incluye. Fotografías, trayectoria, galería y propuestas integradas en la web.

Extraer este ZIP. Abrir PowerShell en la carpeta extraída:

```powershell
py -m http.server 8102 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8102/ . Detener con Ctrl+C.

Para GitHub Pages subir index.html, styles.css, app.js, config.js, assets/ y .nojekyll a la raíz de la rama publicada. No requiere Node ni instalación npm. No se publicó ningún repositorio automáticamente.

## Actualización de animaciones

Ver `CAMBIOS_ANIMACIONES.md` para las rutas exactas de reemplazo y `PRUEBAS_ANIMACIONES.md` para resultados y pendientes. No requiere dependencias ni compilación. El ZIP original no se modificó.

### Probar en Windows PowerShell

```powershell
Expand-Archive -LiteralPath "$HOME\Downloads\BARROSO_WEB_IMPACTO_Y_RECORDS_v2.zip" -DestinationPath "$HOME\Downloads\Barroso-Impacto-v2"
Set-Location "$HOME\Downloads\Barroso-Impacto-v2"
py -m http.server 8096 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:8096/`. Mantener la consola abierta. Detener con Ctrl+C.

Verificación opcional, si tenés Node.js:

```powershell
Set-Location "$HOME\Downloads\Barroso-Impacto-v2"
node .\tests\verify-motion.mjs
```

Para publicar, subir los archivos extraídos a la raíz del repositorio de Barroso, conservando la carpeta `assets`. No hay ningún comando de build.

### Novedades v2

Ver `NOVEDADES_V2.md`: entrada cinematográfica, trazo del apellido, composición de fotos y estadísticas con desplazamiento horizontal y botón de pausa.

## Correcciones v3 — usar esta entrega

Incluye asesorías, cinco videos optimizados, métricas y las animaciones anteriores. Ver `ACTUALIZACION_CORRECCIONES.md` para archivos y pruebas. Español predeterminado, EN seleccionable y guardado.

```powershell
Expand-Archive -LiteralPath "$HOME\Downloads\BARROSO_WEB_CORRECCIONES_Y_VIDEOS_v3.zip" -DestinationPath "$HOME\Downloads\Barroso-Correcciones-v3"
Set-Location "$HOME\Downloads\Barroso-Correcciones-v3"
py -m http.server 8103 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8103/ . No requiere compilación ni dependencias. Para actualizar GitHub, extraer y subir los archivos de la tabla de ACTUALIZACION_CORRECCIONES.md a la raíz del repositorio de Barroso, incluyendo assets/videos/. Conservar styles.css, motion.css y assets/ existentes (también incluidos). Usar Ctrl+F5 después de publicar. No modificar el repositorio oficial de VYB.
