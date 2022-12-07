const carryId = function(req, res, next) {
  if(!req.session.UserId) {
    const warning = 'you must login to acces this section'
    res.redirect(`/login?errors=${warning}`)
  } else {
    next()
  }
}

module.exports = carryId