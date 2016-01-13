 //global variable of obj map
 var map, drawingManager;
 
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
	
	// when the map is ready
	google.maps.event.addListenerOnce(map, 'idle', function() {
		drawingManager = new google.maps.drawing.DrawingManager();
		drawingManager.setMap(map);
		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {			
			switch(event.type)
			{
				case 'polygon':
					CalculateAreaPolygon(event.overlay.getPath());
				break;
				case 'rectangle':
					CalculateAreaRectangle(event.overlay);
				break;
				case 'circle':
					CalculateCircleArea(event.overlay.getRadius());
				break;
				case 'polyline':
					CalculateTotalDistancePolyline(event.overlay.getPath());
				break;
			}
		});
		
	});		
 });
//total distance of whole path
function CalculateTotalDistancePolyline(path) {
	var distance = google.maps.geometry.spherical.computeLength(path);
	$('#distance').append('<div>Polyline dist mts:' + distance.toFixed(2) + '</div>');
}
//compute area 
function CalculateAreaPolygon(path){
	var area = google.maps.geometry.spherical.computeArea(path);
	$('#distance').append('<div>Polygon: ' + area.toFixed(2) + '</div>');
}
//compute area
function CalculateAreaRectangle(rectangle) {
	var rectangleBounds = rectangle.getBounds();
	var rectangleNorthEastBounds = rectangleBounds.getNorthEast();
	var rectangleNorthEastBoundsLatBounds = rectangleNorthEastBounds.lat();
	var rectangleNorthEastBoundsLngBounds = rectangleNorthEastBounds.lng();

	var rectangleSouthWestBounds = rectangleBounds.getSouthWest();
	var rectangleSouthWestBoundsLatBounds = rectangleSouthWestBounds.lat();
	var rectangleSouthWestBoundsLngBounds = rectangleSouthWestBounds.lng();

	var rectangleNorthWestBounds = new google.maps.LatLng(rectangleNorthEastBoundsLatBounds, rectangleSouthWestBoundsLngBounds);
	var rectangleSouthEastBounds = new google.maps.LatLng(rectangleSouthWestBoundsLatBounds, rectangleNorthEastBoundsLngBounds);
	var rectanglePath = [
		rectangleNorthEastBounds,
		rectangleSouthEastBounds,
		rectangleSouthWestBounds,
		rectangleNorthWestBounds,
		rectangleNorthEastBounds
	]; 
	var rectangleArea = google.maps.geometry.spherical.computeArea(rectanglePath);
	$('#distance').append('<div>Rectangle: ' + rectangleArea.toFixed(2) + '</div>');
}

function CalculateCircleArea(radius){
	var circleArea = radius*radius*Math.PI;
	$('#distance').append('<div>Circle: ' + circleArea.toFixed(2) + '</div>');
}
