// Require Mongoose
const mongoose = require( 'mongoose' );

// Setup new schema
const Schema = mongoose.Schema;

// Setup assignment schema
var assignment = new Schema({
	assignment_number: { type: Number },
	student_name: { type: String, required: true },
	score: { type: Number },
	date_completed: { type: Date }
});

// Create a mongo model
var Assignment = mongoose.model( 'assignments', assignment );

// Send that back
module.exports = Assignment;