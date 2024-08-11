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
        fotoCapa: {
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
    }, { sequelize, modelName: 'Manuais' });

    return Manuais;
};
