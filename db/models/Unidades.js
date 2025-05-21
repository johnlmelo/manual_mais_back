const { Model, DataTypes } = require('sequelize');

class Unidades extends Model {}

module.exports = (sequelize) => {
    Unidades.init({
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
    }, { sequelize, modelName: 'Unidades' });

    return Unidades;
};
