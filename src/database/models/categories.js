const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  });

  return Categories;
};

module.exports = Categories;