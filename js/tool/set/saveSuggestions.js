$('#saveSuggestions').click(function() {
	console.log('saving suggestions');
	console.log(mapInterpreter.suggested);
	var tableMarks = [];
	var _index = 0;
    mapInterpreter.suggested.forEach(function(suggested, index) {
		if(typeof (suggested.data.replacer) != 'undefined') {
			suggested.data.nimi = suggested.data.replacer.nimi;
			suggested.replacer = null;
		}
		suggested.data.index = _index;
		tableMarks.push( suggested.data);
		_index++;
		return true;
	});
	$.post( "php/saveSuggestion.php",{data: JSON.stringify(tableMarks)}, function( data ) {
		alert(data);
		//setTimeout(function(){window.location.replace("http://sswkartta.vektori.xyz/saved.html");});
	});

});