const { User } = require('../database/models');
const generateToken = require('../services/token');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { null: userId } = await User.create({ displayName, email, password, image });
    const token = generateToken({ userId, email });
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = createUser;