const { gql, IResolvers } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        owned_squads: [Squad]
        authored_events: [Event]
        games: [Game]
    }

    type Game {
        id: ID!
        title: String!
        released: String!
        rating: Int!
        metacritic: Int
        genres: [String!]
        platforms: [String!]
        image: String
    }

    """
    A Squad is a user created group that other users can join. Each squad has a list of games they like to play as well as events that users create.
    """
    type Squad {
        id: ID!
        squadName: String!
        description: String!
        primaryType: String!
        events: [Event]
        squadmates: [User]
        squadImage: String
        secondaryType: String
        games: [Game]
    }

    type Event {
        title: String!
        date: String!
        details: String!
        user: User!
        squad: Squad!
        game: Game!
    }

    type Query {
        "Grab a specific user if they exist in db"
        user(id: Int!): User

        "Grab games to populate games page"
        getAllGames: [Game!]

        "Grab squads to populate squads page"
        getAllSquads: [Squad!]

        "Grab events to populate events page"
        getAllEvents: [Event!]
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!

        createSquad(
            userId: Int!
            squadName: String!
            description: String!
            primaryType: String!
            secondaryType: String
            games: [Game!]
        ): Squad!

        createEvent(
            userId: Int!
            squadId: Int!
            title: String!
            date: String!
            details: String!
            gameId: Int!
        ): Event!
    }
`;

module.exports = typeDefs;
