// eslint-disable-next-line no-unused-vars
var Configuration = (function () {
	// Die Bilder, die im Header automatisch alle paar Sekunden wechseln.
	const imageCarousel = {
		theJoyOfWhiteWaterImages: [
			{ name: 'joyOfWhitewater_5', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_4', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_3', title: 'Entspannung am trocknen', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_2', title: 'Paddeln in Costa Rica', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_1', title: 'Paddeln in Costa Rica', alt: 'The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'kanukurse_5', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'kanukurse_4', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'kanukurse_3', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'kanukurse_2', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'kanukurse_1', title: 'Kanukurs', alt: 'Kanukurs' }
		],
		paddelreisenImages: [
			{ name: 'paddelreisen_8', title: 'Quichos, Ecuador', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2', title: 'Paddelreise in Georgien', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_9', title: 'Jungle Ecuador', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_5', title: 'Taravo, Korsika', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_4', title: 'Open Canoe in Costa Rica', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_3', title: 'Open Canoe in Costa Rica', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_7', title: 'Transportmittel in Chile', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_1', title: 'Sesia, Piemont', alt: 'Paddelreisen' }
		]
	};

	// Die Bilder, die der Benutzer wechseln kann. Z.B. bei den verschiedenen Paddelreisen unter den Details.
	const imageSlider = {
		korsika: [
			{ name: 'joyOfWhitewater_5', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_4', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_3', title: 'Entspannung am trocknen', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_2', title: 'Paddeln in Costa Rica', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_1', title: 'Paddeln in Costa Rica', alt: 'The Joy Of Whitewater' }
		],
		soca: [
			{ name: 'joyOfWhitewater_5', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' }
		]
	};

	function getImagesForKanukurse() {
		return imageCarousel.kanukurseImages;
	}

	function getImagesForPaddelreisen() {
		return imageCarousel.paddelreisenImages;
	}

	function getImagesForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages;
	}


	function getImagesForKorsika() {
		return imageSlider.korsika;
	}

	// public api
	return {
		getImagesForKanukurse,
		getImagesForPaddelreisen,
		getImagesForJoyOfWhitewater,
		getImagesForKorsika,
	};
})();
