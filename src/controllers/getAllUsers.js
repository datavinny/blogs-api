const { User } = require('../database/models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    const arrUsers = users.map((e) => e.dataValues);
    return res.status(200).json(arrUsers);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = getAllUsers;