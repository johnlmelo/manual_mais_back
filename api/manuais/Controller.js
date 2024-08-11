const { Manuais, Blocos } = require('../../db/models');

// Get all manuais
exports.getAllManuais = async (req, res) => {
    try {
        const manuais = await Manuais.findAll({ include: Blocos });
        res.status(200).json(manuais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get manual by ID
exports.getManualById = async (req, res) => {
    try {
        const manual = await Manuais.findByPk(req.params.id, { include: Blocos });
        if (manual) {
            res.status(200).json(manual);
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new manual
exports.createManual = async (req, res) => {
    try {
        const { titulo, descricao, fotoCapa, blocos } = req.body;
        const newManual = await Manuais.create({ titulo, descricao, fotoCapa });
        
        if (blocos && blocos.length > 0) {
            const blocosInstances = await Blocos.findAll({ where: { id: blocos } });
            await newManual.setBlocos(blocosInstances);
        }

        const manualWithBlocos = await Manuais.findByPk(newManual.id, { include: Blocos });
        res.status(201).json(manualWithBlocos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a manual
exports.updateManual = async (req, res) => {
    try {
        const { titulo, descricao, fotoCapa, blocos } = req.body;
        const [updated] = await Manuais.update({ titulo, descricao, fotoCapa }, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedManual = await Manuais.findByPk(req.params.id);
            
            if (blocos && blocos.length > 0) {
                const blocosInstances = await Blocos.findAll({ where: { id: blocos } });
                await updatedManual.setBlocos(blocosInstances);
            }

            const manualWithBlocos = await Manuais.findByPk(updatedManual.id, { include: Blocos });
            res.status(200).json(manualWithBlocos);
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a manual
exports.deleteManual = async (req, res) => {
    try {
        const deleted = await Manuais.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Manual deleted' });
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
