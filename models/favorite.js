// Creating our Favorite model
module.exports = function(sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    name: {
      type: DataTypes.STRING,
      allowNull: false

      // validate: {
      //   len: [1]
      // }
    },

    location: {
      type: DataTypes.STRING
      // allowNull: false
    },

    phone: {
      type: DataTypes.STRING
      // allowNull: false
    },

    website: {
      type: DataTypes.STRING
      // allowNull: false
    },

    longitude: {
      type: DataTypes.INTEGER
    },

    latitude: {
      type: DataTypes.INTEGER
    }
  });

  // ============================================================================================================================================================
  // code that hanndles many-to-many association

  // adding assoctiation with other model, allowing many-to-many, through a junction table
  Favorite.associate = function(models) {
    // Associating Favorite with User
    // When an Favorite is seleted, also delete any associated User
    Favorite.belongsToMany(models.User, {
      through: "UserFavorite",
      foreignKey: "favorite_id"
    });
  };
  return Favorite;
};
