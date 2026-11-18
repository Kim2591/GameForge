// ============================================================================
// GAMEFORGE BACKEND - Rutas de Proyectos (proyectoRoutes.js)
// Aca conectamos las URLs con las funciones del controlador
// ============================================================================

const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyectoController');

// Rutas disponibles
router.get('/', (req, res) => proyectoController.obtenerTodos(req, res));
router.get('/:id', (req, res) => proyectoController.obtenerPorId(req, res));
router.post('/', (req, res) => proyectoController.crear(req, res));
router.post('/:id/colaborar', (req, res) => proyectoController.colaborar(req, res));

module.exports = router;
