const { where } = require('sequelize');
const { Tipologias, Unidades } = require('../../db/models');

// Get all tipologias
exports.getAllTipologias = async (req, res) => {
    try {
        const tipologias = await Tipologias.findAll({
            where: {
                EmpreendimentoId: req.params.EmpreendimentoId
            },
            include: [{
                model: Unidades,
                required: false
            }]
        });
        res.status(200).json(tipologias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tipologia by ID
exports.getTipologiaById = async (req, res) => {
    try {
        const tipologia = await Tipologias.findByPk(req.params.id);
        if (tipologia) {
            res.status(200).json(tipologia);
        } else {
            res.status(404).json({ message: 'Tipologia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new tipologia
exports.createTipologia = async (req, res) => {
    try {
        const newTipologia = await Tipologias.create(req.body);
        res.status(201).json(newTipologia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a tipologia
exports.updateTipologia = async (req, res) => {
    try {
        const [updated] = await Tipologias.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTipologia = await Tipologias.findByPk(req.params.id);
            res.status(200).json(updatedTipologia);
        } else {
            res.status(404).json({ message: 'Tipologia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a tipologia
exports.deleteTipologia = async (req, res) => {
    try {
        const deleted = await Tipologias.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Tipologia deleted' });
        } else {
            res.status(404).json({ message: 'Tipologia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
