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

<?php
if(!isset($_COOKIE["eulaw"])) {
echo <<<EOL
		<div id="dialog" title="Huomio" style="z-index:100000">
		  <p>Tämä palvelu on vielä hieman kehityksessä joten virheitä saattaa esiintyä.</p>
		</div>
EOL;
}
?>
		<div id="imagedialog" title="" style="z-index:10000">
		  
		</div>
		<div id="header">
			<a href="http://suomenstreetworkout.org/">Suomen Street Workout</a>
		</div>
		<div id="quicklinks">
			<div><h2><a href="ehdota.php">Ehdota Uusia Merkkejä</a></h2></div>
			<div><a href="hallitus.php">Hallitus</a></div>
		</div>
		<button id="showHideSearch"><span id="targ">Piilota haku ja tarkennus</span></button>
		<div id="selectSearchTargets">
			<tiny>Hae osoite:</tiny>
			<input id="searchbar" type="text" placeholder="Hae osoiteella"></input><br><br>
			<tiny>Näytä vain kohteet joka<br>sisältää jonkin seuraavista:</tiny>

			<div class="targetItem targetSelected" id="DippitelineTarget" value="dippiteline"><img id="checkInfo" src="icon/checked.png"></img> Dippiteline</div>
			<div class="targetItem targetSelected" id="ApinapuutTarget" value="apinapuut"><img id="checkInfo" src="icon/checked.png"></img> Apinapuut</div>
			<div class="targetItem targetSelected" id="PuolapuutTarget" value="puolapuut"><img id="checkInfo" src="icon/checked.png"></img> Puolapuut</div>
			<div class="targetItem targetSelected" id="LeuanvetotankoTarget" value="leuanvetotanko"><img id="checkInfo" src="icon/checked.png"></img> Leuanvetotanko</div>
			<div class="targetItem targetSelected" id="PunnerrustukkiTarget" value="punnerrustukki"><img id="checkInfo" src="icon/checked.png"></img> Punnerrustukki</div>
			<div class="targetItem targetSelected" id="VatsapenkkiTarget" value="vatsapenkki"><img id="checkInfo" src="icon/checked.png"></img> Vatsapenkki</div>
			<div class="targetItem targetSelected" id="SelkapenkkiTarget" value="selkäpenkki"><img id="checkInfo" src="icon/checked.png"></img> Selkäpenkki</div>
			<div class="targetItem targetSelected" id="MuuTarget" value="muu"><img id="checkInfo" src="icon/checked.png"></img> Muu</div>
		</div>
		<div id="map" style="max-height:98%; margin: 0px; padding:0px"></div>
		<div id="dialogs"></div>
		<div id="mapMarks"></div>

    	<script src="js/tool/dialogimage.js"></script>
    	<script src="js/tool/sorting/sortTargetItems.js"></script>
    	<script src="js/tool/travelling/ropas.js"></script>
    	<script src="js/tool/travelling/gpsTravel.js"></script>
    	<script src="js/tool/travelling/searchBarLocator.js"></script>
    	<script src="js/tool/putAllMarks.js"></script>
    	<script src="js/tool/get/getAllMarks.js"></script>
    	<script src="js/tool/get/getUserGPSLocation.js"></script>
    	<script src="js/tool/main.js"></script>
    	<script>
    		var showSearch = true;
    		$('#showHideSearch').click(function() {
    			if(showSearch) {
    				$('#selectSearchTargets').hide('slow');
    				$('#targ').html('Näytä haku ja tarkennus');
    				showSearch=false;
    			}else {
    				$('#selectSearchTargets').show('slow');
    				$('#targ').html('Piilota haku ja tarkennus');
    				showSearch=true;
    			}
    		});
    	</script>

		<script async defer
			src="">
		</script>  <!--MISSING GOOGLE MAPS API KEY    google map api url + key required here -->
	</body>
</html>