// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1]
      }
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    latitude: {
      type: DataTypes.INTEGER
    },

    longitude: {
      type: DataTypes.INTEGER
    }
  });

  // ============================================================================================================================================================
  // code that hanndles many-to-many association

  // adding assoctiation with other model, allowing many-to-many, through a junction table
  Favorite.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts

    // Favorite.hasMany(models.user_favorite)
    // delete "through", "as", foreignKey
    Favorite.belongsToMany(models.User, {
      through: "user_favorite",
      as: "user",
      foreignKey: "user_id"
    });
  };
  return Favorite;
};
