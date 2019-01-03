'user strict';

const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const mid = require('../middleware/middlewareRotes.js');
const User = require('../models/user.js');

router.post('/new', mid.verifyParamsNewContact, function (req, res, next) {
	contactData = {
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		favorite: req.body.favorite
	}
	Contact.create(contactData, function(err, contact){
		console.log(contact);
		idContact = contact._id;
		console.log(idContact);
		if(err){
			return next(err);
		} else {
			if(req.session.userId){
														/*{ contacts: [{idContact: contact._id}]}*/
				User.update( { _id:req.session.userId }, { $push: {contacts: {idContact: idContact}} }, function (err, user) {
					res.json("contact add with success");
					res.status(201);
				});
			} else {
				let err = new Error("userId not found");
				return next(err);
			}
		}
	});
} );


//TODO: Atualizar contato
router.put('update', );


//TODO: remover contato
router.delete('remove', );

module.exports = router;