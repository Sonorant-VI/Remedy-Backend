module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }, 
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hashed_pass: {
        type: Sequelize.STRING,
        allowNull: true
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },{
      tableName:'remedy.gc.user'
  });
    User.schema('remedy');
    return User;
  };