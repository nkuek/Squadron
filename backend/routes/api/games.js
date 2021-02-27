const API_KEY = process.env.REACT_APP_API_KEY_RAWG;
const router = require('express').Router();
const fetch = require('node-fetch');
const asyncHandler = require('express-async-handler');
const { Game } = require('../../db/models/');

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        console.log(name);

        const game = await Game.findOne({
            where: {
                name,
            },
        });

        // if game not in database, add it to database
        if (!game) {
            const nameArray = name.split(' ');
            const searchParam = nameArray.join('%');
            const apiRes = await fetch(
                `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchParam}`
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

            const newGame = await Game.create({
                name: results.name,
                genres: results.genres.map((genre) => genre.name),
                metacritic: Number(results.metacritic),
                rating: Number(results.rating),
                image: results.background_image,
                platforms: results.platforms.map(
                    (platform) => platform.platform.name
                ),
                released: results.released,
            });

            return res.json(newGame);
        } else {
            return res.json(game);
        }
    })
);

module.exports = router;
