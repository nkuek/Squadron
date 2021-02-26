const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');

const { Squad } = require('../../db/models');
const db = require('../../db/models');

const validateNewSquad = [
    check('squadName')
        .exists({ checkFalsy: true })
        .withMessage('Squad name cannot be empty.')
        .isLength({ min: 4, max: 50 }),
    check('description')
        .isLength({ min: 1, max: 256 })
        .withMessage('Description must be between 1 and 256 characters.'),
    handleValidationErrors,
];

router.post(
    '/',
    requireAuth,
    validateNewSquad,
    asyncHandler(async (req, res) => {
        const {
            squadName,
            description,
            captainId,
            primaryType,
            secondaryType,
        } = req.body;

        const squad = await Squad.create({
            squadName,
            description,
            captainId,
            primaryType,
            secondaryType,
        });

        return res.json({ squad });
    })
);

router.put(
    '/mysquads',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { userId } = req.body;
        console.log('hello');
        const user = await db.User.findAll({
            include: [{ model: db.Squad }],
            where: { id: userId },
        });

        return res.json({ user });

        // return res.json({ squads });
    })
);

module.exports = router;
