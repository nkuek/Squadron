const bcrypt = require('bcryptjs');

const resolvers = {
    Query: {
        async user(root, { id }, { models }) {
            return models.User.findById(id);
        },
        async getAllGames(root, args, { models }) {
            return models.Game.findAll();
        },
        async getAllEvents(root, args, { models }) {
            return models.Event.findAll();
        },
        async getAllSquads(root, args, { models }) {
            return models.Squad.findAll();
        },
    },
};
