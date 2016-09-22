const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );

const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/assignments";

const MongoDB = mongoose.connect( mongoURI ).connection;

app.use( express.static( 'node_modules/jquery/dist' ) );
app.use( express.static( 'views' ) );

const Assignment = require( './models/assignments' );

MongoDB.on( 'error', ( err ) => {
    console.log( 'mongodb connection error:', err);
});

MongoDB.once( 'open', () => {
    console.log( 'mongodb is open!' );
    app.listen( 3001, () => {
    	console.log( 'App is listening.' );
    } );
} );

app.route( '/api' )
.get( ( req, res ) => {

	console.log( 'GET /api' );

	Assignment.find( ( err, result ) => {

		if( err )
			return	console.log( 'MongoDB Err:', err );

		res.send( result );

	});

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