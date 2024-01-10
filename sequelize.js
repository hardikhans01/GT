const {Sequelize,DataTypes} = require('sequelize');


const sequelize = new Sequelize('<DATABASE_NAME>','<USERNAME>','<PASSWORD>',{
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
    console.log('sequelize authenticated successfully');
}catch(e){
    console.log('error authenticating -> ',e);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require('./models/employee')(sequelize,DataTypes);
db.superadmin = require('./models/superadmin')(sequelize,DataTypes);
db.branchmanager = require('./models/branchmanager')(sequelize,DataTypes);
db.salesperson = require('./models/salesperson')(sequelize,DataTypes);
db.employeecredentials = require('./models/employeecredentials')(sequelize,DataTypes);


db.sequelize.sync({force: false});

module.exports = db;