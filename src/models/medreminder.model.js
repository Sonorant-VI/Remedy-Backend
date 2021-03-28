module.exports = (sequelize, Sequelize) => {
    const MedReminder = sequelize.define("medReminder", {
      id: {
        type: Sequelize.INTEGER,
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
      brand_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      generic_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verified: {
        type: 'BIT'
      },
      reminder_msg: {
        type: Sequelize.STRING
      },
      patient_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return MedReminder;
  };