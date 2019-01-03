function verifyParamsJoin(req, res, next) {
	if(req.body.name && req.body.email &&
		req.body.password && req.body.confirmPassword){
		if(req.body.password !== req.body.confirmPassword){
			let err = new Error("password do not match");
			err.status = 400;
			next(err);
		}
		next();
	} else {
		let err = new Error("missing field");
		err.status = 400;
		next(err);
	}
}

function verifyParamsLogin(req, res, next) {
	if(req.body.email && req.body.password){
		return next();
	}else{
		let err = new Error("missing field");
		err.status = 400;
		next(err);
	}
}

function verifyParamsNewContact(req, res, next) {
	if(req.body.name && req.body.phone) {
		return next();
	} else {
		let err = new Error("missing field");
		err.status = 400;
		next(err);
	}
}


module.exports.verifyParamsJoin = verifyParamsJoin;
module.exports.verifyParamsLogin = verifyParamsLogin;
module.exports.verifyParamsNewContact = verifyParamsNewContact;