const { Op } = require('sequelize');
const { Empreendimentos, Pages, Blocos, Manuais, Documents, Tipologias, Unidades } = require('../../db/models');

// Get all empreendimentos
exports.getAllEmpreendimentos = async (req, res) => {
    try {
        const empreendimentos = await Empreendimentos.findAll({
            where: {
                status: {[Op.ne]: 'deleted'}
            },
            include: [
                { 
                    model: Manuais,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                },
                { 
                    model: Documents,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                },
                { 
                    model: Tipologias,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                    include: [
                        { 
                            model: Unidades,  // Substitua "OutraTabela" pelo nome da tabela associada
                            required: false,
                        }
                    ]
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
                },
                { 
                    model: Documents,  // Substitua "OutraTabela" pelo nome da tabela associada
                    required: false,
                },
                { 
                    model: Tipologias,  // Substitua "OutraTabela" pelo nome da tabela associada
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

exports.cloneEmpreendimento = async (req, res) => {
    try {
        const { id } = req.params;

        // Encontrar o empreendimento original com todas as associações
        const empreendimentoOriginal = await Empreendimentos.findByPk(id, {
            include: [
                { model: Manuais },
                { model: Pages, include: [Blocos] },
            ],
        });

        if (!empreendimentoOriginal) {
            return res.status(404).json({ message: "Empreendimento não encontrado" });
        }

        // Clonar o empreendimento
        const novoEmpreendimento = await Empreendimentos.create({
            nome: "Novo Empreedimento",
            endereco: "",
            construtora: "",
            logo: "",
            status: "Desenvolvimento",
            corDestaque: "",
            id: undefined // Exemplo de mudança de nome para evitar duplicidades
        });

        // Clonar manuais associados
        const manualOriginal = empreendimentoOriginal.Manuais[0]; // Supondo que haja um manual por empreendimento
        if (manualOriginal) {
            await Manuais.create({
                ...manualOriginal.get(),
                EmpreendimentoId: novoEmpreendimento.id,
                id: undefined,
            });
        }

        // Clonar páginas e blocos associados
        for (const page of empreendimentoOriginal.Pages) {
            const novaPage = await Pages.create({
                ...page.get(),
                EmpreendimentoId: novoEmpreendimento.id,
                id: undefined,
            });

            // Clonar blocos associados à página
            for (const bloco of page.Blocos) {
                await Blocos.create({
                    ...bloco.get(),
                    PageId: novaPage.id,
                    EmpreendimentoId: novoEmpreendimento.id,
                    id: undefined,
                });
            }
        }

        res.status(201).json({
            message: "Empreendimento clonado com sucesso",
            novoEmpreendimento,
        });

    } catch (error) {
        console.error("Erro ao clonar empreendimento:", error);
        res.status(500).json({ message: "Erro ao clonar empreendimento", error });
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
