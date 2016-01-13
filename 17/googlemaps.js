 //global variable of obj map
 var map,mgr;
	
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(41.4907, -98.9422),
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		
	});
	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		var markersMap = GetMarkers();
		mgr = new MarkerManager(map);
		
		var phantom = new google.maps.Marker({ 
			position: new google.maps.LatLng(40.1284, -98.4594), 
			icon: 'phantomWhite.png' 
		});
		
		google.maps.event.addListener(phantom, 'click', function() { 
			map.setZoom(5);
			map.setCenter(phantom.getPosition()); 
		});
		
		var phantomWhite = new google.maps.Marker({ 
			position: new google.maps.LatLng(35.4360, -81.0186), 
			icon: 'phantom.png' 
		});
		
		google.maps.event.addListener(phantomWhite, 'click', function() { 
			map.setZoom(5);
			map.setCenter(phantomWhite.getPosition()); 
		});
		
		var cluster = [phantom ,phantomWhite];
		
		google.maps.event.addListener(mgr, 'loaded', function() { 
			mgr.addMarkers(markersMap, 5); 
			mgr.addMarkers(cluster,1,4); 
			mgr.refresh(); 
		});
	});	
	
 });
 
function GetMarkers() {
	var locationMarker = [
	{"lat":40.1284,"lng": -98.4594},
	{"lat":40.6181,"lng": -99.3988},
	{"lat":40.3214,"lng":-97.3223},
	{"lat":35.3980,"lng": -81.8536},
	{"lat":35.4360,"lng": -81.0186},
	{"lat":34.8859,"lng": -81.0928}
	]; 
	
	var markers = [];
	
	for (var i=0; i < locationMarker.length;i++)
	{ 
		var myLatlng = new google.maps.LatLng(locationMarker[i].lat,locationMarker[i].lng);
		var marker = new google.maps.Marker({
			position: myLatlng,
			title:"Hello I am " + i
		});
		markers.push(marker);
	}
	return markers;
}
 
