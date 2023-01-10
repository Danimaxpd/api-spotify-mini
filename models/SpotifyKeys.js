module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SpotifyKeys', {
        client_id: DataTypes.STRING,
        client_secret: DataTypes.STRING,
        access_token: DataTypes.STRING,
        token_type: DataTypes.STRING,
        scope: DataTypes.STRING,
        expires_in: DataTypes.INTEGER,
        refresh_token: DataTypes.STRING,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
};