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
        endereco: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
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
            defaultValue: true,
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active',
            allowNull: false,
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