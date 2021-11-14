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
		let imageToPreload;
		const whereAmI = Globals.get().nameOfCurrentSite;
		switch (whereAmI) {
			case 'kanukurse':
				imageToPreload = imagePaths + Images.getTheFirstImageForKanukurse().name + '.jpg';
				break;
			case 'paddelreisen':
				imageToPreload = imagePaths + Images.getTheFirstImageForPaddelreisen().name + '.jpg';
				break;
			case 'packraft':
				imageToPreload = imagePaths + Images.getTheFirstImageForPackraft().name + '.jpg';
				break;
			case '': // Startseite
			 	imageToPreload = imagePaths + Images.getTheFirstImageForJoyOfWhitewater().name + '.jpg';
				break;
			default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
				return Promise.resolve();
		}
		const imagesToPreload = [imageToPreload];
		return preload(imagesToPreload);
	}

	// public api
	return {
		loadImagesForHeaderCarousel,
		loadFirstImageForHeaderCarousel
	};
})(Images, Globals);
