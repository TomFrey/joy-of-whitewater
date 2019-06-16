const App = (function () {
	/** ** wird vor dem DOM ready ausgeführt ** */

	/** ** wird nach dem DOM ready ausgeführt ** */
	function init() {
		CourseDates.loadAndRender()
			.then(() => {
				CourseRegistration.init();
				Navigation.init();
				ImageCarousel.init();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// public api
	return {
		init
	};
})();

// wenn der DOM vollständig geladen ist init aufrufen
// eslint-disable-next-line no-undef
domIsReady(App.init);
