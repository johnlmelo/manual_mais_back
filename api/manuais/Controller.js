const { where } = require('sequelize');
const { Manuais, Blocos } = require('../../db/models');

// Get all manuais
exports.getAllManuais = async (req, res) => {
    try {
        const manuais = await Manuais.findAll();
        res.status(200).json(manuais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get manual by ID
exports.getManualById = async (req, res) => {
    try {
        const manual = await Manuais.findByPk(req.params.id);
        if (manual) {
            res.status(200).json(manual);
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get manual by ID
exports.getManualByCompanyId = async (req, res) => {
    try {
        const manual = await Manuais.findAll({
            where: {
                EmpreendimentoId: req.params.id
            }
        });
        if (manual) {
            res.status(200).json(manual);
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new manual
exports.createManual = async (req, res) => {
    try {
        const newManual = await Manuais.create(req.body);
        
        res.status(201).json(newManual);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a manual
exports.updateManual = async (req, res) => {
    try {
        const updated = await Manuais.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a manual
exports.deleteManual = async (req, res) => {
    try {
        const deleted = await Manuais.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Manual deleted' });
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
