// ============================================================================
// GAMEFORGE BACKEND - Configuracion de la Base de Datos
// Aca leemos las variables del archivo .env y armamos la conexion
// ============================================================================

require('dotenv').config();

// Datos de conexion (si no estan en el .env usamos los valores por defecto de postgres)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'gameforge_db'
};

// Conector basico simulado para probar las consultas mientras no haya una bd levantada
const pool = {
  config: dbConfig,
  query: async (text, params) => {
    // Mostramos en consola la consulta SQL que se ejecutaria
    console.log(`[SQL ejecutada]: ${text}`, params || '');
    return { rows: [], rowCount: 0 };
  }
};

module.exports = {
  dbConfig,
  pool
};
