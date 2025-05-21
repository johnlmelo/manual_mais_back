const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const db = require('./db/models');
const setupRoutes = require('./routes');

const app = express();

// Middlewares
app.use(cors({
    origin: 'https://app.manualmais.com.br', // Origem específica para segurança
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

app.use(fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 }, // Limite de 500MB
}));

// Rotas
setupRoutes(app);

// Servir arquivos estáticos
app.use('/storage', express.static(__dirname + '/public/files/'));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    db.sequelize.sync({ alter: true })
        .then(() => {
            console.log("Servidor rodando na porta", PORT);
        })
        .catch((error) => {
            console.log("Erro ao sincronizar modelos:", error);
        });
});
