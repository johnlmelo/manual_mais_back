const express = require('express');
const router = express.Router();
const blocosController = require('./Controller');

// Get all blocos
router.get('/', blocosController.getAllBlocos);

// Get bloco by ID
router.get('/:id', blocosController.getBlocoById);

// Create a new bloco
router.post('/', blocosController.createBloco);

// Update a bloco
router.put('/:id', blocosController.updateBloco);

// Delete a bloco
router.delete('/:id', blocosController.deleteBloco);

module.exports = router;