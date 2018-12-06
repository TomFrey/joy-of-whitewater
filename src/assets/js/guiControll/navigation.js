'use strict';

var Navigation = (function(){
    console.log('inside Navigation IIFE');

    const SHOW = 'js-show';
    const CLOSE_NAV = 'js-close-nav-button';

    var hamburger,
        mainNavi,
        basisKursDrawerButton;

    function showHideNavigation() {
        if(mainNavi.classList.contains('hide')){
            mainNavi.classList.remove('hide');
            hamburger.classList.add(CLOSE_NAV);
        } else {
            mainNavi.classList.add('hide');
            hamburger.classList.remove(CLOSE_NAV);
        }
    }


    function toggleTextContainerDrawer() {
        const basisKursDrawer = basisKursDrawerButton.parentElement.parentElement.lastElementChild;
        const basisKursButtonIcon = basisKursDrawerButton.lastElementChild;

        if(basisKursDrawer.classList.contains(SHOW)){
            basisKursDrawer.classList.remove(SHOW);
            basisKursButtonIcon.classList.remove(SHOW);
        } else {
            basisKursDrawer.classList.add(SHOW);
            basisKursButtonIcon.classList.add(SHOW);
        }
    }


    function init(){
        hamburger = document.getElementById('hamburger');
        mainNavi = document.getElementById('mainNavi');
        hamburger.addEventListener('click', showHideNavigation);

        basisKursDrawerButton = document.querySelector('#open-close-drawer-button-basiskurse');
        if (basisKursDrawerButton !== null) {
            basisKursDrawerButton.addEventListener('click', toggleTextContainerDrawer)
        }
    }

    //public api
    return {
        init: init
    };
})();













