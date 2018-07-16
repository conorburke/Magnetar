module.exports = require('knex')({
	client: 'pg',
	version: '10.0',
	connection: {
		host: process.env.DATABASE_URL,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	}
});
