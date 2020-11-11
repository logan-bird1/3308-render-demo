var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('<h1>Working</h1>');
});

console.log(process.env.PORT);

app.listen(process.env.PORT);