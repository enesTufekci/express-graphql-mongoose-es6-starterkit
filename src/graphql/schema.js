import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import nodes from './nodes';


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: nodes.queries,
});

// const RootMutation = new GraphQLObjectType({
//   name: 'RootMutationType',
//   fields: nodes.mutations
// });

export default new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation
});
