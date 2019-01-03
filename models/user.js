'user strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Contact = require('./contact.js');


//TODO: create schema

const UserSchema = Schema({
	email:{
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true,
		trim: true
	},
	contacts: [{
		idContact:{ type: Schema.Types.ObjectId, ref: 'Contact'}
	}]

});


// Autentica o login do usuario
// Encontra o usuário no banco de dados
// Utilizando o bcrypt compara com a senha dada
UserSchema.statics.authenticate = function (email, password, callback) {
	User.findOne({email: email})
			.exec( function (err, user) {
				if(err){
					return callback(err);
				} else if( !user){
					let err = new Error("Email not found");
					err.status = 401;
					return callback(err);
				}

				bcrypt.compare(password, user.password, function (err, result) {
					if(result === true)
						return callback(null, user);
					else
						return callback();
				});

			});
}



// Encripta a senha para salva no bd
UserSchema.pre("save", function (next) {
	let user = this;

	bcrypt.hash(user.password, 10, function (err, hash) {
		if(err) return next(err);

		user.password = hash;
		next();
	});
});


const User = mongoose.model("User", UserSchema);


module.exports = User;