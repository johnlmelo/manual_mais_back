const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Get all tipologias
router.get('/:EmpreendimentoId', Controller.getAll);

// Get all tipologias
router.get('/', Controller.getTodos);

// Get tipologia by ID
router.get('/:id', Controller.getById);

// Create a new tipologia
router.post('/', Controller.create);

router.post('/auth', Controller.auth);

// Update a tipologia
router.put('/:id', Controller.update);

// Delete a tipologia
router.delete('/:id', Controller.delete);

module.exports = router;
