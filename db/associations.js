module.exports = (db) => {

    const { 
        Empreendimentos,
        Torres,
        Tipologias,
        Unidades,
    } = db;

    // Associações com cascata de deleção

    // Empreendimentos e Torres
    Torres.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });
    Empreendimentos.hasMany(Torres, {
        onDelete: 'CASCADE'
    });

    // Torres e Tipologias
    Tipologias.belongsTo(Torres, {
        onDelete: 'CASCADE'
    });
    Torres.hasMany(Tipologias, {
        onDelete: 'CASCADE'
    });

    // Empreendimentos e Tipologias
    Tipologias.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });
    Empreendimentos.hasMany(Tipologias, {
        onDelete: 'CASCADE'
    });

    // Tipologias e Unidades
    Unidades.belongsTo(Tipologias, {
        onDelete: 'CASCADE'
    });
    Tipologias.hasMany(Unidades, {
        onDelete: 'CASCADE'
    });

    // Torres e Unidades
    Unidades.belongsTo(Torres, {
        onDelete: 'CASCADE'
    });
    Torres.hasMany(Unidades, {
        onDelete: 'CASCADE'
    });

    // Empreendimentos e Unidades
    Unidades.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });
    Empreendimentos.hasMany(Unidades, {
        onDelete: 'CASCADE'
    });

};
