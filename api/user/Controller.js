const { User } = require('../../db/models');

// Get all pages
exports.auth = async (req, res) => {
    try {
        const pages = await User.findOne({
            where: {
                email: req.body.email,
                senha: req.body.senha
            }
        });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await User.findAll({
            where: {
                EmpreendimentoId: req.params.EmpreendimentoId
            }
        });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all pages
exports.getTodos = async (req, res) => {
    try {
        const pages = await User.findAll();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get page by ID
exports.getById = async (req, res) => {
    try {
        const page = await User.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
