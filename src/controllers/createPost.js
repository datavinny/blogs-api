const CreatePostService = require('../services/createPost');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;
    const result = await CreatePostService(title, content, categoryIds, userId);
    return res.status(201).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Error Interno do Servidor' });
  }
};

module.exports = createPost;