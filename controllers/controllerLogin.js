const bcrypt = require('bcryptjs')
const { hashPassword, compareHash } = require('../helpers/bcrypt')
const { User } = require('../models/index')
const formatPDF = require('../helpers/pdf')
const fs = require('fs')
const path = require('path')

class Login {

  static renderHome(req, res) {
    console.log(req.session);
    res.render('home')
  }

  static renderLogin(req, res) {
    const { errors } = req.query
    res.render('login', { errors })
  }

  static login(req, res) {
    let { userName, password } = req.body

    User.findOne({
      where: {userName}
    })
    .then((result) => {
      // console.log(result, '<<<');
      if (result) {
        const comparePassword = compareHash(password, result.password)

        if (comparePassword) {
          req.session.UserId = result.id
          if (result.role === 'admin') {
            res.redirect('/admin')
          } else if (result.role === 'patient') {
            res.redirect('/patient')
          } 
        } else if  ( !comparePassword ) {
          const errors = 'Invalid Username And Password'
          res.redirect(`/login?errors=${errors}`)
        }
      } else if (!result) {
        const errors = 'Please Input Username and Password'
        res.redirect(`/login?errors=${errors}`)
      }
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static pdf(req, res) {
    const {download} = req.query

    if (download) {
      const downloadPath = path.join(__dirname,'..', 'doc','text.pdf')
      res.download(downloadPath)
    }
    formatPDF('Surat Keterangan Sakit')
    res.render('pdf')
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if(err) {
        res.send(err)
      } else {
        res.redirect('/')
      }
    })
  }

  static downloadPDF(req, res) {



  }

}

module.exports = Login;