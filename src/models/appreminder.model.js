module.exports = (sequelize, Sequelize) => {
    const AppReminder = sequelize.define("appReminder", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },  
      start: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      stop: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      timeout: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cancelled: {
        type: 'BIT',
        allowNull: false,
        defaultValue: '0'
      },
      reminder_msg: {
        type: Sequelize.STRING,
        defaultValue: 'You have an appointment soon...'
      },
      patientId: {
        type: Sequelize.INTEGER
      }
    },{
      tableName:"gc_appreminder",
      schema:"remedy"
    });

    return AppReminder;
  };
