const { Disease, Profile, User, Patient, Doctor } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
class Controller {
    static formAdd(req, res) {
        let error = req.query.error
        res.render('formAdd', { error })
    }

    static formCreate(req, res) {
        const { userName, email, password, role, name, age, location, gender, specialist } = req.body
        // console.log(req.body);
        User.create({ userName, email, password, role })
            .then((data) => {
                // console.log(data);
                let UserId = data.id
                // res.send(data)
                // console.log(data.id);


                // const fkData = data.id
                return Profile.create({ name, age, location, gender, UserId })
            })
            .then((data) => {
                // console.log(data);
                Doctor.create({
                    specialist,
                    ProfileId: data.id
                })
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

        res.render('formPatientAdd', { error })
    }

    static formCreatePatient(req, res) {
        const { userName, email, password, role, name, age, location, gender } = req.body
        User.create({ userName, email, password, role })
            .then((data) => {
                let UserId = data.id
                Profile.create({ name, age, location, gender, UserId })
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

        User.findByPk(UserId, {
            include: {
                model: Profile,
                include: Patient
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('profilPage', { data })
            })
            .catch(err => {
                console.log(err);
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
        let UserId = req.session.UserId
        let dataUser
        let dataDoctor
        // console.log(UserId);
        User.findByPk(UserId, {
            where: {
                role: 'admin'
            },
            include: {
                model: Profile,
                include: {
                    model: Doctor
                }
            }
        })
            .then(data => {
                dataUser = data
                // res.send(data)
                
                return Doctor.findByPk(dataUser.Profile.Doctor.id, {
                    include: {
                        model: Patient,
                    }
                })
            })
            .then(data => {
                // res.send(data)
                dataDoctor = data
                const idPasien = []
                dataDoctor.Patients.forEach(el => [
                    idPasien.push(el.ProfileId)
                ])
                return idPasien
            })
            .then(idPasien => {
                return Profile.findAll({
                    where: {
                        id: idPasien
                    }
                })
            })
            .then(dataPasien => {
                // res.send(dataPasien)
                res.render('adminPage', { dataPasien, dataUser, dataDoctor })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static patientDelete(req, res) {
        let id = +req.params.id
        // console.log(id);
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
                id
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
                include: {
                    model: Patient,
                    include: Disease
                }
            }
        })
        .then((data) => {
            // res.send(data)
            res.render('detailPatient', {data} )
        })
        .catch(err => {
            console.log(err);
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
        let UserId = req.session.UserId
        let PatientId
        // console.log(req.params);
        // console.log(req.body, '<<<<<');
        const { nameDisease, description, level, ProfileId  } = req.body
        Disease.create({ nameDisease, description, level, PatientId })
        .then(() => {
            return Patient.findOne({
                where: {
                    ProfileId: ProfileId
                }
            })
        })
        .then((data) => {
            // console.log(data);
            // PatientId = data.ProfileId
            // Disease.update({
            //     PatientId: PatientId
            // }, {
            //     where: {}
            // })
            Disease.update({ PatientId: data.id }, {where: {PatientId: null}})
        })
        .then(() => {
            res.redirect(`/admin/detail/${ProfileId}`)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
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