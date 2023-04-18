
const { Sequelize } = require("sequelize");
const Branch = require("./Branch");
const Contact = require("./Contact");
const Media = require("./Media");

let storage;

if (process.env.NODE_ENV === 'test')
   storage = ':memory:';
else
   storage = `${__dirname}/db.sqlite`;

const sequelize = new Sequelize('', '', '', { 
   dialect: 'sqlite',
   storage,
   logging: false
});


async function init() {

   // initialize models
   Branch.init(sequelize);
   Contact.init(sequelize);
   Media.init(sequelize);
   
   // relationships
   /// Branch
   Branch.belongsTo(Branch, {
      foreignKey: {
         name: 'parent',
         allowNull: true,
      },
      onDelete: 'CASCADE',
   });

   Branch.hasMany(Media, {
      foreignKey: {
         name: 'branch',
      },
      as: '__media',
   });


   /// Media
   Media.belongsTo(Branch, {
      foreignKey: {
         name: 'branch',
         allowNull: false,
      },
      onDelete: 'CASCADE',
   });

   // initialize DB
   await sequelize.sync({ force: false });

}


module.exports = {
   init,
   sequelize,
}