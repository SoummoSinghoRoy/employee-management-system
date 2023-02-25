const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/authentication');
const { searchController } = require('../controllers/searchController');

router.get('/', isAuthenticated, searchController)

module.exports = router