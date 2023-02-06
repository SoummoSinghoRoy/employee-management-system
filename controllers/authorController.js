const db = require('../models/index');
let Author_Organization = db.author_organization;

exports.authorRegistrationGetController = (req, res, next) => {
  return res.render('pages/author/authorRegister.ejs', {
    title: "Author Registration",
    error: null
  })
}

exports.authorRegistrationPostController = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
}