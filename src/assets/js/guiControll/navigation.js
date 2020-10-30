// eslint-disable-next-line no-unused-vars
const Navigation = (function (RenderHeader, RenderImageSlider, Images, Globals, Preloader) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';

	let hamburger;
	let mainNavi;
	let bKursDrawerButton;
	let fKursDrawerButton;
	let eskimotierenDrawerButton;
	let paddelReisenDrawerButton;
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


	function togglePaddelReisenDrawer(event) {
		const drawer = event.parentElement.parentElement.lastElementChild;
		const drawerButtonIcon = event.lastElementChild;

		// Detaildrawer schliessen
		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
			drawerButtonIcon.classList.remove(SHOW);

			// Imageslider löschen
			const imageSlider = document.querySelector('.image-slider');
			if (imageSlider !== null) {
				imageSlider.classList.remove('slick-initialized');
				imageSlider.classList.remove('slick-slider');
				imageSlider.classList.remove('slick-dotted');

				RenderImageSlider.deleteAllImagesFromSliderItems(imageSlider);
			}

		// Deteildrawer öffnen
		} else {
			drawer.classList.add(SHOW);
			drawerButtonIcon.classList.add(SHOW);

			// Abfragen, welcher Drawer (Korsika, Soca...) geöffnet wurde.
			if (event.firstElementChild.innerHTML === 'Details zu Korsika') {
				const path = Globals.get().pathForImagesInTheSlider + 'korsika/';
				RenderImageSlider.createImageItemsForTheImageSlider(Images.getImagesForKorsika(), path)
					.then(() => {
						ImageSlider.init();
					})
					.catch((error) => {
						console.log(error);
					});
			}
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

		allLinksFromMainNavigation.forEach((url) => {
			url.classList.remove(SELECTED);
		});

		switch (whereAmI) {
			case 'kanukurse':
				RenderHeader.createPictureTagForMobileHeader(Images.getMobileImagesForKanukurse());
				setHeaderTitle('Kajak- und  <br> Kanadierkurse');
				RenderHeader.createImagesListForTheCarousel(Images.getImagesForKanukurse());
				kanuKurse.classList.add(SELECTED);
				break;

			case 'paddelreisen':
				RenderHeader.createPictureTagForMobileHeader(Images.getMobileImagesForPaddelreisen());
				setHeaderTitle('Abenteuer- und <br> Genusspaddelreisen');
				RenderHeader.createImagesListForTheCarousel(Images.getImagesForPaddelreisen());
				paddelReisen.classList.add(SELECTED);
				break;

			case '': // Startseite
				RenderHeader.createPictureTagForMobileHeader(Images.getMobileImagesForJoyOfWhitewater());
				setHeaderTitle('THE JOY <br>OF WHITEWATER');
				RenderHeader.createImagesListForTheCarousel(Images.getImagesForJoyOfWhitewater());
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

		bKursDrawerButton = document.querySelector('#open-close-drawer-button-bkurse');
		if (bKursDrawerButton !== null) {
			bKursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		fKursDrawerButton = document.querySelector('#open-close-drawer-button-fkurse');
		if (fKursDrawerButton !== null) {
			fKursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		eskimotierenDrawerButton = document.querySelector('#open-close-drawer-button-eskimotieren');
		if (eskimotierenDrawerButton !== null) {
			eskimotierenDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		paddelReisenDrawerButton = document.querySelector('.open-close-drawer-button-paddelreisen');
		if (paddelReisenDrawerButton !== null) {
			paddelReisenDrawerButton.addEventListener('click', (event) => {
				togglePaddelReisenDrawer(event.target);
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
})(RenderHeader, RenderImageSlider, Images, Globals, Preloader);
