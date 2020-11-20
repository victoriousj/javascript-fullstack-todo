"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Task.associate = function (models) {
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };

  Task.init(
    {
      text: DataTypes.STRING,
      isDone: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
