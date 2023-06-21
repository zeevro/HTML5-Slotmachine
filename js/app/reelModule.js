define(['jquery', 'rngModule', 'audioModule'], function($, rngModule, audioModule) {
	reelContainer = $('#reel-container');

	var reelModuleInitialize = function() {
		reelContainer.children('div').each(function () {
			var reelEl = $(this);
			reelPanelCount = reelEl.children().length,
			reelTheta = 360 / reelPanelCount,
			reelThetaArray = [reelTheta, reelTheta, reelTheta],
			reelPanelSize = reelEl.height(),
			reelRadius = Math.round((reelPanelSize / 2) / Math.tan(Math.PI / reelPanelCount)),
			reelRotation = 0,
			reelPosition = [0, 0, 0],
			reelSpinning = [false, false, false],
			reelSpin = [false, false, false],
			reelNumbers = [0, 0, 0],
			reelEl.children('figure').each(function(index) {
				var panelEl = $(this),
					panelAngle = reelTheta * index;
				// panelEl.css('backgroundColor', 'hsla(' + panelAngle + ', 100%, 50%, 0.9)');
				panelEl.css('-webkit-transform', 'rotateX(' + panelAngle + 'deg) translateZ(' + reelRadius + 'px)');
				panelEl.css('-moz-transform', 'rotateX(' + panelAngle + 'deg) translateZ(' + reelRadius + 'px)');
				panelEl.css('-o-transform', 'rotateX(' + panelAngle + 'deg) translateZ(' + reelRadius + 'px)');
				panelEl.css('transform', 'rotateX(' + panelAngle + 'deg) translateZ(' + reelRadius + 'px)');
			});
			reelRotation = Math.round(reelRotation / reelTheta) * reelTheta;
			reelEl.css('-webkit-transform', 'translateZ(-' + reelRadius + 'px) rotateX(' + reelRotation + 'deg)');
			reelEl.css('-moz-transform', 'translateZ(-' + reelRadius + 'px) rotateX(' + reelRotation + 'deg)');
			reelEl.css('-o-transform', 'translateZ(-' + reelRadius + 'px) rotateX(' + reelRotation + 'deg)');
			reelEl.css('transform', 'translateZ(-' + reelRadius + 'px) rotateX(' + reelRotation + 'deg)');
		});
		var reelTimeout = setTimeout(function() {
			reelPosition = rngModule.rngmodulegetnumbers();
			reelContainer.children('div').each(function(index) {
				reelTheta = 360 / reelPanelCount;
				reelThetaArray[index] = reelThetaArray[index] += (360 / reelPanelCount) * reelPosition[index] * -1;
				$(this).css('-webkit-transition', '-webkit-transform 0.6s ease-in-out');
				$(this).css('-moz-transition', '-webkit-transform 0.6s ease-in-out');
				$(this).css('-o-transition', '-webkit-transform 0.6s ease-in-out');
				$(this).css('transition', '-webkit-transform 0.6s ease-in-out');
				$(this).css('-webkit-transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
				$(this).css('-moz-transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
				$(this).css('-o-transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
				$(this).css('transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
			});
		}, 250);
		$('#button-spin').addClass('button-spin-blink');
		console.log('app: reels initialized');
	};

	var reelModuleSpin = function() {
		if(!reelSpinning[0] && !reelSpinning[1] && !reelSpinning[2]) {
			var reelNumbers = rngModule.rngmodulegetnumbers(),
				timeoutMapping = [1500, 2250, 3000];
			$('#button-spin').removeClass('button-spin-blink');
			reelContainer.children('div').each(function(index) {
				var reelEl = $(this);
				reelSpin[index] = true;
				reelSpinning[index] = true;
				window['interval_' + index] = setInterval(function() {
					reelThetaArray[index] = reelThetaArray[index] += (360 / reelPanelCount) * 1 * -1;
					reelEl.css('-webkit-transition', '-webkit-transform 0.06s linear');
					reelEl.css('-moz-transition', '-webkit-transform 0.06s linear');
					reelEl.css('-o-transition', '-webkit-transform 0.06s linear');
					reelEl.css('transition', '-webkit-transform 0.06s linear');
					reelEl.css('-webkit-transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
					reelEl.css('-moz-transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
					reelEl.css('-o-transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
					reelEl.css('transform', 'translateZ( -288px ) rotateX(' + reelThetaArray[index] + 'deg)');
					reelPosition[index] = (reelPosition[index] === reelPanelCount) ? 1 : reelPosition[index] += 1;
					if(reelSpin[index] === false && reelSpinning[index] === true) {
						if(reelPosition[index] === reelNumbers[index]) {
							audioModule.audiomoduleplayaudio('reelStop');
							clearInterval(window['interval_' + index]);
							reelSpinning[index] = false;
							if(!reelSpinning[0] && !reelSpinning[1] && !reelSpinning[2]) {
								$('#button-spin').addClass('button-spin-blink');
								console.log('app: reels stopped spinning', reelNumbers);
							}
						}
					}
				}, 60);
				window['timeout_' + index] = setTimeout(function() {
					reelSpin[index] = false;
				}, timeoutMapping[index]);
			});
		} else {
			console.log('app: reels already spinning');
		}
	};

	return {
		reelmoduleinitialize: reelModuleInitialize,
		reelmodulespin: reelModuleSpin
	};
});