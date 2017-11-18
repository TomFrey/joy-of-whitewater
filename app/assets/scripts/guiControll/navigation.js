'use strict';


/*
 * You see we've specified the jQuery library as a dependency without specifying its correct path (we've just specified the name 'jquery').
 * This is because jQuery's AMD support is based on it being defined as a 'Named Module'.
 * So if you look at the script main.js (which is our bootstrapper file) you'll see we've set the require.config() to include the full path to jQuery.
 */

define(["jquery"], function ($) {

    // Notice that our dependancy modules(scripts) don't use the full path /Assets/Scripts/
    // This is because in our HTML page (where we loaded the RequireJS library) we had specified the main path already as a data- attribute on the script tag.
    // So RequireJS already knows that when we say 'Models/Person' we mean 'Assets/Scripts/Models/Person.js'

    console.log('frt: I called navigation.js');

    var hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', function(){
        var navi = document.getElementById('mainNavi');

        if(navi.style.display === 'block'){
            navi.style.display = 'none';
        } else {
            navi.style.display = 'block';
        }
    });




});