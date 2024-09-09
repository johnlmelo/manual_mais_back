const express = require('express');
const router = express.Router();
const blocosController = require('./Controller');

// Get all blocos
router.get('/', blocosController.getAllTagsReusaveis);

// Get bloco by ID
router.get('/:id', blocosController.getTagReusavelById);

// Create a new bloco
router.post('/', blocosController.createTagReusavel);

// Update a bloco
router.put('/:id', blocosController.updateTagReusavel);

// Delete a bloco
router.delete('/:id', blocosController.deleteTagReusavel);

module.exports = router;