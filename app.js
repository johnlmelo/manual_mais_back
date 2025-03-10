const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const fileUpload = require('express-fileupload');
const db = require('./db/models');



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(fileUpload()); 
// Importar rotas

const setupRoutes = require('./routes');
// Middleware para análise do corpo da solicitação

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

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


    const ambiente = 'production';
    const syncOptions = { alter: true };
    db.sequelize.sync(syncOptions).then(() => {

        console.log("Ambiente: ", ambiente);
        console.log("Todos os modelos foram sincronizados com sucesso.");
        
    }).catch((error)=>{
        console.log("Erro: ", error );
    });
});