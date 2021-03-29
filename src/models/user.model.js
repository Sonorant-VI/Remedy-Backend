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
      hashedpass: {
        type: Sequelize.STRING(512),
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
      tableName:"gc_user",
      schema:"remedy"
    });
    return User;
  };
