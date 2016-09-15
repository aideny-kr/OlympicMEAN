'use strict'

let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get("/sports", (req, res) => {
	res.json(["Cycling", "Weightlifting"]);
});

app.listen(8181, () => console.log('Listening to 8181'));
