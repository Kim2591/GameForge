// ============================================================================
// GAMEFORGE - Controlador de la vista (proyecto.js)
// Aca manejamos los clics, modales, cambio de color de la pagina y la busqueda
// ============================================================================

import { proyectoService } from '../services/proyectoService.js';

// Guardamos el estado de los filtros seleccionados
let filtrosActuales = {
  busqueda: '',
  motor: 'todos',
  genero: 'todos',
  rol: 'todos'
};

// Guardamos aca el juego que el usuario abrio en el modal de detalles o colaborar
let proyectoSeleccionado = null;

// Agarramos los elementos principales del DOM
const gridProyectos = document.getElementById('proyectos-grid');
const contadorProyectos = document.getElementById('contador-proyectos');
const buscadorInput = document.getElementById('buscador-proyectos');
const selectMotor = document.getElementById('filtro-motor');
const selectGenero = document.getElementById('filtro-genero');
const selectRol = document.getElementById('filtro-rol');
const chipsFiltro = document.querySelectorAll('.chip-filtro');

// Modales flotantes
const modalDetalles = document.getElementById('modal-detalles');
const modalCrear = document.getElementById('modal-crear');
const modalColaborar = document.getElementById('modal-colaborar');

// Formularios
const formCrearProyecto = document.getElementById('form-crear-proyecto');
const formColaborar = document.getElementById('form-colaborar');

// Botones varios
const btnAbrirCrear = document.getElementById('btn-abrir-crear');
const btnHeroCrear = document.getElementById('btn-hero-crear');
const btnHeroExplorar = document.getElementById('btn-hero-explorar');
const btnResetDatos = document.getElementById('btn-reset-datos');

// Botones para cambiar el tema/color de la pagina
const botonesTema = document.querySelectorAll('.btn-color-punto');

// Cuando el HTML termina de cargar, arrancamos todo
document.addEventListener('DOMContentLoaded', () => {
  inicializarTemaColor();   // Cargamos el color que el usuario tenia guardado
  renderizarProyectos();    // Pintamos los juegos en pantalla
  configurarEventos();      // Activamos los botones y listeners
  actualizarMetricasHero(); // Actualizamos los contadores de arriba
});

// ============================================================================
// LOGICA PARA CAMBIAR EL COLOR/TEMA DE LA PAGINA
// ============================================================================
function inicializarTemaColor() {
  // Miramos si ya habia guardado un tema preferido, sino arrancamos con violeta
  const temaGuardado = localStorage.getItem('gameforge_tema') || 'violeta';
  aplicarTema(temaGuardado);

  // Le ponemos el evento click a cada bolita de color
  botonesTema.forEach(btn => {
    btn.addEventListener('click', () => {
      const tema = btn.dataset.tema;
      aplicarTema(tema);
      // Guardamos la eleccion del usuario para que se mantenga al recargar
      localStorage.setItem('gameforge_tema', tema);
      mostrarToast(`Tema cambiado a ${tema.toUpperCase()}`, 'info');
    });
  });
}

function aplicarTema(tema) {
  // Le cambiamos el atributo data-tema al body (en el CSS definimos las variables por tema)
  document.body.setAttribute('data-tema', tema);

  // Marcamos la bolita activa con el bordecito blanco
  botonesTema.forEach(b => {
    b.classList.toggle('activo', b.dataset.tema === tema);
  });
}

// ============================================================================
// CONFIGURACION DE EVENTOS Y CLICS
// ============================================================================
function configurarEventos() {
  // Buscador en vivo: cada vez que el usuario teclea una letra, filtramos
  if (buscadorInput) {
    buscadorInput.addEventListener('input', (e) => {
      filtrosActuales.busqueda = e.target.value;
      renderizarProyectos();
    });
  }

  // Desplegables de filtros
  if (selectMotor) {
    selectMotor.addEventListener('change', (e) => {
      filtrosActuales.motor = e.target.value;
      renderizarProyectos();
    });
  }

  if (selectGenero) {
    selectGenero.addEventListener('change', (e) => {
      filtrosActuales.genero = e.target.value;
      renderizarProyectos();
    });
  }

  if (selectRol) {
    selectRol.addEventListener('change', (e) => {
      filtrosActuales.rol = e.target.value;
      renderizarProyectos();
    });
  }

  // Botoncitos rapidos de motores (Todos, Godot, Unity, etc)
  chipsFiltro.forEach(chip => {
    chip.addEventListener('click', () => {
      chipsFiltro.forEach(c => c.classList.remove('activo'));
      chip.classList.add('activo');
      
      const motorSeleccionado = chip.dataset.motor || 'todos';
      filtrosActuales.motor = motorSeleccionado;
      if (selectMotor) selectMotor.value = motorSeleccionado;
      renderizarProyectos();
    });
  });

  // Botones para abrir el modal de publicar juego
  if (btnAbrirCrear) btnAbrirCrear.addEventListener('click', () => abrirModal(modalCrear));
  if (btnHeroCrear) btnHeroCrear.addEventListener('click', () => abrirModal(modalCrear));

  // Boton para scrollear suave hacia el catalogo
  if (btnHeroExplorar) {
    btnHeroExplorar.addEventListener('click', () => {
      document.getElementById('seccion-explorar').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Cerrar modales con la X o el boton de cancelar
  document.querySelectorAll('.modal-cerrar-btn, .modal-cancelar-btn').forEach(btn => {
    btn.addEventListener('click', cerrarTodosModales);
  });

  // Si tocan afuera de la cajita blanca/oscura del modal, tambien lo cerramos
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cerrarTodosModales();
    });
  });

  // Si presionan la tecla ESC cerramos cualquier modal abierto
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarTodosModales();
  });

  // Envio del formulario para registrar nuevo juego
  if (formCrearProyecto) {
    formCrearProyecto.addEventListener('submit', (e) => {
      e.preventDefault(); // evitamos que recargue la pagina completa
      procesarCrearProyecto();
    });
  }

  // Envio de solicitud de colaboracion
  if (formColaborar) {
    formColaborar.addEventListener('submit', (e) => {
      e.preventDefault();
      procesarColaboracion();
    });
  }

  // Boton para reiniciar datos demo si se descontrola la prueba
  if (btnResetDatos) {
    btnResetDatos.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres restaurar los juegos iniciales?')) {
        proyectoService.reiniciarDatos();
        renderizarProyectos();
        actualizarMetricasHero();
        mostrarToast('Juegos de prueba restaurados correctamente', 'info');
      }
    });
  }
}

// ============================================================================
// DIBUJAR LAS TARJETAS DE LOS JUEGOS EN EL GRID
// ============================================================================
function renderizarProyectos() {
  const proyectos = proyectoService.filtrar(filtrosActuales);

  // Actualizamos el contador de juegos que coinciden
  if (contadorProyectos) {
    contadorProyectos.textContent = `${proyectos.length} ${proyectos.length === 1 ? 'juego' : 'juegos'}`;
  }

  // Si no hay resultados mostramos un cartel simpatico para limpiar filtros
  if (proyectos.length === 0) {
    gridProyectos.innerHTML = `
      <div class="estado-vacio">
        <svg class="vacio-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">No se encontro ningun juego</h3>
        <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 1.5rem auto;">
          Prueba cambiando la busqueda o sacando algun filtro de motor o rol.
        </p>
        <button class="btn btn-secondary" id="btn-limpiar-filtros">Limpiar filtros</button>
      </div>
    `;

    const btnLimpiar = document.getElementById('btn-limpiar-filtros');
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', limpiarFiltros);
    }
    return;
  }

  // Generamos el HTML de cada tarjeta usando map y join
  gridProyectos.innerHTML = proyectos.map(p => crearTarjetaProyectoHTML(p)).join('');

  // Le agregamos los eventos click a los botones que acabamos de meter al DOM
  gridProyectos.querySelectorAll('.btn-ver-detalle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      abrirModalDetalles(id);
    });
  });

  gridProyectos.querySelectorAll('.btn-unirse-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      abrirModalColaborar(id);
    });
  });
}

// Esta funcion arma el pedacito de HTML de una sola tarjeta
function crearTarjetaProyectoHTML(p) {
  // Ajustamos el color segun el estado del juego
  const claseEstado = p.estado.toLowerCase().includes('alpha') ? 'estado-alpha' :
                      p.estado.toLowerCase().includes('beta') ? 'estado-beta' : 'estado-prototipo';

  // Si busca gente mostramos los roles, sino ponemos que el equipo esta completo
  const tagsRoles = p.rolesBuscados.length > 0
    ? p.rolesBuscados.map(rol => `<span class="rol-tag">🔍 ${rol}</span>`).join('')
    : '<span style="font-size: 0.72rem; color: var(--text-muted);">Equipo completo por ahora</span>';

  return `
    <article class="proyecto-card" data-id="${p.id}">
      <div class="card-imagen-wrapper">
        <img src="${p.portada}" alt="${p.titulo}" class="card-imagen" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'">
        <div class="card-badges-superiores">
          <span class="badge-motor">${p.motor}</span>
          <span class="badge-estado ${claseEstado}">${p.estado}</span>
        </div>
      </div>

      <div class="card-cuerpo">
        <span class="card-genero">${p.genero}</span>
        <h3 class="card-titulo">${p.titulo}</h3>
        <p class="card-descripcion">${p.descripcionCorta}</p>

        <div class="progreso-contenedor">
          <div class="progreso-header">
            <span>Avance del desarrollo</span>
            <span style="font-weight: 600; color: var(--text-primary);">${p.progreso}%</span>
          </div>
          <div class="barra-progreso">
            <div class="barra-relleno" style="width: ${p.progreso}%;"></div>
          </div>
        </div>

        <div class="roles-busqueda-box">
          <div class="roles-titulo">Buscando colaboradores</div>
          <div class="roles-tags">
            ${tagsRoles}
          </div>
        </div>

        <footer class="card-footer">
          <div class="autor-info">
            <span>Creador:</span>
            <span class="autor-nombre">${p.autor}</span>
          </div>
          <div class="card-acciones">
            <button class="btn btn-secondary btn-sm btn-ver-detalle" data-id="${p.id}" title="Ver ficha completa">
              Detalles
            </button>
            <button class="btn btn-primary btn-sm btn-unirse-card" data-id="${p.id}" title="Postularme para ayudar">
              Colaborar
            </button>
          </div>
        </footer>
      </div>
    </article>
  `;
}

// ============================================================================
// MODAL DE DETALLES DEL JUEGO
// ============================================================================
function abrirModalDetalles(id) {
  const p = proyectoService.obtenerPorId(id);
  if (!p) return;

  proyectoSeleccionado = p;

  const modalContenido = document.getElementById('detalles-modal-body');
  if (!modalContenido) return;

  // Tags en formato #hashtag
  const etiquetasHTML = p.etiquetas && p.etiquetas.length > 0
    ? p.etiquetas.map(t => `<span class="chip-filtro activo" style="font-size:0.75rem;">#${t}</span>`).join(' ')
    : '';

  // Si ya tiene solicitudes de gente que se postulo, las listamos
  const colaboracionesHTML = p.colaboraciones && p.colaboraciones.length > 0
    ? `<div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 8px;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan);">Gente interesada en unirse (${p.colaboraciones.length}):</span>
        <ul style="margin-left: 1.2rem; margin-top: 0.4rem; font-size: 0.8rem; color: var(--text-secondary);">
          ${p.colaboraciones.map(c => `<li><strong>${c.remitente}</strong> - ${c.rol} <span style="color:var(--accent-green)">(${c.estado || 'Recibido'})</span></li>`).join('')}
        </ul>
      </div>`
    : '';

  // Inyectamos todo el contenido adentro del modal
  modalContenido.innerHTML = `
    <div class="modal-banner">
      <img src="${p.portada}" alt="${p.titulo}">
      <div class="modal-banner-degrade"></div>
    </div>
    
    <div class="modal-contenido-detalles">
      <div class="modal-meta-row">
        <span class="badge-motor">${p.motor}</span>
        <span class="badge-estado estado-alpha">${p.estado}</span>
        <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.85rem;">${p.genero}</span>
      </div>

      <h2 class="modal-titulo">${p.titulo}</h2>
      
      <div style="margin-bottom: 1rem;">
        ${etiquetasHTML}
      </div>

      <div class="modal-seccion">
        <h4 class="modal-seccion-titulo">Sinopsis y Jugabilidad</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
          ${p.descripcionLarga || p.descripcionCorta}
        </p>
      </div>

      <div class="modal-seccion">
        <h4 class="modal-seccion-titulo">Progreso actual (${p.progreso}%)</h4>
        <div class="barra-progreso" style="height: 8px; margin-top: 0.5rem;">
          <div class="barra-relleno" style="width: ${p.progreso}%;"></div>
        </div>
      </div>

      <div class="modal-seccion">
        <h4 class="modal-seccion-titulo">Puestos abiertos en el equipo</h4>
        <div class="roles-tags" style="margin-top: 0.5rem;">
          ${p.rolesBuscados.map(rol => `<span class="rol-tag" style="font-size: 0.85rem; padding: 0.3rem 0.8rem;">✨ ${rol}</span>`).join('')}
        </div>
      </div>

      <div class="modal-seccion" style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
        <h4 class="modal-seccion-titulo">Equipo creador</h4>
        <p style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600;">${p.autor}</p>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">Contacto directo: <a href="mailto:${p.contacto}">${p.contacto}</a></p>
        ${colaboracionesHTML}
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
        <button class="btn btn-secondary modal-cancelar-btn">Cerrar</button>
        <button class="btn btn-primary" id="btn-modal-colaborar-accion">
          Quiero Unirme al Proyecto
        </button>
      </div>
    </div>
  `;

  // Evento para abrir el modal de colaboracion directo desde los detalles
  const btnColab = modalContenido.querySelector('#btn-modal-colaborar-accion');
  if (btnColab) {
    btnColab.addEventListener('click', () => {
      abrirModalColaborar(p.id);
    });
  }

  // Activar botones de cancelar dentro del contenido inyectado
  modalContenido.querySelectorAll('.modal-cancelar-btn').forEach(btn => {
    btn.addEventListener('click', cerrarTodosModales);
  });

  abrirModal(modalDetalles);
}

// ============================================================================
// MODAL PARA POSTULARSE A UN EQUIPO
// ============================================================================
function abrirModalColaborar(id) {
  const p = proyectoService.obtenerPorId(id);
  if (!p) return;

  proyectoSeleccionado = p;

  const tituloEl = document.getElementById('colaborar-proyecto-titulo');
  const idInput = document.getElementById('colaborar-proyecto-id');
  const rolSelect = document.getElementById('colaborar-rol');

  if (tituloEl) tituloEl.textContent = p.titulo;
  if (idInput) idInput.value = p.id;

  // Llenamos el combo con los roles que especificamente busca este juego
  if (rolSelect) {
    rolSelect.innerHTML = p.rolesBuscados.map(rol => `<option value="${rol}">${rol}</option>`).join('') +
      `<option value="Otro Rol">Otro rol / Colaborador general</option>`;
  }

  abrirModal(modalColaborar);
}

// Guarda la solicitud en el juego seleccionado
function procesarColaboracion() {
  const id = document.getElementById('colaborar-proyecto-id').value;
  const nombre = document.getElementById('colaborar-nombre').value.trim();
  const contacto = document.getElementById('colaborar-contacto').value.trim();
  const rol = document.getElementById('colaborar-rol').value;
  const mensaje = document.getElementById('colaborar-mensaje').value.trim();

  // Validamos que al menos pongan nombre y contacto
  if (!nombre || !contacto) {
    mostrarToast('Porfa completa tu nombre y contacto', 'info');
    return;
  }

  const exito = proyectoService.solicitarColaboracion(id, {
    remitente: nombre,
    contacto,
    rol,
    mensaje
  });

  if (exito) {
    cerrarTodosModales();
    formColaborar.reset();
    renderizarProyectos();
    actualizarMetricasHero();
    mostrarToast(`¡Listo! Solicitud enviada a ${proyectoSeleccionado ? proyectoSeleccionado.autor : 'el equipo'}`, 'exito');
  }
}

// ============================================================================
// FORMULARIO PARA CREAR Y PUBLICAR UN JUEGO NUEVO
// ============================================================================
function procesarCrearProyecto() {
  const titulo = document.getElementById('crear-titulo').value.trim();
  const autor = document.getElementById('crear-autor').value.trim();
  const contacto = document.getElementById('crear-contacto').value.trim();
  const motor = document.getElementById('crear-motor').value;
  const genero = document.getElementById('crear-genero').value;
  const estado = document.getElementById('crear-estado').value;
  const rolesBuscados = document.getElementById('crear-roles').value.trim();
  const portada = document.getElementById('crear-portada').value.trim();
  const descripcionCorta = document.getElementById('crear-resumen').value.trim();
  const descripcionLarga = document.getElementById('crear-descripcion').value.trim();
  const progreso = document.getElementById('crear-progreso').value;

  // Chequeamos que no vengan vacios los campos clave
  if (!titulo || !autor || !descripcionCorta) {
    mostrarToast('Faltan datos obligatorios (titulo, creador o resumen)', 'info');
    return;
  }

  const nuevoProyecto = {
    titulo,
    autor,
    contacto: contacto || 'contacto@gameforge.io',
    motor,
    genero,
    estado,
    rolesBuscados,
    portada,
    descripcionCorta,
    descripcionLarga: descripcionLarga || descripcionCorta,
    progreso: Number(progreso) || 25,
    destacado: false,
    etiquetas: [motor, genero, estado]
  };

  // Lo guardamos con el service
  proyectoService.crearProyecto(nuevoProyecto);

  cerrarTodosModales();
  formCrearProyecto.reset();
  renderizarProyectos();
  actualizarMetricasHero();

  mostrarToast(`¡Juego "${titulo}" publicado con exito!`, 'exito');

  // Hacemos scroll suave hasta el catalogo para que el usuario vea su juego arriba de todo
  document.getElementById('seccion-explorar').scrollIntoView({ behavior: 'smooth' });
}

// Limpia los filtros y muestra todos los proyectos de nuevo
function limpiarFiltros() {
  filtrosActuales = {
    busqueda: '',
    motor: 'todos',
    genero: 'todos',
    rol: 'todos'
  };

  if (buscadorInput) buscadorInput.value = '';
  if (selectMotor) selectMotor.value = 'todos';
  if (selectGenero) selectGenero.value = 'todos';
  if (selectRol) selectRol.value = 'todos';

  chipsFiltro.forEach(chip => {
    chip.classList.toggle('activo', chip.dataset.motor === 'todos');
  });

  renderizarProyectos();
}

// Actualiza los numeritos de la portada principal
function actualizarMetricasHero() {
  const todos = proyectoService.obtenerTodos();
  const elProyectos = document.getElementById('metrica-proyectos-total');
  const elBuscando = document.getElementById('metrica-buscando-talento');

  if (elProyectos) elProyectos.textContent = todos.length;
  
  if (elBuscando) {
    const totalBuscando = todos.reduce((acc, p) => acc + (p.rolesBuscados.length > 0 ? 1 : 0), 0);
    elBuscando.textContent = totalBuscando;
  }
}

// Funciones para abrir y cerrar modales
function abrirModal(modal) {
  cerrarTodosModales();
  if (modal) {
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden'; // bloqueamos el scroll de fondo
  }
}

function cerrarTodosModales() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('activo');
  });
  document.body.style.overflow = ''; // reactivamos el scroll
}

// Cartelitos de notificacion Toast que flotan abajo a la derecha
function mostrarToast(mensaje, tipo = 'info') {
  let contenedor = document.getElementById('toast-contenedor');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'toast-contenedor';
    contenedor.className = 'toast-contenedor';
    document.body.appendChild(contenedor);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  
  const icono = tipo === 'exito' ? '✅' : 'ℹ️';

  toast.innerHTML = `
    <span style="font-size: 1.1rem;">${icono}</span>
    <span style="font-size: 0.88rem; font-weight: 500;">${mensaje}</span>
  `;

  contenedor.appendChild(toast);

  // A los 4 segundos lo desvanecemos y lo sacamos del DOM
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
