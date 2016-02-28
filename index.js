(function() {

	'use strict';

	var five = require('johnny-five'),
	    board = new five.Board(),
	    Firebase = require('firebase');

	var left_indicator;
	var right_indicator;
	var brake_lights;
    var head_lights;

	board.on('ready', function() {
		left_indicator = five.Led(13);
		right_indicator = five.Led(12);
        head_lights = five.Led(11);
		brake_lights = five.Led(10);
        var firebaseref = new Firebase("https://burning-fire-2134.firebaseio.com");
		firebaseref.on('value', function(snapshot) {
			var data = snapshot.val();
			handleData(data);
		});
	});

	function handleData(data) {
		handleIndicators(data.indicator);
		handleBrakeLights(data.brakelights);
		handleHeadLights(data.headlights);
		handleTailLights(data.taillights);
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

	function handleHeadLights(headlight_status) {
        if (headlight_status === 'side') {
            head_lights.brightness(32);
        } else if (headlight_status === 'half') {
            head_lights.brightness(64);
        } else if (headlight_status === 'full') {
            head_lights.on();
        } else {
            head_lights.off();
        }
	}

	function handleTailLights(taillights) {
	}

}());
