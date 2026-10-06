# GameForge

GameForge es una plataforma web para desarrolladores y estudios de videojuegos. El objetivo es que profesionales y equipos muestren capacidades, proyectos y experiencia, y que personas de distintas áreas de la industria puedan conectarse.

## Primer avance

Este avance entrega la página de entrada estática. No hay servidor, base de datos ni directorios. El sitio se compone de tres archivos en `public/` y se abre en el navegador.

### Alcance

- Página única con encabezado, bloque de bienvenida y pie.
- Estilos propios, sin framework ni librerías.
- El botón **Explorar** responde en el cliente con un aviso.

Queda fuera de este avance el registro de usuarios, los perfiles, los proyectos y cualquier guardado de datos.

### Estructura

```text
public/
  index.html    Página
  styles.css    Presentación
  app.js        Comportamiento del botón
```

### Tecnologías

| Capa | Uso |
| --- | --- |
| HTML | Estructura semántica: `header`, `main`, `section`, `footer` |
| CSS | Restablecimiento básico, colores, centrado del bloque principal y botón |
| JavaScript | Un listener sobre `#exploreButton` |

El documento declara `lang="en"`, aunque el texto visible está en español. La hoja de estilos y el script se enlazan con rutas relativas (`styles.css` y `app.js`), así que deben permanecer junto a `index.html`.

### Interfaz

`index.html` organiza la pantalla en tres zonas:

1. **Encabezado.** Título `GameForge` y la línea «Plataforma para desarrolladores de videojuegos».
2. **Principal.** Sección `.hero` con el saludo, un párrafo de conexión entre roles de la industria y el botón `#exploreButton`.
3. **Pie.** Año 2026 y la reserva de derechos.

`styles.css` aplica un fondo `#111827`, texto blanco y barras `#1f2937` en encabezado y pie. El contenido principal se centra y el texto del bloque de bienvenida queda limitado a 700px. `main` usa `flex: 1`, pero `body` no es un contenedor flex, así que esa regla todavía no estira la página.

### Comportamiento

`app.js` obtiene el botón por id y registra un `click`. Al pulsarlo, el navegador muestra el aviso `Explorando la plataforma...`. No cambia de ruta ni consulta ningún recurso.

Si el botón no existe en el HTML, `getElementById` devuelve `null` y la siguiente llamada a `addEventListener` lanza un error. En la página actual el id sí está presente.

### Cómo abrirlo

Desde la carpeta `public`, sirve los archivos y abre la raíz:

```powershell
python -m http.server 5500
```

La página queda en http://127.0.0.1:5500/.

También puede abrirse `public/index.html` directamente en el navegador. El aviso del botón funciona en ambos casos porque no depende de un servidor.
