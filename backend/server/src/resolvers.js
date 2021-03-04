const bcrypt = require('bcryptjs');

const resolvers = {
    Query: {
        async user(root, { id }, { db }) {
            return await db.User.findById(id);
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
        async createUser(root, { username, email, password }, { db }) {
            const user = await db.User.create({
                username,
                email,
                password: bcrypt.hashSync(password),
            });

            return user;
        },

        async createSquad(
            root,
            {
                userId,
                squadName,
                description,
                primaryType,
                secondaryType,
                games,
            },
            { db }
        ) {
            return db.Squad.create({
                userId,
                squadName,
                description,
                primaryType,
                secondaryType,
                games,
            });
        },
    },
};

module.export = resolvers;
