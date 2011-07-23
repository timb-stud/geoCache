var geoCache = {
	currentLat: undefined,
	currentLon: undefined,
	destLat: undefined,
	destLon: undefined,
	page_main: {
		init: function(){
			console.log("init page-main")
			geoCache.getPosition();
			$("a#refresh-position").tap(geoCache.getPosition);
			$("a#refresh-map-position").tap(geoCache.refreshMap);
			$("button#show-map").tap(function(){
				geoCache.currentLat = $("span#current-lat").text();
				geoCache.currentLon = $("span#current-lon").text();
				geoCache.destLat = $("input#dest-lat").attr("value");
				geoCache.destLon = $("input#dest-lon").attr("value");
				$.mobile.changePage("#page-map");
			});
			$("#page-map").live("pagebeforeshow", geoCache.page_map.init);
		}
	},
	page_map: {
		init: function(){
			geoCache.initMap();
		}
	},
	refreshMap: function(){
		if(geoCache.supports_geolocation()){
			navigator.geolocation.getCurrentPosition(function(pos){
				var	accuracy = pos.coords.accuracy,
					lat = pos.coords.latitude,
					lon = pos.coords.longitude;
				
				$("span#current-lat").text(lat);
				$("span#current-lon").text(lon);
				$("span#current-accuracy").text(accuracy);
				$("span#current-address").text(city + " " + street + " " + streetNumber);
			}, function(){
				alert("ERROR: Cant't get your location.");
			}, {enableHighAccuracy: true});
		}
	},
	getPosition: function(){
		if(geoCache.supports_geolocation()){
			navigator.geolocation.getCurrentPosition(function(pos){
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
		console.log(geoCache);
		var centerLatlng;
		if(geoCache.currentLat && geoCache.currentLat){
			centerLatlng = new google.maps.LatLng(geoCache.currentLat, geoCache.currentLat);
		}else{
			centerLatlng = new google.maps.LatLng(49, 6);
		}
		var options = {
				zoom: 15,
				center: centerLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		var map = new google.maps.Map(document.getElementById("map-canvas"), options);
		if(geoCache.currentLat && geoCache.currentLon) {
			var currentLatlng = new google.maps.LatLng(geoCache.currentLat, geoCache.currentLon);
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
		if(geoCache.destLat && geoCache.destLon) {
			var destLatlng = new google.maps.LatLng(geoCache.destLat, geoCache.destLon);
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
	}
};