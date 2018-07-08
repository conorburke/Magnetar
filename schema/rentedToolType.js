const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;

const RentedToolType = new GraphQLObjectType({
	name: 'RentedToolType',
	fields: () => ({
		id: { type: GraphQLID },
		tool_id: { type: GraphQLID },
		renter_id: { type: GraphQLID },
		start_date: { type: GraphQLString },
		end_date: { type: GraphQLFloat }
	})
});

module.exports = RentedToolType;
