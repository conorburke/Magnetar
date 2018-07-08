const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLFloat
} = graphql;

const db = require('../db');
const ToolType = require('./toolType');

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: GraphQLID },
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone_number: { type: GraphQLString },
		address_1: { type: GraphQLString },
		address_2: { type: GraphQLString },
		city: { type: GraphQLString },
		region: { type: GraphQLString },
		zipcode: { type: GraphQLString },
		birth_date: { type: GraphQLInt },
		loan_rating: { type: GraphQLFloat },
		borrow_rating: { type: GraphQLFloat },
		owned_tools: {
			type: new GraphQLList(ToolType),
			resolve(parentValue) {
				return db('users')
					.join('tools', 'users.id', '=', 'tools.owner_id')
					.select()
					.where('tools.owner_id', parentValue.id)
					.then(rows => rows);
			}
		},
		rented_tools: {
			type: new GraphQLList(ToolType),
			resolve(parentValue) {
				return db('tools')
					.join('rented_tools', 'rented_tools.tool_id', '=', 'tools.id')
					.select()
					.where('rented_tools.renter_id', parentValue.id)
					.then(rows => rows);
			}
		}
	})
});

module.exports = UserType;
