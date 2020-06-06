var mongoose= require("mongoose");
var sensorsSchema = new mongoose.Schema({
	sensorId : Number,
	location : String,
	values: [
		{
			type :mongoose.Schema.Types.ObjectId,
			ref	:"Value",
			
			
		}
	]

})
 //sensorsSchema.index({ sensorId: 1, values: -1 });
module.exports = mongoose.model("Sensor",sensorsSchema);