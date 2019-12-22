// eslint-disable-next-line no-unused-vars
const Globals = (function () {
	function get() {
		return {
			breakpointLarge: 740,
			breakpointMedium: 440,
			pathForImagesInTheCarousel: '/assets/images/carousel/',
			pathForImagesInTheSlider: '/assets/images/slider/'
		};
	}

	// public api
	return {
		get
	};
})();
