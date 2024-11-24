const App = (function (Globals, Responsive, PageConfig, RenderHeader, Navigation) {
	/** ** wird vor dem DOM ready ausgeführt ** */
	const breakPointLarge = Globals.get().breakpointLarge;

	/** ** wird nach dem DOM ready ausgeführt ** */
	function init() {
		let windowInnerWidthAtLastReload = window.innerWidth;
		window.onresize = (event) => {
			windowInnerWidthAtLastReload = Responsive.reloadWhenBrowserWidthCrossesBreakpoint(windowInnerWidthAtLastReload);
		}

		if (window.innerWidth >= breakPointLarge) {
			// Jeweils das erste Bild vollständig laden und dann schon mal anzeigen,
			// bevor alle anderen Bilder... geladen werden.
			PageConfig.callFnAccordingToCurrentPage(Preloader.loadFirstImageForHeaderCarousel)
				.then(() => {
					PageConfig.callFnAccordingToCurrentPage(Navigation.setHeaderTitle);
					PageConfig.callFnAccordingToCurrentPage(RenderHeader.addJustFirstImage);
					PageConfig.callFnAccordingToCurrentPage(Navigation.setSelectedNavigation);

					// alle Kursdaten laden
					CourseDates.loadAndRender()
						.then(() => {
							ContactForm.init();
							CourseRegistration.init();
							Navigation.init();
							YoutubeVideoControl.init();
							GoogleMaps.init();
							// Alle Bilder vorladen, damit man den Aufbau im GUI nicht sieht.
							return Preloader.loadImagesForHeaderCarousel();
						})
						.then(() => {
							//Alle Bilder der entsprechenden Seite (Reisen, Kurse, Packraft...) in die Carousel Liste rendern.
							PageConfig.callFnAccordingToCurrentPage(Responsive.renderHeaderWithImagesAccordingToBreakPoint);
							
							//Das Carousel starten
							ImageCarousel.init();
						})
						.catch((error) => {
							console.log(error);
						});
				})

		//Mobile
		} else {
			CourseDates.loadAndRender()
				.then(() => {
					//Das Bild der entsprechenden Seite (Reisen, Kurse, Packraft...) in den Header rendern.
					PageConfig.callFnAccordingToCurrentPage(Responsive.renderHeaderWithImagesAccordingToBreakPoint);

					ContactForm.init();
					CourseRegistration.init();
					Navigation.init();
					YoutubeVideoControl.init();
					GoogleMaps.init();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	// public api
	return {
		init
	};
})(Globals, Responsive, PageConfig, RenderHeader, Navigation);

// wenn der DOM vollständig geladen ist init aufrufen
// eslint-disable-next-line no-undef
domIsReady(App.init);
