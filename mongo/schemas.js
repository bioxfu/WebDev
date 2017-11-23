var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, required: true, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
	name: {type:String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type: [Number], index: '2dsphere'},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

// Compiling a model from a schema
mongoose.model('Location', locationSchema);
// 'Location' is the name of the model. A *model* name of 'Location'
// would look for a *collection* name of 'locations' 
