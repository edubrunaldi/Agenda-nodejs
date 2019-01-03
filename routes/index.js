'user strict';

const express = require('express');
const router = express.Router();
const mid = require('../middleware/middlewareRotes.js');
const User = require('../models/user.js');
const Contact = require('../models/contact.js');



// Se logado envia todos os contatos para o usuario
//Se desologado envia mensagem de boas vindas
router.get('/', function (req, res, next) {
	if( req.session.userId){
		User.findById(req.session.userId)
			.exec( function (err, userData) {
				if(err){
					return next(err);
				}

				arrayContacts = [];

				if(userData.contacts.length > 0){
					 userData.contacts.forEach( function (json) {
					 	Contact.findById(json.idContact, "-_id").
					 		exec(function (err, contact) {
					 			console.log(contact)
					 			arrayContacts.push(contact);
					 			res.json(arrayContacts);
					 		});
					 });

				} else {
					res.json({ message: "No contact found"});
				}
			});
	} else {
		res.json({
			message: 'Bem vindo a API de contatinhos'
		});
	}
});



//verifyParamsJoin -> verifica se todos os parametros estao ok, se sim:
// Cadastra o usuário no banco de dados
// Adiciona o usuário na sessão para saber quem é
router.post('/join', mid.verifyParamsJoin, function (req, res, next) {
	let userData = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name
	};

	User.create(userData, function (err, user) {
		if(err){
			return next(err);
		} else {
			req.session.userId = user._id;
			res.json({ message: "create with success" });
			res.status(201);
		}
	})

});


//verifica se foi enviado o email e login
//Verifica se a senha confere
router.post('/singin', mid.verifyParamsLogin, function (req, res, next) {
	User.authenticate(req.body.email, req.body.password, function (err, user) {
		if( err || !user){
			let err = new Error("Wrong email or password");
			err.status = 401;
			return next(err);
		} else {
			req.session.userId = user._id;
			res.json("Success with Login");
		}
	});
});



//TODO: logout
router.post('/logout', function (req, res, next) {
	res.json({
		message: "/logout"
	});
});

module.exports = router;