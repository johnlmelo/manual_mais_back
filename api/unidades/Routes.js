const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Get all unidades
router.get('/:EmpreendimentoId', Controller.getAllUnidades);

// Get unidade by ID
router.get('/:id', Controller.getUnidadeById);

// Create a new unidade
router.post('/', Controller.createUnidade);

// Update a unidade
router.put('/:id', Controller.updateUnidade);

// Delete a unidade
router.delete('/:id', Controller.deleteUnidade);

module.exports = router;
