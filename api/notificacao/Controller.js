const { Notificacao } = require('../../db/models');

// Get all pages
exports.getAll = async (req, res) => {
    try {
        const pages = await Notificacao.findAll();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get page by ID
exports.getById = async (req, res) => {
    try {
        const page = await Notificacao.findByPk(req.params.id);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Notificacao not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.create = async (req, res) => {
    try {
        const newNotificacao = await Notificacao.create(req.body);
        res.status(201).json(newNotificacao);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.update = async (req, res) => {
    try {
        const [updated] = await Notificacao.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedNotificacao = await Notificacao.findByPk(req.params.id);
            res.status(200).json(updatedNotificacao);
        } else {
            res.status(404).json({ message: 'Notificacao not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.delete = async (req, res) => {
    try {
        const deleted = await Notificacao.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Notificacao deleted' });
        } else {
            res.status(404).json({ message: 'Notificacao not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
