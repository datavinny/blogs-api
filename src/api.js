const express = require('express');

// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`

// const Models = require('./database/models');
const Auth = require('./controllers/middlewares/auth');
const Controllers = require('./controllers');

app.post('/login', Auth.login, Controllers.createLogin);
app.post('/user', Auth.createUserBody, Controllers.createUser);

app.get('/user', Auth.validateJWT, Controllers.getAllUsers);
app.get('/user/:id', Auth.validateJWT, Controllers.getUserById);

module.exports = app;