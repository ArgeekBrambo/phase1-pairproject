const express = require ('express')
const Controller = require('../controllers/crudController')
const router = express.Router()

router.get('/', Controller.profilAdmin)
router.get('/formAdd', Controller.formAdd)
router.post('/formAdd', Controller.formCreate)
router.get('/delete/:id', Controller.patientDelete)
router.get('/detail/:id', Controller.detailPatient)
router.get('/diseaseDelete/:id', Controller.adminPatientDelete)
router.get('/addNewDisease/:id', Controller.addNewDisease)
router.post('/addNewDisease', Controller.addingNewDisease)


module.exports = router