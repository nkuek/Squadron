const API_KEY = process.env.REACT_APP_API_KEY_RAWG;
const router = require('express').Router();
const fetch = require('node-fetch');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models/');
const ImgPlaceholder = require('random-image-placeholder');
const imgGenerator = new ImgPlaceholder({ width: 200, height: 200 });
const url = imgGenerator.generate();

const createNewGame = (results) =>
    db.Game.create({
        name: results.name,
        genres: results.genres.map((genre) => genre.name),
        metacritic: Number(results.metacritic),
        rating: Number(results.rating),
        image: results.background_image,
        platforms: results.platforms.map((platform) => platform.platform.name),
        released: results.released,
    });

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name } = req.body;

        const game = await db.Game.findOne({
            where: {
                name,
            },
        });

        // if game not in database, add it to database
        if (!game) {
            const formattedName = encodeURI(name);
            const apiRes = await fetch(
                `https://api.rawg.io/api/games?key=${API_KEY}&search=${formattedName}`
            );
            const apiData = await apiRes.json();

            // res === array of game objects from fetch search result
            const apiResults = apiData.results;

            // must narrow down search results because api apparently doesn't have a very good serach function...
            // Iterate through keys of object to find the corrent game

            const gameKey = Object.keys(apiResults).find(
                (key) => apiResults[key].name === name
            );

            const results = apiResults[gameKey];

            const newGame = await createNewGame(results);
            return res.json(newGame);
        } else {
            return res.json(game);
        }
    })
);

router.put(
    '/',
    asyncHandler(async (req, res) => {
        const { userId, gameName } = req.body;

        let game = await db.Game.findOne({
            where: {
                name: gameName,
            },
        });

        if (!game) {
            const formattedName = encodeURI(gameName);
            const apiRes = await fetch(
                `https://api.rawg.io/api/games?key=${API_KEY}&search=${formattedName}`
            );
            const apiData = await apiRes.json();

            // res === array of game objects from fetch search result
            const apiResults = apiData.results;

            // must narrow down search results because api apparently doesn't have a very good serach function...
            // Iterate through keys of object to find the corrent game

            const gameKey = Object.keys(apiResults).find(
                (key) => apiResults[key].name === gameName
            );

            const results = apiResults[gameKey];

            game = await createNewGame(results);
        }

        db.UserGame.create({ UserId: userId, GameId: game.id });

        const user = await db.User.findOne({
            include: [
                {
                    model: db.Game,
                    as: 'usergames',
                },
            ],
            where: { id: userId },
        });

        return res.json(user.usergames);
    })
);

module.exports = router;
