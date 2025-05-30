'use strict';
const setupAssociations = require('../associations');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = 'production';
const env = 'development';
const config = require('../database')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    timezone: config.timezone
  }
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

setupAssociations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;