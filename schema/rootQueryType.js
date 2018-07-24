const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const db = require('../db');
const DepotType = require('./depotType');
const RentedToolType = require('./rentedToolType');
const ToolType = require('./toolType');
const ToolPictureType = require('./toolPictureType');
const UserType = require('./userType');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		depots: {
			type: new GraphQLList(DepotType),
			resolve() {
				return db.select().from('depots');
			}
		},
		rentedTools: {
			type: new GraphQLList(RentedToolType),
			resolve() {
				return db.select().from('rented_tools');
			}
		},
		tools: {
			type: new GraphQLList(ToolType),
			resolve() {
				return db.select().from('tools');
			}
		},
		tool: {
			type: ToolType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('tools')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		},
		toolPictures: {
			type: new GraphQLList(ToolPictureType),
			resolve() {
				return db.select().from('tool_pictures');
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve() {
				return db.select().from('users');
			}
		},
		user: {
			type: UserType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('users')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		}
	})
});

module.exports = RootQuery;
