var express = require( 'express' );
var app = express();
const mongoURI = "mongodb://localhost:27017/assignments";
const mongoose = require('mongoose');

const MongoDB = mongoose.connect( mongoURI ).connection;

const Assignment = require( '../models/assignments' );

var assignment = express.Router();

assignment.route( '/api' )
.get( ( req, res ) => {

	console.log( 'GET /api' );

	if( !(req.query.id) ) {

		Assignment.find( ( err, result ) => {
			if( err )
				return	console.log( 'MongoDB Err:', err );
			res.send( result );
		});

	} else {

		Assignment.find( { _id: req.query.id }, ( err, result ) => {
			if( err )
				return console.log( 'MongoDB Err:', err );
			res.send( result );
		} );

	}

})
.post( ( req, res ) => {

	console.log( 'POST /api', req.body );

	var newEntry = new Assignment({
		assignment_number: req.body.assignment_number,
		student_name: req.body.student_name,
		score: req.body.score,
		date_completed: new Date()
	});

	newEntry.save( ( err, result ) => {

		if( err )
			return	console.log( 'Mongo Err:', err );

		res.send( result );

	} );

});

module.exports = assignment;