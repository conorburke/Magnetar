module.exports = require('knex')({
	client: 'pg',
	version: '10.0',
	connection: {
		host: process.env.DATABASE_URL,
		user: 'seker',
		password: process.env.DB_PASSWORD,
		database: 'seker_dev'
	}
});
