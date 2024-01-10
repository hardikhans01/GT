module.exports = (sequelize, DataTypes) => {
  const SuperAdmin = sequelize.define(
    "SuperAdmins",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      empId:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      }
    },
    {
      // Other model options go here
      timestamps: false,
      createdAt: false,
    }
  );
  
  return SuperAdmin;
};