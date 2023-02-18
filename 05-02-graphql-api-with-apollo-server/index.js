import  { ApolloServer, gql } from 'apollo-server';

// The GraphQL schema
const myTypeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    hello: () => 'Hello world!',  
  },
};

const server = new ApolloServer({
  typeDefs: myTypeDefs,
  resolvers: myResolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${3001}`);
});