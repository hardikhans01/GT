module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employees",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      empId:{
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false,
        unique: true,
      }
    },
    {
      // Other model options go here
      timestamps: false,
      createdAt: false,
    }
  );
  
  return Employee;
};