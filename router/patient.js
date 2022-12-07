const express = require ('express')
const Controller = require('../controllers/crudController')
const router = express.Router()

router.get('/', Controller.profilPage)
router.get('/editPatient/:id', Controller.editPatient)
router.post('/editPatient/:id', Controller.patientEdit)

module.exports = router