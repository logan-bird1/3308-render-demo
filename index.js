var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 80;

const dbConfig = {
	host: process.env.host,
	port: 5432,
	database: process.env.database,
	user: process.env.user,
	password: process.env.password
};

const db = pgp(dbConfig);


app.get('/', function(req, res){
	res.send('<h1>Working</h1>');
});

app.get('/dbtest', (req,res)=>{
	var query = `SELECT * FROM users;`;
	db.any(query)
	.then( data =>{
		res.send(data);
	})
	.catch(err => {
		res.send(err);
	})
})

console.log(process.env.PORT);

app.listen(process.env.PORT);