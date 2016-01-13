 //global variable of obj map
 var map, infowindow;
 
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
	infowindow = new google.maps.InfoWindow();
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		var arrayLatlng = CreateLatLngArray();
		CreateMarkers(arrayLatlng);
	});
	
 });
 
function CreateMarkers (latlngs){
	var arrayMarkers = [];
	for (var i = 0; i < latlngs.length; i++) {	
		var latlng = new google.maps.LatLng(latlngs[i].lat,latlngs[i].lng);	
		var marker = new google.maps.Marker({
			position: latlng,
			map: map
		});		
		arrayMarkers.push(marker);
	}
	return arrayMarkers;
}
 
function CreateLatLngArray() { 
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	var latSpan = northEast.lat() - southWest.lat();
	var lngSpan = northEast.lng() - southWest.lng();
	var arrayLatlng = [];
	
	for (var i = 0; i < 15; i++) {	
		var lat = southWest.lat() + latSpan * Math.random();
		var lng = southWest.lng() + lngSpan * Math.random();
		arrayLatlng.push({'lat':lat,'lng':lng});
	}
	return arrayLatlng;
}