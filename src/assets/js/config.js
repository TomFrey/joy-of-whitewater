// eslint-disable-next-line no-unused-vars
var Configuration = (function () {
	const imageCarousel = {
		theJoyOfWhiteWaterImages: [
			{ name: 'joyOfWhitewater_4', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_3', title: 'Entspannung am trocknen', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_2', title: 'Paddeln in Costa Rica', alt: 'The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_1', title: 'Paddeln in Costa Rica', alt: 'The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'kanukurse_3', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'kanukurse_2', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'kanukurse_1', title: 'Kanukurs', alt: 'Kanukurs' }
		],
		paddelreisenImages: [
			{ name: 'paddelreisen_5', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_4', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_3', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_1', title: 'Paddelreisen', alt: 'Paddelreisen' }
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

	// public api
	return {
		getImagesForKanukurse,
		getImagesForPaddelreisen,
		getImagesForJoyOfWhitewater
	};
})();
