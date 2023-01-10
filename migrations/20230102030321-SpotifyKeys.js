'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    queryInterface.createTable("SpotifyKeys", {
      client_id: Sequelize.DataTypes.STRING,
        client_secret: Sequelize.DataTypes.STRING,
        access_token: Sequelize.DataTypes.STRING,
        token_type: Sequelize.DataTypes.STRING,
        scope: Sequelize.DataTypes.STRING,
        expires_in: Sequelize.DataTypes.INTEGER,
        refresh_token: Sequelize.DataTypes.STRING,
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("SpotifyKeys");
  }
};
