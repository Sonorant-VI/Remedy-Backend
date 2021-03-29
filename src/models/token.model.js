module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("token", {
        tid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue:Sequelize.NOW,
            allowNull: false
        }
    });

    return Token;
};
