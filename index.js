(function() {

	'use strict';

	var five = require('johnny-five'),
	    board = new five.Board(),
	    Firebase = require('firebase'),
	    firebaseref = new Firebase("https://burning-fire-2134.firebaseio.com");

	var left_indicator;
	var right_indicator;
	var brake_lights;

	board.on('ready', function() {
		left_indicator = five.Led(13);
		right_indicator = five.Led(12);
		brake_lights = five.Led(11);
		firebaseref.on('value', function(snapshot) {
			var data = snapshot.val();
			handleData(data);
		});
	});

	function handleData(data) {
		handleIndicators(data.indicator);
		handleHeadLights(data.headlights);
		handleTailLights(data.taillights);
		handleBrakeLights(data.brakelights);
	}

	function handleIndicators(indicators) {
		handleLeftIndicator(indicators.left);
		handleRightIndicator(indicators.right);
	}

	function handleLeftIndicator(left_status) {
		if (left_status === 'on') {
			left_indicator.blink(300);
		} else {
			left_indicator.stop().off();
		}
	}

	function handleRightIndicator(right_status) {
		if (right_status === 'on') {
			right_indicator.blink(300);
		} else {
			right_indicator.stop().off();
		}
	}

	function handleBrakeLights(brakelight_status) {
		if (brakelight_status === 'on') {
			brake_lights.on();
		} else {
			brake_lights.off();
		}
	}

	function handleHeadLights(headlights) {
	}

	function handleTailLights(taillights) {
	}

}());
