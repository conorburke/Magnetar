const graphql = require('graphql');
const {
	GraphQLFloat,
	GraphQLID,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = graphql;

const db = require('../../db');
const DepotType = require('../types/depotType');
const RentedToolType = require('../types/rentedToolType');
const ToolPictureType = require('../types/toolPictureType');
const ToolType = require('../types/toolType');

const mutations = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addTool: {
			type: ToolType,
			args: {
				title: { type: GraphQLString },
				category: { type: GraphQLString },
				description: { type: GraphQLString },
				price: { type: GraphQLFloat },
				depot_id: { type: GraphQLID }
			},
			resolve(parentValue, { title, category, description, price, depot_id }) {
				return db('tools').insert({
					title,
					category,
					description,
					price,
					depot_id
				});
			}
		},
		addDepot: {
			type: DepotType,
			args: {
				address_1: { type: GraphQLString },
				address_2: { type: GraphQLString },
				city: { type: GraphQLString },
				region: { type: GraphQLString },
				zipcode: { type: GraphQLInt },
				owner_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ address_1, address_2, city, region, zipcode, owner_id }
			) {
				return db('depots').insert({
					address_1,
					address_2,
					city,
					region,
					zipcode,
					owner_id
				});
			}
		},
		addToolPicture: {
			type: ToolPictureType,
			args: {
				image: { type: GraphQLString },
				tool_id: { type: GraphQLID }
			},
			resolve(parentValue, { image, tool_id }) {
				return db('tool_pictures').insert({
					image,
					tool_id
				});
			}
		},
		addRentedTool: {
			type: RentedToolType,
			args: {
				start_date: { type: GraphQLFloat },
				end_date: { type: GraphQLFloat },
				tool_id: { type: GraphQLID },
				renter_id: { type: GraphQLID },
				owner_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ start_date, end_date, tool_id, renter_id, owner_id }
			) {
				return db('rented_tools').insert({
					start_date,
					end_date,
					tool_id,
					renter_id,
					owner_id
				});
			}
		}
	}
});

module.exports = mutations;
