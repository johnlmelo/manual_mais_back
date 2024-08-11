module.exports = {
    development: {
      username: "john",
      password: "235689",
      database: "maismanual",
      host: "localhost",
      dialect: "mysql",
      timezone: "+03:00",
      logging: console.log, // Habilita a exibição de logs do Sequelize
    },
    test: {
      username: "test_user",
      password: "senha_segura",
      database: "db_test",
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "+03:00", // Ajuste conforme o fuso horário desejado
      logging: false, // Desabilita a exibição de logs para testes
    },
    production: {
      username: 'webmaster', // Recomendado: use variáveis de ambiente para produção
      password: '235689#Manual',
      database: 'manual_db',
      host: 'localhost',
      dialect: "mysql",
      port: 25060,
      timezone: "+03:00", // Ajuste conforme o fuso horário desejado
      logging: false, // Geralmente desabilitado em produção
      pool: { // Opções de pool de conexão (opcional)
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  };
  
  //mysql -u root -p -e "SET GLOBAL sql_mode = 'NO_ENGINE_SUBSTITUTION'";
  // CREATE USER 'john'@'localhost' IDENTIFIED BY '235689';
  // GRANT ALL PRIVILEGES ON ava_project.* TO 'john'@'localhost';
  
  