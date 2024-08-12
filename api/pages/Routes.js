const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Get all tipologias
router.get('/:EmpreendimentoId', Controller.getAllPages);

// Get tipologia by ID
router.get('/:id', Controller.getPageById);

// Create a new tipologia
router.post('/', Controller.createPage);

// Update a tipologia
router.put('/:id', Controller.updatePage);

// Delete a tipologia
router.delete('/:id', Controller.deletePage);

module.exports = router;
