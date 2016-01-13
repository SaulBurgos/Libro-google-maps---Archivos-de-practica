 //document ready wait until the page is loaded
$(document).ready(function(){

	$('#map').on('click','#saveForm',function(){
		alert('save data!!');
	});
	
	//obj with option 
	var mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	/*html String*/
	var htmlForm = '<div class="customControl">' + 
			'<div>' + 
				'<b>Place Name</b>' +
				'<input type="text" />' + 
			'</div>' + 
			'<hr>' + 
			'<div>' + 
				'<b>Rooms</b>' + 
				'<input type="number" name="quantity" min="1" max="10">' + 
			'</div>' + 
			'<hr>' + 
			'<div>' + 
				'<b>Activity</b><br>' + 
				'<input type="radio" name="activity" value="male" checked>Rent' + 
				'<input type="radio" name="activity" value="female">Sell' + 
			'</div>' + 
			'<hr>' + 
			'<div>' + 
				'<b>Description</b><br>' + 
				'<textarea rows="4" cols="16"></textarea>' +
			'</div>' + 
			'<input type="checkbox" name="call" value="money">Only adults' + 
			'<button id="saveForm">Save location</button>' + 
		'</div>';
		
	var controlDiv = document.createElement('div');
	controlDiv.className = 'container';
	//add the form to the container Div
	$(controlDiv).append(htmlForm);	
	//create a instance 
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);	
	//add the form to array of control
	map.controls[google.maps.ControlPosition.RIGHT_CENTER ].push(controlDiv);	
	
 });