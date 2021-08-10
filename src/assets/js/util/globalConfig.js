// eslint-disable-next-line no-unused-vars
const Globals = (function () {
	function get() {
		return {
			breakpointLarge: 1050, //740,
			breakpointMedium: 440,
			pathForImagesInTheCarousel: '/assets/images/carousel/',
			pathForImagesInTheSlider: '/assets/images/slider/',
			nameOfCurrentSite: location.pathname.split('/')[1].split('.')[0]
		};
	}

	// public api
	return {
		get
	};
})();
