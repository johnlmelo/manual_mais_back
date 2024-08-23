const { where } = require('sequelize');
const { Empreendimentos, Pages, Blocos, Manuais } = require('../../db/models');
const { status } = require('express/lib/response');

// Get all empreendimentos
exports.getAllEmpreendimentos = async (req, res) => {
    try {
        const empreendimentos = await Empreendimentos.findAll({
            include: [
                { 
                    model: Manuais,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                }
            ]
        });
        res.status(200).json(empreendimentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get empreendimento by ID
exports.getEmpreendimentoById = async (req, res) => {
    try {
        const empreendimento = await Empreendimentos.findByPk(req.params.id, {
            include: [
                { 
                    model: Manuais,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                }
            ]
        });
        if (empreendimento) {
            res.status(200).json(empreendimento);
        } else {
            res.status(404).json({ message: 'Empreendimento not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new empreendimento
exports.createEmpreendimento = async (req, res) => {
    try {
        const newEmpreendimento = await Empreendimentos.create(req.body);
        res.status(201).json(newEmpreendimento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a empreendimento
exports.updateEmpreendimento = async (req, res) => {
    try {
        const [updated] = await Empreendimentos.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEmpreendimento = await Empreendimentos.findByPk(req.params.id);
            res.status(200).json(updatedEmpreendimento);
        } else {
            res.status(404).json({ message: 'Empreendimento not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a empreendimento
exports.deleteEmpreendimento = async (req, res) => {
    try {
        const deleted = await Empreendimentos.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Empreendimento deleted' });
        } else {
            res.status(404).json({ message: 'Empreendimento not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
