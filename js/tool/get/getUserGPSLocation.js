var SW_getUserGPSLocation = function(){
	var successCallBack = function(position) {
		//console.log(position);
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		//console.log(lat);
		//console.log(lon);
		lat = Math.floor(lat*1000000)/1000000;
		lon = Math.floor(lon*1000000)/1000000;
		//console.log(lat);
		//console.log(lon);
		userLocation.lat = lat;
		userLocation.lon = lon;

            mapInterpreter.homeMarker = new google.maps.Marker({
                position: new google.maps.LatLng(userLocation.lat, userLocation.lon),
                map: mapInterpreter.googleMap,
                title: 'sijaintisi',
                icon: 'icon/my_location.png'
            });

		var geocoder = new google.maps.Geocoder();
			console.log(lat);
			console.log(lon);
			var latlng = new google.maps.LatLng(lat, lon);
			geocoder.geocode({'latLng': latlng }, function (results, status) {
			console.log("RESULTS");
			console.log(results);
		    if (status === google.maps.GeocoderStatus.OK) {
		      if (typeof results[7] !== 'undefined') {
		        console.log(results[7]);
		        userLocation.address=results[7].address_components[0];
		        userLocation.municipality=results[7].address_components[1];
		      }else if (typeof results[1] !== 'undefined') {
		        console.log(results[1]);
		        userLocation.address=results[1].address_components[0];
		        userLocation.municipality=results[1].address_components[1];
		      } else {
		        console.log('No results found');
		      }
		    } else {
		      console.log('Geocoder failed due to: ' + status);
		    }
		  });



	};
	var errorCallback_highAccuracy = function(position) {
		alert("ei saada tarkkaa gps osoitetta");
	}

	var errorCallback_lowAccuracy = function(position) {
		alert("ei saada gps osoitetta");
	}
    navigator.geolocation.getCurrentPosition(
        successCallBack,
        errorCallback_highAccuracy, {
            maximumAge: 600000,
            timeout: 5000,
            enableHighAccuracy: true
        }
    );
}