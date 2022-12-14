const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      // set(value) {
      //   this.setDataValue('password', hash(value));
      // }
    },
    image: DataTypes.STRING,
  }, {timestamps: false});

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blogPost',
      foreignKey: 'id',
    });
  };

  return User;
};

module.exports = User;