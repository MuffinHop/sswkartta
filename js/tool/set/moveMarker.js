var mayMoveMarker = false;
var markerMove = false;
var stopDragable = function(stop_marker) {
    stop_marker.setDraggable(false);
};
var makeDragable = function(target_marker) {
    target_marker.setDraggable(true);
    google.maps.event.addListener(target_marker, 'drag', function(draggable) {

    });
    google.maps.event.addListener(target_marker, 'dragend', function(result) {
        mapInterpreter.marks.forEach(stopDragable);

        target_marker.data.lat = result.latLng.lat();
        target_marker.data.lng = result.latLng.lng();

        var geocoder = new google.maps.Geocoder();
        var latlng = target_marker.data;
        geocoder.geocode({
            'location': latlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results);
                    var result = results[0].address_components;
                    target_marker.data.katu = result[1].long_name;
                    target_marker.data.kunta = result[2].long_name;
                    target_marker.data.postinumero = result[5].long_name;
                    target_marker.data.numero = '' + result[0].long_name;
                    console.log(target_marker.data);
                    addMarker(target_marker.data);
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });

		console.log('drag off');
		mayMoveMarker = false;
		$('#moveMarker').val('Siirrä Merkki');
    });
};
var moveMarkerInit = function() {
    $('#moveMarker').mouseup(function() {
    	if(!mayMoveMarker) {
    		console.log('drag on');
			mayMoveMarker = true;
			if (typeof reittiPoly != 'undefined') {
				reittiPoly.setMap(null);
			}
			$('#moveMarker').val('Lopeta Merkin Siirto');
			mapInterpreter.marks.forEach(makeDragable);
    	} else {
    		console.log('drag off');
	        mayMoveMarker = false;
	        $('#moveMarker').val('Siirrä Merkki');
    	}
    });

};