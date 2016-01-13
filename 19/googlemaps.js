 //global variable of obj map
 var map;
	
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(40.1284,-98.4594),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		
	});	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		GeoLocate();
	});	
	
 });

function GeoLocate () {	
	if (navigator.geolocation) {		
		navigator.geolocation.getCurrentPosition(function (position) {	
			var lat = position.coords.latitude;
			var lng =  position.coords.longitude;
			var position = new google.maps.LatLng(lat,lng);
			map.setCenter(position);
		});	
		
	}else { 
		alert('Geolocation is not supported by this browser.');
	}	
}
 
