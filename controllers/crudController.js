const { Disease, Profile, User, Patient, Doctor } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
class Controller {
    static formAdd(req, res) {
        let error = req.query.error
        res.render('formAdd', { error })
    }

    static formCreate(req, res) {
        const { userName, email, password, role, name, age, location, gender } = req.body
        User.create({ userName, email, password, role })
        .then((data) => {
        let UserId = data.id
                // res.send(data)
                // console.log(data.id);s


                // const fkData = data.id
        Profile.create({ name, age, location, gender, UserId })
        })
        .then(() => {
        res.redirect('/admin')
        })
        .catch(err => {
                let error = err.errors.map(el => {
                    return el.message
                })
                if (error) {
                    res.redirect(`/user/formAdd?error=${error}`)
                } else {
                    res.send(err)
                }
        })

    }

    static formAddPatient(req, res) {
        let error = req.query.error

        User.findAll({
            where: {role : 'admin'},
            include: {
                model: Profile,
                include: Doctor
            }
        })
        .then(data => {
            // res.send(data)
            res.render('formPatientAdd', { error, data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static formCreatePatient(req, res) {
        // console.log(req.body,'<<<< req BODY');
        const { userName, email, password, role, name, age, location, gender, DoctorId, status } = req.body
        User.create({ userName, email, password, role })
        .then((data) => {
            let UserId = data.id
            return Profile.create({ name, age, location, gender, UserId })
        })
        .then((data) => {
                
            console.log(data,'<<<<<< data NIcHHHH');
            let ProfileId = data.id
            Patient.create({DoctorId, status, ProfileId})
        })
        .then(() => {
                res.redirect('/login')
        })
        .catch(err => {
                let error = err.errors.map(el => {
                    return el.message
                })
                if (error) {
                    res.redirect(`/user/formAddPatient?error=${error}`)
                } else {
                    res.send(err)
                }
        })

    }

    static profilPage(req, res) {
        let UserId = req.session.UserId
        let res1
        User.findByPk(UserId, {
            include: {
                model: Profile,
                include: {
                    model: Patient,
                    include: Disease
                }
            }            
        })
            .then((data) => {
                res1 = data
                // res.send(data)
                // res.render('profilPage', { data })

                return Doctor.findByPk(res1.Profile.Patient.DoctorId, {
                    include: Profile
                })
            })
            .then((res2) => {
                // res.send(data)
                res.render('profilPage', { res1, res2 })
                // res.send(res1)
            })
            .catch(err => {
                res.send(err)
            })

    }

    static editPatient(req, res) {
        let error = req.query.error
        User.findByPk(req.session.UserId, {
            include: {
                model: Profile,
                include: Disease
            }
        })
            .then(data => {
                // res.send({data})
                res.render("editPatient", { data, error })
                // res.send({data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static patientEdit(req, res) {
        const id = req.params.id
        // console.log(id);
        const { userName, email, password, name, age, location, gender } = req.body
        const passwordNew = hashPassword(password)
        User.update({ userName, email, password: passwordNew }, { where: { id: req.session.UserId } })
            .then((data) => {
                let UserId = data.id
                Profile.update({ name, age, location, gender, UserId }, { where: { id: req.session.UserId } })
            })
            .then(() => {
                res.redirect('/patient')
            })
            .catch(err => {
                let error = err.errors.map(el => {
                    return el.message
                })
                if (error) {
                    res.redirect(`/editPatient/:id?error=${error}`)
                } else {
                    res.send(err)
                }
            })

    }

    static profilAdmin(req, res) {
        User.findAll({
            where: {
                role: 'patient'
            },
            include: {
                model: Profile
            }
        })
            .then(data => {
                // res.send(data)
                res.render('adminPage', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static patientDelete(req, res) {
        let id = +req.params.id
        // Profile.destroy({
        //     where: {
        //         id: id
        //     }
        // }).then(() => {

        //     return User.destroy({
        //         where: {
        //             id: id
        //         }
        //          })

        // })
        User.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect('/admin')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static detailPatient(req, res) {
        let id = req.params.id
        // console.log(id, '<<<<<<');
        User.findByPk(id, {
            include: {
                model: Profile,
                include: Disease
            }
        })
        .then((data) => {
            // res.send(data)
            res.render('detailPatient', {data} )
        })
        .catch(err => {
            res.send(err)
        })

    }

    static adminPatientDelete(req, res) {
        let id = req.params.id  
        Disease.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect(`/admin`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addNewDisease(req, res) {
        const id = req.params.id
        let error = req.query.error
        res.render('formAddDisease', { error, id } )
        
    }

    static addingNewDisease(req, res) {
        const { nameDisease, description, level, ProfileId  } = req.body
        Disease.create({ nameDisease, description, level, ProfileId })
            .then(() => {
                res.redirect(`/admin/detail/${ProfileId}`)
            })
            .catch(err => {
                let error = err.errors.map(el => {
                    return el.message
                })
                if (error) {
                    
                    res.redirect(`/admin/detail/${id}?error=${error}`)
                } else {
                    res.send(err)
                }
            })
    }


}



module.exports = Controller

// const {jsPDF} = require('jspdf')

// const doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'in',
//     format: [4,2]
// })

// const formatPDF = (text) => {
//     doc.text(text)
//     doc.save('text.pdf')
// }

// module.exports = formatPDF