const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {
    setTokenCookie,
    restoreUser,
    requireAuth,
} = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const gamesRouter = require('./games');
const squadsRouter = require('./squads');
const searchRouter = require('./search');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/games', gamesRouter);
router.use('/squads', squadsRouter);
router.user('/search', searchRouter);

// User Auth Route Testing
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

router.get(
    '/set-token-cookie',
    asyncHandler(async (req, res) => {
        const user = await User.findOne({
            where: {
                username: 'Demo-lition',
            },
        });
        setTokenCookie(res, user);
        return res.json({ user });
    })
);

router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
});

router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
});
module.exports = router;
