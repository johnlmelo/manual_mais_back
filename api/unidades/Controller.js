const { Unidades } = require('../../db/models');

// Get all unidades
exports.getAllUnidades = async (req, res) => {
    try {
        const unidades = await Unidades.findAll({
            where: {
                EmpreendimentoId: req.params.EmpreendimentoId
            }
        });
        res.status(200).json(unidades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get unidade by ID
exports.getUnidadeById = async (req, res) => {
    try {
        const unidade = await Unidades.findByPk(req.params.id);
        if (unidade) {
            res.status(200).json(unidade);
        } else {
            res.status(404).json({ message: 'Unidade not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new unidade
exports.createUnidade = async (req, res) => {
    try {
        const newUnidade = await Unidades.create(req.body);
        res.status(201).json(newUnidade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a unidade
exports.updateUnidade = async (req, res) => {
    try {
        const [updated] = await Unidades.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUnidade = await Unidades.findByPk(req.params.id);
            res.status(200).json(updatedUnidade);
        } else {
            res.status(404).json({ message: 'Unidade not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a unidade
exports.deleteUnidade = async (req, res) => {
    try {
        const deleted = await Unidades.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Unidade deleted' });
        } else {
            res.status(404).json({ message: 'Unidade not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
