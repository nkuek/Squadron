const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.')
        .custom((value) => {
            return db.User.findOne({ where: { username: value } }).then(
                (user) => {
                    if (user) return Promise.reject('Email is already in use.');
                }
            );
        }),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.')
        .matches(/^[a-zA-Z0-9_.-]*$/)
        .withMessage('Username should only include numbers and letters')
        .isLength({ max: 30 })
        .withMessage('Username cannot exceed 30 characters.')
        .custom((value) => {
            return db.User.findOne({ where: { username: value } }).then(
                (user) => {
                    if (user)
                        return Promise.reject('Username is already in use.');
                }
            );
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a password.')
        .isLength({ max: 50 })
        .withMessage('Password cannot exceed 50 characters.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage(
            'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
        ),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please confirm your password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password cannot exceed 50 characters.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
    handleValidationErrors,
];

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        const user = await User.signup({ username, email, password });

        await setTokenCookie(res, user);
        return res.json({ user });
    })
);

router.put(
    '/',
    asyncHandler(async (req, res) => {
        const { username } = req.body;
        const user = await db.User.findOne({
            include: [
                {
                    model: db.Squad,
                    as: 'squadmates',
                },
                { model: db.Squad, as: 'captain' },
            ],
            where: { username },
        });

        console.log(user);

        return res.json(user);
    })
);

router.put(
    '/squads',
    asyncHandler(async (req, res) => {
        const { username } = req.body;
        const user = await db.User.findAll({
            include: [{ model: db.Squad, as: 'captain' }],
            where: { username },
        });

        return res.json({ user });
    })
);

router.put(
    '/:username/about',
    asyncHandler(async (req, res) => {
        const { newAbout } = req.body;
        const user = await db.User.findByPk(newAbout.userId);
        await user.update({
            description: newAbout.userAbout,
        });
        return res.json(user);
    })
);

module.exports = router;
