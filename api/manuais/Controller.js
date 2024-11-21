const { Manuais, Blocos, Empreendimentos, TagsReusaveis } = require('../../db/models');
const PDFDocument = require('pdfkit');
const fs = require('fs');
// Get all manuais
exports.getAllManuais = async (req, res) => {
    try {
        const manuais = await Manuais.findAll();
        res.status(200).json(manuais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function removeHtmlTags(input) {
    if (!input) return ''; // Retorna uma string vazia se a entrada for nula ou indefinida
    return input.replace(/<[^>]*>/g, '').trim();
}

function processHtml(input) {
    if (!input) return ''; // Retorna string vazia se a entrada for nula ou indefinida

    return input
        .replace(/<br\s*\/?>/gi, '\n') // Substitui <br> por quebras de linha (\n)
        .replace(/<\/?[^>]+(>|$)/g, '') // Remove outras tags HTML
        .split('\n') // Divide o texto em parágrafos com base nas quebras de linha
        .map(paragraph => paragraph.trim()) // Remove espaços extras em cada parágrafo
        .filter(paragraph => paragraph !== '') // Remove parágrafos vazios
        .join('\n\n'); // Junta os parágrafos com espaçamento duplo
}

function substituirTagsPorValores(obj, str, tagsPersonalizadas) {
    if (!str) {
      return '';
    }
  
    // Tags fixas
    const tagsFixas = [
      { label: "nome", tag: "{nome_empreendimento}" },
      { label: "construtora", tag: "{construtora}" },
      { label: "endereco", tag: "{endereco}" },
      { label: "dataHabite", tag: "{dataHabite}" },
      { label: "descricao", tag: "{descricao}" },
    ];
  
    // Função para formatar a data em UTC e exibir conforme o fuso horário local
    const formatDate = (dateString) => {
      const date = new Date(dateString); // Cria a data no formato UTC
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC' // Define UTC para evitar mudança de dia com base no fuso horário local
      }).format(date);
    };
  
    // Substituir tags fixas
    tagsFixas.forEach(({ label, tag }) => {
      let valor;
      if (label === 'dataHabite') {
        valor = obj[label] ? formatDate(obj[label]) : '';
      } else {
        valor = obj[label] || ''; // Se o valor não existir no objeto, define como string vazia
      }
      str = str.replace(new RegExp(tag, 'g'), valor);
    });
  
    // Substituir tags personalizadas
    tagsPersonalizadas.forEach(({ tag }) => {
      const valor = obj.metadata && obj.metadata[tag] ? obj.metadata[tag] : ''; // Se o valor não existir no objeto, define como string vazia
      str = str.replace(new RegExp(tag, 'g'), valor);
    });
  
    return str;
}

// Get all manuais
exports.exportarEmPDF = async (req, res) => {
    try {
        const { id } = req.params;

        const tags = await TagsReusaveis.findAll();

        // Buscar os dados do empreendimento e seus manuais
        const empreendimento = await Empreendimentos.findByPk(id, {
            include: [
                { 
                    model: Manuais
                }
            ],
        });

        if (!empreendimento) {
            return res.status(404).json({ message: 'Empreendimento não encontrado' });
        }

        const blocos = await Promise.all(
            empreendimento.Manuais.map(async (manual) => {
                return Promise.all(
                    manual.paginas.map(async (pagina) => {
                        return Promise.all(
                            pagina.blocos.map(async (bloco) => {
                                const getBloco = await Blocos.findByPk(bloco.id);
                                return processHtml(substituirTagsPorValores(empreendimento, JSON.stringify(getBloco.conteudo), tags));
                            })
                        );
                    })
                );
            })
        );        

        // Criar o PDF
        const doc = new PDFDocument();
        const filePath = `relatorio_empreendimento_${id}.pdf`;

        // Configurar resposta para download do PDF
        res.setHeader('Content-Disposition', `attachment; filename="${filePath}"`);
        res.setHeader('Content-Type', 'application/pdf');

        // Escrever no stream de resposta diretamente
        doc.pipe(res);

        // Título do documento
        doc.fontSize(14).text(`Manual do Empreendimento`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text(`${empreendimento.nome}`, { align: 'center' });
        doc.moveDown();

        // Informações do empreendimento
        doc.fontSize(12).text(`Descrição: ${removeHtmlTags(empreendimento.descricao) || 'Não disponível'}`);
        doc.text(`Endereço: ${empreendimento.endereco || 'Não disponível'}`);
        doc.text(`Construtora: ${empreendimento.construtora || 'Não disponível'}`);
        doc.text(`Data Habite-se: ${new Date(empreendimento.dataHabite).toLocaleDateString() || 'Não disponível'}`);
        doc.moveDown();

        doc.fontSize(12).text(blocos);
        doc.moveDown();

        empreendimento.Manuais.forEach((manual, index) => {
            // Garantias
            doc.fontSize(18).text(`Garantias:`, { underline: true });
            doc.moveDown(0.5);
        
            if (manual.garantias?.items?.length) {
                manual.garantias.items.forEach(item => {
                    doc.fontSize(12).text(`Nome: ${item.nome}`);
                    doc.text(`Descrição: ${item.descricao}`);
                    doc.text(`Tipo de Falha: ${item.tipoFalha}`);
                    doc.text(`Prazo: ${item.prazoGarantia}`);
                    doc.text('----------------------');
                    doc.moveDown(0.5);
                });
            } else {
                doc.text("Não disponível");
            }
            doc.moveDown();
        });
        
        
        

        // Finalizar o PDF
        doc.end();

    } catch (error) {
        console.error('Erro ao gerar o relatório:', error);
        res.status(500).json({ error: 'Erro ao gerar o relatório', erro: error });
    }
};

// Get manual by ID
exports.getManualById = async (req, res) => {
    try {
        const manual = await Manuais.findByPk(req.params.id);
        if (manual) {
            res.status(200).json(manual);
        } else {
            res.status(404).json({ message: 'Manual not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get count of specific Bloco ID in all manuals
exports.getCountBlocoId = async (req, res) => {
    try {
        const blocoId = req.params.BlocoId;
        const manuais = await Manuais.findAll();

        // return res.status(200).json({ manuais });
        
        if (manuais.length > 0) {
            let count = 0;
            
            manuais.forEach(manual => {
                const paginas = manual.paginas;
                paginas.forEach(pagina => {
                    pagina.blocos.forEach(bloco => {
                        if (bloco.id == blocoId) {
                            count++;
                        }
                    });
                });
            });
            
            
            return res.status(200).json({ count });
        } else {
            return res.status(404).json({ message: 'Sem Manuais cadastrados' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// Get manual by ID
exports.getManualByCompanyId = async (req, res) => {
    try {
        const manual = await Manuais.findAll({
            where: {
                EmpreendimentoId: req.params.id
            }
        });
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
        const newManual = await Manuais.create(req.body);
        
        res.status(201).json(newManual);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a manual
exports.updateManual = async (req, res) => {
    try {
        const updated = await Manuais.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            res.status(200).json(updated);
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
