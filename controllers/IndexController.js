var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Sensor = require('../models/sensor');

exports.LandingGet = function(req, res) {
	res.render('landing');
};
// AUTH REGISTER
exports.RegisterGet = function(req, res) {
	res.render('register');
};
//HANDLE SIGN UP LOGIC
exports.RegisterPost = function(req, res) {
	var newUser = new User({ username: req.body.username });
	if (req.body.adminCode === 'admin1234') {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Successfully registered');
			res.redirect('/sensors');
		});
	});
};
//SHOW LOGIN FORM
exports.LoginGet = function(req, res) {
	res.render('login');
};
//HANDLING LOGIN
(exports.LoginPost = passport.authenticate('local', {
	successRedirect: '/sensors',
	failureRedirect: '/login'
})),
	function(req, res) {
		req.flash('success', 'Successfully registered');
	};
///LOGOUT ROUTE
exports.LogoutGet = function(req, res) {
	req.logout(); //this come from the packages we installed
	req.flash('success', 'Logged you out');
	res.redirect('/');
};
//SHOW HEATMAP
exports.HeatMapGet = function(req, res) {
	Sensor.find({})
		.populate({
			path: 'values',
			options: {
				sort: { _id: -1 },
				limit: 10
			}
		})
		.exec(function(err, foundSensors) {
			var lastValArr = [];
			foundSensors.forEach(function(sensor) {
				var lastValue = sensor.values.pop().value;
				lastValArr.push(lastValue);
			});
			if (err || !foundSensors) {
				req.flash('error', 'Sensor not found');
				res.redirect('/sensors');
				console.log(err);
			} else {
				console.log(lastValArr);
				res.render('heatmap', { lastValArr: lastValArr });
			}
		});
};