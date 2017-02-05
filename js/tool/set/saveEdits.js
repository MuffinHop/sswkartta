var saveEdits = function() {
	$('#saveEdits').click(function(){
		var _index = 0;
		var tableMarks = [];
		mapInterpreter.marks.forEach(function(mark, index) {
			if(typeof (mark.data.replacer) != 'undefined') {
				mark.data.nimi = mark.data.replacer.nimi;
				mark.replacer = null;
			}
			mark.data.index = _index;
			tableMarks.push( mark.data);
			_index++;
			return true;
		});

		var _password = $('#password').val();

		if(typeof finishRemoving != 'undefined') 
			finishRemoving();

		$.post( "php/saveMark.php",{ data: JSON.stringify(tableMarks), password: _password}, function( data ) {
			alert(data);
		});
	});
};