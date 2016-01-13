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
		SearchAddress($('#searchInput').val());
	});	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		infowindow = new google.maps.InfoWindow();
		geocoder = new google.maps.Geocoder();
	});	
	
 });
 
 function SearchAddress(latlngUser) {
	
	var latlngArray = latlngUser.split(",");
	var lat = parseFloat(latlngArray[0]);
	var lng = parseFloat(latlngArray[1]);
	
	var geocoderRequest = { 
		location: new google.maps.LatLng(lat,lng)
	}
	
	geocoder.geocode(geocoderRequest, function(results, status) { 
		if (status == google.maps.GeocoderStatus.OK) {
			marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: map
			});			
			infowindow.setContent(results[0].formatted_address);
			infowindow.open(map, marker);
		}
	});
 }
 
