const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Get all empreendimentos
router.get('/', Controller.getAllEmpreendimentos);

// Get empreendimento by ID
router.get('/:id', Controller.getEmpreendimentoById);

//
router.get('/:id/clonar', Controller.cloneEmpreendimento);

// Create a new empreendimento
router.post('/', Controller.createEmpreendimento);

// Update a empreendimento
router.put('/:id', Controller.updateEmpreendimento);

// Delete a empreendimento
router.delete('/:id', Controller.deleteEmpreendimento);

module.exports = router;
