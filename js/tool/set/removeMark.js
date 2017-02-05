var removeMark = function( targetName, that) {
	if(typeof userAdding == 'undefined') {
		mapInterpreter.marks.forEach(function(mark, index) {
			console.log(mark.data.nimi);
			if(mark.data.nimi == targetName) {
				mark.setMap(null);
				mark = undefined;
				mapInterpreter.marks.splice(index, 1);
				return false;
			}
			return true;
		});
	} else {
		mapInterpreter.suggested.forEach(function(mark, index) {
			if(mark.data.nimi == targetName) {
				removeFromSuggestionsData(mapInterpreter.suggested[index]);
				mark.setMap(null);
				mark = undefined;
				mapInterpreter.suggested.splice(index, 1);
				return false;
			}
			return true;
		});
	}	
	console.log(mapInterpreter.marks);
};