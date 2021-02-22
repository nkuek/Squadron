const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Load list of games
router.put(
    '/',
    asyncHandler(async (req, res) => {
        const data = await req.body;
        console.log(data);
    })
);

module.exports = router;
