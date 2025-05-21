const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Get all tipologias
router.get('/:EmpreendimentoId', Controller.getAllTipologias);

// Get tipologia by ID
router.get('/:id', Controller.getTipologiaById);

// Create a new tipologia
router.post('/', Controller.createTipologia);

// Update a tipologia
router.put('/:id', Controller.updateTipologia);

// Delete a tipologia
router.delete('/:id', Controller.deleteTipologia);

module.exports = router;
