function remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}


var setup_targetItems = function() {
	console.log("ding ding");
	$(".targetItem").click( function( e_event) {
		if(  $.inArray( 'targetSelected', e_event.target.classList) == -1 ) {
			var id = '#'+e_event.target.id;
			console.log(e_event);
			$(id).addClass( 'targetSelected');
			$(id).hide().fadeIn('fast');
			$(id+' #checkInfo').attr("src", 'icon/checked.png');
   			console.log("okay");
   			mapInterpreter.targetsSelected.push($(id).attr('value'));
		} else {
			var id = '#'+e_event.target.id;
			$(id).removeClass( 'targetSelected');
			$(id).hide().fadeIn('fast');
			$(id+' #checkInfo').attr("src", 'icon/notchecked.png');
   			remove(mapInterpreter.targetsSelected, $(id).attr('value'));
		}
		console.log(mapInterpreter.targetsSelected);
		console.log(mapInterpreter.marks);
		mapInterpreter.marks.forEach( function(target, indx) {
			var mapMarker = target;
			if(typeof reittiPoly != 'undefined') {
  				reittiPoly.setMap(null);
  			}
  			mapMarker.setVisible(false); 
			if(typeof mapMarker.popup != 'undefined') {
  				mapMarker.popup.close();
  			}
			if(typeof mapInterpreter.homeMarker != 'undefined') {
				mapInterpreter.homeMarker.setVisible(false); 
			}
			if(typeof (target.data.valineet) !== 'undefined') {
				if(target.data.valineet.length == 0) return;
				mapMarker.data.valineet.forEach(function(target, indx) {
					var valine = target;
					mapInterpreter.targetsSelected.forEach(function(target, indx) {
						if( valine.toLowerCase() == target.toLowerCase()) {
							mapMarker.setVisible(true); 
						}
						return true;
					});
					return true;
				});
			}
			console.log(target);
			return true;
		});
	});
};