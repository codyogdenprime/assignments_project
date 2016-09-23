$(document).ready( function() {

	$('.hidden-edit').hide();

	displayStuff();

	$("#assignment").on('submit', addAssignment);

	$("#edit").on( 'submit', editSubmit );
	
});

var deleteAssignment = function() {

	console.log( 'Delete:', $( this ).data() );

	$.ajax({
		url: '/api?id=' + $( this ).data( '_id' ),
		type: 'DELETE',
		success: function( data ) {
			console.log( 'Deleted:', data );
			displayStuff();
		}
	});

};

var editForm = function() {

	console.log( 'Edit button clicked!', $( this ).data() );

	$(".hidden-edit").show();

	$("#assignment_number_edit").val( $( this ).data('assignment_number'));
	$("#student_name_edit").val( $( this ).data('student_name'));
	$("#score_edit").val( $( this ).data('score'));

	$("#edit").data( $( this ).data() );

};

var editSubmit = function( event ) {

	event.preventDefault();

	console.log( 'Submitting edited assignment' );

	var id = $( "#edit" ).data( '_id' );

	var obj = {

		_id: id,
		assignment_number: $("#assignment_number_edit").val(),
		student_name: $("#student_name_edit").val(),
		score: $("#score_edit").val()

	};

	$.ajax({
		url: '/api',
		type: 'PUT',
		dataType: 'json',
		data: obj,
		success: function( data ) {

			console.log( 'Edited!!', data );

			$("#assignment_number_edit").val('');
			$("#student_name_edit").val('');
			$("#score_edit").val('');

			$(".hidden-edit").hide();

			displayStuff();

		}
	});
	
		

};

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

				var btn = $('<button />').data( data[i] ).html( 'Delete' );

					btn.on( 'click', deleteAssignment );

				var editBtn = $('<button />').data( data[i] ).html( 'Edit' );

					editBtn.on( 'click', editForm );

				li.append( editBtn );

				li.append( btn );

				ul.append( li );
			}

			$('.output').empty().append( ul );

		}
	});

};


var addAssignment = function( e ) {

	e.preventDefault();

	var obj = {			assignment_number: Number( $("#assignment_number").val() ),
			student_name: String( $("#student_name").val() ),
			score: Number( $("#score").val() )};

			console.log( 'obj', obj );

	$.ajax({
		url: '/api',
		type: 'POST',
		dataType: 'json',
		data: obj,
		success: function() {

			displayStuff();
		}
	});
	

};