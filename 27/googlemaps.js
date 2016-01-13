 //global variable of obj map
 var map,infowindow;
 var idCounter = 0;
 var overlayArray = [];
	
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
	$('#save').on('click',function(){	
		var data = {};
		data.overlays = overlayArray; 
		data.map = SerializeMap();
		$.post("here your url script server side",data);
	});	
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function() {
	
		var drawingManager = new google.maps.drawing.DrawingManager({
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER
			},
			circleOptions: {editable: true },
			polygonOptions: {editable: true },
			polylineOptions: {editable: true },
			rectangleOptions: {editable: true },
			markerOptions : {draggable:true},
			map: map
		});	

		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
			idCounter = idCounter + 1;			
			switch(event.type)
			{
				case "marker":
					overlayArray.push(SerializeMarker(event.overlay,idCounter));
				break;
				case "polyline":
					overlayArray.push(SerializePolyline(event.overlay,idCounter));
				break;
				case "rectangle":
					overlayArray.push(SerializeRectangle(event.overlay,idCounter));
				break;
				case "circle":
					overlayArray.push(SerializeCircle(event.overlay,idCounter));
				break;
				case "polygon":
					overlayArray.push(SerializePolygon(event.overlay,idCounter));
				break;
			}			
		});		
	});	
	
 });
 
function SerializePolygon(polygon,id) {
	var object = {};	
	object.path = SerializeMvcArray(polygon.getPath());
	object.type = "polygon";
	object.id = id;
	object.draggable = polygon.getEditable();
	return object;
}

function SerializeCircle(circle,id) {
	var object = {};	
	object.center = circle.getCenter().toUrlValue();
	object.radius = circle.getRadius();
	object.type = "circle";
	object.id = id;
	object.draggable = circle.getEditable();
	return object;
}
 

function SerializePolyline(polyline,id) {
	var object = {};	
	object.path = SerializeMvcArray(polyline.getPath());
	object.type = "polyline";
	object.id = id;
	object.draggable = polyline.getEditable();
	return object;
}

function SerializeMvcArray(mvcArray) {
	var path = [];
	for(var i= 0; i < mvcArray.getLength(); i++)
	{
		path.push(mvcArray.getAt(i).toUrlValue());
	}	
	return path.toString();
}
 
function SerializeMarker(marker,id) {
	var object = {};
	object.position = marker.getPosition().toUrlValue();
	object.type = "marker";
	object.id = id;
	object.draggable = marker.getDraggable();
	return object;
}

function SerializeRectangle(rectangle,id) {
	var object = {};
	object.bounds = rectangle.getBounds().toUrlValue();
	object.type = "rectangle";
	object.id = id;
	object.editable = rectangle.getEditable();
	return object;
}

function SerializeMap() {
	var object = {};
	object.zoom = map.getZoom();
	object.bounds = map.getBounds().toUrlValue(); 
	object.mapType = map.getMapTypeId();
	object.type = 'map';
	return object;
}
