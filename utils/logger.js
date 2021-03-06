/**
 * Configure Winston package for logging
 */

var winston = require('winston')
 , config = require('../config');
winston.emitErrs = true;

var logger = new winston.Logger({
	transports: [
	             new winston.transports.File({
	            	 level: config.logger.loglevel,
	            	 filename: config.logger.logFile,
	            	 handleExceptions: true,
	            	 json: true,
	            	 maxsize: 5242880, //5MB
	            	 maxFiles: 5,
	            	 colorize: false
	             }),
	             new winston.transports.Console({
	            	 level: 'debug',
	            	 handleExceptions: true,
	            	 json: false,
	            	 colorize: true
	             })
	             ],
	             exitOnError: false
});

module.exports = logger;
module.exports.stream = {
		write: function(message, encoding){
			logger.info(message);
		}
};