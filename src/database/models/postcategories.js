module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories',
    {},
    { timestamps: false },
  );

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categoryId',
      through: PostCategories,
      foreignKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategories,
      foreignKey: 'id',
    });
  };

  return PostCategories;
};