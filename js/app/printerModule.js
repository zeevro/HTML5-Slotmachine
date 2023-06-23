define([], function() {
	printed_content = document.getElementById('printed-content');
	printer_image = document.getElementById('printerImage');
	filter_saturation = document.getElementById('printerFilterSaturation');
	filter_turbulence = document.getElementById('printerFilterTurbulence');

	var printerModuleInitialize = function() {
	};

	var printerModulePrint = function() {
		filter_saturation.setAttribute('values', Math.random() * 0.6)
		filter_turbulence.setAttribute('seed', Math.random() * 100000)
		printer_image.setAttribute('href', 'https://cataas.com/cat?width=286&height=180');
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