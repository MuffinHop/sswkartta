var searchBarLocator = function() {
  var input = document.getElementById('searchbar');
  var searchBox = new google.maps.places.SearchBox(input);
  var map = mapInterpreter.googleMap;

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      console.log(place);
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    var target_zoom = mapInterpreter.googleMap.getZoom();
    mapInterpreter.googleMap.setZoom(  target_zoom - 2 );
    if(target_zoom<20)
    	mapInterpreter.googleMap.setZoom(  target_zoom);
    if(target_zoom<18)
    	mapInterpreter.googleMap.setZoom(  target_zoom - 1  );

    mapInterpreter.googleMap.setZoom(  mapInterpreter.googleMap.getZoom() - 1 );
  });
};