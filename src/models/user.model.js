module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      uid: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }, 
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hashedPass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return User;
  };