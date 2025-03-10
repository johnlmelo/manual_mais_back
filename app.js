const express = require('express');
const http = require('http');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const db = require('./db/models');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(fileUpload());

// Rotas
const setupRoutes = require('./routes');
setupRoutes(app);

// Arquivos estáticos
app.use('/storage', express.static(__dirname + '/public/files/'));

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    db.sequelize.sync({ alter: true })
        .then(() => {
            console.log("Ambiente: production");
            console.log("Servidor e DB sincronizados na porta " + PORT);
        })
        .catch(error => {
            console.error("Erro ao sincronizar DB: ", error);
        });
});
