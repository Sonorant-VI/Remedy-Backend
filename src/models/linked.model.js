module.exports = (sequelize, Sequelize) => {
    const Linked = sequelize.define("linked", {
      uid_linker: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }, 
      uid_linked: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  
    return Linked;
  };