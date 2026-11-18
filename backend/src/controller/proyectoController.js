// ============================================================================
// GAMEFORGE BACKEND - Controlador de Proyectos (proyectoController.js)
// Aca recibimos los pedidos que llegan de las rutas (req) y devolvemos la respuesta (res)
// ============================================================================

const proyectoService = require('../services/proyectoService');

class ProyectoController {
  // GET /api/proyectos -> devuelve la lista de juegos
  async obtenerTodos(req, res) {
    try {
      const proyectos = await proyectoService.listarProyectos();
      res.status(200).json({ exito: true, datos: proyectos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: error.message });
    }
  }

  // GET /api/proyectos/:id -> busca un juego especifico
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const proyecto = await proyectoService.obtenerProyectoPorId(id);
      res.status(200).json({ exito: true, datos: proyecto });
    } catch (error) {
      res.status(404).json({ exito: false, mensaje: error.message });
    }
  }

  // POST /api/proyectos -> guarda un nuevo juego mandado en el body
  async crear(req, res) {
    try {
      const nuevo = await proyectoService.registrarProyecto(req.body);
      res.status(201).json({ exito: true, datos: nuevo, mensaje: 'Juego registrado joya' });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  // POST /api/proyectos/:id/colaborar -> postula a alguien para unirse al equipo
  async colaborar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await proyectoService.postularColaborador(id, req.body);
      res.status(201).json({ exito: true, datos: resultado, mensaje: 'Postulacion enviada' });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = new ProyectoController();
