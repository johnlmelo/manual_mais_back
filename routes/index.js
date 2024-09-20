const Empreendimentos = require('../api/empreendimentos/Routes');
const Blocos = require('../api/blocos/Routes');
const Manuais = require('../api/manuais/Routes');
const Files = require('../api/files/Routes');
const Torres = require('../api/torres/Routes');
const Pages = require('../api/pages/Routes');
const Tipologias = require('../api/tipologias/Routes');
const TabelaGarantia = require('../api/tabeladegarantia/Routes');
const Material = require('../api/materiais/Routes');
const LinhaGarantia = require('../api/linhagarantia/Routes');
const TagsReusaveis = require('../api/TagsReusaveis/Routes');
const Unidades = require('../api/unidades/Routes');

const setupRoutes = (app) => {
    app.use('/empreendimentos', Empreendimentos);
    app.use('/blocos', Blocos);
    app.use('/', Files);
    app.use('/manuais', Manuais);
    app.use('/materiais', Material);
    app.use('/torres', Torres);
    app.use('/pages', Pages);
    app.use('/tabela-garantia', TabelaGarantia);
    app.use('/linha-garantia', LinhaGarantia);
    app.use('/tipologias', Tipologias);
    app.use('/unidades', Unidades);
    app.use('/tags-reusaveis', TagsReusaveis);
};

module.exports = setupRoutes; 