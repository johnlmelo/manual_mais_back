const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

// Create a new bloco
router.post('/files', Controller.uploadFile);

// Rota para upload
router.post('/upload', Controller.uploadFile);

// Rota para deletar arquivos
router.delete('/delete/:folder/:fileName', Controller.deleteFile);

// Delete a bloco
// router.delete('/:id', blocosController.deleteBloco)

module.exports = router;