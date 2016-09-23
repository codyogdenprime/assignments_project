// Setup Express
var express = require( 'express' );
var app = express();

// Setup Mongoose
const mongoURI = "mongodb://localhost:27017/assignments";
const mongoose = require('mongoose');
// const MongoDB = mongoose.connect( mongoURI ).connection;

// Require Assignment Schema
const Assignment = require( '../models/assignments' );
var assignment = express.Router();

// Chain Routes
assignment.route( '/api' )
.get( ( req, res ) => {
	console.log( 'GET /api' );
	// If an id query element is passed
	if( !(req.query.id) ) {
		// Find only that particular document
		Assignment.find( ( err, result ) => {
			if( err )
				return	console.log( 'MongoDB Err:', err );
			res.send( result );
		});
	} else {
		// Else Get everrryyytttthhhiiing.
		Assignment.find( { _id: req.query.id }, ( err, result ) => {
			if( err )
				return console.log( 'MongoDB Err:', err );
			res.send( result );
		} );
	}
})
.post( ( req, res ) => {
	console.log( 'POST /api', req.body );
	// Setup New Entry Constructor
	var newEntry = new Assignment({
		assignment_number: req.body.assignment_number,
		student_name: req.body.student_name,
		score: req.body.score,
		date_completed: new Date()
	});
	// Save that entry
	newEntry.save( ( err, result ) => {
		if( err ) // If there is an error, return a console log and die
			return	console.log( 'Mongo Err:', err );
		res.send( result );
	} );
})
.delete( ( req, res ) => {
	console.log( 'DELETE /api', req.query );
	Assignment.findByIdAndRemove( req.query.id, ( err, result ) => {
		if( err ) // If there is an error,,yeah
			return console.log( 'MongoDB Error:', err );
		res.send( result );
	} );
})
.put( ( req, res ) => {
	console.log( 'PUT /api', req.body );
	// Find and document by its ID and update it.
	Assignment.findByIdAndUpdate( req.body._id, {
		assignment_number: req.body.assignment_number,
		student_name: req.body.student_name,
		score: req.body.score
	}, { multi: false }, ( err, result ) => {
		if( err ) // If error, die
			return console.log( 'MongoDB Error:', err );
		res.send( result );
	});
} );

module.exports = assignment;