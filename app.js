var express 		= 	require("express"),
 	app 			= 	express(),
	flash			=	require("connect-flash"),
	bodyParser  	= 	require("body-parser"),
	passport		=	require("passport"),
	LocalStrategy	=	require("passport-local"),
	mongoose 		= 	require("mongoose"),
	Sensor 			= 	require("./models/sensor"),
	Value 			= 	require("./models/value"),
	User 			=	require("./models/user"),
	seedDB			=	require("./seeds");
	seedValue		=	require("./seeds");	
	removeDB		=	require("./seeds");	
	

var sensorRoutes	=	require("./routes/sensors"),
	indexRoutes	=	require("./routes/index")

mongoose.connect('mongodb://localhost:27017/fire_fighter', 
				 { useNewUrlParser: true,
				  useUnifiedTopology: true,
				  useFindAndModify:false,
				  useCreateIndex: true }); 

setInterval(function()
{ seedValue(2);
}, 10000);


//seedDB();
//seedValue();
//removeDB();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine" ,"ejs");

app.use(express.static(__dirname + "/public"));
console.log(__dirname + "/public");
app.use(flash()); 

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Why do ı spent lots time to achieve this staff",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){// to describe each page currentuser variable 
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
})

app.use(indexRoutes);
app.use("/sensors",sensorRoutes);


app.listen( 3000,function(){
	console.log("The FireFighter server has Started ");
});