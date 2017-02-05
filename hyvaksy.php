<!doctype html>
<html lang="fi">
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<meta charset="utf-8">
	<title>Suomen Street Workout - Map</title>
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:Condensed" />
	<link href="css/ui-lightness/jquery-ui-1.9.2.custom.css" rel="stylesheet">
	<script src="js/jquery-1.8.3.js"></script>
	<script src="js/jquery-ui-1.9.2.custom.js"></script>
	<link rel="stylesheet" type="text/css" href="tyyli.css" />
	<body>
		<div id="header">
			<a href="http://suomenstreetworkout.org/">Suomen Street Workout</a>
		</div>
		<div id="quicklinks">
			<div><h2><a href="hallitus.php">Lisää omia merkkejä</a></h2></div>
		</div>
		<div id="selectSearchTargets">
			<input id="moveMarker" type="submit" value="Siirrä Merkki" style="width:100%"></input><br>

			<br>
			<input id="saveEdits" type="submit" value="Tallenna Muutokset" style="width:100%"></input>
			<input id="password" type="password" placeholder="salasana" style="width:100%"></input>
			<br><br>
			<tiny>Hae osoite:</tiny>
			<input id="searchbar" type="text" placeholder="Hae osoiteella"></input><br><br>
		</div>
		<div id="map" style="max-height:98%; margin: 0px; padding:0px"></div>
		<div id="dialogs"></div>
		<div id="mapMarks"></div>


		<div id="newSuggestions" title="Uudet ehdotukset">

		</div>
    	<script src="js/tool/sorting/sortTargetItems.js"></script>
    	<script src="js/tool/set/acceptMark.js"></script>
    	<script src="js/tool/travelling/ropas.js"></script>
    	<script src="js/tool/travelling/gpsTravel.js"></script>
    	<script src="js/tool/travelling/searchBarLocator.js"></script>
    	<script src="js/tool/set/moveMarker.js"></script>
    	<script src="js/tool/putAllMarks.js"></script>
    	<script src="js/tool/get/getAllMarks.js"></script>
    	<script src="js/tool/get/getUserGPSLocation.js"></script>
    	<script src="js/tool/set/addSuggestMark.js"></script>
    	<script src="js/tool/set/removeMark.js"></script>
    	<script src="js/tool/get/getAllSuggested.js"></script>
    	<script src="js/tool/set/saveEdits.js"></script>
    	
    	<script src="js/tool/accepting.js"></script>
<script>
			function insertNodeAtCaret(node) {
			    if (typeof window.getSelection != "undefined") {
			        var sel = window.getSelection();
			        if (sel.rangeCount) {
			            var range = sel.getRangeAt(0);
			            range.collapse(false);
			            range.insertNode(node);
			            range = range.cloneRange();
			            range.selectNodeContents(node);
			            range.collapse(false);
			            sel.removeAllRanges();
			            sel.addRange(range);
			        }
			    } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
			        var html = (node.nodeType == 1) ? node.outerHTML : node.data;
			        var id = "marker_" + ("" + Math.random()).slice(2);
			        html += '<span id="' + id + '"></span>';
			        var textRange = document.selection.createRange();
			        textRange.collapse(false);
			        textRange.pasteHTML(html);
			        var markerSpan = document.getElementById(id);
			        textRange.moveToElementText(markerSpan);
			        textRange.select();
			        markerSpan.parentNode.removeChild(markerSpan);
			    }
			}
    	var check_API_Bug = function(event,that) {
			console.log(event.keyCode);
        	if(event.keyCode == 75 || event.keyCode == 107 || event.keyCode == 109 || event.keyCode == 77) {
				insertNodeAtCaret(document.createTextNode(String.fromCharCode(event.keyCode)));
			}
    	};
        $("#map").contents().find('div').keypress(function(event){
        	console.log(event.keyCode);
        	console.log(this.id);
            $(this.id).append(String.fromCharCode(event.keyCode));
        });
    	</script>


		<script async defer
			src="">
		</script>  <!--MISSING GOOGLE MAPS API KEY    google map api url + key required here -->
	</body>
</html>