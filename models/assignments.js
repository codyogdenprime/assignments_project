const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

var assignment = new Schema({
	assignment_number: { type: Number },
	student_name: { type: String, required: true },
	score: { type: Number },
	date_completed: { type: Date }

});

var Assignment = mongoose.model( 'assignments', assignment );

module.exports = Assignment;