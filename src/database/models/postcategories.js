module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories',
    {},
    { timestamps: false },
  );

  PostCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Users, {
      as: 'users',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'userId',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategories;
};