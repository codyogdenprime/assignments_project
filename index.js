// Setup Express
const express = require( 'express' );
const app = express();

// Setup Body Parser
const bodyParser = require( 'body-parser' );
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );

// Setup Mongoose
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/assignments";
const MongoDB = mongoose.connect( mongoURI ).connection;

// Setup Static Routes
app.use( express.static( 'node_modules/jquery/dist' ) );
app.use( express.static( 'views' ) );

// Check Mongo for Connection
MongoDB.on( 'error', ( err ) => {
    console.log( 'mongodb connection error:', err);
});

// Open the connection and start the server listening!
MongoDB.once( 'open', () => {
    console.log( 'mongodb is open!' );
    app.listen( 3001, () => {
    	console.log( 'App is listening.' );
    } );
} );

// Require Index Routes
var index = require( './routes/index' );
app.use( '/', index );

// Require assignment Routes
var assignments = require( './routes/assignments' );
app.use( '/', assignments );

