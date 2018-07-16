module.exports = require('knex')({
	client: 'pg',
	version: '10.0',
	connection: process.env.DATABASE_URL
});
