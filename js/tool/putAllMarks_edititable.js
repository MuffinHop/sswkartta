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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var getWeatherThenAdd = function( locationMark) {
	//console.log(locationMark);
	var lat = locationMark.position.lat();
	var lng = locationMark.position.lng();
	//console.log(lat);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=&units=metric&lang=fi";  /*APP ID MISSING FROM GITHUB SOURCE*/
    $.getJSON(
        url,
        function ( data ) {
        	//console.log(data);
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
	mapInterpreter.marks.push(locationMark);
}
var addMarker_index=0;
var addMarker = function( data ) {
            alert("Ladataan merkkejä");
            //console.log(data);
            var iconLoc = "icon/merkki_tavallinen.png";
            if (data.offlimit == 1) {
                iconLoc = "icon/offlimit.png";
            }
            var merkki = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map: mapInterpreter.googleMap,
                title: data.nimi,
                icon: iconLoc
            });
            data.nimi.replace('Ã¤','ä');
            data.nimi.replace('Ã¶','ö');
            data.katu.replace('Ã¤','ä');
            data.katu.replace('Ã¶','ö');
            data.kunta.replace('Ã¤','ä');
            data.kunta.replace('Ã¶','ö');
            data.tietoa.replace('Ã¤','ä');
            data.tietoa.replace('Ã¶','ö');
            var merkkiText = '';
            merkkiText += '<input value="Poista" onclick="removeMark(\''+data.nimi+'\', this)" type="submit" target="'+data.nimi+'"><br> ';
            merkkiText += '<h2><div class="editbox">Nimi:<br> <div onkeypress="check_API_Bug(event,this)" id="nimi_'+addMarker_index+'" class="targetName" onInput="targetNameEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.nimi+'</div></div></h2> ';
            merkkiText += '<i><div class="editbox">Katu:<br> <div onkeypress="check_API_Bug(event,this)" id="katu_'+addMarker_index+'" class="targetStreet" onInput="targetStreetEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.katu+'</div></div></i> ';
            if(data.numero.length>0)
            merkkiText += '<i><div class="editbox">Numero:<br> <div onkeypress="check_API_Bug(event,this)" id="numero_'+addMarker_index+'" class="targetNumber" onInput="targetNumberEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.numero+'</div></div></i>';
            if(data.postinumero.length>0)
            merkkiText += '<i><div class="editbox">Postinumero:<br> <div onkeypress="check_API_Bug(event,this)" id="postinumero_'+addMarker_index+'" class="targetZIP" onInput="targetZIPEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'"> '+data.postinumero+'</div></div></i>';
            merkkiText += '<i><div class="editbox">Kunta:<br> <b><div onkeypress="check_API_Bug(event,this)" id="kunta_'+addMarker_index+'" class="targetMunicipality" onInput="targetMunicipalityEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb; display:inline;" target="'+data.nimi+'">'+data.kunta+'</div></b></div></i>';
            merkkiText += '<div class="editbox">Tietoa kohteesta: <p><div onkeypress="check_API_Bug(event,this)" id="tietoa_'+addMarker_index+'" class="targetNfo" onInput="targetNfoEdit(\''+data.nimi+'\', this)" contentEditable="true" style="margin:0.5em; border: solid; border-size:0.5px; border-color:#bbb;" target="'+data.nimi+'" >' + data.tietoa + '</div></p></div>';
            merkkiText += '<br><hr><input onchange="notOpen24H(\''+data.nimi+'\', this)" type="checkbox" target="'+data.nimi+'" ';

            if( data.offlimit) {
                merkkiText += ' checked="true" ';
            }
            merkkiText += '>Rajaittuna aikoina auki yleisölle(koulualue, rakennus)<hr><br><br><br>';
            var targets = [ 'dippiteline', 'apinapuut', 'puolapuut', 'leuanvetotanko', 'punnerrustukki', 'vatsapenkki', 'selkäpenkki', 'muu'];
            merkkiText += 'Kohteessa välineet: <ul>';
            if(data.valineet.length == 0) data.valineet.push('muu');
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
    merkkiText += '<br>Kuvat kohteesta:</br>'
    for (var kuvaIndx = 0; kuvaIndx < data.kuvat.length; kuvaIndx++) {
        data.kuvat[kuvaIndx] = data.kuvat[kuvaIndx].replace("http://kartta.suomenstreetworkout.org/", "http://www.vektori.xyz/sswkartta/");
        var imageTag = '<input type="text" style="width:98%" id="kuva_'+addMarker_index+'_'+kuvaIndx+'" value ="'+data.kuvat[kuvaIndx]+'" tag="Image ' + data.nimi + ' nro ' + kuvaIndx +'" onInput="targetImageEdit(\''+data.nimi+'\', this, '+kuvaIndx+', ' + addMarker_index + ')"><br>';
        merkkiText += imageTag;
        changeLineCounter++;
    }
    merkki.txt = merkkiText + '<hr>';
    merkki.data = data;
    getWeatherThenAdd(merkki);

    google.maps.event.addListener(merkki, 'click', function() {
        merkki.popup.open(mapInterpreter.googleMap,merkki);
    });
};
/*Puts all marks on map*/
var SW_putAllMarks = function( marks) {
	var folderName = 'data/current/';
	marks.every(function(markfilename, index) {
		markfilename = folderName + markfilename;

		$.getJSON( markfilename, addMarker);
		return true;
	});
};