var express = require( 'express' );
var index = express.Router();

index.get( '/', ( req, res ) => {

	res.sendFile( '../views/index.html' );

})

module.exports = index;