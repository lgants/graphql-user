const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: "23", firstName: 'Bill', age: 20 },
  { id: "24", firstName: 'Samantha', age: 21 }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});

// RootQuery allows graphql to enter into the data graph
// args specifies arguments required for the root query of a user
// resolve function grabs the data from the database
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // returns a raw JS object
        return _.find(users, { id: args.id });
      }
    }
  }
});

// GraphQLSchema takes in a root query and returns a graphql schema instance
module.exports = new GraphQLSchema({
  query: RootQuery
});
