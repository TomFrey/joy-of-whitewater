'use strict';

var Navigation = (function(){
    console.log('inside Navigation IIFE');


    function init(){
        var hamburger = document.getElementById('hamburger');

        hamburger.addEventListener('click', function(){
            var navi = document.getElementById('mainNavi');

            if(navi.style.display === 'block'){
                navi.style.display = 'none';
            } else {
                navi.style.display = 'block';
            }
        });
    }

    //public api
    return {
        init: init
    };

})();













