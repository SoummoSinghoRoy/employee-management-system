const {Op} = require('sequelize');

const db = require('../models/index');
const Employee = db.employee;
const Department = db.department;

exports.searchController = async (req, res, next) => {
  const {term, page} = req.query

  const currentPage = parseInt(page) || 1
  const employeePerPage = 50

  try {
    let employees = []
    const allEmployees = await Employee.findAndCountAll({
      where: {
        [Op.or]: [
          { role: { [Op.like]: '%' + term + '%' } },
          { '$Department.departmentName$': { [Op.like]: '%' + term + '%' }}
        ]
      },
      include: Department,
      limit: employeePerPage,
      offset: (currentPage * employeePerPage) - employeePerPage 
    })

    allEmployees.rows.map((employee) => {
    const parsedEmployee = JSON.parse(JSON.stringify(employee))
    employees.push(parsedEmployee)
    })

    // res.status(200).json(employees)

    if(employees.length !== 0) {
      res.render('pages/search.ejs', {
        title: `Search result for - ${term}`,
        employees,
        currentPage,
        employeePerPage,
        totalPage: allEmployees.count / employeePerPage,
        term
      })
    } else {
      res.send('404 not found')
    }
    
  } catch (error) {
    next(error)
  }
}