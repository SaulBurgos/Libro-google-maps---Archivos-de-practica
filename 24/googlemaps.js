 //global variable of obj map
 var map,infowindow,geocoder;
	
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(40.1284,-98.4594),
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#search').on('click',function(){	
		
	});	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		
	});	
	
 });

 
