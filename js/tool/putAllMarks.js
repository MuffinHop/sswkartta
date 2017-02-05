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
var addMarker = function( data, normal ) {
            alert("Ladataan merkkejä");
            //console.log(data);
            var iconLoc = "icon/merkki_tavallinen.png";
            if (data.offlimit == 1) {
                iconLoc = "icon/offlimit.png";
            }
            if(typeof userAdding != 'undefined') {
                iconLoc = "icon/add.png";
            }
            if(typeof normal != 'undefined') {
                iconLoc = "icon/merkki_tavallinen.png";
                if (data.offlimit == 1) {
                    iconLoc = "icon/offlimit.png";
                }
            }
            var merkki = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map: mapInterpreter.googleMap,
                title: data.nimi,
                icon: iconLoc
            });
            var merkkiText = '';
            merkkiText += '<h2>'+data.nimi+'</h2>';
            merkkiText += '<i>'+data.katu+'</i>';
            if(data.numero.length>0)
            merkkiText += '<i> '+data.numero+'</i>';
            if(data.postinumero.length>0)
            merkkiText += '<i>, '+data.postinumero+'</i>';
            merkkiText += '<br><i><b>'+data.kunta+'</b></i>';

            merkkiText += '<br><button onclick="searchGPSTravel(' + data.lat + ',' + data.lng + ')">Etsi GPS reitti</button>';
            switch(data.kunta) {
                    case 'Helsinki':
                    case 'Sipoo':
                    case 'Kerava':
                    case 'Vantaa':
                    case 'Espoo':
                    case 'Kauniainen':
                    case 'Kirkkonummi':
                    case 'Tampere':
                    case 'Oulu':
                    case 'Lahti':
                        merkkiText += '<br><button onclick="rOpas( \''+data.katu+'\',\''+data.numero+'\',\''+data.kunta+'\' )" >Katso liikenne reittioppaasta</button>';
                        break;
            }
            merkkiText += '<p>' + data.tietoa + '</p>';

            if(typeof (data.valineet) !== 'undefined') {
                data.valineet.sort();
                merkkiText += 'Kohteessa välineet: <ul>';
                data.valineet.forEach( function( target, indx) {
                    merkkiText += '<li>' + target + '</li>';
                    return true;
                });
                merkkiText += '</ul>';
            }

    //console.log('kunta '+data.kunta)
    var imgHyperText = "";
    var changeLineCounter = 0;
    for (var kuvaIndx = 0; kuvaIndx < data.kuvat.length; kuvaIndx++) {
        if (data.kuvat[kuvaIndx].length > 0) {
            var imageTag = '<img src ="'+data.kuvat[kuvaIndx]+'" tag="Image ' + data.nimi + ' nro ' + kuvaIndx +'" width="120px" height="auto">';
            imgHyperText += '<span onclick="dialogimage(\'' + data.kuvat[kuvaIndx] + '\' )"  >'+imageTag+'</span> ';
        }
        if( changeLineCounter % 3 == 2) {
            imgHyperText+="<br>";
        }
        changeLineCounter++;
    }
    merkkiText += imgHyperText;


    merkki.txt = merkkiText + '<hr>';
    merkki.data = data;



    merkki.txt = '<div style="display:none;" id="chat'+data.index+'"><button style="width:120px"onclick=\"closediscussion(\''+data.nimi+'\','+data.index+')\">Sulje Keskustelu</button><iframe src="http://www.vektori.xyz/sswkartta/viestit/index.php#'+data.nimi+'" style=" border: 0; width:100%; height: 400px">Your browser doesnt support iFrames.</iframe></div><div id="nfo'+data.index+'" class="targetInformation">' + merkki.txt + '<button onclick=\"opendiscussion(\''+data.nimi+'\','+data.index+')\">Keskustelu kohteesta</button><br><br>';

    getWeatherThenAdd(merkki);
    /*merkki.popup = new google.maps.InfoWindow({
        content:    merkkiText
    });*/

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


var opendiscussion = function( discussionname, index ) {
    $('#chat'+index).show();
    $('#nfo'+index).hide();
};

var closediscussion = function( discussionname, index ) {
    $('#chat'+index).hide();
    $('#nfo'+index).show();
};