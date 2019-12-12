// eslint-disable-next-line no-unused-vars
const Preloader = (function (Configuration, Globals) {
	/**
	 * Loads all the images into the browser
	 */
	function preload(imagesToPreload) {
		const images = [];

		imagesToPreload.forEach((image) => {
			let i = 0;
			images[i] = new Image();
			images[i].src = image;
			i++;
		});
	}

	/**
	 * Call preload() and load all the images into the browser
	 * and return a promise when all images are loaded
	 */
	function loadImagesForHeaderCarousel() {
		const promise = new Promise((resolve) => {
			const imagePath = Globals.get().pathForImagesInTheCarousel;
			const imagesToPreload = Configuration.getAllCarouselImages().map((image) => {
				return imagePath + image.name + '.jpg';
			});
			preload(imagesToPreload);
			resolve();
		});
		return promise;
	}

	// public api
	return {
		loadImagesForHeaderCarousel
	};
})(Configuration, Globals);
