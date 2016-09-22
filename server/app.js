'use strict'

let express = require('express');
let path = require('path');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use(express.static(path.join(__dirname, '../client')));

app.get("/sports", (req, res) => {
	let sports =  mongoUtil.sport();
	sports.find().toArray((err, docs)=> {
		let sportsNames = docs.map((sport) => sport.name);
		res.json(sportsNames);	
	});		
	//res.json(["Cycling", "Weightlifting"]);
});

app.get("/sports/:name", (req, res) => {
	let sportName = req.params.name;
	let sports = mongoUtil.sport();
	sports.find({name: sportName}).limit(1).next((err, doc) => {
		if(err) {
			res.status(500).json(err);
		}	
		res.json(doc);
	});
	console.log("Sport name: ", sportName);


});

app.listen(8181, () => console.log('Listening to 8181'));
