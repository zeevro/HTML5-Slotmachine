define([], function() {
	printed_content = document.getElementById('printed-content');

	var printerModuleInitialize = function() {
	};

	var printerModulePrint = function() {
		printed_content.classList.add('printed');
	};

	var printerModuleReset = function() {
		printed_content.classList.remove('printed');
	};

	return {
		printermoduleinitialize: printerModuleInitialize,
		printermoduleprint: printerModulePrint,
		printermodulereset: printerModuleReset
	};
});