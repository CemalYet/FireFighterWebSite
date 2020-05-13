var mongoose = require("mongoose");

var valueSchema = new mongoose.Schema({
	value			: Number, 
	time 			: Date, 
	tsession		: Number
	
	
});


valueSchema.index({ value: -1});
module.exports = mongoose.model("Value",valueSchema);