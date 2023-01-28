const router = require('express').Router()

const 
  {
    dashboardGetController
  } = require('../controllers/dashboardController');
const {isAuthenticated} = require('../middlewares/authenticationMiddleware');

router.get('/', isAuthenticated, dashboardGetController);

module.exports = router;