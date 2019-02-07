// eslint-disable-next-line no-unused-vars
var Navigation = (function (RenderHeader) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';

	let hamburger;
	let mainNavi;
	let bKursDrawerButton;
	let fKursDrawerButton;

	const theJoyOfWhiteWaterImages = [
		{ name: 'caousel_gr_1', title: 'kanukurs', alt: 'kanukurs' },
		{ name: 'caousel_gr_2', title: 'kanukurs', alt: 'kanukurs' },
		{ name: 'caousel_gr_4', title: 'kanukurs', alt: 'kanukurs' }
	];
	const kanukurseImages = [
		{ name: 'caousel_gr_1', title: 'kanukurs', alt: 'kanukurs' },
		{ name: 'caousel_gr_2', title: 'kanukurs', alt: 'kanukurs' },
		{ name: 'caousel_gr_4', title: 'kanukurs', alt: 'kanukurs' }
	];
	const paddelreisenImages = [
		{ name: 'caousel_gr_1', title: 'Paddelreisen', alt: 'Paddelreisen' },
		{ name: 'caousel_gr_2', title: 'Paddelreisen', alt: 'Paddelreisen' },
		{ name: 'caousel_gr_4', title: 'Paddelreisen', alt: 'Paddelreisen' }
	];

	
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


	function setSettingsDependingOnUrl() {
		const whereAmI = getNameOfCurrentSite();

		switch (whereAmI) {
			case 'kanukurse':
				setHeaderTitle('Kajak- und  <br> Kanadierkurse');
				RenderHeader.createImagesListForTheCarousel(kanukurseImages);
				break;

			case 'paddelreisen':
				setHeaderTitle('Abenteuer- und <br> Genusspaddelreisen');
				RenderHeader.createImagesListForTheCarousel(paddelreisenImages);
				break;

			default: // Startseite
				setHeaderTitle('THE JOY <br>OF WHITEWATER');
				RenderHeader.createImagesListForTheCarousel(theJoyOfWhiteWaterImages);
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
	}

	// public api
	return {
		init: initiate
	};
})(RenderHeader);
