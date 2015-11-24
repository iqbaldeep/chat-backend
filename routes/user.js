
/*
 * GET users listing.
 */
var chatDB = require("../db/dbconn");
var logger = require("../utils/logger");

exports.getAllUsers = function(req, res){
	chatDB.getAllUsers(function(err, result){
		var response ={};
		if(err){
			response.responseCode = 101;
			response.errorMessage =err;
		}else if(result.length){
			response.responseCode = 100;
			response.users = result;
		}else{
			response.responseCode = 102;
			response.errorMessage = "No records found";
		}
		res.send(response);
	});
};

exports.loginUserGet = function(req, res){
	var username = req.params.username;
	var password = req.params.password;
	var response = loginUser(username,password, function(response){
		res.send(response);
	});
};

exports.loginUserPost = function(req, res){
	try{
		var username = req.body.username;
		var password = req.body.password;
		var response = loginUser(username,password, function(response){
			res.send(response);
		});
	}catch(exc){
		res.send({responseCode:"101",error:exc});
	}
	
};

function loginUser(username, password, callback){
	
	chatDB.findUser(username, function(err, result){
		var response ={};
		if(err){
			log.info(err);
			response.responseCode = 101;
			response.errorMessage =err;
		}else if(result.length){
			if(password == result[0].password){
				response.responseCode = 100;
				response.userInfo = result[0];
			}else{
				response.responseCode = 104;
				response.errorMessage = "Username/Password don't match";
			}
			
		}else{
			response.responseCode = 105;
			response.errorMessage = "Username/Password don't match";
		}
		callback(response);
	});
};