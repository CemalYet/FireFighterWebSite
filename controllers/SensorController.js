var express = require('express');
var router = express.Router();
var Sensor = require('../models/sensor');
var passport = require('passport');

// Display all Sensors.
exports.SensorsList = function(req, res) {
	Sensor.find({})
		.populate({
			path: 'values',
			options: {
				sort: { _id: -1 },
				limit: 1
			},
			select: 'value',
		})
		.exec(function(err, allSensors) {
			if (err) {
				console.log(err);
			} else {
				//console.log('*****' + allSensors[0].values);
				res.render('index', { sensors: allSensors, currentUser: req.user });
			}
		});
};

exports.AddNewSensor = function(req, res) {
	var name = req.body.name;
	var value = req.body.value;
	var newSensor = { name: name, value: value };
	//Create a new sensor and save to db
	Sensor.create(newSensor, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/sensors');
		}
	});
};
exports.MoreInfo = function(req, res) {
	Sensor.findById(req.params.id)
		.populate({
			path: 'values',
			options: {
				sort: { _id: -1 },
				limit: 20
			}
		})
		.exec(function(err, foundSensor) {
			var data = [];
			var time = [];
			var index = 0;
			foundSensor.values.forEach(function(cemal) {
				var num = cemal.time.getMinutes();
				var num2 = cemal.time.getSeconds();
				var d = num.toString(10);
				var d2 = num2.toString(10);
				var son = d.concat('.', d2);
				time.push(son);
				data.push(cemal.value);
			});

			if (err || !foundSensor) {
				req.flash('error', 'Sensor not found');
				res.redirect('/sensors');
				console.log(err);
			} else {
				//console.log(time);
				res.render('show', { sensor: foundSensor, data: data, time: time });
			}
		});
};