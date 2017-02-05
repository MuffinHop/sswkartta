<html>
<body>
<?php
error_reporting(0);
function Redirect($url, $permanent = false)
{
    if (headers_sent() === false)
    {
    	header('Location: ' . $url, true, ($permanent === true) ? 301 : 302);
    } else {
    	echo '<script type="text/javascript">
           window.location = "'.$url.'"
      </script>';
    }

    exit();
}


	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
	    $ip = $_SERVER['REMOTE_ADDR'];
	}
	date_default_timezone_set('Europe/Helsinki');
	$content = file_get_contents("messages.json");
	$jsobj = json_decode($content);
	$nmsg = new StdClass();






	$nmsg->user = filter_var( $_POST['user'], FILTER_SANITIZE_FULL_SPECIAL_CHARS );
	$nmsg->message = filter_var( $_POST['message'], FILTER_SANITIZE_FULL_SPECIAL_CHARS );
	$nmsg->target = filter_var( $_POST['target'], FILTER_SANITIZE_FULL_SPECIAL_CHARS );
	$nmsg->date = date("m.d.y H:i:s");
	array_unshift($jsobj->messages,$nmsg);
	$targetfile = fopen("messages.json", "w");
	fwrite($targetfile, json_encode($jsobj, JSON_UNESCAPED_UNICODE) );
	fclose($targetfile);

	$content = file_get_contents("with_ip.json");
	$jsobj = json_decode($content);
	$nmsg->ip =  $ip ;
	array_unshift($jsobj->messages,$nmsg);
	$targetfile = fopen("with_ip.json", "w");
	fwrite($targetfile, json_encode($jsobj, JSON_UNESCAPED_UNICODE) );
	fclose($targetfile);
	ob_start();
	$gosite=$utf8string = html_entity_decode(preg_replace("/U\+([0-9A-F]{4})/", "&#x\\1;", $_POST['target']), ENT_NOQUOTES, 'UTF-8');
	$gosite=$_POST['target'];
	echo $gosite;
	Redirect('http://sswkartta.vektori.xyz/viestit/index.php#'.$gosite);
	die();
?>
</body>
</html>