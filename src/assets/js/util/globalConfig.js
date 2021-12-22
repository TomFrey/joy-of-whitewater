// eslint-disable-next-line no-unused-vars
const Globals = (function () {
	function get() {
		return {
			breakpointLarge: 992, //740,
			breakpointMedium: 688,
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
