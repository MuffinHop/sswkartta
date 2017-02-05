<?php
	error_reporting(0);
	exit;
	$content = file_get_contents("merkit.json");
	$content = ($content);
	$jsobj = json_decode($content);

	$i=0;
	foreach ($jsobj->lokaatiot as &$part) {
		echo var_dump($part) . "<br><br><br><br>";
		$targetfile = fopen("../crunch/".$i.".json", "w");
		$part->valineet = array();
		$part->index = $i;
		fwrite($targetfile, json_encode($part, JSON_UNESCAPED_UNICODE) );
		fclose($targetfile);
		$i++;
	}
?>