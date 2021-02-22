const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

router.get(
    '/events/:eventId',
    requireAuth,
    asyncHandler(async (req, res) => {
        res.send('hello');
    })
);

module.exports = router;
