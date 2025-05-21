const { TagsReusaveis } = require('../../db/models');

// Get all tags
exports.getAllTagsReusaveis = async (req, res) => {
    try {
        const tags = await TagsReusaveis.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tag by ID
exports.getTagReusavelById = async (req, res) => {
    try {
        const tag = await TagsReusaveis.findByPk(req.params.id);
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'TagReusavel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new tag
exports.createTagReusavel = async (req, res) => {
    try {
        const newTagReusavel = await TagsReusaveis.create(req.body);
        res.status(201).json(newTagReusavel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a tag
exports.updateTagReusavel = async (req, res) => {
    try {
        const [updated] = await TagsReusaveis.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTagReusavel = await TagsReusaveis.findByPk(req.params.id);
            res.status(200).json(updatedTagReusavel);
        } else {
            res.status(404).json({ message: 'TagReusavel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a tag
exports.deleteTagReusavel = async (req, res) => {
    try {
        const deleted = await TagsReusaveis.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'TagReusavel deleted' });
        } else {
            res.status(404).json({ message: 'TagReusavel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
