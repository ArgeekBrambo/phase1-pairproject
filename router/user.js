const express = require ('express')
const Controller = require('../controllers/crudController')
const router = express.Router()



router.get('/formAddPatient', Controller.formAddPatient)
router.post('/formAddPatient', Controller.formCreatePatient)
// router.get('/edit/:id', Controller.editFormAdmin)
// router.post('/edit/:id', Controller.employeeEditAdmin)
// router.get('/edit/:id', Controller.editFormPatient)
// router.post('/edit/:id', Controller.employeeEditPatient)

module.exports = router