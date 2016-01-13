 //global variable of obj map
 var map, drawingManager;
 
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
		
		drawingManager = new google.maps.drawing.DrawingManager();
		
		google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(event) {
			alert('event : Rectangle is complete');
		});

		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
			alert('event : a overlay was drew');
		});
		
		drawingManager.setMap(map);		
	});	
	
 });
