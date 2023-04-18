

const { Model, DataTypes } = require("sequelize");

module.exports = class Contact extends Model {
   static init(sequelize) {
      super.init({
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         phone: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         bio: {
            type: DataTypes.TEXT,
            defaultValue: '',
         },
      }, { sequelize })
   }
}