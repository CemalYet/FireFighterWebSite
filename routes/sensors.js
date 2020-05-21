var express  = require("express");
var router	 = express.Router();
var Sensor	 = require("../models/sensor");
var passport = require("passport");
var SensorController = require('../controllers/SensorController');



router.get("/",isLoggedIn,SensorController.SensorsList);

router.post("/",isLoggedIn,SensorController.AddNewSensor);

router.get("/new",isLoggedIn,function(req,res){
	res.render("new.ejs");
});


router.get("/:id",isLoggedIn,SensorController.MoreInfo);

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