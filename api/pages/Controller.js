const { where } = require('sequelize');
const { Pages, Blocos } = require('../../db/models');

// Get all pages
exports.getAllPages = async (req, res) => {
    try {
        const pages = await Pages.findAll({
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

// Get all pages
exports.getAllPagesAll = async (req, res) => {
    try {
        const pages = await Pages.findAll({
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
exports.getPageById = async (req, res) => {
    try {
        const page = await Pages.findByPk(req.params.id,{
            include: [
                { 
                    model: Blocos,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                }
            ]
        });
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.createPage = async (req, res) => {
    try {
        const newPage = await Pages.create(req.body);
        res.status(201).json(newPage);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Update a page
exports.updatePage = async (req, res) => {
    try {
        const [updated] = await Pages.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedPage = await Pages.findByPk(req.params.id);
            res.status(200).json(updatedPage);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a page
exports.deletePage = async (req, res) => {
    try {
        const deleted = await Pages.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Page deleted' });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
