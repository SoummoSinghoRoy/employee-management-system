const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');

const { departmentListGetController } = require('./departmentApiController');

router.get('/list', isAuthenticated, departmentListGetController);


module.exports = router;