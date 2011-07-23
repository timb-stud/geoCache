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
			});
		}
	},
	supports_geolocation: function(){
		return !!navigator.geolocation;
	}
};