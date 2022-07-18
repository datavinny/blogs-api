const { Category } = require('../database/models');

const getCategories = async (req, res) => {
  try {
    const rawCategories = await Category.findAll();
    const valuesCategories = rawCategories.map((e) => e.dataValues);
    return res.status(200).json(valuesCategories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = getCategories;