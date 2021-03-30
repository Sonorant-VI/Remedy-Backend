module.exports = (sequelize, Sequelize) => {
    const MedReminder = sequelize.define("medReminder", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },  
      time: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW,
        allowNull: false
      },
      timeout: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      brandName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genericName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verified: {
        type: 'BIT'
      },
      reminderMsg: {
        type: Sequelize.STRING,
        defaultValue: 'You need to take medication soon...'
      },
      patientId: {
        type: Sequelize.INTEGER
      }
    },{
      tableName:"gc_medreminder",
      schema:"remedy"
    });
  
    return MedReminder;
  };