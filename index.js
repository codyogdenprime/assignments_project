const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );

const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/assignments";

const MongoDB = mongoose.connect( mongoURI ).connection;

app.use( express.static( 'node_modules/jquery/dist' ) );
app.use( express.static( 'views' ) );

MongoDB.on( 'error', ( err ) => {
    console.log( 'mongodb connection error:', err);
});

MongoDB.once( 'open', () => {
    console.log( 'mongodb is open!' );
    app.listen( 3001, () => {
    	console.log( 'App is listening.' );
    } );
} );

var index = require( './routes/index' );

app.use( '/', index );

var assignments = require( './routes/assignments' );

app.use( '/', assignments );

