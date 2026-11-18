# GameForge
> Plataforma web para conectar creadores, exhibir proyectos independientes y forjar equipos de desarrollo de videojuegos.

---

## Que es GameForge
GameForge es un espacio digital disenado para la comunidad de desarrollo indie. Permite a programadores, artistas 2D y 3D, musicos y diseñadores mostrar sus creaciones en cualquier etapa de desarrollo y encontrar colaboradores con habilidades complementarias.

---

## Caracteristicas Principales
- Catalogo Interactivo: Fichas de videojuegos con portadas, estado de desarrollo (Alpha, Beta, Prototipo), porcentaje de avance y motor grafico (Godot, Unity, Unreal Engine, Phaser).
- Busqueda y Filtros en Tiempo Real: Filtra al instante por nombre, motor, genero o rol que el equipo necesita reclutar.
- Publicar Proyectos: Modal interactivo para subir nuevos juegos con validacion de datos.
- Sistema de Colaboracion: Postulacion directa para unirse al equipo de un juego enviando contacto, rol y enlace a portafolio.
- Cambiador de Temas de Color: 5 paletas visuales intercambiables en vivo desde el navbar (Cyber Violeta, Matrix Esmeralda, Sunset Neon, Oceano Cian y Modo Claro).
- Persistencia con localStorage: Todo lo que agregas o editas se guarda automaticamente en la memoria del navegador sin necesidad de servidores de base de datos externos.

---

## Tecnologias Empleadas
- HTML5: Estructura semantica accesible (header, nav, main, section, article, modales y formularios).
- CSS3: Diseno responsivo para moviles y escritorio, variables CSS para los temas de color dinamicos, grid, flexbox y efectos visuales.
- JavaScript Moderno (ES Modules):
  - js/proyectoService.js: Capa de datos desacoplada, operaciones de consulta, filtrado dinamico y persistencia local en el storage.
  - js/proyecto.js: Manipulacion del DOM, eventos en vivo, notificaciones flotantes (Toast) y control de modales.

---

## Como Ejecutar el Proyecto

### Opcion 1: Con el servidor local (Recomendado)
Ejecuta en tu terminal desde la raiz del proyecto:
```bash
node server.js
```
Abre en tu navegador: http://localhost:5500

### Opcion 2: Directo en el navegador
Abre directamente el archivo `index.html` en cualquier navegador (o usa la extension Live Server de VS Code).

---

## Estructura de Archivos
```text
GameForge/
├── css/
│   └── style.css            # Estilos, efectos neón y temas de color
├── js/
│   ├── proyecto.js          # Controlador de interfaz, eventos y modales
│   └── proyectoService.js   # Manejo de datos y almacenamiento en localStorage
├── index.html               # Pagina principal (HTML5 semantico)
├── server.js                # Servidor local en Node.js (puerto 5500)
└── README.md                # Documentacion del proyecto
```
