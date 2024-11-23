// eslint-disable-next-line no-unused-vars
const Globals = (function () {
	function get() {
		return {
			breakpointLarge: 992,
			breakpointMedium: 688,
			pathForImagesInTheCarousel: '/assets/images/carousel/',
			pathForImagesInTheSlider: '/assets/images/slider/',
			//Trennt den String bei den '/' und nimmt das zweite Wort. Trennt dann bei '.' und nimmt das erste Wort.
			nameOfCurrentSite: location.pathname.split('/')[1].split('.')[0]
		};
	}

	// public api
	return {
		get
	};
})();
