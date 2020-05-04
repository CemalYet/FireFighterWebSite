var mongoose= require("mongoose");
var sensorsSchema = new mongoose.Schema({
	sensorId : Number,
	location : String,
	values: [
		{
			type :mongoose.Schema.Types.ObjectId,
			ref	:"Value"
		}
	]

})

module.exports = mongoose.model("Sensor",sensorsSchema);