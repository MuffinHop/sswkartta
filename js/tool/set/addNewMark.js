var mayAddMarker = false;
var new_marker = false;
var addNewMarkInit = function() {
    $('#addMarker').click(function() {
        mayAddMarker = true;
    });
    google.maps.event.addListener(mapInterpreter.googleMap, 'click', function(e) {
        if (mayAddMarker) {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();
            new_marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: mapInterpreter.googleMap,
                title: "uusi merkki"
            });
            $('#newMarkerDialog').dialog({
                width: 640,
                height: 480
            });
            $('#newMarkerDialog').on('dialogclose', function(event) {
                new_marker.setMap(null);
            });
            new_marker.setMap(mapInterpreter.googleMap);



            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'location': new google.maps.LatLng(lat, lng)
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results);
                        var result = results[0].address_components;
                        $('#UUSIPAIKKAnimi').val( '' );
                        $('#UUSIPAIKKAkommentti').val( '' );
                        $('#UUSIPAIKKAkuva1').val( '' );
                        $('#UUSIPAIKKAkuva2').val( '' );
                        $('#UUSIPAIKKAkuva3').val( '' );
                        $('#UUSIPAIKKAmuu').prop( 'checked', false );
                        $('#UUSIPAIKKAofflimit').prop( 'checked', false );

                        $('#DippitelineTarget').prop( 'checked', false );
                        $('#ApinapuutTarget').prop( 'checked', false );
                        $('#PuolapuutTarget').prop( 'checked', false );
                        $('#LeuanvetotankoTarget').prop( 'checked', false );
                        $('#PunnerrustukkiTarget').prop( 'checked', false );
                        $('#VatsapenkkiTarget').prop( 'checked', false );
                        $('#SelkapenkkiTarget').prop( 'checked', false );
                        $('#MuuTarget').prop( 'checked', false );

                        $('#UUSIPAIKKAkatu').val( result[1].long_name );
                        $('#UUSIPAIKKAkunta').val( result[2].long_name );
                        $('#UUSIPAIKKApostinumero').val( result[4].long_name );
                        $('#UUSIPAIKKAnumero').val( result[0].long_name );
                    } else {
                        console.log('No results found');
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });




            mayAddMarker = false;
        }
    });
    $('#lisaa').click(function() {
        mayAddMarker = true;
        new_marker.setMap(null);
        $('#newMarkerDialog').dialog('close');


        var n_nimi = $('#UUSIPAIKKAnimi').val();
        var n_kunta = $('#UUSIPAIKKAkunta').val();
        var n_katu = $('#UUSIPAIKKAkatu').val();
        var n_numero = $('#UUSIPAIKKAnumero').val();
        var n_muu = $('#UUSIPAIKKAmuu').is(":checked");
        var n_postinumero = $('#UUSIPAIKKApostinumero').val();
        var n_kommentti = $('#UUSIPAIKKAkommentti').val();
        var n_kuva1 = $('#UUSIPAIKKAkuva1').val();
        var n_kuva2 = $('#UUSIPAIKKAkuva2').val();
        var n_kuva3 = $('#UUSIPAIKKAkuva3').val();
        var n_offlimit = $('#UUSIPAIKKAofflimit').is(":checked");

        var n_dippiteline = $('#DippitelineTarget').is(":checked");
        var n_apinapuut = $('#ApinapuutTarget').is(":checked");
        var n_puolapuut = $('#PuolapuutTarget').is(":checked");
        var n_leuanvetotanko = $('#LeuanvetotankoTarget').is(":checked");
        var n_punnerrustukki = $('#PunnerrustukkiTarget').is(":checked");
        var n_vatsapenkki = $('#VatsapenkkiTarget').is(":checked");
        var n_selkapenkki = $('#SelkapenkkiTarget').is(":checked");
        var n_muu = $('#MuuTarget').is(":checked");
        var n_kuvat = [];
        var n_valineet = [];
        if( n_kuva1.length == 0) {
            n_kuvat.push(n_kuva1);
        }
        if( n_kuva2.length == 0) {
            n_kuvat.push(n_kuva2);
        }
        if( n_kuva3.length == 0) {
            n_kuvat.push(n_kuva3);
        }
        if( n_dippiteline) {
            n_valineet.push('dippiteline');
        }
        if( n_apinapuut) {
            n_valineet.push('apinapuut');
        }
        if( n_puolapuut) {
            n_valineet.push('puolapuut');
        }
        if( n_leuanvetotanko) {
            n_valineet.push('leuanvetotanko');
        }
        if( n_punnerrustukki) {
            n_valineet.push('punnerrustukki');
        }
        if( n_vatsapenkki) {
            n_valineet.push('vatsapenkki');
        }
        if( n_selkapenkki) {
            n_valineet.push('selkäpenkki');
        }
        if( n_muu) {
            n_valineet.push('muu');
        }
        console.log(n_valineet);
        var markerData = {
            nimi: n_nimi,
            kunta: n_kunta,
            katu: n_katu,
            postinumero: n_postinumero,
            numero: n_numero,
            muu: n_muu,
            tietoa: n_kommentti,
            kuvat: n_kuvat,
            valineet: n_valineet,
            offlimit: n_offlimit,
            lat: new_marker.position.lat(),
            lng: new_marker.position.lng()
        };
        if(markerData.nimi.length == 0) {
            markerData.nimi = markerData.katu + ' ' + " liikunta-alue (" + markerData.kunta + ")";
        }
        addMarker( markerData );
        mayAddMarker = false;
    });
};