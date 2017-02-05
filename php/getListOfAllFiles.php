<?php
	error_reporting(0);
$dir = $_POST['folder'];
$files = scandir($dir);
echo json_encode($files);
?>