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
	seedDB			=	require("./seeds"),
	seedValue		=	require("./seeds"),
	removeDB		=	require("./seeds")
	
	

var sensorRoutes	=	require("./routes/sensors"),
	indexRoutes	=	require("./routes/index")

mongoose.connect('mongodb+srv://FireFighter:Cml%211907@cluster0-laoxm.mongodb.net/test?retryWrites=true&w=majority',{
	useNewUrlParser:true,
	useCreateIndex:true,
	useFindAndModify:false,
	useCreateIndex: true,
	 useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

setInterval(function()
{ seedValue(5);
}, 1000);


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


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});