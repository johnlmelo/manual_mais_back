const { Model, DataTypes } = require('sequelize');

class Fornecedores extends Model {}

module.exports = (sequelize) => {
    Fornecedores.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        site: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.TEXT, // Usamos TEXT para armazenar a imagem em base64
            allowNull: true,
        },
        destaque: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
            },
        },
        tipo: {
            type: DataTypes.ENUM(
              'Fornecedores de Materiais e Serviços',
              'Projetistas',
              'Contatos Úteis'
            ),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active',
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Fornecedores',
        tableName: 'fornecedores',
    });

    return Fornecedores;
};