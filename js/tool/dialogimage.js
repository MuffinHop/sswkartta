var dialogimage = function( url) {
	$('#imagedialog').html('<img src ="'+url+'" width="440px" height="auto">');
	$('#imagedialog').dialog({
      resizable: false,
      width:480,
      modal: false
      });
};