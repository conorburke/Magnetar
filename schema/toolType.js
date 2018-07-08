const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLFloat,
	GraphQLInt
} = graphql;

const db = require('../db');
const ToolPictureType = require('./toolPictureType');

const ToolType = new GraphQLObjectType({
	name: 'ToolType',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		category: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLFloat },
		owner_id: { type: GraphQLID },
		tool_pictures: {
			type: new GraphQLList(ToolPictureType),
			resolve(parentValue) {
				return db('tools')
					.join('tool_pictures', 'tools.id', '=', 'tool_pictures.tool_id')
					.select()
					.where('tool_pictures.tool_id', parentValue.id)
					.then(rows => rows);
			}
		},
		start_date: { type: GraphQLInt },
		end_date: { type: GraphQLInt }
	})
});

module.exports = ToolType;
