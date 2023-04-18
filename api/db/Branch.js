

const { Model, DataTypes } = require("sequelize");

module.exports = class Branch extends Model {
   static init(sequelize) {
      super.init({
         title: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         body: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      }, { sequelize })
   }
}