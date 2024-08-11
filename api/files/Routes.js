const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Create a new bloco
router.post('/files', Controller.create);

// Delete a bloco
// router.delete('/:id', blocosController.deleteBloco)

module.exports = router;