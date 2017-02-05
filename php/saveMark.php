<?php
	error_reporting(E_ERROR);
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

	if(strcmp( $_POST['password'] , "xScn8") != 0) {
		echo "Väärä Salasana";
		exit();
	}

	$ttime = time();

	mkdir("../data/old".$ttime."/", 0755);
	xcopy("../data/current/", "../data/old".$ttime."/");

	deleteDir('../data/current/');
	mkdir('../data/current/', 0755);

	$jsonobj = (array) json_decode(strip_tags($_POST['data']));

	foreach ($jsonobj as &$value) {
		$targetfile = fopen("../data/current/".$value->{'index'}.".json", "w");
		fwrite($targetfile, json_encode($value) );
		fclose($targetfile);
	}
	echo "OK";
?>