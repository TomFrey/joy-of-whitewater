const App = (function () {
	/** ** wird vor dem DOM ready ausgeführt ** */

	/** ** wird nach dem DOM ready ausgeführt ** */
	function init() {

		// Jeweils das erste Bild vollständig laden und dann schon mal anzeigen,
		// bevor alle anderen Bilder... geladen werden.
		Preloader.loadFirstImageForHeaderCarousel()
			.then(() => {
				const whereAmI = Globals.get().nameOfCurrentSite;
				switch (whereAmI) {
					case 'kanukurse':
						RenderHeader.addJustFirstImage(Images.getImagesForKanukurse());
						break;
					case 'paddelreisen':
						RenderHeader.addJustFirstImage(Images.getImagesForPaddelreisen());
						break;
					case '': // Startseite
						RenderHeader.addJustFirstImage(Images.getImagesForJoyOfWhitewater());
						break;
					default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
				}

				// alle Kursdaten laden
				CourseDates.loadAndRender()
					.then(() => {
						// Alle Bilder vorladen, damit man den Aufbau im GUI nicht sieht.
						return Preloader.loadImagesForHeaderCarousel();
					})
					.then(() => {
						CourseRegistration.init();
						Navigation.init();
						ImageCarousel.init();
					})
					.catch((error) => {
						console.log(error);
					});
			})
	}

	// public api
	return {
		init
	};
})();

// wenn der DOM vollständig geladen ist init aufrufen
// eslint-disable-next-line no-undef
domIsReady(App.init);
