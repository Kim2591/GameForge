// ============================================================================
// GAMEFORGE BACKEND - Repositorio de Proyectos (proyectoRepository.js)
// Aca hacemos las consultas SQL directas con la base de datos
// ============================================================================

const { pool } = require('../config/db');

class ProyectoRepository {
  // Trae todos los juegos ordenados del mas nuevo al mas viejo
  async findAll() {
    const query = 'SELECT * FROM proyectos ORDER BY creado_en DESC';
    return await pool.query(query);
  }

  // Trae un juego segun el ID
  async findById(id) {
    const query = 'SELECT * FROM proyectos WHERE id = $1';
    return await pool.query(query, [id]);
  }

  // Inserta un juego nuevo en la tabla proyectos
  async create(data) {
    const query = `
      INSERT INTO proyectos (
        titulo, slug, descripcion_corta, descripcion_larga, 
        motor, genero, estado, progreso, portada_url, 
        autor_nombre, contacto
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const values = [
      data.titulo,
      data.slug,
      data.descripcionCorta,
      data.descripcionLarga,
      data.motor,
      data.genero,
      data.estado || 'Prototipo',
      data.progreso || 15,
      data.portadaUrl,
      data.autorNombre,
      data.contacto
    ];
    return await pool.query(query, values);
  }

  // Guarda una solicitud de colaboracion en la tabla solicitudes_colaboracion
  async addColaboracion(proyectoId, colabData) {
    const query = `
      INSERT INTO solicitudes_colaboracion (
        proyecto_id, nombre_postulante, contacto_postulante, rol_solicitado, mensaje
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      proyectoId,
      colabData.nombre,
      colabData.contacto,
      colabData.rol,
      colabData.mensaje
    ];
    return await pool.query(query, values);
  }
}

module.exports = new ProyectoRepository();
