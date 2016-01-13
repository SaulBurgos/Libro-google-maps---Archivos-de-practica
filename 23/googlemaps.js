 //global variables
 var map,weatherLayer,cloudLayer;
	
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
		if(weatherLayer.getMap()){
			weatherLayer.setMap(null);
			cloudLayer.setMap(null);
		} else{
			weatherLayer.setMap(map);
			cloudLayer.setMap(map);
		}
	});	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		weatherLayer = new google.maps.weather.WeatherLayer({
			temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
		});
		weatherLayer.setMap(map);
		
		cloudLayer = new google.maps.weather.CloudLayer();
		cloudLayer.setMap(map);
		
		google.maps.event.addListener(weatherLayer, 'click', function(event) {
			console.log(event.featureDetails);
		});		
	});	
	
 });
 
