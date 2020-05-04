var express  = require("express");
var router	 = express.Router();
var passport = require("passport");
var User	 = require("../models/user");
var Sensor	 = require("../models/sensor");



router.get("/heatmap",function(req,res){
	
	

	Sensor.find({}).populate("values").exec(function(err,foundSensors){
		var lastValArr=[];
	  foundSensors.forEach(function(sensor){
		  var lastValue=sensor.values.pop().value;
		  lastValArr.push(lastValue);
	  })
		if(err || !foundSensors)	{
		req.flash("error","Sensor not found");
			res.redirect("/sensors");
		console.log(err);
	}else{
			
		console.log(lastValArr);	
		res.render("heatmap",{lastValArr: lastValArr});
	}
	});
	
});

router.get("/",function(req,res){
	res.render("landing");
})
// AUTH REGISTER
	router.get("/register", function(req,res){
		res.render("register");
	});
//HANDLE SIGN UP LOGIC
	router.post("/register",function(req,res){
			var newUser= new User({username: req.body.username});
		if(req.body.adminCode==="admin1234"){
		
			newUser.isAdmin=true;			
		}
		User.register(newUser,req.body.password,function(err,user){
			if(err){
				req.flash("error",err.message);
				return res.render("register")
			}
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Successfully registered");
				res.redirect("/sensors")
			})
		})
	});
//SHOW LOGIN FORM 
	router.get("/login",function(req,res){
	
		res.render("login");
	})
//handling login

	router.post("/login",passport.authenticate("local",{
		successRedirect: "/sensors",
		failureRedirect :"/login"
	}), function(req,res){
			req.flash("success","Successfully registered");
	})
///LOGIC ROUTE
router.get("/logout",function(req,res){
	req.logout();//this come from the packages we installed
	req.flash("success","Logged you out");
	res.redirect("/");
	
});

function isLoggedIn(req,res,next){//controls ypu logged in or not you can put wherever you want
	if(req.isAuthenticated()){
		return next();
	}
		else{
			req.flash("error","Please login first");
			res.redirect("/login");
		}
	
}
module.exports=router;