// eslint-disable-next-line no-unused-vars
const Preloader = (function (Images, Globals) {
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
		const imagesToPreload = Images.getAllCarouselImages().map((image) => {
			return imagePaths + image.name + '.jpg';
		});
		return preload(imagesToPreload);
	}

	/**
	 * Call preload() and load the first image into the browser
	 * and return a promise when this image is loaded
	 */
	function loadFirstImageForHeaderCarousel() {
		const imagePaths = Globals.get().pathForImagesInTheCarousel;
		const imageToPreload = imagePaths + Images.getTheFirstImageForJoyOfWhitewater().name + '.jpg';
		const imagesToPreload = [imageToPreload];
		return preload(imagesToPreload);
	}

	// public api
	return {
		loadImagesForHeaderCarousel,
		loadFirstImageForHeaderCarousel
	};
})(Images, Globals);
