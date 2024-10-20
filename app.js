const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const db = require('./db/models');

// Importar rotas
const setupRoutes = require('./routes');

// Configuração do CORS
app.use(cors({
    origin: 'https://app.manualmais.com.br',  // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeçalhos HTTP permitidos
    credentials: true  // Permite cookies e dados de autenticação
}));

// Middleware para análise do corpo da solicitação
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

// Setup de rotas
setupRoutes(app);

// Servindo arquivos estáticos
app.use('/storage', express.static(__dirname + '/public/files/'));

// Documentação
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swaggerDefinition');
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro para debugging
    res.status(500).send({ error: 'Algo deu errado!' });
});


// Iniciar o servidor
server.listen(5000, () => {

    // Sincronização do banco de dados
    // const ambiente = 'production';
    const ambiente = 'develop';
    const syncOptions = ambiente === "production" ? {} : { alter: true };
    db.sequelize.sync(syncOptions).then(() => {

        console.log("Ambiente: ", ambiente);
        console.log("Todos os modelos foram sincronizados com sucesso.");
        
    }).catch((error)=>{
        console.log("Erro: ", error );
    });
});