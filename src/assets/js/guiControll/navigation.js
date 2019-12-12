// eslint-disable-next-line no-unused-vars
var Navigation = (function (RenderHeader, RenderImageSlider, Configuration, Preloader) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';

	let hamburger;
	let mainNavi;
	let bKursDrawerButton;
	let fKursDrawerButton;
	let paddelReisenDrawerButton;
	let drawerButtons;
	let courseLists;

	function getNameOfCurrentSite() {
		// console.log('path: '+ location.pathname);
		return location.pathname.split('/')[1].split('.')[0];
	}


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
				RenderImageSlider.createImageItemsForTheImageSlider(Configuration.getImagesForKorsika())
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
		// const drawerButtonIcon = event.lastElementChild;

		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
			// drawerButtonIcon.classList.remove(SHOW);
		} else {
			drawer.classList.add(SHOW);
			// drawerButtonIcon.classList.add(SHOW);
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
		const whereAmI = getNameOfCurrentSite();
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
				RenderHeader.createPictureTagForMobileHeader(Configuration.getMobileImagesForKanukurse());
				setHeaderTitle('Kajak- und  <br> Kanadierkurse');
				RenderHeader.createImagesListForTheCarousel(Configuration.getImagesForKanukurse());
				kanuKurse.classList.add(SELECTED);
				break;

			case 'paddelreisen':
				RenderHeader.createPictureTagForMobileHeader(Configuration.getMobileImagesForPaddelreisen());
				setHeaderTitle('Abenteuer- und <br> Genusspaddelreisen');
				RenderHeader.createImagesListForTheCarousel(Configuration.getImagesForPaddelreisen());
				paddelReisen.classList.add(SELECTED);
				break;

			case '': // Startseite
				RenderHeader.createPictureTagForMobileHeader(Configuration.getMobileImagesForJoyOfWhitewater());
				setHeaderTitle('THE JOY <br>OF WHITEWATER');
				Preloader.loadImagesForHeaderCarousel().then(() => {
					RenderHeader.createImagesListForTheCarousel(Configuration.getImagesForJoyOfWhitewater());
				});
				joyOfWhitewater.classList.add(SELECTED);
				break;

			default: // alle Seiten ohne Header, wie Anmeldung, Impressum, AGB ...
		}
	}


	function initiate() {
		const promise = new Promise((resolve) => {
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
			resolve();
		});
		return promise;
	}

	// public api
	return {
		init: initiate
	};
})(RenderHeader, RenderImageSlider, Configuration, Preloader);
