const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');

const { 
  departmentGetController,
  departmentCreatePostController 
} = require('../controllers/departmentController');
const departmentCreateValidator = require('../validators/department/departmentcreateValidator');

router.get('/', isAuthenticated, departmentGetController);
router.post('/', isAuthenticated, departmentCreateValidator, departmentCreatePostController);


module.exports = router