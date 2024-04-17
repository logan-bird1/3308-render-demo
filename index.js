var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

const PORT = 80;

const devDbConfig={
	host: 'localhost',
	port: 5432,
	database: 'users',
	user: 'postgres',
	password: 'password'
};

const dbConfig = {
	host: process.env.config,
	port: 5432,
	database: process.env.database,
	user: process.env.user,
	password: process.env.password
};

const db = pgp(dbConfig);


app.get('/', (req, res)=>{
	res.render('pages/home');
});

app.get('/welcome', (req, res)=>{
	var query = `SELECT * FROM users LIMIT 1;`;
	db.any(query)
	.then( data =>{
		res.render('pages/welcome',{
			username: data[0].username
		})
	})
	.catch(err => {
		res.send(err);
	})
})

app.listen(80);
