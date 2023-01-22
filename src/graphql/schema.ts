import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "The root all queries",
    fields: () => ({
      hello: {
        type: GraphQLString,
        resolve: () => "Hello from GraphQL API",
      },
    }),
  }),
});

export default schema;
