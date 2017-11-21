'use strict';

var Navigation = (function(){
    console.log('inside Navigation IIFE');

    var hamburger,
        mainNavi;

    function showHideNavigation() {
        if(mainNavi.style.display === 'block'){
            mainNavi.style.display = 'none';
        } else {
            mainNavi.style.display = 'block';
        }
    }

    function init(){
        hamburger = document.getElementById('hamburger');
        mainNavi = document.getElementById('mainNavi');

        hamburger.addEventListener('click', showHideNavigation);
    }

    //public api
    return {
        init: init
    };
})();













