 //global variable of obj map
 var map, marker , MVCArray;
 
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(35.941, 241.546),
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		
	});
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){	
	
		var points = [
			new google.maps.LatLng(37.7671, -122.4206),
			new google.maps.LatLng(36.1131, -115.1763),
			new google.maps.LatLng(34.0485, -118.2568),
		];
		
		var polygon = new google.maps.Polygon({
			paths: points,
			map: map 
		});
		
	});	
	
 });
