// ============================================================================
// GAMEFORGE BACKEND - Servidor Principal en Express
// Aca levantamos la API, configuramos cors, json y las rutas
// ============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proyectoRoutes = require('./routes/proyectoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares basicos
app.use(cors()); // permite que el frontend le pegue a la API sin drama de cors
app.use(express.json()); // para entender los JSON que mandan en los POST

// Ruta simple para probar si el server esta vivo
app.get('/api/health', (req, res) => {
  res.json({
    estado: 'Servidor GameForge andando joya',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Enganchamos las rutas de proyectos
app.use('/api/proyectos', proyectoRoutes);

// Levantamos el servidor en el puerto indicado
app.listen(PORT, () => {
  console.log(`Servidor de GameForge escuchando en http://localhost:${PORT}`);
});

module.exports = app;
