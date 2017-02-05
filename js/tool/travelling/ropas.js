/*	Followring Javacript travelling code made by Sampo Savilampi for Suomen Street Workout - non-profit organization

	JQuery API by JQuery Team

	Copyright (c) 2016 Sampo Savilampi
*/
function rOpas( katu, numero, kunta) {
	console.log(katu);
	console.log(numero);
	console.log(kunta);
	switch(kunta) {
		case 'Helsinki':
		case 'Sipoo':
		case 'Kerava':
		case 'Vantaa':
		case 'Espoo':
		case 'Kauniainen':
		case 'Kirkkonummi':
			console.log(userLocation);
			var url='http://www.reittiopas.fi/?to_in='+katu+','+numero+','+kunta;
			if(typeof userLocation.address !== 'undefined'){
				switch(userLocation.municipality.long_name) {
					case 'Helsinki':
					case 'Sipoo':
					case 'Kerava':
					case 'Vantaa':
					case 'Espoo':
					case 'Kauniainen':
					case 'Kirkkonummi':
						url += '&from_in='+userLocation.address.long_name+','+userLocation.municipality.long_name;
						break;
				}
			}
			console.log(url);
			console.log(userLocation);
			$(location).attr('href', url);
			break;
		case 'Tampere':
		case 'Oulu':
			var url='http://reittiopas.tampere.fi/#to('+katu+' '+numero+', '+kunta+')';
			if(typeof userLocation.address !== 'undefined'){
				switch(userLocation.municipality.long_name) {
					case 'Tampere':
					case 'Oulu':
						url+='from('+userLocation.address.long_name+'%2C%20'+userLocation.municipality.long_name+')';
						break;
				}
			}
			$(location).attr('href', url);
			console.log(url);
			console.log(userLocation);
			break;
		case 'Lahti':
			var url='http://lahti.matkahuolto.info/#to('+katu+' '+numero+', '+kunta+')';
			if(typeof userLocation.address !== 'undefined'){
				switch(userLocation.municipality.long_name) {
					case 'Lahti':
						url+='from('+userLocation.address.long_name+'%2C%20'+userLocation.municipality.long_name+')';
						break;
				}
			}
			$(location).attr('href', url);
			console.log(url);
			console.log(userLocation);
			break;
		case 'Hämeenlinna':
			var url='http://hameenlinna.matkahuolto.info/#to('+katu+' '+numero+', '+kunta+')';
			if(typeof userLocation.address !== 'undefined'){
				switch(userLocation.municipality.long_name) {
					case 'Hämeenlinna':
						url+='from('+userLocation.address.long_name+'%2C%20'+userLocation.municipality.long_name+')';
						break;
				}
			}
			$(location).attr('href', url);
			console.log(url);
			console.log(userLocation);
			break;
		case 'Iisalmi':
			var url='http://iisalmi.matkahuolto.info/#to('+katu+' '+numero+', '+kunta+')';
			if(typeof userLocation.address !== 'undefined'){
				switch(userLocation.municipality.long_name) {
					case 'Iisalmi':
						url+='from('+userLocation.address.long_name+'%2C%20'+userLocation.municipality.long_name+')';
						break;
				}
			}
			$(location).attr('href', url);
			console.log(url);
			console.log(userLocation);
			break;
		case 'Salo':
			var url='http://salo.matkahuolto.info/#to('+katu+' '+numero+', '+kunta+')';
			if(typeof userLocation.address !== 'undefined'){
				switch(userLocation.municipality.long_name) {
					case 'Salo':
						url+='from('+userLocation.address.long_name+'%2C%20'+userLocation.municipality.long_name+')';
						break;
				}
			}
			$(location).attr('href', url);
			console.log(url);
			console.log(userLocation);
			break;
	}
}//http://www.reittiopas.fi/?from_in=Kitarakuja%201,%20Helsinki&to_in=Albertinkatu%201,%20Helsinki