<?php
	function deleteDir($path) {
	    if (is_dir($path) === true)
	    {
	        $files = array_diff(scandir($path), array('.', '..'));

	        foreach ($files as $file)
	        {
	            deleteDir(realpath($path) . '/' . $file);
	        }

	        return rmdir($path);
	    }

	    else if (is_file($path) === true)
	    {
	        return unlink($path);
	    }

	    return false;
	}
	function xcopy($src, $dest) {
		foreach (scandir($src) as $file) {
			if (!is_readable($src . '/' . $file)) continue;
			if (is_dir($src .'/' . $file) && ($file != '.') && ($file != '..') ) {
				mkdir($dest . '/' . $file);
				xcopy($src . '/' . $file, $dest . '/' . $file);
			} else {
				copy($src . '/' . $file, $dest . '/' . $file);
			}
		}
	}

	$ttime = time();

	$jsonobj = (array) json_decode(strip_tags($_POST['data']));

	foreach ($jsonobj as &$value) {
		var_dump($value);
		echo "<br>";
		echo "../data/suggested/suggestion_".$ttime."_".$value->{'index'}.".json";
		echo "<br>";
		$value->{'filename'} = "data/suggested/suggestion_".$ttime."_".$value->{'index'}.".json";
		$targetfile = fopen("../data/suggested/suggestion_".$ttime."_".$value->{'index'}.".json", "w");
		fwrite($targetfile, json_encode($value) );
		fclose($targetfile);
	}
	echo "OK";
?>