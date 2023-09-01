const App = (function (Globals, Responsive) {
	/** ** wird vor dem DOM ready ausgeführt ** */
	const breakPointLarge = Globals.get().breakpointLarge;
	const whereAmI = Globals.get().nameOfCurrentSite;


	/** ** wird nach dem DOM ready ausgeführt ** */
	function init() {
		let windowInnerWidthAtLastReload = window.innerWidth;
		window.onresize = (event) => {
			windowInnerWidthAtLastReload = Responsive.reloadWhenBrowserWidthCrossesBreakpoint(windowInnerWidthAtLastReload);
		}

		if (window.innerWidth >= breakPointLarge) {
			// Jeweils das erste Bild vollständig laden und dann schon mal anzeigen,
			// bevor alle anderen Bilder... geladen werden.
			Preloader.loadFirstImageForHeaderCarousel()
				.then(() => {
					switch (whereAmI) {
						case 'kajakkurse':
							RenderHeader.addJustFirstImage(Images.getImagesForKajakkurse());
							Navigation.setHeaderTitle('Kajakkurse');
							break;

						case 'kanadierkurse':
							RenderHeader.addJustFirstImage(Images.getImagesForKanadierkurse());
							Navigation.setHeaderTitle('Open Canoe und<br> Kanadierkurse');
							break;

						case 'paddelreisen':
							RenderHeader.addJustFirstImage(Images.getImagesForPaddelreisen());
							Navigation.setHeaderTitle('Wildwasser Reisen');
							break;
						case 'packraft':
							RenderHeader.addJustFirstImage(Images.getImagesForPackraft());
							Navigation.setHeaderTitle('Packraft');
							break;
						case '': // Startseite
							RenderHeader.addJustFirstImage(Images.getImagesForJoyOfWhitewater());
							Navigation.setHeaderTitle('<strong>Kanuschule</strong><br>THE JOY OF WHITEWATER');
							break;
						default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
					}
					Navigation.setSelectedNavigation(whereAmI);
					
					// alle Kursdaten laden
					CourseDates.loadAndRender()
						.then(() => {
							ContactForm.init();
							CourseRegistration.init();
							Navigation.init();
							YoutubeVideoControl.init();
							// Alle Bilder vorladen, damit man den Aufbau im GUI nicht sieht.
							return Preloader.loadImagesForHeaderCarousel();
						})
						.then(() => {
							//Alle Bilder der entsprechenden Seite (Reisen, Kurse, Packraft...) in die Carousel Liste rendern.
							Navigation.renderHeaderWithImagesAccordingToSite(whereAmI);
							
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
					Navigation.renderHeaderWithImagesAccordingToSite(whereAmI);

					ContactForm.init();
					CourseRegistration.init();
					Navigation.init();
					YoutubeVideoControl.init();
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
})(Globals, Responsive);

// wenn der DOM vollständig geladen ist init aufrufen
// eslint-disable-next-line no-undef
domIsReady(App.init);
