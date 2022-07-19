const { BlogPost, PostCategory } = require('../database/models');
const currentTimestamp = require('../helpers/currentTimestamp');

const createPost = async (title, content, categoryIds, userId) => {
    const { null: postId } = await BlogPost.create(
      { userId, title, content, updated: currentTimestamp, published: currentTimestamp },
    );
    
    const arrPostIdCategoryId = categoryIds.map((e) => ({ categoryId: e, postId }));
    await PostCategory.bulkCreate(arrPostIdCategoryId);

    const response = { 
      id: postId, title, content, userId, updated: currentTimestamp, published: currentTimestamp,
    };
    return response;
};

module.exports = createPost;