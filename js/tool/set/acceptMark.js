var listOfRemovables = [];
var finishRemoving = function() {
    listOfRemovables.forEach( function(mark) {
        $.post( 'php/removeFromSuggestions.php', { file: mark.filename, data:mark});
        return true;
    });
}
var removeFromSuggestionsData = function( mark) {
	console.log('remove from marks: ' + mark.data.filename);
    $('#'+mark.data.name).remove();
    listOfRemovables.push(mark.data);
};
var acceptSuggestion = function(targetName, that) {
    console.log(targetName);
    mapInterpreter.suggested.forEach(function(mark, index) {
        console.log(mark.data.nimi);
        if(mark.data.nimi == targetName) {
            removeFromSuggestionsData(mark);
            mapInterpreter.suggested.splice(index, 1);
            addMarker(mark.data, true);
            mark.setMap(null);
            return false;
        }
        return true;
    });
    console.log(mapInterpreter.marks);
};