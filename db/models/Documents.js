const { Model, DataTypes } = require('sequelize');

class Documents extends Model {}

module.exports = (sequelize) => {
    Documents.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },file: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('file', 'folder'),
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true, // Nulo para pastas
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true, // Pode não ter data de validade
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Nulo para itens na raiz
            references: {
                model: 'Documents',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'Documents',
    });

    // Auto-relacionamento para hierarquia
    Documents.hasMany(Documents, {
        as: 'children',
        foreignKey: 'parentId',
    });
    Documents.belongsTo(Documents, {
        as: 'parent',
        foreignKey: 'parentId',
    });

    return Documents;
};
