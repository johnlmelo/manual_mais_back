
const { Model, DataTypes } = require('sequelize');
class Empreendimentos extends Model {}

module.exports = (sequelize) => {
    Empreendimentos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        construtora: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        corDestaque: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataHabite: {
            type: DataTypes.DATE,
            allowNull: true
        },
        metadata: {
            type: DataTypes.JSON,
            allowNull: true
        },
        plantas: {
            type: DataTypes.JSON,
            allowNull: true
        }, 
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        validAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, { sequelize, modelName: 'Empreendimentos' });

    return Empreendimentos;
    
};