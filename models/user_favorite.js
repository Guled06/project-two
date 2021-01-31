module.exports = function(sequelize, DataTypes) { // eslint-disable-line
  const UserFavorite = sequelize.define("UserFavorite", {});
  return UserFavorite;
  // this is our junction model (gets filled by associations in both user and favorite)
  // simply including this empty model in the directory makes it so much easier to manipulate
};
