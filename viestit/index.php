<?php
session_start();
require_once __DIR__ . '/Facebook/autoload.php';
$fb = new Facebook\Facebook([
  'app_id' => '' /*facebook appid missing from github version*/, 
  'app_secret' => '' /*facebook appid missing*/,
  'default_graph_version' => 'v2.4',
  ]);

$helper = $fb->getRedirectLoginHelper();
try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
} catch(Facebook\Exceptions\FacebookSDKException $e) {
}
if (isset($accessToken)) {
  // Logged in!
  $_SESSION['facebook_access_token'] = (string) $accessToken;


echo <<<EOL
<!doctype html>
<html lang="fi">
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<meta charset="utf-8">
	<title>Suomen Street Workout - Map</title>
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:Condensed" />
	<link href="../css/ui-lightness/jquery-ui-1.9.2.custom.css" rel="stylesheet">
	<script src="../js/jquery-1.8.3.js"></script>
	<script src="../js/jquery-ui-1.9.2.custom.js"></script>
	<link rel="stylesheet" type="text/css" href="../tyyli.css" />
	<body>
		<div id="topic"></div>
<script>
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      getName();
    } else  {
    }
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '', /*facebook appid missing from github version for security reasons*/
      xfbml      : true,
      version    : 'v2.6'
    });

	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	  });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  function getName() {
    FB.api('/me', function(response) {
		var search_target = window.location.hash;
		search_target = search_target.replaceAll("%C3%A4","ä");
		search_target = search_target.replaceAll("%C3%B6","ö");
		search_target = search_target.replaceAll("%C3%84","Ä");
		search_target = search_target.replaceAll("%C3%96","Ö");
		window.location.hash = search_target;
		search_target = search_target.substring(1, search_target.length);
      console.log('Successful login for: ' + response.name);
      $('#user').val(response.name);
      $('#targetid').val(search_target);
      $('#sendmessage').html('Viesti kohteesta:<br>Käyttäjä '+response.name+'<br>'+$('#sendmessage').html());
	}); 
  };
  
</script>
			<div id="sendmessage"><form action="send.php" method="post">
				Käyttäjän nimi:<input type="text" style="width:99%" name="user" id="user" value=""><input type="hidden" style="width:99%" name="target" id="targetid" value="">Viesti:<input type="text" style="width:99%" name="message"><input type="submit" value="Lähetä"></div>
			
	</form></div>
	<div id="messages">
	</div>
	</body>
    <script src="main.js"></script>
</html>
EOL;
} else {
echo <<<EOL
<!doctype html>
<html lang="fi">
<head>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <title>Suomen Street Workout - Map</title>
  <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:Condensed" />
  <link href="../css/ui-lightness/jquery-ui-1.9.2.custom.css" rel="stylesheet">
  <script src="../js/jquery-1.8.3.js"></script>
  <script src="../js/jquery-ui-1.9.2.custom.js"></script>
  <link rel="stylesheet" type="text/css" href="../tyyli.css" />
  <body style="background-color:#fff">
    <div id="topic"></div>
<script>
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      getName();
    } else  {
    }
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '', /*facebook appid missing from github version for security reasons*/
      xfbml      : true,
      version    : 'v2.6'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  function getName() {
    FB.api('/me', function(response) {
    var search_target = window.location.hash;
    search_target = search_target.replaceAll("%C3%A4","ä");
    search_target = search_target.replaceAll("%C3%B6","ö");
    search_target = search_target.replaceAll("%C3%84","Ä");
    search_target = search_target.replaceAll("%C3%96","Ö");
    window.location.hash = search_target;
    search_target = search_target.substring(1, search_target.length);
      console.log('Successful login for: ' + response.name);
      $('#user').val(response.name);
      $('#targetid').val(search_target);
      $('#sendmessage').html('Viesti kohteesta:<br>Käyttäjä '+response.name+'<br>'+$('#sendmessage').html());
  }); 
  };
  
</script>
      <div id="sendmessage"><form action="send.php" method="post">
        Käyttäjän nimi:<input type="text" style="width:99%" name="user" id="user" value=""><input type="hidden" style="width:99%" name="target" id="targetid" value="">Viesti:<input type="text" style="width:99%" name="message"><input type="submit" value="Lähetä"></div>
      
  </form></div>
  <div id="messages">
  </div>
  </body>
    <script src="main.js"></script>
</html>
EOL;
}
?>