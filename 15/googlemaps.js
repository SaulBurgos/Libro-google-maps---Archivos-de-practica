 //global variable of obj map
 var map,oms;
 
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
		oms = new OverlappingMarkerSpiderfier(map);
		for (var i = 0; i < 300; i++) {
			var markerCreated = GenerateRandomMarkers(); 
			oms.addMarker(markerCreated);
		}
		map.setZoom(3);
	});	
	
 });

 function GenerateRandomMarkers(){	
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	var latSpan = northEast.lat() - southWest.lat();
	var lngSpan = northEast.lng() - southWest.lng();	
	var lat = southWest.lat() + latSpan * Math.random();
	var lng = southWest.lng() + lngSpan * Math.random();
	var latlng = new google.maps.LatLng(lat, lng);		
	var marker = new google.maps.Marker({ 
		position: latlng,
		map: map
	});	
	return marker;
 }