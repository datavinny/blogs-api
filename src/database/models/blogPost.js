const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Configuram o que deve acontecer ao atualizar ou excluir um usuário
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        // Informa a tabela da referência da associação
        model: 'User',
        // Informa a coluna da referência que é a chave correspondente
        key: 'id',
      },
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {timestamps: false});

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'id',
    });
  };

  return BlogPost;
};

module.exports = BlogPost;