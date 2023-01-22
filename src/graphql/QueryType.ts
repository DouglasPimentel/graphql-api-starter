import { GraphQLObjectType, GraphQLString } from "graphql";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root all queries",
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from GraphQL API",
    },
  }),
});

export default QueryType;
