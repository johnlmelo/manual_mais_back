const { Model, DataTypes } = require('sequelize');

class GrupoDeBlocos extends Model {}

module.exports = (sequelize) => {
    GrupoDeBlocos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING,  // Enum para definir tipos de bloco
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
    }, { sequelize, modelName: 'GrupoDeBlocos' });

    return GrupoDeBlocos;
};
