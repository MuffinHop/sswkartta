
var find_lat, find_lng;
var reittiPoly;
function highAccuracyErrorCallback(position) {
    alert("ei saada tarkkaa gps osoitetta");
}

function foundCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var directionsService = new google.maps.DirectionsService();
    var request = {
        origin: new google.maps.LatLng(latitude, longitude),
        destination: new google.maps.LatLng(find_lat, find_lng),
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        console.log("!ok");
        if (status == google.maps.DirectionsStatus.OK) {
            console.log("!awwyes");
            console.log(result);

            reittiPoly = new google.maps.Polyline({
                path: result.routes[0].overview_path,
                geodesic: true,
                strokeColor: '#FF2211',
                strokeOpacity: 1.0,
                strokeWeight: 5
            });
            console.log(find_lat + ',' + find_lng);
            console.log(userLocation);
            var middle_lat = ( find_lat + userLocation.lat ) / 2.0 ;
            var middle_lng = ( find_lng + userLocation.lon ) / 2.0 ;
            console.log(middle_lat);
            console.log(middle_lng);

            var bounds = new google.maps.LatLngBounds();
            bounds.extend(new google.maps.LatLng(find_lat, find_lng));
            bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lon));

            mapInterpreter.googleMap.fitBounds(bounds);
            reittiPoly.setMap(mapInterpreter.googleMap);

            mapInterpreter.homeMarker = new google.maps.Marker({
                position: new google.maps.LatLng(userLocation.lat, userLocation.lon),
                map: mapInterpreter.googleMap,
                title: 'sijaintisi',
                icon: 'icon/my_location.png'
            });

        } else {
            alert("reittiä ei löydetty");
        }
    });
}

function searchGPSTravel(lat, lng) {
    find_lat = lat;
    find_lng = lng;
    if (reittiPoly != undefined) {
        reittiPoly.setVisible(false);
    }
    navigator.geolocation.getCurrentPosition(
        foundCallback,
        highAccuracyErrorCallback, {
            maximumAge: 600000,
            timeout: 5000,
            enableHighAccuracy: true
        }
    );
}