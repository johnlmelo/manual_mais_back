const Empreendimentos = require('../api/empreendimentos/Routes');
const Blocos = require('../api/blocos/Routes');
const Manuais = require('../api/manuais/Routes');
const Files = require('../api/files/Routes');
const Torres = require('../api/torres/Routes');
const Tipologias = require('../api/tipologias/Routes');
const Unidades = require('../api/unidades/Routes');

const setupRoutes = (app) => {
    app.use('/empreendimentos', Empreendimentos);
    app.use('/blocos', Blocos);
    app.use('/', Files);
    app.use('/manuais', Manuais);
    app.use('/torres', Torres);
    app.use('/tipologias', Tipologias);2
    app.use('/unidades', Unidades);
};

module.exports = setupRoutes; 