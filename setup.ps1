# Define the base directory for the project
$baseDir = "my-express-app"

# Create the base directory
New-Item -Path $baseDir -ItemType Directory

# Define the directory structure
$directories = @(
    "$baseDir/config",
    "$baseDir/controllers",
    "$baseDir/models",
    "$baseDir/migrations",
    "$baseDir/seeders",
    "$baseDir/routes",
    "$baseDir/middlewares",
    "$baseDir/utils",
    "$baseDir/tests"
)

# Create the directories
foreach ($dir in $directories) {
    New-Item -Path $dir -ItemType Directory
}

# Define the files to be created with their content
$files = @{}

$files["$baseDir/config/config.js"] = @'
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
'@

$files["$baseDir/controllers/userController.js"] = @'
const { User } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
'@

$files["$baseDir/models/user.js"] = @'
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
'@

$files["$baseDir/routes/userRoutes.js"] = @'
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.create);
router.get("/users", userController.getAll);

module.exports = router;
'@

$files["$baseDir/routes/index.js"] = @'
const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

router.use("/api", userRoutes);

module.exports = router;
'@

$files["$baseDir/app.js"] = @'
const express = require("express");
const app = express();
const routes = require("./routes");
const { sequelize } = require("./models");

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
  console.log("Database synchronized");
});
'@

$files["$baseDir/.env"] = @'
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database
DB_DIALECT=mysql
'@

$files["$baseDir/.gitignore"] = @'
node_modules
.env
'@

$files["$baseDir/package.json"] = @'
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "An Express application with Sequelize and MySQL",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mysql2": "^2.2.5",
    "sequelize": "^6.3.5"
  }
}
'@

$files["$baseDir/README.md"] = @'
# My Express App

This is a sample Express application using Sequelize and MySQL.
'@

# Create the files and add the content
foreach ($file in $files.GetEnumerator()) {
    New-Item -Path $file.Key -ItemType File -Force
    Set-Content -Path $file.Key -Value $file.Value
}
