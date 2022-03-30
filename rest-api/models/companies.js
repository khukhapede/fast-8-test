"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      companies.hasMany(models.employees, {
        foreignKey: {
          name: "company_id",
        },
      });
    }
  }
  companies.init(
    {
      company_name: DataTypes.STRING,
      telephone_number: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "companies",
    }
  );
  return companies;
};
