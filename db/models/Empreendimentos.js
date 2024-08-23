
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
        status: {
            type: DataTypes.STRING,
            allowNull: false
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