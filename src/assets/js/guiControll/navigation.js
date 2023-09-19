// eslint-disable-next-line no-unused-vars
const Navigation = (function (RenderImageSlider, Images, Globals, Responsive, CourseSearch) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';

	let hamburger;
	let mainNavi;
	let infoNavButton;
	let infoNavWrapper;
	let infoNav;
	let level1KursDrawerButton;
	let level2KursDrawerButton;
	let level3KursDrawerButton;
	let level4KursDrawerButton;
	let level5KursDrawerButton;
	let eskimotierenDrawerButton;
	let paddelReisenDrawerButtons;
	let packraftKursDrawerButton;
	let courseSearchDrawerButton;
	let drawerButtons;
	let courseLists;
	let courseOverviewDrawerButtons;
	let moreDetailsButtons;
	let lessDetailsButtons;


	function setHeaderTitle(titleContent) {
		const title = document.querySelector('.images-carousel .containerForTitle h1');
		title.innerHTML = titleContent;
	}


	function setSelectedNavigation(whereAmI) {
		const allLinksFromMainNavigation = [];

		const kanuKurse = document.querySelector('li.main-navi-desktop__kanukurse a.u-slide-line');
		allLinksFromMainNavigation.push(kanuKurse);

		// const kanadierKurse = document.querySelector('li.main-navi-desktop__kanadierkurse a.u-slide-line');
		// allLinksFromMainNavigation.push(kanadierKurse);
		// const specials = document.querySelector('li.main-navi-desktop__specials a.u-slide-line');
		// allLinksFromMainNavigation.push(specials);

		const paddelReisen = document.querySelector('li.main-navi-desktop__paddelreisen a.u-slide-line');
		allLinksFromMainNavigation.push(paddelReisen);
		const joyOfWhitewater = document.querySelector('li.main-navi-desktop__joyOfWhitewater a.u-slide-line');
		allLinksFromMainNavigation.push(joyOfWhitewater);
		const packraft = document.querySelector('li.main-navi-desktop__packraft a.u-slide-line');
		allLinksFromMainNavigation.push(packraft);

		allLinksFromMainNavigation.forEach((url) => {
			url.classList.remove(SELECTED);
		});

		switch (whereAmI) {
			case 'kanadierkurse':
			case 'kajakkurse':
			case 'packraftkurse':
			case 'kanukurse':
				kanuKurse.classList.add(SELECTED);
				break;

			// case 'kanadierkurse':
			// 	kanadierKurse.classList.add(SELECTED);
			// 	break;

			case 'paddelreisen':
				paddelReisen.classList.add(SELECTED);
				break;
			case 'packraft':
				packraft.classList.add(SELECTED);
				break;
			case '': // Startseite
				joyOfWhitewater.classList.add(SELECTED);
				break;
			default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
		}
	}


	function isHamburgerOpen(){
		if(hamburger.classList.contains(CLOSE_NAV)){
		 return true;
		}
		return false;
	}


	function showHideNavigation() {
		//Hamburger öffnen
		if (mainNavi.classList.contains(HIDE)) {
			mainNavi.classList.remove(HIDE);
			hamburger.classList.add(CLOSE_NAV);
			//Info Navigation schliessen wenn offen
			if (isInfoNavigationOpen()) {
				toggleInfoNavigation();
			}
		//Hamburger schliessen
		} else {
			mainNavi.classList.add(HIDE);
			hamburger.classList.remove(CLOSE_NAV);
		}
	}


	function isInfoNavigationOpen(){
		if(infoNavWrapper.classList.contains('opened-nav')){
		 return true;
		}
		return false;
	}


	//Das ist der runde 'Info' Button, wo dann die Info-Navigation aufgeht.
	function toggleInfoNavigation(){
		//Info Navigation schliessen
		if(infoNavWrapper.classList.contains('opened-nav')){
			infoNavButton.innerHTML = "Info";
			infoNavWrapper.classList.remove('opened-nav');
			infoNav.classList.remove('opened-nav');
		}
		//Info Navigation öffnen
		else{
			infoNavButton.innerHTML = "X";
			infoNavWrapper.classList.add('opened-nav');
			infoNav.classList.add('opened-nav');
			//Hamburger schliessen, wenn offen
			if (isHamburgerOpen()) {
				showHideNavigation();
			}
		}
	}


	function deleteImageSlider(sliderName) {
		// Imageslider löschen
		const imageSlider = document.querySelector('.image-slider.' + sliderName);
		if (imageSlider !== null) {
			imageSlider.classList.remove('slick-initialized');
			imageSlider.classList.remove('slick-slider');
			imageSlider.classList.remove('slick-dotted');

			RenderImageSlider.deleteAllImagesFromSliderItems(imageSlider);
		}
	}


	function closeFirstAppearanceOfOpenPaddelReisenDrawer() {
		paddelReisenDrawerButtons.forEach((paddelReisenDrawerButton) => {
			let paddelReisenDrawer = paddelReisenDrawerButton.parentElement.parentElement.lastElementChild;
			let paddelReisenDrawerButtonIcon = paddelReisenDrawerButton.lastElementChild;
			if (paddelReisenDrawer.classList.contains(SHOW)) {
				paddelReisenDrawer.classList.remove(SHOW);
				paddelReisenDrawerButtonIcon.classList.remove(SHOW);
				return;
			}
		});
	}


	function toggleTextContainerDrawer(event) {
		console.log('toggleTextContainerDrawer');
		const drawer = event.parentElement.parentElement.lastElementChild;
		const drawerButtonIcon = event.lastElementChild;

		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
			drawerButtonIcon.classList.remove(SHOW);
		} else {
			drawer.classList.add(SHOW);
			drawerButtonIcon.classList.add(SHOW);
		}
	}



	function toggleTerminOverviewDrawer(event) {
		console.log('toggleTerminOverviewDrawer');
		const drawer = event.parentElement.parentElement.parentElement.parentElement.lastElementChild;
		const drawerButtonIcon = event.lastElementChild;

		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
			drawerButtonIcon.classList.remove(SHOW);
		} else {
			drawer.classList.add(SHOW);
			drawerButtonIcon.classList.add(SHOW);
		}
	}


	function renderImageSlider(sliderName) {
		RenderImageSlider.createImageItemsForTheImageSlider(sliderName)
			.then(() => {
				ImageSlider.init(sliderName);
			})
			.catch((error) => {
				console.log(sliderName + ' slider --> ' + error);
			});
	}


	function togglePaddelReisenDrawer(event) {
		const drawer = event.parentElement.parentElement.lastElementChild;
		const drawerButtonIcon = event.lastElementChild;
		let sliderName;

		// Wenn der Detaildrawer geöffnet ist, dann schliessen
		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
			drawerButtonIcon.classList.remove(SHOW);

		// Wenn der Detaildrawer geschlossen ist, dann öffnen
		} else {
			//Vor dem Öffnen, den anderen, ev. offenen Drawer schliessen
			closeFirstAppearanceOfOpenPaddelReisenDrawer();

			drawer.classList.add(SHOW);
			drawerButtonIcon.classList.add(SHOW);

			// Abfragen, welcher Drawer (Korsika, Piemont, Soca...) geöffnet wurde.
			switch (event.firstElementChild.innerHTML) {
				case 'Details zu Korsika':
					sliderName = 'korsika';
					break;
				case 'Details zum Valle Sesia':
					sliderName = 'piemont';
					break;
				case 'Details zur Soca':
					sliderName = 'soca';
					break;
				case 'Details zur Georgien Reise':
					sliderName = 'georgien';
					break;
				case 'Details zur Albanien Reise':
					sliderName = 'albanien';
				break;
				case 'Details zur Griechenland Reise':
					sliderName = 'griechenland';
				break;
				case 'Details zur Durance':
					sliderName = 'durance';
				break;
				default:
					sliderName = 'korsika';
					break;
			}
			deleteImageSlider(sliderName);
			renderImageSlider(sliderName);
		}
	}


	function toggleCourseDetails(event) {
		const drawer = event.parentElement.parentElement.lastElementChild;

		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
		} else {
			drawer.classList.add(SHOW);
		}
	}


	function toggleDrawer(event) {
		const drawer = event.parentElement.parentElement.lastElementChild;
		const drawerButtonIcon = event.lastElementChild;

		// Detaildrawer schliessen
		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
			drawerButtonIcon.classList.remove(SHOW);

		// Detaildrawer öffnen
		} else {
			drawer.classList.add(SHOW);
			drawerButtonIcon.classList.add(SHOW);
		}
	}

	/**
	 * Alle Bilder der entsprechenden Seite in die Carousel Liste rendern.
	 */
	function renderHeaderWithImagesAccordingToSite(whereAmI) {
		switch (whereAmI) {
			case 'kajakkurse':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForKajakkurse(), Images.getMobileImagesForKajakkurse());
				break;
			case 'paddelreisen':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForPaddelreisen(), Images.getMobileImagesForPaddelreisen());
				break;

			// case 'packraft':
			// 	Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForPackraft(), Images.getMobileImagesForPackraft());
			// 	break;

			case 'kanadierkurse':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForKanadierkurse(), Images.getMobileImagesForKanadierkurse());
				break;

			case 'packraftkurse':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForPackraftkurse(), Images.getMobileImagesForPackraftkurse());
				break;

			case '': // Startseite
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForJoyOfWhitewater(), Images.getMobileImagesForJoyOfWhitewater());
				break;
			default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
		}
	}


	function toggleContent(event) {
		const introContainer = event.parentElement.parentElement;
		
		function getMoreButton(){
			for (const child of introContainer.children) {
				if (child.classList.contains('course-container-intro-item-more')){
					return child;
				};
			}
		}

		function toggleMoreButton(parentOfMoreButton){
			parentOfMoreButton.classList.toggle(HIDE);
		}
	
		function togglePaddle(){
			for (const child of introContainer.children) {
				if (child.classList.contains('course-container-intro-item-paddle')){
					child.classList.toggle(SHOW);
				};
			}
		}

		function toggleElementsAfterMoreButton(parentOfMoreButton){
			let elementsAfterMore = parentOfMoreButton.nextElementSibling
			while (elementsAfterMore) {
				elementsAfterMore.classList.toggle(HIDE);
				elementsAfterMore = elementsAfterMore.nextElementSibling;
			}
		}

		togglePaddle();
		toggleMoreButton(getMoreButton());
		toggleElementsAfterMoreButton(getMoreButton()); //content1, content2 und lessButton
	}


	function initiate() {	
		hamburger = document.getElementById('hamburger');
		hamburger.addEventListener('click', showHideNavigation);
		mainNavi = document.querySelector('.main-navi-desktop');

		infoNav = document.querySelector('.info-nav'),
		infoNavButton = document.querySelector('.info-nav-button'),
		infoNavWrapper = document.querySelector('.info-nav-wrapper');
	
		//Listener auf dem 'Info' Button
		if (infoNavButton !== null) {
		  infoNavButton.addEventListener('click', () => {
			toggleInfoNavigation();
		  });
		}

		//'Level1 Kurse' anzeigen Button
		level1KursDrawerButton = document.querySelector('#open-close-drawer-button-level1kurse');
		if (level1KursDrawerButton !== null) {
			level1KursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		//'Level2 Kurse' anzeigen Button
		level2KursDrawerButton = document.querySelector('#open-close-drawer-button-level2kurse');
		if (level2KursDrawerButton !== null) {
			level2KursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		//'Level3 Kurse' anzeigen Button
		level3KursDrawerButton = document.querySelector('#open-close-drawer-button-level3kurse');
		if (level3KursDrawerButton !== null) {
			level3KursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		//'Level4 Kurse' anzeigen Button
		level4KursDrawerButton = document.querySelector('#open-close-drawer-button-level4kurse');
		if (level4KursDrawerButton !== null) {
			level4KursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		//'Level5 Kurse' anzeigen Button
		level5KursDrawerButton = document.querySelector('#open-close-drawer-button-level5kurse');
		if (level5KursDrawerButton !== null) {
			level5KursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		eskimotierenDrawerButton = document.querySelector('#open-close-drawer-button-eskimotieren');
		if (eskimotierenDrawerButton !== null) {
			eskimotierenDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		paddelReisenDrawerButtons = document.querySelectorAll('.open-close-drawer-button-paddelreisen');
		if (paddelReisenDrawerButtons !== null) {
			paddelReisenDrawerButtons.forEach((paddelReisenDrawerButton) => {
				paddelReisenDrawerButton.addEventListener('click', (event) => {
					togglePaddelReisenDrawer(event.target);
				});
			})
		}

		packraftKursDrawerButton = document.querySelector('#open-close-drawer-button-packraftkurse');
		if (packraftKursDrawerButton !== null) {
			packraftKursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		courseSearchDrawerButton = document.querySelector('#open-close-drawer-button-course-search');
		if (courseSearchDrawerButton !== null) {
			courseSearchDrawerButton.addEventListener('click', (event) => {
				CourseSearch.init();
				toggleTextContainerDrawer(event.target);
			});
		}

		//die Drawer welche, auf der Termine Seite, die Kanukurs, Reisen und Packraft Termine auf und zu klappen
		courseOverviewDrawerButtons = document.querySelectorAll('.open-close-drawer-button-course-overview');
		if (courseOverviewDrawerButtons !== null) {
			courseOverviewDrawerButtons.forEach((courseOverviewDrawerButton) => {
				courseOverviewDrawerButton.addEventListener('click', (event) => {
					toggleTerminOverviewDrawer(event.target);
				});
			})
		}

		//die Drawer welche, auf der Termine Seite, in einem Drawer sind und wieder einen Drawer öffnen
		courseOverviewDrawerButtons = document.querySelectorAll('.open-close-drawer-button-course-overview-drawer-in-drawer');
		if (courseOverviewDrawerButtons !== null) {
			courseOverviewDrawerButtons.forEach((courseOverviewDrawerButton) => {
				courseOverviewDrawerButton.addEventListener('click', (event) => {
					toggleTextContainerDrawer(event.target);
				});
			})
		}
		
		courseLists = document.querySelectorAll('.course-list');
		if (courseLists !== null) {
			courseLists.forEach((courseList) => {
				courseList.addEventListener('click', (event) => {
					toggleCourseDetails(event.target);
				});
			});
		}

		drawerButtons = document.querySelectorAll('.open-close-drawer-button');
		if (drawerButtons !== null) {
			drawerButtons.forEach((drawerButton) => {
				drawerButton.addEventListener('click', (event) => {
					toggleDrawer(event.target);
				});
			});
		}

		moreDetailsButtons = document.querySelectorAll('.course-container-intro-item-more button');
		if (moreDetailsButtons !== null) {
			moreDetailsButtons.forEach((moreDetailsButton) => {
				moreDetailsButton.addEventListener('click', (event) => {
					toggleContent(event.target);
				});
			});
		}

		lessDetailsButtons = document.querySelectorAll('.course-container-intro-item-less button');
		if (lessDetailsButtons !== null) {
			lessDetailsButtons.forEach((lessDetailsButton) => {
				lessDetailsButton.addEventListener('click', (event) => {
					toggleContent(event.target);
				});
			});
		}
	}

	// public api
	return {
		init: initiate,
		setHeaderTitle,
		setSelectedNavigation,
		renderHeaderWithImagesAccordingToSite
	};
})(RenderImageSlider, Images, Globals, Responsive, CourseSearch);
