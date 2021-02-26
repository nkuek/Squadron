const API_KEY = process.env.REACT_APP_API_KEY_RAWG;
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');
const db = require('../../db/models');
const { Op } = require('sequelize');

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { searchQuery } = req.body;
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
            `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}`
        );

        const apiData = await apiRes.json();

        const games = apiData.results;

        return res.json({ users, squads, games });
    })
);

module.exports = router;
