const { Model, DataTypes } = require('sequelize');

class Blocos extends Model {}

module.exports = (sequelize) => {
    Blocos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imagem: {
            type: DataTypes.STRING,
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
    }, { sequelize, modelName: 'Blocos' });

    return Blocos;
};
