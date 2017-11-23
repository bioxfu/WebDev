var mongoose = require('mongoose');
var greacefulShutdown;

// Define database connection string and use it to open Mongoose connection
// dbName is the name of your database
var dbURI = 'mongodb://localhost/dbName';
mongoose.connect(dbURI);

// Listen for Mongoose connection events and output statuses to console
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected');
});

// Reusable function to close Mongoose connection
greacefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

// Listen to Node processes for termination or restart signals,
// and call gracefulShutdown function when appropriate,
// passing a continuation callback

// For nodemon restarts
process.once('SIGUSR2', function() {
	greacefulShutdown('nodemon restart', function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});

// For app termination
process.on('SIGINT', function() {
	greacefulShutdown('app termination', function(){
		process.exit(0);
	});
});

// For Heroku app termination
process.on('SIGTERM', function() {
	greacefulShutdown('Heroku app shutdown', function(){
		process.exit(0);
	});
});

// You define the Mongoose schemas in the model folder alongside db.js (schemas.js),
// and *require* it into db.js to expose it to the application. 
require('./schemas');