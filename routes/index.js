const router = require('express').Router();
const api = require('./api');
const cookieParser = require('cookie-parser');

// router.use(cookieParser())
router.use('/api', api);

module.exports = router;
