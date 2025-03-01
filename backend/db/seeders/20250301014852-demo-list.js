'use strict';

const { User, List } = require("../models");

const names = ['demo', 'jondoom'];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    for (let name of names) {
      const user = await User.findOne({ where: { username: name} });

      await user.createList({ userId: user.id })
    }
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    for (let name of names) {
      const user = await User.findOne({ where: { username: name } });
      const list = await List.findone({ where: { userId: user.id} })
      await list.destroy()
    }
  }
};
