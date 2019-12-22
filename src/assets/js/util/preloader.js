// eslint-disable-next-line no-unused-vars
const Preloader = (function (Configuration, Globals) {
	/**
	 * Loads all the images into the browser
	 */
	function preload(imagesToPreload) {
		return Promise.all(
			imagesToPreload.map((path) => {
				return new Promise((resolve) => {
					const image = new Image();
					image.onload = () => { resolve({ path }); };
					image.src = path;
				});
			})
		);
	}


	/**
	 * Call preload() and load all the images into the browser
	 * and return a promise when all images are loaded
	 */
	function loadImagesForHeaderCarousel() {
		const imagePaths = Globals.get().pathForImagesInTheCarousel;
		const imagesToPreload = Configuration.getAllCarouselImages().map((image) => {
			return imagePaths + image.name + '.jpg';
		});
		return preload(imagesToPreload);
	}

	// public api
	return {
		loadImagesForHeaderCarousel
	};
})(Configuration, Globals);
