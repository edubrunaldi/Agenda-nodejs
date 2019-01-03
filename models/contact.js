'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = Schema({
	name:{
		type: String,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true
	},
	favorite: {
		type: Boolean,
		default: 0
	}

});

//TODO: create pre-save for do something


const Contact =  mongoose.model('Contact', ContactSchema);

module.exports = Contact;