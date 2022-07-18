const { Category } = require('../database/models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: '"name" is required' });
    const result = await Category.create({ name });
    return res.status(201).json(result.dataValues);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = createCategory;