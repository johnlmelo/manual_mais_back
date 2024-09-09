const { where } = require('sequelize');
const { LinhaGarantia, Blocos } = require('../../db/models');

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await LinhaGarantia.findAll({
            where: {
                status: 'active'
            },
            include: [
                { 
                    model: Blocos,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                }
            ]
        });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get page by ID
exports.getById = async (req, res) => {
    try {
        const page = await LinhaGarantia.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'LinhaGarantia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newLinhaGarantia = await LinhaGarantia.create(req.body);
        res.status(201).json(newLinhaGarantia);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await LinhaGarantia.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedLinhaGarantia = await LinhaGarantia.findByPk(req.params.id);
            res.status(200).json(updatedLinhaGarantia);
        } else {
            res.status(404).json({ message: 'LinhaGarantia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await LinhaGarantia.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'LinhaGarantia deleted' });
        } else {
            res.status(404).json({ message: 'LinhaGarantia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
