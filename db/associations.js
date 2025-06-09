module.exports = (db) => {

    const { 
        Empreendimentos,
        Torres,
        Tipologias,
        Unidades,
        Pages,
        Blocos,
        Manuais,
        TabelaGarantia,
        LinhaGarantia,
        Documents,
        GrupoDeBlocos
    } = db;

    // Associações com cascata de deleção

    // Empreendimentos e Torres
    LinhaGarantia.belongsTo(TabelaGarantia, {
        onDelete: 'CASCADE'
    });
    TabelaGarantia.hasMany(LinhaGarantia, {
        onDelete: 'CASCADE'
    });

    // Empreendimentos e Torres
    Torres.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });
    Empreendimentos.hasMany(Torres, {
        onDelete: 'CASCADE'
    });

    // Documentos
    Empreendimentos.hasMany(Documents, {
        onDelete: 'CASCADE'
    });
    
    Documents.belongsTo(Empreendimentos, {
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

    // Manuais
    Manuais.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });
    Empreendimentos.hasMany(Manuais, {
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

    // Pages e Blocos
    Pages.hasMany(Blocos, {
        onDelete: 'CASCADE'
    });

    Blocos.belongsTo(Pages, {
        onDelete: 'CASCADE'
    });

    // Empreendimentos, Pages e Blocos
    Empreendimentos.hasMany(Blocos, {
        onDelete: 'CASCADE'
    });

    Empreendimentos.hasMany(Pages, {
        onDelete: 'CASCADE'
    });

    Pages.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });

    Blocos.belongsTo(Empreendimentos, {
        onDelete: 'CASCADE'
    });

    GrupoDeBlocos.hasMany(Pages, {
        onDelete: 'CASCADE'
    });

    Pages.belongsTo(GrupoDeBlocos, {
        onDelete: 'CASCADE'
    });

};