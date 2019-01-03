"user strict";

const express = require("express");
const jsonParser = require("body-parser").json;
const mongoose = require("mongoose");
const session = require('express-session');
const mainRoutes = require('./routes/index.js');
const contactRoutes = require('./routes/contacts.js');
const morgan = require('morgan');
const app = express();
const db = mongoose.connection;


mongoose.connect('mongodb://localhost:27017/agenda', {useNewUrlParser: true});

//@TODO: mudar para enviar por json
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function () {
	console.log("db connected!");
});



app.use(jsonParser());

// Inicia a sessao de um novo usuário
// O id do usuário vai ser adicionado quando fizer login/cadastro
app.use(session({
	secret: "String secreta que ninguem deve saber",
	resave: true,
	saveUninitialized: false,
	cookie: {}
}));

app.use(function(req, res, next){
	res.locals.currentUser = req.session.userId;
	next();
});

//log de requests printado no console
app.use(morgan('dev'));

app.use('/', mainRoutes);
app.use('/contacts', contactRoutes);

// Lida com o erro caso nao encontra depois de passar por todos os routes
app.use(function(req, res, next){
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use( (error, req, res, next) =>{
	res.status( error.status || 500);
	res.json({
		Error: {
			message: error.message
		}
	});
});

app.listen(3000, () =>{
	console.log('Express app listening on port 3000');
})