// eslint-disable-next-line no-unused-vars
const PageConfig = (function (Images, Globals) {

	const whereAmI = Globals.get().nameOfCurrentSite;

    /**
	 * Ruft die übergebene Funktion auf und setzt Bilder, Titel... entsprechend der Seite, wo man sich befindet.
	 * @param {*} fnToCall 
	 * @returns 
	 */
	function callFnAccordingToCurrentPage(fnToCall) {
		let pageData = {};

		switch (whereAmI) {
			case 'kajakkurse':
				pageData = {
					headerTitle: 'Kajakkurse',
					selectedNavigation: 'courses',
					mobileImages: Images.getMobileImagesForKajakkurse(),
					carouselImages: Images.getImagesForKajakkurse(),
					firstImageForCarousel: Images.getTheFirstImageForKajakkurse().name
				};
				break;

			case 'kanadierkurse':
				pageData = {
					headerTitle: 'Open Canoe und<br> Kanadierkurse',
					selectedNavigation: 'courses',
					mobileImages: Images.getMobileImagesForKanadierkurse(),
					carouselImages: Images.getImagesForKanadierkurse(),
					firstImageForCarousel: Images.getTheFirstImageForKanadierkurse().name
				};
				break;

			case 'packraftkurse':
				pageData = {
					headerTitle: 'Packraftkurse',
					selectedNavigation: 'courses',
					mobileImages: Images.getMobileImagesForPackraftkurse(),
					carouselImages: Images.getImagesForPackraftkurse(),
					firstImageForCarousel: Images.getTheFirstImageForPackraftkurse().name
				};
				break;

			case 'specials':
				pageData = {
					headerTitle: 'Specials',
					selectedNavigation: 'courses',
					mobileImages:  Images.getMobileImagesForSpecials(),
					carouselImages: Images.getImagesForSpecials(),
					firstImageForCarousel: Images.getTheFirstImageForSpecials().name
				};
				break;

			case 'paddelreisen':
				pageData = {
					headerTitle: 'Wildwasser Reisen',
					selectedNavigation: 'journies',
					mobileImages: Images.getMobileImagesForPaddelreisen(),
					carouselImages: Images.getImagesForPaddelreisen(),
					firstImageForCarousel: Images.getTheFirstImageForPaddelreisen().name
				};
				break;

			case 'wildwasser-reisen':
				//console.log('where -> '+Images.getPaddleJourneyLocation());
				switch (Images.getPaddleJourneyLocation()) {
					case 'korsika':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> auf Korsika',
							mobileImages: Images.getMobileImagesForKorsika(),
							carouselImages: Images.getImagesForKorsikaCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForKorsika().name
						};
						break;
					case 'soca':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> auf der Soča',
							mobileImages: Images.getMobileImagesForSoca(),
							carouselImages: Images.getImagesForSocaCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForSoca().name
						};
						break;
					case 'georgien':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> in Georgien',
							mobileImages: Images.getMobileImagesForGeorgien(),
							carouselImages: Images.getImagesForGeorgienCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForGeorgien().name
						};
						break;
					case 'albanien':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> in Albanien',
							mobileImages: Images.getMobileImagesForAlbanien(),
							carouselImages: Images.getImagesForAlbanienCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForAlbanien().name
						};
						break;
					case 'griechenland':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> in Griechenland',
							mobileImages: Images.getMobileImagesForGriechenland(),
							carouselImages: Images.getImagesForGriechenlandCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForGriechenland().name
						};
						break;
					case 'sesia':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> im Valle Sesia',
							mobileImages: Images.getMobileImagesForSesia(),
							carouselImages: Images.getImagesForSesiaCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForSesia().name
						};
						break;
					case 'durance':
					
						break;
					case 'yukon':
						pageData = {
							headerTitle: 'Wildnisreise im Yukon<br> Territory',
							mobileImages: Images.getMobileImagesForYukon(),
							carouselImages: Images.getImagesForYukonCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForYukon().name
						};
						break;
					case 'inn':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> auf dem Inn',
							mobileImages: Images.getMobileImagesForInn(),
							carouselImages: Images.getImagesForInnCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForInn().name
						};
						break;
					case 'chile':
						pageData = {
							headerTitle: 'Wildwasser paddeln<br> in Chile',
							mobileImages: Images.getMobileImagesForChile(),
							carouselImages: Images.getImagesForChileCarousel(),
							firstImageForCarousel: Images.getTheFirstImageForChile().name
						};
						break;
					default:
						RenderHeader.addJustFirstImage(Images.getImagesForPaddelreisen());
						Navigation.setHeaderTitle('Wildwasser Reisen');
				}
				break;

			case 'ausfluege':
				pageData = {
					headerTitle: 'Wildwasser <br> Ausflüge',
					selectedNavigation: 'trips',
					mobileImages: Images.getMobileImagesForAusfluege(),
					carouselImages: Images.getImagesForAusfluege(),
					firstImageForCarousel: Images.getTheFirstImageForAusfluege().name
				};
				break;

			case '': // Startseite
				pageData = {
					headerTitle: 'THE JOY OF WHITEWATER',
					selectedNavigation: 'home',
					mobileImages: Images.getMobileImagesForJoyOfWhitewater(),
					carouselImages: Images.getImagesForJoyOfWhitewater(),
					firstImageForCarousel: Images.getTheFirstImageForJoyOfWhitewater().name
				};
				break;

			default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB, Termine ...
				return Promise.resolve();
		}
		return fnToCall.call(pageData);
	}


	// public api
	return {
		callFnAccordingToCurrentPage
	};
})(Images, Globals);
