const bcrypt = require('bcryptjs');

const resolvers = {
    Query: {
        async user(root, { id }, { db }) {
            return db.User.findById(id);
        },

        async getAllGames(root, args, { db }) {
            return db.Game.findAll();
        },

        async getAllEvents(root, args, { db }) {
            return db.Event.findAll();
        },

        async getAllSquads(root, args, { db }) {
            return db.Squad.findAll();
        },
    },

    Mutation: {
        async createUser(root, {name, email, password}, {db}) {
            return db.User.create({
                name, email, password: bcrypt.hashSync(password)
            })
        },

        async createSquad(root, {userId, squadName, description, primaryType, secondaryType, games})
    }
};
