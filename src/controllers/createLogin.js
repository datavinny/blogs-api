const generateToken = require('../services/token');

const createLogin = (req, res) => {
  try {
    const { userId, email } = req.user;
    console.log(req.user);
    const token = generateToken({ userId, email });
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = createLogin;