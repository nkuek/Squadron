const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');

router.get(
    '/:eventId',
    restoreUser,
    requireAuth,
    asyncHandler(async (req, res) => {
        console.log('events route');
        res.redirect('/login');
    })
);

module.exports = router;
