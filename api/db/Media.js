

const { Model, DataTypes } = require("sequelize");

module.exports = class Media extends Model {
   static init(sequelize) {
      super.init({
         ext: {
            type: DataTypes.STRING,
            allowNull: false,
         }
      }, { sequelize })
   }
}