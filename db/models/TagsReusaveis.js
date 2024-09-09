const { Model, DataTypes } = require('sequelize');

class TagsReusaveis extends Model {}

module.exports = (sequelize) => {
    TagsReusaveis.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: {
            type: DataTypes.STRING,  // Nome descritivo da tag
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,  // O código da tag que será reutilizado
            allowNull: false,
            unique: true,  // Garante que a tag seja única
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, { sequelize, modelName: 'TagsReusaveis' });

    return TagsReusaveis;
};
