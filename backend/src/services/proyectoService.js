// ============================================================================
// GAMEFORGE BACKEND - Servicio de Proyectos (proyectoService.js)
// Aca va la logica de negocio y las validaciones antes de tocar la base de datos
// ============================================================================

const proyectoRepository = require('../repositories/proyectoRepository');

class ProyectoService {
  // Pide todos los juegos al repositorio
  async listarProyectos() {
    return await proyectoRepository.findAll();
  }

  // Busca por id y tira error si no existe
  async obtenerProyectoPorId(id) {
    const proyecto = await proyectoRepository.findById(id);
    if (!proyecto) {
      throw new Error(`El juego con id ${id} no existe`);
    }
    return proyecto;
  }

  // Valida que vengan los datos obligatorios y le genera el slug para la URL
  async registrarProyecto(datos) {
    if (!datos.titulo || !datos.autorNombre || !datos.descripcionCorta) {
      throw new Error('Ojo: titulo, creador y resumen son obligatorios');
    }

    // Le limpiamos los caracteres raros al titulo para hacer el slug
    const slug = datos.titulo
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    return await proyectoRepository.create({
      ...datos,
      slug: `${slug}-${Date.now()}`
    });
  }

  // Valida los datos del colaborador y los manda a guardar
  async postularColaborador(proyectoId, datosColaborador) {
    if (!datosColaborador.nombre || !datosColaborador.contacto) {
      throw new Error('Tenes que poner al menos tu nombre y contacto');
    }

    return await proyectoRepository.addColaboracion(proyectoId, datosColaborador);
  }
}

module.exports = new ProyectoService();
