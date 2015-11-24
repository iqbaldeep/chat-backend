/**
 * New node file
 */
var config = require('./config.global');

config.env = 'dev';
config.server={};
config.server.port = '3999';
config.logger={};
config.logger.loglevel = 'info';
config.logger.logFile = './trace.log';
config.mongo.dbUrl = 'mongodb://159.203.248.23:27017/chat';

module.exports = config;