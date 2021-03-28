module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING
      },
      hashedPass: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };