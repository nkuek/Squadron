const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('../../db/models');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
});

server
    .listen()
    .then(({ url }) => console.log('Server is running on localhost:4000'));
