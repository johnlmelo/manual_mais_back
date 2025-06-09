const { Model, DataTypes } = require('sequelize');

class Pages extends Model {}

module.exports = (sequelize) => {
    Pages.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },protegido: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },destaque: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },acessoRapido: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Pages',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE', 
        },
        groupoId: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, { sequelize, modelName: 'Pages' });

    return Pages;
};
