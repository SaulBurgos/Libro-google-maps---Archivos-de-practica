 
 //document ready wait until the page is loaded
$(document).ready(function(){
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	//create a instance 
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
 });