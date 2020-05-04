var mongoose = require("mongoose");

var valueSchema = new mongoose.Schema({
	value			: Number,
	time 			: Date,
	tsession		: Number,
	
	
});



module.exports = mongoose.model("Value",valueSchema);