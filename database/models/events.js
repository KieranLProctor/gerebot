module.exports = (client) => {
    return client.sequelize.define('events', {
        id: {
            type: client.dataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        guild_id: {
            type: client.dataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: client.dataTypes.INTEGER,
            allowNull: false
        }
    });
};