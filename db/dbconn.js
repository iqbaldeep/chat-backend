/**
 * New node file
 */

var logger = require("../utils/logger")
 , config = require('../config');

exports.getAllUsers = function(callback){
	
	connectDB(function(err, db){
		if(err){
			logger.error(err);
			callback(err);
		}else{
			var collection = db.collection("Users");
			collection.find().toArray(function(err, result){
				callback(err, result);
				
				db.close();
			});
		}		
		
	});
}

exports.findUser = function(username, callback){
	
	connectDB(function(err, db){
		if(err){
			logger.error(err);
			callback(err);
		}else{
			var collection = db.collection(config.mongo.UserTable);
			logger.info("dbConn: username"+username);
			collection.find({email:username}).toArray(function(err, result){
				logger.info("result: "+result);
				callback(err, result);
				db.close();
			});
		}			
	});
}

function connectDB(callback){
	//lets require/import the mongodb native drivers.
	var mongodb = require('mongodb');

	//We need to work with "MongoClient" interface in order to connect to a mongodb server.
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = config.mongo.dbUrl;

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		
		callback(err, db);
		
	});

}