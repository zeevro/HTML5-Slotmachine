define(['jquery'], function($) {
	printed_content = $('#printed-content');

	var printerModuleInitialize = function() {
	};

	var printerModulePrint = function() {
		printed_content.addClass('printed');
	};

	var printerModuleReset = function() {
		printed_content.removeClass('printed');
	};

	return {
		printermoduleinitialize: printerModuleInitialize,
		printermoduleprint: printerModulePrint,
		printermodulereset: printerModuleReset
	};
});