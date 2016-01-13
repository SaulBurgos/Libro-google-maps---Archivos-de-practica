 //global variable of obj map
 var map,infowindow;
 var idCounter = 0;
	
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
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function() {
		var data = FakeAjax();
		console.log(data);
	});		
 });
 
 function FakeAjax() {

	var data = {
		"overlays":[
		{"position":"-39.198205,-56.162109","type":"marker","id":1,"draggable":true},
		{"bounds":"-31.615966,-43.813477,-27.80021,-38.803711","type":"rectangle","id":2,"editable":true},
		{"path":"-39.605688,-49.042969,-39.707187,-43.945312,-39.605688,-37.836914,-39.436193,-35.683594","type":"polyline",
		"id":3,"draggable":true},
		{"center":"-29.688053,-56.513672","radius":388514.2326,"type":"circle","id":4,"draggable":true},
		{"path":"-36.421282,-50.581055,-37.822802,-48.603516,-37.579413,-43.022461,-35.209722,-40.957031",
		"type":"polygon","id":5,"draggable":true}
		],
		"map":{"zoom":5,"bounds":"-41.261381,-63.325123,-24.786843,-33.793873","mapType":"hybrid","type":"map"}
	};
	return data;
}
 
