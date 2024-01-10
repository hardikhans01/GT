module.exports = (sequelize, DataTypes) => {
    const EmployeeCredential = sequelize.define(
      "EmployeeCredentials",
      {
        // Model attributes are defined here
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          // allowNull defaults to true
        },
        empId: {
          type: DataTypes.STRING,
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
    
    
  
    return EmployeeCredential;
  };