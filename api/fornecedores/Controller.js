const { Fornecedores } = require('../../db/models');

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await Fornecedores.findAll({
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
        const page = await Fornecedores.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Fornecedores not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newFornecedores = await Fornecedores.create(req.body);
        res.status(201).json(newFornecedores);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await Fornecedores.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFornecedores = await Fornecedores.findByPk(req.params.id);
            res.status(200).json(updatedFornecedores);
        } else {
            res.status(404).json({ message: 'Fornecedores not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await Fornecedores.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Fornecedores deleted' });
        } else {
            res.status(404).json({ message: 'Fornecedores not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
