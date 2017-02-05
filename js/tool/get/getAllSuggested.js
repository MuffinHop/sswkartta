/*
	Followring Javacript map interpreter code made by Sampo Savilampi for Suomen Street Workout - non-profit organization

	Used libraries and services
	Google Maps API by Google inc.
	JQuery API by JQuery Team
	Openweathermap by Extreme Electronics LTD. (openweathermap.org)

	Copyright (c) 2016 Sampo Savilampi
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*gets all JSON mark files from  folder*/
var SW_getAllSuggested = function(callback) {
	var folderName = '../data/suggested/';
	$.ajax({
		type: 'POST',
		url: "php/getListOfAllFiles.php",
		data: {folder:folderName},
		success: function (data) {
			var arrayOfFiles = JSON.parse(data);
			console.log(arrayOfFiles);
			callback(arrayOfFiles.splice(2,arrayOfFiles.length));
		}
	});
};
var gotoZoom = function( lat, lng) {
	mapInterpreter.googleMap.setCenter({lat:lat, lng:lng});
	mapInterpreter.googleMap.setZoom(14);
};
var placeSuggested = function( suggestUrlarr) {
	suggestUrlarr.forEach(function(suggest_targetUrl) {
		console.log(suggest_targetUrl);

		var folderName = 'data/suggested/';
		var markfilename = folderName + suggest_targetUrl;
		$.getJSON(
			markfilename,
			function ( data ) {
				console.log(data);
				$('#newSuggestions').append('<a id="'+data.name+'" onclick="gotoZoom('+data.lat+','+data.lng+')" href="#">[ ' + data.nimi + ' ] (' + data.katu + ', ' + data.kunta + ')</a><br>');
				addSuggestMarker(data);
			});
		return true;
	});
};