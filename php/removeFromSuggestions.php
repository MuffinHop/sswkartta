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


	$removesuggestion_filename = $_POST['file'];



	$ttime = time();

	unlink("../".$removesuggestion_filename);

?>