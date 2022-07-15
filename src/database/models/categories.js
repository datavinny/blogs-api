const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {timestamps: false});

  return Categories;
};

module.exports = Categories;