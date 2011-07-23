var map = {
	init: function(){
		var latlng = new google.maps.LatLng(49.000000, 6.000000),
			options = {
				zoom: 8,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		var map = new google.maps.Map(document.getElementById("map-canvas"), options);
	}
};
