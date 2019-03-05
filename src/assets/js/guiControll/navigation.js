// eslint-disable-next-line no-unused-vars
var Navigation = (function (RenderHeader, RenderImageSlider, Configuration) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';

	let hamburger;
	let mainNavi;
	let bKursDrawerButton;
	let fKursDrawerButton;
	let paddelReisenDrawerButton;

	function getNameOfCurrentSite() {
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


	function setIsSelectedOnNavigationLinks() {
		const allUrls = [];

		const kanuKurse = document.querySelector('li.main-navi-desktop__kanukurse a.u-slide-line');
		allUrls.push(kanuKurse);
		const paddelReisen = document.querySelector('li.main-navi-desktop__paddelreisen a.u-slide-line');
		allUrls.push(paddelReisen);
		const joyOfWhitewater = document.querySelector('li.main-navi-desktop__joyOfWhitewater a.u-slide-line');
		allUrls.push(joyOfWhitewater);

		allUrls.forEach((url) => {
			url.classList.remove(SELECTED);
		});

		const whereAmI = getNameOfCurrentSite();
		if (whereAmI === 'kanukurse') {
			kanuKurse.classList.add(SELECTED);
		} else if (whereAmI === 'paddelreisen') {
			paddelReisen.classList.add(SELECTED);
		} else {
			joyOfWhitewater.classList.add(SELECTED);
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


	function setSettingsDependingOnUrl() {
		const whereAmI = getNameOfCurrentSite();

		switch (whereAmI) {
			case 'kanukurse':
				setHeaderTitle('Kajak- und  <br> Kanadierkurse');
				RenderHeader.createImagesListForTheCarousel(Configuration.getImagesForKanukurse());
				break;

			case 'paddelreisen':
				setHeaderTitle('Abenteuer- und <br> Genusspaddelreisen');
				RenderHeader.createImagesListForTheCarousel(Configuration.getImagesForPaddelreisen());
				break;

			default: // Startseite
				setHeaderTitle('THE JOY <br>OF WHITEWATER');
				RenderHeader.createImagesListForTheCarousel(Configuration.getImagesForJoyOfWhitewater());
		}
	}


	function initiate() {
		setIsSelectedOnNavigationLinks();
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
	}

	// public api
	return {
		init: initiate
	};
})(RenderHeader, RenderImageSlider, Configuration);
