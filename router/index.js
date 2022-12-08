const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const patientRouter = require('./patient')
const adminRouter = require('./admin')
const Login = require('../controllers/controllerLogin')
const carryId = require('../middlewares/sessionRule')
const checkRole = require('../middlewares/check')

router.get('/', Login.renderHome)
router.get('/login', Login.renderLogin)
router.post('/login', Login.login)
router.use('/user', userRouter)
router.use(carryId)

router.use('/patient', patientRouter)
router.use('/admin', checkRole, adminRouter)
router.get('/pdf', Login.pdf)
router.get('/logout', Login.logout)



module.exports = { router }