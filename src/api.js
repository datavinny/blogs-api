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
const generateToken = require('./services/token');

app.post('/login', Auth.login, (req, res) => {
  try {
    const { email } = req.body;
    const token = generateToken(email);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
});

app.post('/user', Auth.createUserBody, Controllers.createUser);

app.get('/user', Auth.validateJWT, Controllers.getAllUsers);

module.exports = app;