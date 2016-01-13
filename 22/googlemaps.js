 //global variables
 var map,panoramioLayer;
	
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
	$('#actionButton').on('click',function(){	
		if(panoramioLayer.getMap()){
			panoramioLayer.setMap(null);
		} else{
			panoramioLayer.setMap(map);
		}
	});	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		panoramioLayer = new google.maps.panoramio.PanoramioLayer();
		panoramioLayer.setMap(map);
		
		google.maps.event.addListener(panoramioLayer, 'click', function(event) {
			console.log(event.featureDetails);
		});		
	});	
	
 });
 
