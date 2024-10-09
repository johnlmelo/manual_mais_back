const { Model, DataTypes } = require('sequelize');

class Blocos extends Model {}

module.exports = (sequelize) => {
    Blocos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: DataTypes.STRING,  // Enum para definir tipos de bloco
            allowNull: false,
        },
        conteudo: {
            type: DataTypes.TEXT,  // Para armazenar o conteúdo do bloco
            allowNull: false,
        },
        ordem: {
            type: DataTypes.INTEGER,  // Para definir a ordem dos blocos na página
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
    }, { sequelize, modelName: 'Blocos' });

    return Blocos;
};
