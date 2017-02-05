var findMark = function( name) {
	var retMark = undefined;
	mapInterpreter.marks.forEach( function( marker) {
		if(marker.data.nimi == name) {
			retMark = marker;
			return false;
		}
		return true;
	});
	return retMark;
}

var targetNameEdit = function(targetName, that) {
	var foundMark = findMark(targetName).data;
	if(typeof foundMark.replacer == 'undefined') {
		foundMark.replacer = {};
	}
	foundMark.replacer.nimi = $(that).html();
	console.log(foundMark.replacer);
};
var targetStreetEdit = function(targetName, that) {
	var foundMark = findMark(targetName).data;
	foundMark.katu = $(that).html();
};
var targetNumberEdit = function(targetName, that) {
	var foundMark = findMark(targetName).data;
	foundMark.numero = $(that).html();
};
var targetZIPEdit = function(targetName, that) {
	var foundMark = findMark(targetName).data;
	foundMark.postinumero = $(that).html();
};
var targetMunicipalityEdit = function(targetName, that) {
	var foundMark = findMark(targetName).data;
	foundMark.kunta = $(that).html();
};
var targetNfoEdit = function(targetName, that) {
	var foundMark = findMark(targetName).data;
	foundMark.tietoa = $(that).html();
};
var onChangeTargets = function( targetName, that, valine) {
	console.log(targetName);
	var foundMark = findMark(targetName).data;
	console.log($(that).html());
	console.log(foundMark);
	console.log(valine);
	if( $(that).is(":checked")) {
		if( !($.inArray(valine, foundMark.valineet) > -1) ) {
			foundMark.valineet.push( valine );
		}
	} else if( !($(that).is(":checked")) ) {
		if( ($.inArray(valine, foundMark.valineet) > -1) ) {
			var index = foundMark.valineet.indexOf(valine);
			foundMark.valineet.splice(index, 1);
		}
	}
	console.log( foundMark.valineet);
};
var notOpen24H = function( targetName, that) {
	var foundMark = findMark(targetName);
	if( $(that).is(":checked")) {
		foundMark.data.offlimit = true;
		foundMark.setIcon("icon/offlimit.png");
	} else if( !($(that).is(":checked")) ) {
		foundMark.data.offlimit = false;
		foundMark.setIcon("icon/merkki_tavallinen.png");
	}
}
var targetImageEdit = function(name, that, kuvaIndx,addMarker_index) {
	data.kuvat[kuvaIndx] = $('#kuva_'+addMarker_index+'_'+kuvaIndx).val();
}