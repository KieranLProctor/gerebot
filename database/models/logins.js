module.exports = (client) => {
    return client.sequelize.define('logins', {
        id: {
            type: client.dataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        guilds_serving: {
            type: client.dataTypes.INTEGER,
            allowNull: false
        }
    });
};