$(document).ready( function() {
	$.ajax({
		url: '/api',
		type: 'GET',
		dataType: 'json',
		success: function( data ) {

			console.log( 'Data Success', data );

			var ul = $('<ul />');

			for (var i = 0; i < data.length; i++) {
				var li = $('<li />')

				ul.append( li );
			}

			$('.output').empty().append( ul );

		}
	});
	
});