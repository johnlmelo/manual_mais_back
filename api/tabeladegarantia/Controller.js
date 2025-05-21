const { where } = require('sequelize');
const { TabelaGarantia, LinhaGarantia } = require('../../db/models');

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await TabelaGarantia.findAll({
            where: {
                status: 'active'
            },
            include: [
                { 
                    model: LinhaGarantia,  // Substitua "OutraTabela" pelo nome da tabela associada
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
        const page = await TabelaGarantia.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'TabelaGarantia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newTabelaGarantia = await TabelaGarantia.create(req.body);
        res.status(201).json(newTabelaGarantia);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await TabelaGarantia.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTabelaGarantia = await TabelaGarantia.findByPk(req.params.id);
            res.status(200).json(updatedTabelaGarantia);
        } else {
            res.status(404).json({ message: 'TabelaGarantia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await TabelaGarantia.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'TabelaGarantia deleted' });
        } else {
            res.status(404).json({ message: 'TabelaGarantia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
