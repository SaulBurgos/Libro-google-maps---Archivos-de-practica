 //global variable of obj map
 var map, marker , MVCArray;
 
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(-6.5564, 197.577),
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	
	//create a instance 
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//event click jquery
	$('#actionButton').on('click',function(){	
		MVCArray.pop();
	});
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function(){	
	
		MVCArray = new google.maps.MVCArray([
			new google.maps.LatLng(37.772323, -122.214897),
			new google.maps.LatLng(21.291982, -157.821856),
			new google.maps.LatLng(-18.142599, 178.431),
			new google.maps.LatLng(-27.46758, 153.027892)
		]);
		
		var polyline = new google.maps.Polyline({
			path: MVCArray,
			strokeColor: "#FF0000",
			strokeWeight: 3,
			editable: true,
			map:map
		});

		
	});	
	
 });
