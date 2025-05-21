const { Documents } = require('../../db/models');

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await Documents.findAll({
            where: {
                EmpreendimentoId: req.params.EmpreendimentoId
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
        const page = await Documents.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Documents not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newDocuments = await Documents.create(req.body);
        res.status(201).json(newDocuments);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await Documents.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDocuments = await Documents.findByPk(req.params.id);
            res.status(200).json(updatedDocuments);
        } else {
            res.status(404).json({ message: 'Documents not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await Documents.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Documents deleted' });
        } else {
            res.status(404).json({ message: 'Documents not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
