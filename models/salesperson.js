module.exports = (sequelize, DataTypes) => {
    const SalesPerson = sequelize.define(
      "SalesPersons",
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
        empId: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        superAdminId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        branchManagerId: {
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

    return SalesPerson;
};