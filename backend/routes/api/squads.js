const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');

const { Squad } = require('../../db/models');

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
        const { squadName, description, captain } = req.body;

        const squad = await Squad.create({
            squadName,
            description,
            captain,
        });

        return res.json({ squad });
    })
);

module.exports = router;
