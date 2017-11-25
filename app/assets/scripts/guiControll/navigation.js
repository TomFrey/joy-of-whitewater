'use strict';

var Navigation = (function(){
    console.log('inside Navigation IIFE');

    var hamburger,
        mainNavi;

    function showHideNavigation() {
        if(/*mainNavi.style.display === 'block'*/mainNavi.classList.contains('hide')){
            //mainNavi.style.display = 'none';
            mainNavi.classList.remove('hide')
        } else {
            //mainNavi.style.display = 'block';
            mainNavi.classList.add('hide');
        }
    }

    function init(){
        hamburger = document.getElementById('hamburger');
        mainNavi = document.getElementById('mainNavi');

        hamburger.addEventListener('click', showHideNavigation);

      /*  window.onresize = function() {
            if(window.innerWidth >= 740) {
                mainNavi.style.display = '';
            }
        }; */
    }

    //public api
    return {
        init: init
    };
})();













