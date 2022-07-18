const { User } = require('../database/models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const arrUsers = users.map((e) => e.dataValues);
    const arrUsersTratado = arrUsers.map(({ id, displayName, email, image }) => ({
        id,
        displayName,
        email,
        // password,
        image,
      }));
    console.log('users', arrUsersTratado);
    return res.status(200).json(arrUsersTratado);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = getAllUsers;