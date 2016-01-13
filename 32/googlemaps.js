 //global variable of obj map
 var map,mvcArray,marker1,marker1,polyline; 
//document ready wait until the page is loaded
$(document).ready(function() {		
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"),{
		center: new google.maps.LatLng(38.3891, -93.7503),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	});	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){
		var positions = [
			new google.maps.LatLng(38.3867,-93.7558),
			new google.maps.LatLng(38.3987,-93.7392)
		];
		//create mvcArray
		mvcArray =  new google.maps.MVCArray(positions);		
		marker1 = new google.maps.Marker({
			position:positions[0],
			map:map,
			draggable: true
		});
		
		marker2 = new google.maps.Marker({
			position: positions[1],
			map:map,
			draggable: true
		});
		
		polyline =  new google.maps.Polyline({
			path: mvcArray,
			map:map
		});	
		
		attachEvent(marker1,polyline);
		attachEvent(marker2,polyline);
	});	
	
 });
 //attach event to markers
function attachEvent(object,line) {
	google.maps.event.addListener(object, 'drag', function(event) {
		var position1 = marker1.getPosition();
		var position2 = marker2.getPosition();
		//clean the mvcArray
		mvcArray.clear();
		//add new points
		mvcArray.push(position1);
		mvcArray.push(position2);
		calculateDistance(position1,position2);		
	});
}

function calculateDistance(position1,position2) {
	//static method to calculate the distance
	var meters = google.maps.geometry.spherical.computeDistanceBetween(position1,position2);
	$('#distance').html(meters.toFixed(2));
}
