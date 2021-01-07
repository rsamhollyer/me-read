'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Author, {
        foreignKey:"AuthorId"
      })
    }
  };
  Book.init({
    AuthorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    copyright: DataTypes.INTEGER,
    totalpages: DataTypes.INTEGER,
    currentpage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};