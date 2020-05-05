var express  = require("express");
var router	 = express.Router();
var Sensor	 = require("../models/sensor");
var passport = require("passport");



router.get("/",isLoggedIn,function(req,res){	
	
	Sensor.find({}).populate("values","value").exec(function(err,allSensors){
		if(err)	{
		console.log(err);
	}else{
		res.render("index",{sensors: allSensors, currentUser: req.user});
	}
	})
	//Get All Sensors from Database
})

router.post("/",isLoggedIn,function(req,res){
	var name =req.body.name;
	var value =req.body.value;
	var newSensor={name: name, value : value};
	//Create a new sensor and save to db
	Sensor.create(newSensor,function(err,newlyCreated){
		if(err)	{
		console.log(err);
	}else{
		res.redirect("/sensors");
	}
	})
	
});

router.get("/new",isLoggedIn,function(req,res){
	res.render("new.ejs");
});

//SHOW -shows more info about one sensor
router.get("/:id",isLoggedIn,function(req,res){
	
	Sensor.findById(req.params.id).populate("values").exec(function(err,foundSensor){
		var data =[];
		var time =[];
		var index=0;
		foundSensor.values.forEach(function(cemal){
			var num=cemal.time.getMinutes();
			var num2=cemal.time.getSeconds();
			var d=num.toString(10);
			var d2=num2.toString(10);
			var son=d.concat(".",d2);
			time.push(son);
			data.push(cemal.value);
		});
		
		
		if(err || !foundSensor)	{
		req.flash("error","Sensor not found");
			res.redirect("/sensors");
		console.log(err);
	}else{
		
		//console.log(time);
		res.render("show",{sensor: foundSensor, data: data, time: time});
	}
		});
	
});
	router.get("/:id/pastsensordata",isLoggedIn,function(req,res){
	
	Sensor.findById(req.params.id).populate("values").exec(function(err,foundSensor){
		var data =[];
		if(err || !foundSensor)	{
		req.flash("error","Sensor not found");
			res.redirect("/sensors");
		console.log(err);
	}else{	
		
		res.render("pastsensordata",{sensor: foundSensor});
	}
	
	
});
	
	});
	
function isLoggedIn(req,res,next){//controls you logged in or not you can put wherever you want
	if(req.isAuthenticated()){
		return next();
	}
		else{
			req.flash("error","Please login first")
			res.redirect("/login");
		}
	
}

module.exports=router;