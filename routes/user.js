const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user,
    // userProfile: JSON.stringify(req.user, null, '  ')

  });
});

router.get('/assessment', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user
  });
})

module.exports = router;
