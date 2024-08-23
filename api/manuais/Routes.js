const express = require('express');
const router = express.Router();
const manuaisController = require('./Controller');

// Get all manuais
router.get('/', manuaisController.getAllManuais);

// Get manual by ID
router.get('/:id', manuaisController.getManualById);

router.get('/company/:id', manuaisController.getManualByCompanyId);

// Create a new manual
router.post('/', manuaisController.createManual);

// Update a manual
router.put('/:id', manuaisController.updateManual);

// Delete a manual
router.delete('/:id', manuaisController.deleteManual);

module.exports = router;