$(document).ready( function() {

	displayStuff();

	$("#assignment").on('submit', addAssignment);
	
});

var displayStuff = function() {

		$.ajax({
		url: '/api',
		type: 'GET',
		dataType: 'json',
		success: function( data ) {

			console.log( 'Data Success', data );

			var ul = $('<ul />');

			for (var i = 0; i < data.length; i++) {
				var li = $('<li />');

				var stuff = ( data[i].assignment_number || 'No Assignment Number' ) + ' - ' + data[i].student_name + ' - ' + ( data[i].score || ' No Score ' ) + ' - ' + data[i].date_completed;

				li.html( stuff );

				ul.append( li );
			}

			$('.output').empty().append( ul );

		}
	});

};


var addAssignment = function() {

	$.ajax({
		url: '/api',
		type: 'POST',
		dataType: 'json',
		data: {

		},
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	

};