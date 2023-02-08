const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');

const { 
  departmentGetController,
  departmentCreatePostController, 
  departmentDeleteController
} = require('../controllers/departmentController');
const departmentCreateValidator = require('../validators/department/departmentcreateValidator');

router.get('/', isAuthenticated, departmentGetController);
router.post('/', isAuthenticated, departmentCreateValidator, departmentCreatePostController);
router.get('/:id', isAuthenticated, departmentDeleteController);


module.exports = router