// eslint-disable-next-line no-unused-vars
const Preloader = (function (Images, Globals) {
	const imagePaths = Globals.get().pathForImagesInTheCarousel;

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
		const imagesToPreload = Images.getAllCarouselImages().map((image) => {
			return imagePaths + image.name;
		});
		return preload(imagesToPreload);
	}

	function loadFirstImageForHeaderCarousel() {
		let imageToPreload = imagePaths + this.firstImageForCarousel;
		const imagesToPreload = [imageToPreload];
		return preload(imagesToPreload);
	}

	// public api
	return {
		loadImagesForHeaderCarousel,
		loadFirstImageForHeaderCarousel
	};
})(Images, Globals);
