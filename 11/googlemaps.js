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

		var drawingManager = new google.maps.drawing.DrawingManager();
		drawingManager.setMap(map);
				
	});	
	
 });
