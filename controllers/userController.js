const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  signUpPage: (req,res) => {
    return res.render('signup')
  },
  singUp: (req, res) => {
    User.create({
      name: req.body.name,
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }).then(user => {
      return res.redirect('/singin')
    })
  }
}

module.exports = userController