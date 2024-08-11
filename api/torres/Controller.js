const { Torres, Tipologias, Unidades } = require('../../db/models');

// Get all torres
exports.getAllTorres = async (req, res) => {
    try {
        const torres = await Torres.findAll({
            include: [
                { 
                    model: Tipologias,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                    include: [
                        { 
                            model: Unidades,  // Substitua "OutraTabela" pelo nome da tabela associada
                            required: false  // Define se a inclusão é obrigatória ou não (false permite que a torre seja retornada mesmo se não houver associação)
                        }
                    ]
                }
            ]
        });
        res.status(200).json(torres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get torre by ID
exports.getTorreById = async (req, res) => {
    try {
        const torre = await Torres.findByPk(req.params.id,{
            include: [
                { 
                    model: Tipologias,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                    include: [
                        { 
                            model: Unidades,  // Substitua "OutraTabela" pelo nome da tabela associada
                            required: false  // Define se a inclusão é obrigatória ou não (false permite que a torre seja retornada mesmo se não houver associação)
                        }
                    ]
                }
            ]
        });
        if (torre) {
            res.status(200).json(torre);
        } else {
            res.status(404).json({ message: 'Torre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new torre
exports.createTorre = async (req, res) => {
    try {
        const newTorre = await Torres.create(req.body);
        res.status(201).json(newTorre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a torre
exports.updateTorre = async (req, res) => {
    try {
        const [updated] = await Torres.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTorre = await Torres.findByPk(req.params.id);
            res.status(200).json(updatedTorre);
        } else {
            res.status(404).json({ message: 'Torre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a torre
exports.deleteTorre = async (req, res) => {
    try {
        const deleted = await Torres.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Torre deleted' });
        } else {
            res.status(404).json({ message: 'Torre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
