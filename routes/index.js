// Setup Express
var express = require( 'express' );
var index = express.Router();

// Main route serving index.html
index.get( '/', ( req, res ) => {

	res.sendFile( '../views/index.html' );

})

module.exports = index;