 //global variable of obj map
 var map, marker , MVCArray;
 
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(41.4907, -98.9422),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		
	});
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){

		var imageBounds  = new google.maps.LatLngBounds(
			new google.maps.LatLng(37.775,-122.419),
			new google.maps.LatLng(47.620,-73.986)
		);

		var imageLink = "http://wowslider.com/images/demo/pinboard-fly/data/images/desert_landscape.jpg";
				
		overlay = new google.maps.GroundOverlay(imageLink, imageBounds);
		overlay.setMap(map);
				
	});	
	
 });
