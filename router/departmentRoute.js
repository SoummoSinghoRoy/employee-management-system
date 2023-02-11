const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');

const { 
  departmentGetController,
  departmentCreatePostController, 
  departmentDeleteController,
  departmentNameEditController
} = require('../controllers/departmentController');
const departmentCreateValidator = require('../validators/department/departmentcreateValidator');

router.get('/', isAuthenticated, departmentGetController);
router.post('/', isAuthenticated, departmentCreateValidator, departmentCreatePostController);
router.get('/delete/:id', isAuthenticated, departmentDeleteController);
router.post('/edit/:id', isAuthenticated, departmentNameEditController);


module.exports = router