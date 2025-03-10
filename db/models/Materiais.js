const { Model, DataTypes } = require('sequelize');

class Material extends Model {}

module.exports = (sequelize) => {
    Material.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipoMaterial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        detalhes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagem: {
            type: DataTypes.TEXT, // Usamos TEXT para armazenar a imagem em base64
            allowNull: true,
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
        modelName: 'Material',
        tableName: 'materiais', // Opcional: especifica o nome da tabela no banco de dados
    });

    return Material;
};
