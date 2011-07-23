var geoCache = {
	getPosition: function(){
		if(geoCache.supports_geolocation()){
			navigator.geolocation.getCurrentPosition(function(pos){
				console.log(pos);
				var city = pos.address.city,
					street = pos.address.street,
					streetNumber = pos.address.streetNumber,
					description = pos.classDescription,
					accuracy = pos.coords.accuracy,
					lat = pos.coords.latitude,
					lon = pos.coords.longitude;
				console.log(city, street, streetNumber);
				$("span#current-lat").text(lat);
				$("span#current-lon").text(lon);
				$("span#current-accuracy").text(accuracy);
				$("span#current-address").text(city + " " + street + " " + streetNumber);
			}, function(){
				alert("ERROR: Cant't get your location.");
			}, {enableHighAccuracy: true});
		}
	},
	initMap: function(){
		var urlVars = geoCache.getUrlVars();
		console.log(urlVars);
		var centerLatlng;
		if(urlVars["lat"] && urlVars["lon"]){
			centerLatlng = new google.maps.LatLng(urlVars["lat"], urlVars["lon"]);
		}else{
			centerLatlng = new google.maps.LatLng(49, 6);
		}
		var options = {
				zoom: 15,
				center: centerLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		var map = new google.maps.Map(document.getElementById("map-canvas"), options);
		if(urlVars["lat"] && urlVars["lon"]) {
			var currentLatlng = new google.maps.LatLng(urlVars["lat"], urlVars["lon"]);
			var currentMarker = new google.maps.Marker({
				position : currentLatlng,
				title : "Your Position",
				map: map
			});
			var currentInfoWindow = new google.maps.InfoWindow({
				content: "Your Position",
			});
			currentInfoWindow.open(map, currentMarker);
		}
		if(urlVars["latDest"] && urlVars["lonDest"]) {
			var destLatlng = new google.maps.LatLng(urlVars["latDest"], urlVars["lonDest"]);
			var destMarker = new google.maps.Marker({
				position : destLatlng,
				title : "Destination",
				map: map
			});
			var destInfoWindow = new google.maps.InfoWindow({
				content: "Destination",
			});
			destInfoWindow.open(map, destMarker);
		}
	},
	supports_geolocation: function(){
		return !!navigator.geolocation;
	},
	getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		    hash = hashes[i].split('=');
		    vars.push(hash[0]);
		    vars[hash[0]] = hash[1];
		}
		return vars;
	}
};