const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('username')
        .isLength({ max: 30 })
        .withMessage('Username cannot exceed 30 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a password')
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

module.exports = router;
