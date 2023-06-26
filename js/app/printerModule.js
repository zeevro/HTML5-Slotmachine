define([], function() {
	printed_page_container = document.getElementById('printed-page-container');
	printed_content = document.getElementById('printed-content');
	printer_image = document.getElementById('printerImage');
	filter_saturation = document.getElementById('printerFilterSaturation');
	filter_turbulence = document.getElementById('printerFilterTurbulence');

	bad_papers = [
		'img/bad-prints/paper1.png',
		'img/bad-prints/paper2.jpg',
		'img/bad-prints/paper3.jpg',
		'img/bad-prints/paper4.jpg',
		'img/bad-prints/paper5.jpg',
	];

	good_papers = [
		'img/good-prints/paper1.png',
		'img/good-prints/paper2.png',
		'img/good-prints/paper3.png',
		'img/good-prints/paper4.png',
		'img/good-prints/paper5.png',
		'img/good-prints/paper6.png',
		'img/good-prints/paper7.jpg',
		'img/good-prints/paper8.jpg',
	];

	var printerModuleInitialize = function() {
	};

	var printerModulePrint = function(mangled) {
		useBadPrint = mangled && (Math.random() > 0.66);
		papersArr = useBadPrint ? bad_papers : good_papers;

		printer_image.setAttribute('href', papersArr[Math.floor(Math.random() * papersArr.length)]);

		if (mangled && !useBadPrint) {
			printer_image.setAttribute('filter', 'url(#printerFilter)');
			filter_saturation.setAttribute('values', 0.3 + Math.random() * 0.3);
			filter_turbulence.setAttribute('seed', Math.random() * 100000);
		} else {
			printer_image.setAttribute('filter', '');
		}

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