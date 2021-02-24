const router = require('express').Router;
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');

const validateNewSquad = [
    check('squadName')
        .exists({ checkFalsy: true })
        .withMessage('Squad name cannot be empty')
        .isLength({ min: 4, max: 50 }),
];

module.exports = router;
