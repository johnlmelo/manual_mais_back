const { Model, DataTypes } = require('sequelize');

class Manuais extends Model {}

module.exports = (sequelize) => {
    Manuais.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        paginas: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        garantias: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        fornecedores: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        manutencoes: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        tutoriais: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        materiais: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, { sequelize, modelName: 'Manuais' });

    return Manuais;
};
