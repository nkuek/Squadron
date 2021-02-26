const router = require('express').Router();
const asyncHandler = require('express-async-handler');

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
        const games = await db.Games.findAll({
            where: { name: { [Op.iLike]: `%${searchQuery}%` } },
        });

        return res.json({ users, squads, games });
    })
);

module.exports = router;
