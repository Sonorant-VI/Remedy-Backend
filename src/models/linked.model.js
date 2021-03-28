module.exports = (sequelize, Sequelize) => {
    const Linked = sequelize.define("linked", {
      uid_linker: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      }, 
      uid_linked: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      }
    });
  
    return Linked;
  };