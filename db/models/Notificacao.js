// models/Notificacao.js
const { Model, DataTypes } = require('sequelize');

class Notificacao extends Model {}

module.exports = (sequelize) => {
    Notificacao.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mensagem: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM(
                'Vencimento de Garantia',
                'Vencimento de Documento',
                'Atualização de Conteúdo',
                'Atividade de Manutenção Vencida',
                'Mensagem Geral'
            ),
            allowNull: true,
        },
        destinatarios: {
            type: DataTypes.STRING, // Pode ser 'todos', 'empreendimento:<id>', 'grupo:<id>', etc.
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('ativa', 'inativa'),
            defaultValue: 'ativa',
            allowNull: false,
        },
        dataEnvio: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dataExpiracao: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Notificacao',
        tableName: 'notificacoes',
        timestamps: true,
    });

    return Notificacao;
};