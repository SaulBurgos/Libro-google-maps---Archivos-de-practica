 //global variable of obj map
var map,infowindow,arrayOverlays=[];
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
	infowindow = new google.maps.InfoWindow();
	
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
			//assign a map
			objectDeserialized.setMap(map);
			//create element li
			CreateItemList(data.overlays[i],i);
			//save each overlay created
			arrayOverlays.push({"overlay":objectDeserialized,"type":data.overlays[i].type});
		}
		UpdateMap(data.map);
	});		
 });
 
function CreateItemList(data,id) { 
	var liHTML = '<li onclick="ShowOverlay(' + id + ')">' +
					'<div><b>Title</b></div>' +
						data.title +
					'<div><b>Description</b></div>' +
						data.description +
				'</li><hr>';				
	$('#listOverlay').append($(liHTML));
}

function ShowOverlay (idOverlay) {
	switch(arrayOverlays[idOverlay].type)
	{
		case "marker":
			map.setCenter(arrayOverlays[idOverlay].overlay.getPosition());
		break;
		case "polyline":	
			var bounds = CreateBoundFromPath(arrayOverlays[idOverlay].overlay);
			map.fitBounds(bounds);
		break;
		case "rectangle":
			var bounds =  arrayOverlays[idOverlay].overlay.getBounds();
			map.fitBounds(bounds);
		break;
		case "circle":
			var bounds =  arrayOverlays[idOverlay].overlay.getBounds();
			map.fitBounds(bounds);
		break;
		case "polygon":
			var bounds = CreateBoundFromPath(arrayOverlays[idOverlay].overlay);
			map.fitBounds(bounds);
		break;
	}
} 

function CreateBoundFromPath(overlay) {
	var bounds = new google.maps.LatLngBounds();
	var path = overlay.getPath();			
	for (var i = 0;i < path.getLength(); i++)
	{
		bounds.extend(path.getAt(i));
	}	
	return bounds;
}
 
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
	var data = {"overlays":[{"bounds":"-16.88866,50.800781,-12.897489,55.722656",
	"type":"rectangle","id":1,"editable":true,"title":"Rectangle","description":"I am a rectangle"}
	,{"center":"-15.792254,36.123047","radius":409699.2497823488,"type":"circle","id":2,
	"draggable":true,"title":"Circle","description":"I am circle"},
	{"path":"-29.22889,35.507813,-33.137551,38.056641,-32.249974,46.933594,-28.304381,49.658203",
	"type":"polygon","id":3,"draggable":true,"title":"Polygon","description":"I am polygon"},
	{"path":"-12.726084,62.138672,-17.978733,58.535156,-21.616579,63.017578,-31.203405,58.535156",
	"type":"polyline","id":4,"draggable":true,"title":"Polyline","description":"I am polyline"},
	{"position":"-34.016242,54.931641","type":"marker","id":5,"draggable":true,"title":"Marker",
	"description":"I am marker"}],"map":{"zoom":4,"bounds":"-39.622707,10.437084,-3.667047,69.499584",
	"mapType":"roadmap","type":"map"}}
	return data;
}
 
