'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Book , {
        foreignKey:"AuthorId",
      })
      Author.belongsTo(models.User , {
        foreignKey:'UserId'
      })
    }
  };
  Author.init({
    UserId: DataTypes.INTEGER,
    authorfirst: DataTypes.STRING,
    authorlast: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};