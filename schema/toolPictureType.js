const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ToolPictureType = new GraphQLObjectType({
	name: 'ToolPictureType',
	fields: () => ({
		id: { type: GraphQLID },
		tool_id: { type: GraphQLID },
		image: { type: GraphQLString }
	})
});

module.exports = ToolPictureType;
