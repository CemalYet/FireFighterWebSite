var mongoose = require("mongoose");
var Sensor = require("./models/sensor");
var Value   = require("./models/value");

 
var seeds = [
    {
        sensorId: 1, 
        location: "Near the fire-right",
        
    },
    {
        sensorId: 2, 
        location: "Near the fire-left",
        
    },
    {
        sensorId: 3, 
        location: "Near the fire-secondleft",
       
    },
	{
        sensorId: 4, 
        location: "Near the fire-secondright",
       
    },
	{
        sensorId: 5, 
        location: "Near the door-secondright",
       
    },
	{
        sensorId: 6, 
        location: "Near the door-secondleft",
       
    },
	{
        sensorId: 7, 
        location: "Left middle of the container",
       
    },
	{
        sensorId: 8, 
        location: "Left middle of the container",
       
    },
	{
        sensorId: 9, 
        location: "Near the door-left",
       
    },
	{
        sensorId: 10, 
        location: "Near the door-right",
       
    }
]

 
async function seedDB() {
	try {		
		for (const seed of seeds) {
			let sensor = await Sensor.create(seed);
			//console.log(sensor);			
			sensor.save();
			//console.log(sensor);
		}
	}catch {
		console.log(err);
	}
}
var temperaturedata =[600,600,500,500,400,400,300,300,200,200];
	

//TEMPERATURE GENERATOR
async function seedValue(tsession) {
	try {
			for(var i=1;i<11;i++){
			let sensor=await Sensor.findOne({sensorId:i});
			//console.log(sensor);
			
			let value = await Value.create(
                            {
                                value: Math.floor(Math.random() *100)+temperaturedata[i-1] ,
                                time : new Date(),
								tsession:tsession
                            });
				sensor.values.push(value);
				
			
			
			
			sensor.save();
			//console.log(sensor);
		};
		
	}catch {
		console.log(err);
	}
}
// CLEAN DATABASE
async function removeDB() {
	try {
		//await Sensor.deleteMany({});
		await Value.deleteMany({ tsession:3});
		console.log("delete");
		
	}catch {
		console.log(err);
	}
}







//module.exports = seedDB;
//module.exports = seedValue;
//module.exports = removeDB;
