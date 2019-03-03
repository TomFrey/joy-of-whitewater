const App = (function () {
	/** ** wird vor dem DOM ready ausgeführt ** */

	/** ** wird nach dem DOM ready ausgeführt ** */
	function init() {
		Navigation.init();
		ImageCarousel.init();
		// ImageSlider.init();
		CourseRegistration.init();
	}

	// public api
	return {
		init
	};
})();

// wenn der DOM vollständig geladen ist init aufrufen
// eslint-disable-next-line no-undef
domIsReady(App.init);
