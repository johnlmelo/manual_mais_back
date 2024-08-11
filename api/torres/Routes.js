const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Get all torres
router.get('/', Controller.getAllTorres);

// Get torre by ID
router.get('/:id', Controller.getTorreById);

// Create a new torre
router.post('/', Controller.createTorre);

// Update a torre
router.put('/:id', Controller.updateTorre);

// Delete a torre
router.delete('/:id', Controller.deleteTorre);

module.exports = router;
