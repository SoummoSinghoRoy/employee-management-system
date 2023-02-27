const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');

const { departmentListGetController } = require('./departmentApiController');

router.get('/', isAuthenticated, departmentListGetController);


module.exports = router;