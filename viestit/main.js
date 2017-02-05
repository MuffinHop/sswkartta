$(function() {
	String.prototype.replaceAll = function(search, replacement) {
	    var target = this;
	    return target.replace(new RegExp(search, 'g'), replacement);
	};
	$.getJSON("messages.json", function(data) {
		console.log(data.messages);
		var search_target = window.location.hash;
		search_target = search_target.replaceAll("%C3%A4","ä");
		search_target = search_target.replaceAll("%C3%B6","ö");
		search_target = search_target.replaceAll("%C3%84","Ä");
		search_target = search_target.replaceAll("%C3%96","Ö");
		window.location.hash = search_target;
		search_target = search_target.substring(1, search_target.length);
		$('#targetid').val(search_target);
		$('#topic').append('<div class="target_name"> Kohde:' + search_target + '</div>');
		console.log(search_target);
		var messages = 0;
		
		console.log(data.messages);
		data.messages.forEach(function(tmessg) {
			console.log(tmessg.target);
			if(search_target != tmessg.target ) return true;
			messages++;
			console.log(tmessg.user);
			var msg = '<div class="message">';
			msg += '<h3>'+tmessg.user+'</h3>';
			msg += '<p>'+tmessg.message+'</p>';

			msg += '<tiny>'+tmessg.date +'</tiny>';
			msg += '</div>';
			$('#messages').append(msg);
			return true;
		});
		console.log(messages);
		if(messages==0) {
			$('#messages').append('<div class="no_msg_target"> Ei viestejä </div>');
		}
	});
});