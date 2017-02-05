/*
    Followring Javacript map interpreter code made by Sampo Savilampi for Suomen Street Workout - non-profit organization

    Used libraries and services
    Google Maps API by Google inc.
    JQuery API by JQuery Team
    Openweathermap by Extreme Electronics LTD. (openweathermap.org)

    Copyright (c) 2016 Sampo Savilampi
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var getWeatherThenAddSuggest = function( locationMark) {
    console.log(locationMark);
    var lat = locationMark.position.lat();
    var lng = locationMark.position.lng();
    console.log(lat);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=482bbda78b3df4b90062c1d4ea6cb4d6&units=metric&lang=fi";
    $.getJSON(
        url,
        function ( data ) {
            console.log(data);
            var saa='';
            saa+='<img src="icon\/'+data.weather[0].icon+'.png">';
            saa+='<br>lämpötila:'+data.main.temp+' C<br>';
            var tuuli=data.wind.speed;
            var kosteus=data.main.humidity;
            var nimi = locationMark.nimi;
            var weatherkohde = 'weather' + nimi;
            saa+='<tiny>'+data.weather[0].description+'</tiny><br>';
            var saatieto = 'Sää kohteessa nyt:<br>' + 
                            saa + 
                            '<br>tuuli: ' + 
                            tuuli + 
                            ' m/s | kosteus: ' + 
                            kosteus + 
                            '% <br>[ openweathermap.org ]';

            locationMark.popup = new google.maps.InfoWindow({
                content:    (locationMark.txt + '<div class="weather">'+saatieto+'</div>')
            });
            google.maps.event.addListener(locationMark.merkki, 'click', function() {
                locationMark.popup.open(karttatulkki.kartta,locationMark.merkki);
            });
            var nimi = parse( locationMark.nimi.toLowerCase() );
            nimi=nimi.replace('/', '_');
            nimi=nimi.replace('\/', '_');
            nimi=nimi.replace('//', '_');
            nimi=nimi.replace(' ', '_');
            if(karttatulkki.hash == '#' + nimi.toLowerCase()) {
                locationMark.popup.open(karttatulkki.kartta,locationMark.merkki);
                karttatulkki.kartta.setCenter(new google.maps.LatLng(locationMark.lat + 0.0004, locationMark.lng));
                karttatulkki.kartta.setZoom(17);
            }

        }
    ).fail(function() {
            locationMark.popup = new google.maps.InfoWindow({
                content:    locationMark.txt+ '<div class="weather">ei saatu säätietoja</div>'
            });
            google.maps.event.addListener(locationMark.merkki, 'click', function() {
                locationMark.popup.open(karttatulkki.kartta,locationMark.merkki);
            });

            var nimi = parse( locationMark.nimi.toLowerCase() );
            nimi=nimi.replace('/', '_');
            nimi=nimi.replace('\/', '_');
            nimi=nimi.replace('//', '_');
            nimi=nimi.replace(' ', '_');
            if(karttatulkki.hash == '#' + nimi.toLowerCase()) {
                locationMark.popup.open(karttatulkki.kartta,locationMark.merkki);
                karttatulkki.kartta.setCenter(new google.maps.LatLng(locationMark.lat + 0.0004, locationMark.lng));
                karttatulkki.kartta.setZoom(17);
            }
    });
    mapInterpreter.suggested.push(locationMark);
}
var addMarker_index = 0;
var addSuggestMarker = function( data ) {
            userAdding = true;
            console.log(data);
            var iconLoc = "icon/add.png";
            var merkki = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map: mapInterpreter.googleMap,
                title: data.nimi,
                icon: iconLoc
            });
            var merkkiText = '';
            merkkiText += '<input value="Poista" onclick="removeMark(\''+data.nimi+'\', this)" type="submit" target="'+data.nimi+'"><br><br>';
            if(acceptMark) {
                merkkiText += '<input value="Hyväksy" onclick="acceptSuggestion(\''+data.nimi+'\', this)" type="submit" target="'+data.nimi+'"><br> ';
            }
            merkkiText += '<h2><div class="editbox">Nimi:<br> <div id="nimi_'+addMarker_index+'" class="targetName" onInput="targetNameEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.nimi+'</div></div></h2> ';
            merkkiText += '<i><div class="editbox">Katu:<br> <div id="katu_'+addMarker_index+'" class="targetStreet" onInput="targetStreetEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.katu+'</div></div></i> ';
            if(data.numero.length>0)
            merkkiText += '<i><div class="editbox">Numero:<br> <div id="numero_'+addMarker_index+'" class="targetNumber" onInput="targetNumberEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.numero+'</div></div></i>';
            if(data.postinumero.length>0)
            merkkiText += '<i><div class="editbox">Postinumero:<br> <div id="postinumero_'+addMarker_index+'" class="targetZIP" onInput="targetZIPEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'"> '+data.postinumero+'</div></div></i>';
            merkkiText += '<i><div class="editbox">Kunta:<br> <b><div id="kunta_'+addMarker_index+'" class="targetMunicipality" onInput="targetMunicipalityEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.kunta+'</div></b></div></i>';
            merkkiText += '<div class="editbox">Tietoa kohteesta: <p><div id="tietoa_'+addMarker_index+'" class="targetNfo" onInput="targetNfoEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb;" target="'+data.nimi+'" >' + data.tietoa + '</div></p></div>';
            merkkiText += '<br><hr><input onchange="notOpen24H(\''+data.nimi+'\', this)" type="checkbox" target="'+data.nimi+'" ';

            if( data.offlimit) {
                merkkiText += ' checked="true" ';
            }
            merkkiText += '>Rajaittuna aikoina auki yleisölle(koulualue, rakennus)<hr><br>';
            var targets = [ 'dippiteline', 'apinapuut', 'puolapuut', 'leuanvetotanko', 'punnerrustukki', 'vatsapenkki', 'selkäpenkki', 'muu'];
            merkkiText += 'Kohteessa välineet: <ul>';
            targets.forEach( function(suggested_target, suggest_indx) { 
                merkkiText += '<li>' + suggested_target + '<input onchange="onChangeTargets(\''+data.nimi+'\', this, \''+suggested_target+'\')" type="checkbox" target="'+data.nimi+'" id="is_'+suggested_target+'"';
                data.valineet.forEach( function(target, indx) {
                    if(target == suggested_target) {
                        merkkiText += ' checked="true" ';
                        return false;
                    }
                    return true;
                });
                merkkiText +=  '></li>';
            });
            merkkiText += '</ul>';


    var imgHyperText = "";
    var changeLineCounter = 0;
    for (var kuvaIndx = 0; kuvaIndx < data.kuvat.length; kuvaIndx++) {
        if (data.kuvat[kuvaIndx].length > 0) {
            var imageTag = '<img src ="'+data.kuvat[kuvaIndx]+'" tag="Image ' + data.nimi + ' nro ' + kuvaIndx +'" width="120px" height="auto">';
            imgHyperText +=
                        '<a ' +
                        'href="' +
                        data.kuvat[kuvaIndx] +
                        '" style="width:auto;height:5em;" >'+imageTag+'</a> ';
        }
        if( changeLineCounter % 3 == 2) {
            imgHyperText+="<br>";
        }
        changeLineCounter++;
    }
    merkkiText += imgHyperText;
    merkki.txt = merkkiText + '<hr>';
    merkki.data = data;
    getWeatherThenAddSuggest(merkki);

    google.maps.event.addListener(merkki, 'click', function() {
        merkki.popup.open(mapInterpreter.googleMap,merkki);
    });
};

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
        addSuggestMarker( markerData );
        mayAddMarker = false;
    });
};