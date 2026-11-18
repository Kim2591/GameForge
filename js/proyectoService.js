// ============================================================================
// GAMEFORGE - Servicio de Proyectos (proyectoService.js)
// Aca manejamos todos los datos de los juegos, el guardado en localStorage y los filtros
// ============================================================================

// Esta es la clave con la que guardamos la lista de juegos en el navegador
const STORAGE_KEY = 'gameforge_proyectos_v1';

// Estos son los juegos de prueba iniciales para que la pagina arranque con contenido y no se vea vacia
const PROYECTOS_INICIALES = [
  {
    id: 'gf-1',
    titulo: 'Neon Samurai: Cyber Blade',
    slug: 'neon-samurai',
    genero: 'Acción / Roguelike',
    motor: 'Godot Engine 4',
    estado: 'Alpha Jugable',
    descripcionCorta: 'Hack & slash 2D con ritmo acelerado ambientado en una metrópolis cyberpunk decadente.',
    descripcionLarga: 'Neon Samurai combina el combate preciso de esgrima tradicional japonesa con reflejos cibernéticos en un entorno neo-Tokyo pixel-art de 32 bits. El jugador debe esquivar balas de plasma, bloquear con parries precisos y desentrañar la conspiración de una megacorporación que controla la mente colectiva.',
    portada: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    autor: 'Kitsune Studio (Dani & Kevin)',
    contacto: 'contact@kitsunestudio.dev',
    rolesBuscados: ['Pixel Artist', 'Compositor Synthwave'],
    progreso: 65,
    destacado: true,
    etiquetas: ['2D', 'Pixel Art', 'Cyberpunk', 'Fast-Paced'],
    fechaCreacion: '2026-10-15',
    colaboraciones: [
      { remitente: 'Elena Rostova', rol: 'Pixel Artist', estado: 'Aceptada' }
    ]
  },
  {
    id: 'gf-2',
    titulo: 'Chronos of the Forgotten Realm',
    slug: 'chronos-realm',
    genero: 'RPG Táctico',
    motor: 'Unity',
    estado: 'Beta Cerrada',
    descripcionCorta: 'RPG por turnos con mecánicas de manipulación temporal y elecciones morales profundas.',
    descripcionLarga: 'Ambientado en un archipiélago flotante destruido por una catástrofe arcana, Chronos te permite rebobinar turnos, predecir ataques enemigos y alterar líneas de tiempo. Cuenta con combates en cuadrícula isométrica y un sistema dinámico de relaciones entre personajes.',
    portada: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    autor: 'Aethelgard Guild',
    contacto: 'aethelgard@indiegames.org',
    rolesBuscados: ['Diseñador de Niveles', 'Programador C#'],
    progreso: 80,
    destacado: true,
    etiquetas: ['RPG', 'Isométrico', 'Estrategia', 'Fantasía'],
    fechaCreacion: '2026-09-20',
    colaboraciones: []
  },
  {
    id: 'gf-3',
    titulo: 'Whispers in Sector 9',
    slug: 'whispers-sector-9',
    genero: 'Terror Psicológico',
    motor: 'Unreal Engine 5',
    estado: 'Prototipo',
    descripcionCorta: 'Survival horror en primera persona en una estación minera abandonada en una luna congelada.',
    descripcionLarga: 'Con iluminación hiperrealista mediante Lumen y audio binaural 3D inmersivo, Whispers in Sector 9 sumerge al jugador en el silencio helado del espacio donde el oxígeno escasea y las sombras responden a tus latidos cardíacos mediante monitores biométricos.',
    portada: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    autor: 'VoidCraft Games',
    contacto: 'team@voidcraft.io',
    rolesBuscados: ['Artista 3D / Modeler', 'Sound Designer (Foley)'],
    progreso: 35,
    destacado: false,
    etiquetas: ['3D', 'Sci-Fi', 'Horror', 'UE5'],
    fechaCreacion: '2026-11-01',
    colaboraciones: []
  },
  {
    id: 'gf-4',
    titulo: 'Goblincraft: Tiny Workshop',
    slug: 'goblincraft-workshop',
    genero: 'Simulación / Cozy',
    motor: 'Godot Engine 4',
    estado: 'Alpha Jugable',
    descripcionCorta: 'Juego relajante de gestión y forja mágica administrado por una simpática familia goblin.',
    descripcionLarga: 'Atiende a caballeros despistados, hechiceros exigentes y aventureros novatos forjando espadas con runas elementales. Personaliza tu taller con decenas de decoraciones artesanales y cocina bocadillos para mantener a tus aprendices felices.',
    portada: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    autor: 'Rustic Pixels',
    contacto: 'rustic@pixels.dev',
    rolesBuscados: ['Traductor / Localizador', 'Ilustrador 2D'],
    progreso: 50,
    destacado: false,
    etiquetas: ['Cozy', 'Crafting', '2D', 'Casual'],
    fechaCreacion: '2026-10-28',
    colaboraciones: []
  },
  {
    id: 'gf-5',
    titulo: 'AeroGlide: Sky Circuits',
    slug: 'aeroglide-circuits',
    genero: 'Carreras Arcade',
    motor: 'Unity',
    estado: 'Beta Pública',
    descripcionCorta: 'Carreras antigravitatorias a velocidades ultrasónicas en pistas suspendidas en las nubes.',
    descripcionLarga: 'Inspirado en clásicos como Wipeout y F-Zero, AeroGlide presenta física fluida a 60 FPS, naves personalizables con turbos iónicos y pistas llenas de giros en espiral y saltos vertiginosos a través de ciudades flotantes.',
    portada: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    autor: 'HyperVelocity Interactive',
    contacto: 'info@hypervelocity.net',
    rolesBuscados: ['Tester QA', 'Especialista en VFX'],
    progreso: 85,
    destacado: true,
    etiquetas: ['Arcade', 'Racing', 'Sci-Fi', 'Multijugador'],
    fechaCreacion: '2026-08-12',
    colaboraciones: []
  },
  {
    id: 'gf-6',
    titulo: 'Lumina: Forgotten Echo',
    slug: 'lumina-echo',
    genero: 'Plataformas Puzzle',
    motor: 'Phaser / JS',
    estado: 'Prototipo',
    descripcionCorta: 'Manipula haces de luz y prismas espectrales para cruzar un templo ancestral sumergido.',
    descripcionLarga: 'Un juego web ligero pero mecánicamente profundo creado con HTML5 Canvas y Phaser. Cada nivel desafía el ingenio del jugador refractando luces de colores primarios para activar antiguos mecanismos de cristal y devolver la energía al templo.',
    portada: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80',
    autor: 'PixelForge Labs',
    contacto: 'devlab@pixelforge.io',
    rolesBuscados: ['Diseñador de Puzzles', 'Músico Ambiental'],
    progreso: 40,
    destacado: false,
    etiquetas: ['Web', 'Canvas', 'Puzzle', 'Minimalista'],
    fechaCreacion: '2026-11-05',
    colaboraciones: []
  }
];

class ProyectoService {
  constructor() {
    // Al instanciar el servicio verificamos si ya hay datos guardados o si metemos los iniciales
    this._initStorage();
  }

  // Si es la primera vez que entra a la web, inicializamos el localStorage con los 6 juegos base
  _initStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(PROYECTOS_INICIALES));
      }
    } catch (e) {
      console.warn('Ojo: no se pudo acceder al localStorage, usando datos en memoria', e);
    }
  }

  // Devuelve la lista completa de proyectos guardados (los parsea de string a JSON)
  obtenerTodos() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : PROYECTOS_INICIALES;
    } catch (e) {
      return PROYECTOS_INICIALES;
    }
  }

  // Busca un proyecto por id (lo usamos cuando alguien toca el boton "Detalles" o "Colaborar")
  obtenerPorId(id) {
    const proyectos = this.obtenerTodos();
    return proyectos.find(p => p.id === id) || null;
  }

  // Agrega un nuevo juego creado desde el modal
  crearProyecto(nuevoProyecto) {
    const proyectos = this.obtenerTodos();
    
    // Le armamos un id unico con timestamp y formateamos roles y tags
    const proyectoCreado = {
      ...nuevoProyecto,
      id: 'gf-' + Date.now(),
      fechaCreacion: new Date().toISOString().split('T')[0],
      progreso: Number(nuevoProyecto.progreso) || 20,
      rolesBuscados: Array.isArray(nuevoProyecto.rolesBuscados) 
        ? nuevoProyecto.rolesBuscados 
        : nuevoProyecto.rolesBuscados.split(',').map(r => r.trim()).filter(Boolean),
      etiquetas: Array.isArray(nuevoProyecto.etiquetas) 
        ? nuevoProyecto.etiquetas 
        : (nuevoProyecto.etiquetas ? nuevoProyecto.etiquetas.split(',').map(t => t.trim()).filter(Boolean) : ['Indie', 'Prototipo']),
      colaboraciones: []
    };

    // Si el usuario no pego ninguna foto de portada, le ponemos una por defecto para que no quede rota
    if (!proyectoCreado.portada || !proyectoCreado.portada.startsWith('http')) {
      proyectoCreado.portada = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
    }

    // Metemos el juego al principio de la lista para que se vea de primero
    proyectos.unshift(proyectoCreado);
    this._guardar(proyectos);
    return proyectoCreado;
  }

  // Registra una solicitud de alguien que quiere unirse al equipo de un juego
  solicitarColaboracion(proyectoId, datosColaborador) {
    const proyectos = this.obtenerTodos();
    const index = proyectos.findIndex(p => p.id === proyectoId);
    if (index === -1) return false;

    if (!proyectos[index].colaboraciones) {
      proyectos[index].colaboraciones = [];
    }

    // Guardamos quien se postulo con fecha y estado pendiente
    proyectos[index].colaboraciones.push({
      ...datosColaborador,
      id: 'colab-' + Date.now(),
      fecha: new Date().toISOString(),
      estado: 'Pendiente'
    });

    this._guardar(proyectos);
    return true;
  }

  // Esta funcion hace toda la magia del filtrado en tiempo real
  filtrar({ busqueda = '', motor = 'todos', genero = 'todos', rol = 'todos' }) {
    const proyectos = this.obtenerTodos();
    const q = busqueda.trim().toLowerCase();

    return proyectos.filter(p => {
      // Revisa si coincide con el titulo, resumen, autor o tags
      const matchBusqueda = !q || 
        p.titulo.toLowerCase().includes(q) ||
        p.descripcionCorta.toLowerCase().includes(q) ||
        p.autor.toLowerCase().includes(q) ||
        p.etiquetas.some(t => t.toLowerCase().includes(q));

      // Filtro de motor
      const matchMotor = motor === 'todos' || p.motor.toLowerCase().includes(motor.toLowerCase());

      // Filtro de genero
      const matchGenero = genero === 'todos' || p.genero.toLowerCase().includes(genero.toLowerCase());

      // Filtro de rol
      const matchRol = rol === 'todos' || p.rolesBuscados.some(r => r.toLowerCase().includes(rol.toLowerCase()));

      return matchBusqueda && matchMotor && matchGenero && matchRol;
    });
  }

  // Boton de panico por si quieren resetear todo y volver a los 6 juegos iniciales
  reiniciarDatos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PROYECTOS_INICIALES));
    return PROYECTOS_INICIALES;
  }

  // Metodo interno para guardar en el localStorage sin repetir codigo
  _guardar(proyectos) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(proyectos));
    } catch (e) {
      console.error('Error al guardar en el storage del navegador', e);
    }
  }
}

// Exportamos la instancia para usarla en proyecto.js
export const proyectoService = new ProyectoService();
