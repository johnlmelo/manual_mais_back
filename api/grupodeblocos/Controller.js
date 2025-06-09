const { GrupoDeBlocos } = require('../../db/models');

// Get all grupodeblocos
exports.getAllBlocos = async (req, res) => {
    try {
        const grupodeblocos = await GrupoDeBlocos.findAll();
        res.status(200).json(grupodeblocos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get bloco by ID
exports.getBlocoById = async (req, res) => {
    try {
        const bloco = await GrupoDeBlocos.findByPk(req.params.id);
        if (bloco) {
            res.status(200).json(bloco);
        } else {
            res.status(404).json({ message: 'Bloco not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new bloco
exports.createBloco = async (req, res) => {
    try {
        const newBloco = await GrupoDeBlocos.create(req.body);
        res.status(201).json(newBloco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a bloco
exports.updateBloco = async (req, res) => {
    try {
        const [updated] = await GrupoDeBlocos.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBloco = await GrupoDeBlocos.findByPk(req.params.id);
            res.status(200).json(updatedBloco);
        } else {
            res.status(404).json({ message: 'Bloco not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a bloco
exports.deleteBloco = async (req, res) => {
    try {
        const deleted = await GrupoDeBlocos.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Bloco deleted' });
        } else {
            res.status(404).json({ message: 'Bloco not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
