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
		for (var i=0;i < data.overlays.length;i++)
		{ 
			var objectDeserialized;
			switch(data.overlays[i].type)
			{
				case "marker":
					objectDeserialized = DeserializeMaker(data.overlays[i]);
				break;
				case "polyline":
					objectDeserialized = DeserializePolyline(data.overlays[i]);
				break;
				case "rectangle":
					objectDeserialized = DeserializeRectangle(data.overlays[i]);
				break;
				case "circle":
					objectDeserialized = DeserializeCircle(data.overlays[i]);
				break;
				case "polygon":
					objectDeserialized = DeserializePolygon(data.overlays[i]);
				break;
			}
			objectDeserialized.setMap(map);
		}
		UpdateMap(data.map);
	});		
 });
 
function UpdateMap (object){
	var bounds = object.bounds.split(',');
	var swLatLng = new google.maps.LatLng(bounds[0],bounds[1]);
	var neLatLng = new google.maps.LatLng(bounds[2],bounds[3]);
	var mapBounds = new google.maps.LatLngBounds(swLatLng,neLatLng);
	map.fitBounds(mapBounds);
	map.setZoom(object.zoom);	
	map.setMapTypeId(google.maps.MapTypeId[object.mapType.toUpperCase()]);
}
 
function DeserializeCircle (object) {	
	var center = object.center.split(',');
	var centerLatLng = new google.maps.LatLng(center[0],center[1]);
	var circle = new google.maps.Circle({
		center: centerLatLng,
		radius: object.radius,
		draggable:object.draggable,
		editable:true
	});
	return circle;
} 
 
function DeserializePolygon (object) {	
	var mvcArray = DeserializeMvcArray(object.path);
	var polygon = new google.maps.Polygon({
		paths: mvcArray,
		draggable:object.draggable,
		editable:true
	});
	return polygon;
} 
 
function DeserializePolyline (object) {	
	var mvcArray = DeserializeMvcArray(object.path);
	var polyline = new google.maps.Polyline({
		path: mvcArray,
		draggable:object.draggable,
		editable:true
	});
	return polyline;
} 

function DeserializeMvcArray(stringLatlng) {
	var arrayPoints = stringLatlng.split(',');
	var mvcArray = new google.maps.MVCArray();
	for(var i= 0; i < arrayPoints.length; i+=2)
	{
		var latlng = new google.maps.LatLng(arrayPoints[i],arrayPoints[i+1]);
		mvcArray.push(latlng);
	}	
	return mvcArray;
}

function DeserializeRectangle (object) {	
	var bounds = object.bounds.split(',');
	var swLatLng = new google.maps.LatLng(bounds[0],bounds[1]);
	var neLatLng = new google.maps.LatLng(bounds[2],bounds[3]);
	var rectangleBounds = new google.maps.LatLngBounds(swLatLng,neLatLng);
	var rectangle = new google.maps.Rectangle({
		bounds: rectangleBounds,
		editable:object.editable
	});
	return rectangle;
} 
 
function DeserializeMaker (object) {
	var position = object.position.split(',');
	var latLng = new google.maps.LatLng(position[0],position[1]);
	var marker = new google.maps.Marker({
		position: latLng,
		draggable:object.draggable
	});
	return marker;
}
 
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
 
