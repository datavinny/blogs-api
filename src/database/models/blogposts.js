const BlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define("BlogPosts", {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  });

  BlogPosts.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Users, {
      as: 'users',
      through: BlogPosts,
      foreignKey: 'postId',
      otherKey: 'userId',
    });
  };

  return BlogPosts;
};

module.exports = BlogPosts;