const API_KEY = process.env.REACT_APP_API_KEY_RAWG;
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const db = require('../../db/models');
const { Op } = require('sequelize');
const ImgPlaceholder = require('random-image-placeholder');
const imgGenerator = new ImgPlaceholder({ width: 200, height: 200 });
const url = imgGenerator.generate();

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { searchQuery } = req.body;
        console.log(url);
        console.log('hello');
        const users = await db.User.findAll({
            where: {
                username: { [Op.iLike]: `%${searchQuery}%` },
            },
        });

        const squads = await db.Squad.findAll({
            where: {
                squadName: { [Op.iLike]: `%${searchQuery}%` },
            },
        });

        const apiRes = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}&page_size=100&ordering=name`
        );
        const apiData = await apiRes.json();
        const apiResults = apiData.results;

        const games = apiResults.map((game) => ({
            name: game.name,
            genres: game.genres.map((genre) => genre.name),
            metacritic: Number(game.metacritic),
            rating: Number(game.rating),
            image: game.background_image,
            platforms:
                game.platforms &&
                game.platforms.map((platform) => platform.platform.name),
            released: game.released,
        }));

        return res.json({ users, squads, games });
    })
);

module.exports = router;
