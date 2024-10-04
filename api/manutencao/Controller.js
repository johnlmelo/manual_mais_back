const { ManutencaoPreventiva } = require('../../db/models');

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await ManutencaoPreventiva.findAll({
            where: {
                status: 'active'
            }
        });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get page by ID
exports.getById = async (req, res) => {
    try {
        const page = await ManutencaoPreventiva.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'ManutencaoPreventiva not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newManutencaoPreventiva = await ManutencaoPreventiva.create(req.body);
        res.status(201).json(newManutencaoPreventiva);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await ManutencaoPreventiva.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedManutencaoPreventiva = await ManutencaoPreventiva.findByPk(req.params.id);
            res.status(200).json(updatedManutencaoPreventiva);
        } else {
            res.status(404).json({ message: 'ManutencaoPreventiva not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await ManutencaoPreventiva.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'ManutencaoPreventiva deleted' });
        } else {
            res.status(404).json({ message: 'ManutencaoPreventiva not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
