"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employees.belongsTo(models.companies, {
        foreignKey: {
          name: "company_id",
        },
      });
    }
  }
  employees.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      jobtitle: {
        type: DataTypes.ENUM,
        values: ["director", "manager", "staff"],
      },
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "employees",
    }
  );
  return employees;
};
