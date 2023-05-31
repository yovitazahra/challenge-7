const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				name: "Yovita Zahra",
				email: 'yovitazahra@gmail.com',
				encryptedPassword: bcrypt.hashSync('123456', 10),
				roleId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Khoerinisa",
				email: 'khoerinisa@gmail.com',
				roleId: null,
				encryptedPassword: bcrypt.hashSync('123456', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
	}
};