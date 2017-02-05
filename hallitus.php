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
			<div><h2><a href="hyvaksy.php">Hyväksy Ehdotuksia</a></h2></div>
		</div>
		<div id="selectSearchTargets">
			<input id="addMarker" type="submit" value="Lisää Merkki" style="width:100%"></input><br>
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

		<div id="newMarkerDialog" title="Lisätään Uusi Merkki">
			<h3>Paikan nimi</h3>
			<input type="text" name="Paikan Nimi" value="" id="UUSIPAIKKAnimi"/>
			<h3>Osoite</h3>
			Kunta <br><input type="text" name="Kunta" value="" id="UUSIPAIKKAkunta"/><br>
			Katu <br><input type="text" name="Katu:" value="" id="UUSIPAIKKAkatu"/><br>
			Kiinteistön numero <br><input type="number" name="Kiinteistön numero" value="0" min="0" max="1000" id="UUSIPAIKKAnumero"/><br>
			Rappu <br><input type="text" name="Kiinteistömuu" value="" id="UUSIPAIKKAmuu"/><br>
			Postinumero <br><input type="text" name="Postinumero" value="" id="UUSIPAIKKApostinumero"/><br>
			<h3>Tietoa paikasta</h3>
			<textarea name="UUSIPAIKKAkommentti" id="UUSIPAIKKAkommentti"></textarea><br>
			Kuva #1 url <br><input type="text" name="kuva1" value="" id="UUSIPAIKKAkuva1"/><br>
			Kuva #2 url <br><input type="text" name="kuva2" value="" id="UUSIPAIKKAkuva2"/><br>
			Kuva #3 url <br><input type="text" name="kuva3" value="" id="UUSIPAIKKAkuva3"/><br>
			Koulualue/offlimit?<input id="UUSIPAIKKAofflimit" type="checkbox" name="offlimit" value="offlimit">
			<br>
			<input id="DippitelineTarget" type="checkbox" value="dippiteline">Dippiteline</input><br>
			<input id="ApinapuutTarget" type="checkbox" value="apinapuut">Apinapuut</input><br>
			<input id="PuolapuutTarget" type="checkbox" value="puolapuut">Puolapuut</input><br>
			<input id="LeuanvetotankoTarget" type="checkbox" value="leuanvetotanko">Leuanvetotanko</input><br>
			<input id="PunnerrustukkiTarget" type="checkbox" value="leuanvetotanko">Punnerrustukki</input><br>
			<input id="VatsapenkkiTarget" type="checkbox" value="leuanvetotanko">Vatsapenkki</input><br>
			<input id="SelkapenkkiTarget" type="checkbox" value="leuanvetotanko">Selkäpenkki</input><br>
			<input id="MuuTarget" type="checkbox" value="leuanvetotanko">Muu</input><br>
			<p>
				<button id="lisaa" value="Lisää" >Lisää</button>
			</p>
    	</div>
    	<script src="js/tool/sorting/sortTargetItems.js"></script>
    	<script src="js/tool/travelling/ropas.js"></script>
    	<script src="js/tool/travelling/gpsTravel.js"></script>
    	<script src="js/tool/travelling/searchBarLocator.js"></script>
    	<script src="js/tool/set/moveMarker.js"></script>
    	<script src="js/tool/putAllMarks_edititable.js"></script> <!--only allowed in hallitus.htm-->
    	<script src="js/tool/get/getAllMarks.js"></script>
    	<script src="js/tool/get/getUserGPSLocation.js"></script>
    	<script src="js/tool/set/addNewMark.js"></script>
    	<script src="js/tool/set/editMarker.js"></script>
    	<script src="js/tool/set/removeMark.js"></script>
    	<script src="js/tool/set/saveEdits.js"></script>
    	<script src="js/tool/moderation.js"></script>
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