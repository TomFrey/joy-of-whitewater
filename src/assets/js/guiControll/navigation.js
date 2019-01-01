// eslint-disable-next-line no-unused-vars
var Navigation = (function () {
	const SHOW = 'js-show';
	const CLOSE_NAV = 'js-close-nav-button';

	let hamburger;
	let mainNavi;
	let bKursDrawerButton;
	let fKursDrawerButton;

	function showHideNavigation() {
		if (mainNavi.classList.contains('hide')) {
			mainNavi.classList.remove('hide');
			hamburger.classList.add(CLOSE_NAV);
		} else {
			mainNavi.classList.add('hide');
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


	function initiate() {
		hamburger = document.getElementById('hamburger');
		mainNavi = document.getElementById('mainNavi');
		hamburger.addEventListener('click', showHideNavigation);

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
})();
