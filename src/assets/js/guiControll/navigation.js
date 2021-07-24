// eslint-disable-next-line no-unused-vars
const Navigation = (function (RenderImageSlider, Images, Globals, Responsive) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';

	let hamburger;
	let mainNavi;
	let bKursDrawerButton;
	let fKursDrawerButton;
	let kKursDrawerButton;
	let eskimotierenDrawerButton;
	let paddelReisenDrawerButtons;
	let packraftKursDrawerButton;
	let drawerButtons;
	let courseLists;


	function setHeaderTitle(titleContent) {
		const title = document.querySelector('.images-carousel .containerForTitle h1');
		title.innerHTML = titleContent;
	}


	function showHideNavigation() {
		if (mainNavi.classList.contains(HIDE)) {
			mainNavi.classList.remove(HIDE);
			hamburger.classList.add(CLOSE_NAV);
		} else {
			mainNavi.classList.add(HIDE);
			hamburger.classList.remove(CLOSE_NAV);
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


	function setSettingsDependingOnUrl() {
		const whereAmI = Globals.get().nameOfCurrentSite;
		const allLinksFromMainNavigation = [];

		const kanuKurse = document.querySelector('li.main-navi-desktop__kanukurse a.u-slide-line');
		allLinksFromMainNavigation.push(kanuKurse);
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
			case 'kanukurse':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForKanukurse(), Images.getMobileImagesForKanukurse());
				setHeaderTitle('Kanukurse');
				kanuKurse.classList.add(SELECTED);
				break;

			case 'paddelreisen':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForPaddelreisen(), Images.getMobileImagesForPaddelreisen());
				setHeaderTitle('Paddelreisen');
				paddelReisen.classList.add(SELECTED);
				break;

			case 'packraft':
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForPackraft(), Images.getMobileImagesForPackraft());
				setHeaderTitle('Packraft');
				packraft.classList.add(SELECTED);
				break;

			case '': // Startseite
				Responsive.renderHeaderWithImagesAccordingToBreakPoint(Images.getImagesForJoyOfWhitewater(), Images.getMobileImagesForJoyOfWhitewater());
				setHeaderTitle('<strong>Kanuschule</strong><br> JOY OF WHITEWATER');
				joyOfWhitewater.classList.add(SELECTED);
				break;

			default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
		}
	}


	function initiate() {
		setSettingsDependingOnUrl();

		hamburger = document.getElementById('hamburger');
		hamburger.addEventListener('click', showHideNavigation);
		mainNavi = document.querySelector('.main-navi-desktop');

		//Basiskurse anzeigen Button
		bKursDrawerButton = document.querySelector('#open-close-drawer-button-bkurse');
		if (bKursDrawerButton !== null) {
			bKursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		//Aufbaukurse anzeigen Button
		fKursDrawerButton = document.querySelector('#open-close-drawer-button-fkurse');
		if (fKursDrawerButton !== null) {
			fKursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		//Wildwasser III-IV anzeigen Button
		kKursDrawerButton = document.querySelector('#open-close-drawer-button-kkurse');
		if (kKursDrawerButton !== null) {
			kKursDrawerButton.addEventListener('click', (event) => {
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
	}

	// public api
	return {
		init: initiate
	};
})(RenderImageSlider, Images, Globals, Responsive);
