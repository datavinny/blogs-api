const { User } = require('../database/models');

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findOne({ where: { id } });
    if (!foundUser) return res.status(404).json({ message: 'User does not exist' });
    const foundUserValues = foundUser.dataValues;
    delete foundUserValues.password;
    return res.status(200).json(foundUserValues);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = getUserById;