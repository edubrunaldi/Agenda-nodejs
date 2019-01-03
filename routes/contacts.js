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
});


router.put('/update', mid.verifyParamsUpdate, function (req, res, next) {
	contactData = {
	};

	if(req.body.email) contactData.email = req.body.email;
	if(req.body.phone) contactData.phone = req.body.phone;
	if(req.body.name) contactData.name = req.body.name;
	console.log(contactData);
	Contact.findByIdAndUpdate(req.body.contactId, contactData, {new: true}, function (err, contact) {
		if(err) return next(err);
		res.json(contact);
	});
});


router.delete('/remove', mid.verifyParamsRemove, function(req, res, next) {
	Contact.findOneAndDelete(req.body.contactId, function (err, contact) {
		if(err) next(err);

		User.findOneAndUpdate(req.session.userId, {$pull: {contacts: {idContact: req.body.contactId}} }, function(err, user){
			if(err) next(err);

			res.json(contact);
		});
		
	});
} );

module.exports = router;