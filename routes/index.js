var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Sensor = require('../models/sensor');
var IndexController = require('../controllers/IndexController');

router.get('/heatmap',IndexController.HeatMapGet);

router.get('/', function(req, res) {
	res.render('landing');
});
// AUTH REGISTER
router.get('/register', IndexController.RegisterGet);
//HANDLE SIGN UP LOGIC
router.post('/register', IndexController.RegisterPost);
//SHOW LOGIN FORM
router.get('/login', IndexController.LoginGet);
//handling login

router.post('/login', IndexController.LoginPost);
///LOGIC ROUTE
router.get('/logout', IndexController.LogoutGet);

function isLoggedIn(req, res, next) {
	//controls ypu logged in or not you can put wherever you want
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error', 'Please login first');
		res.redirect('/login');
	}
}
module.exports = router;