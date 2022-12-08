const checkRole = function(req, res, next) {
    console.log(req.session.UserRole,'<<<<<<<');
    if(req.session.UserRole === 'patient') {
        const warning = 'you are not Doctor'
        res.redirect(`/login?errors=${warning}`)
    } else {
        next()
    }
}


module.exports = checkRole