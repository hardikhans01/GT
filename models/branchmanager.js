module.exports = (sequelize, DataTypes) => {
  const BranchManager = sequelize.define(
    "BranchManagers",
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
      empId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      superAdminId: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      // Other model options go here
      timestamps: false,
      createdAt: false,
    }
  );

  return BranchManager;
};