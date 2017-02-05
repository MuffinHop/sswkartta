<?php

if(strcmp($_POST["salasana"],"") == 0) {  /*image save password missing*/
$target_path = "../img/";
$target_path = $target_path . basename( $_FILES['upfile']['name']);
    if ($_FILES['upfile']['size'] > 100000000) {
        echo "Liian iso tiedosto";
    } else {

		if(move_uploaded_file($_FILES['upfile']['tmp_name'], $target_path)) {
		    echo "The file ".  basename( $_FILES['upfile']['name']). 
		    " has been uploaded: <a href=\"".$target_path."\">kuva</a>";
		} else{
		    echo "There was an error uploading the file, please try again!";
		}
	}
} else {
	echo "väärä salasana";
}
?>