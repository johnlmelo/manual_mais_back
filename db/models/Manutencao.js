const { Model, DataTypes } = require('sequelize');

class ManutencaoPreventiva extends Model {}

module.exports = (sequelize) => {
    ManutencaoPreventiva.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        periodicidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sistema: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        elementoComponente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        atividade: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        responsavel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quemRealiza: {
            type: DataTypes.STRING,
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
        modelName: 'ManutencaoPreventiva',
        tableName: 'manutencao_preventivas',
    });

    return ManutencaoPreventiva;
};