const { Model, DataTypes } = require('sequelize');

class LinhaGarantia extends Model {}

module.exports = (sequelize) => {
    LinhaGarantia.init({
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
        tipoFalha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prazoGarantia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apenasSindico: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        dataVencimento: {
            type: DataTypes.DATE,
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
    }, { sequelize, modelName: 'LinhaGarantia' });

    return LinhaGarantia;
};
