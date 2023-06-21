define(['jquery', 'reelModule'], function($, reelModule) {

	var uiModuleInitialize = function() {
		$('#button-spin').click(function() {
			reelModule.reelmodulespin();
		});
	};

	return {
		uimoduleinitialize: uiModuleInitialize
	};
});