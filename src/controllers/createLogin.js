const generateToken = require('../services/token');

const createLogin = (req, res) => {
  try {
    const { email } = req.body;
    const token = generateToken(email);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = createLogin;