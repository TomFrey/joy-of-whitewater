// eslint-disable-next-line no-unused-vars
var Configuration = (function () {
	const imageCarousel = {
		theJoyOfWhiteWaterImages: [
			{ name: 'caousel_gr_4', title: 'The Joy Of Whitewater', alt: 'The Joy Of Whitewater' },
			{ name: 'caousel_gr_2', title: 'The Joy Of Whitewater', alt: 'The Joy Of Whitewater' },
			{ name: 'caousel_gr_1', title: 'The Joy Of Whitewater', alt: 'The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'caousel_gr_1', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'caousel_gr_2', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'caousel_gr_4', title: 'Kanukurs', alt: 'Kanukurs' }
		],
		paddelreisenImages: [
			{ name: 'caousel_gr_1', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'caousel_gr_2', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'caousel_gr_4', title: 'Paddelreisen', alt: 'Paddelreisen' }
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
