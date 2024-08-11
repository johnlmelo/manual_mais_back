const { Model, DataTypes } = require('sequelize');

class Tipologias extends Model {}

module.exports = (sequelize) => {
    Tipologias.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
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
    }, { sequelize, modelName: 'Tipologias' });

    return Tipologias;
};
