const carryId = function(req, res, next) {
  // console.log(req.session);
  if(!req.session.UserId) {
    const warning = 'you must login to access this section'
    res.redirect(`/login?errors=${warning}`)
  } else {
    next()
  }
}

module.exports = carryId