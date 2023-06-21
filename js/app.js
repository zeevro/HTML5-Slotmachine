define(['jquery', 'rngModule', 'reelModule', 'uiModule', 'audioModule', 'printerModule'], function($, rngModule, reelModule, uiModule, audioModule, printerModule) {
	var initialize = function() {
		// Initialize modules
		rngModule.rngmoduleinitialize();
		reelModule.reelmoduleinitialize();
		uiModule.uimoduleinitialize();
		audioModule.audiomoduleinitialize();
		printerModule.printermoduleinitialize();
		// audioModule.audiomoduleplayaudio('themeSong');
		// audioModule.audiomoduleplayaudio('casinoAmbience');
	};

	return {
		initialize: initialize
	};
});