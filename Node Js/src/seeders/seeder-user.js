'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [       //chạy bình thường thì chạy vào up. còn down là rollback là chạy vào down
      {
        email: 'thaibinh1004@gmail.com',
        password: 'thaibinh123',
        firstName: 'Phạm',
        lastName: 'Thái Bình',
        address: 'Đà Nẵng',
        gender: 1,
        roleId: 'R1',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
