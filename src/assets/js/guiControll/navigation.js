// eslint-disable-next-line no-unused-vars
const Navigation = (function (RenderImageSlider, Images, Globals, Responsive, CourseSearch) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';
	const SELECTED = 'js-isSelected';
	//const whereAmI = Globals.get().nameOfCurrentSite;

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
	let rettungsKursDrawerButton;
	let kajakRetreatDrawerButton;

	let paddelReisenDrawerButtons;
	let packraftKursDrawerButton;
	let courseSearchDrawerButton;
	let drawerButtons;
	let courseLists;
	let courseOverviewDrawerButtons;
	let moreAndLessDetailsButtons;
	let faqButtons;


	function setHeaderTitle() {
		let titleH1 = document.createElement('span');
		titleH1.classList.add('siteTitle');
		const titleContainer = document.querySelector('.images-carousel .containerForTitle');
		titleH1.innerHTML = this.headerTitle;
		titleContainer.appendChild(titleH1);
	}


	function setSelectedNavigation() {
		const allLinksFromMainNavigation = {
			courses: document.querySelector('li.main-navi-desktop__kanukurse a.u-slide-line'),
			journies: document.querySelector('li.main-navi-desktop__paddelreisen a.u-slide-line'),
			trips: document.querySelector('li.main-navi-desktop__packraft a.u-slide-line'),
			home: document.querySelector('li.main-navi-desktop__joyOfWhitewater a.u-slide-line')
		};

		Object.entries(allLinksFromMainNavigation).forEach(([key, value]) => {
			value.classList.remove(SELECTED);
		});
		
		if (typeof this.selectedNavigation !== 'undefined'){
			allLinksFromMainNavigation[this.selectedNavigation].classList.add(SELECTED);
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
				case 'Details Wildnisreise':
					sliderName = 'yukon';
				break;
				case 'Details zur Chile Reise':
					sliderName = 'chile';
				break;
				case 'Details zum Inn':
					sliderName = 'engadin';
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


	function toggleMoreLessContent(event) {
		const parentContainer = event.parentElement.parentElement;
		
		function getMoreButton(){
			for (const child of parentContainer.children) {
				if (child.classList.contains('show-more-less-container-more-button') || 
				    child.classList.contains('course-container-intro-item-more')){
					return child;
				};
			}
		}

		function getLessButton(){
			for (const child of parentContainer.children) {
				if (child.classList.contains('show-more-less-container-less-button') || 
				    child.classList.contains('course-container-intro-item-less')){
					return child;
				};
			}
		}

		function toggleMoreButton(parentOfMoreButton){
			parentOfMoreButton.classList.toggle(HIDE);
		}
	
		function togglePaddle(){
			for (const child of parentContainer.children) {
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

		function toggleMoreButtonIcon(){
			let moreButtonWrapper = getMoreButton();
			moreButtonWrapper.firstElementChild.lastElementChild.classList.toggle(SHOW);
		}

		function toggleLessButtonIcon(){
			let lessButtonWrapper = getLessButton();
			lessButtonWrapper.firstElementChild.lastElementChild.classList.toggle(SHOW);
		}

		togglePaddle();
		toggleMoreButtonIcon();
		toggleLessButtonIcon();
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

		eskimotierenDrawerButton = document.querySelector('#open-close-drawer-button-rollCourse');
		if (eskimotierenDrawerButton !== null) {
			eskimotierenDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		rettungsKursDrawerButton = document.querySelector('#open-close-drawer-button-saftyCourse');
		if (rettungsKursDrawerButton !== null) {
			rettungsKursDrawerButton.addEventListener('click', (event) => {
				toggleTextContainerDrawer(event.target);
			});
		}

		kajakRetreatDrawerButton = document.querySelector('#open-close-drawer-button-kayakRetreat');
		if (kajakRetreatDrawerButton !== null) {
			kajakRetreatDrawerButton.addEventListener('click', (event) => {
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

		faqButtons = document.querySelectorAll('.open-close-faq-button');
		if (faqButtons !== null) {
			faqButtons.forEach((faqButton) => {
				faqButton.addEventListener('click', (event) => {
					toggleDrawer(event.target);
				});
			});
		}

		moreAndLessDetailsButtons = document.querySelectorAll('.show-more-less-container-more-button button, .show-more-less-container-less-button button, .course-container-intro-item-more button, .course-container-intro-item-less button');
		if (moreAndLessDetailsButtons !== null) {
			moreAndLessDetailsButtons.forEach((moreLessDetailsButton) => {
				moreLessDetailsButton.addEventListener('click', (event) => {
					toggleMoreLessContent(event.target);
				});
			});
		}
	}

	// public api
	return {
		init: initiate,
		setHeaderTitle,
		setSelectedNavigation,
	};
})(RenderImageSlider, Images, Globals, Responsive, CourseSearch);
