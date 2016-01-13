 //global variable of obj map
 var map;
	
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(40.1284,-98.4594),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		
	});
	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		SetMarkerInMap();		
	});	
	
 });
 
function SetMarkerInMap() {
	var locationMarker = [
	{"lat":40.1284,"lng": -98.4594},
	{"lat":40.6181,"lng": -99.3988},
	{"lat":40.3214,"lng":-97.3223}
	]; 
	
	for (var i=0; i < locationMarker.length;i++)
	{ 
		var myLatlng = new google.maps.LatLng(locationMarker[i].lat,locationMarker[i].lng);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			draggable:true,
		});
		
		var mapLabel = new MapLabel({
			text: 'I am ' + i,
			position: myLatlng,
			map: map,
			fontSize: 20,
			align: 'center',
			fontColor:'#00FF00',
			strokeColor:'#D2691E'
        });

		 marker.bindTo('position', mapLabel);
	}
}
 
