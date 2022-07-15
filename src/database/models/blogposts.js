const BlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define("BlogPosts", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {timestamps: false});

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'postId',
    });
  };

  return BlogPosts;
};

module.exports = BlogPosts;