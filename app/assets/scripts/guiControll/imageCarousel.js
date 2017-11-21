'use strict';

define(["jquery"], function ($) {

    $(document).ready(function() {
        var simpleSlider = $('.images-carousel'),
            sliderWidth = simpleSlider.parent().width(),  //width of header
            stageWidth = sliderWidth * 2,                 //space to slide away the top image
            setIntervalId;

        //give every image the width of it's parent
        simpleSlider.find( 'li.image' ).width(sliderWidth);

        //let the images float over each other, hide everything out of the webside width
        simpleSlider.css( 'overflow','hidden' );
        simpleSlider.find( 'ul.images' ).css( 'width', '' + stageWidth + '' );
        simpleSlider.find( 'li.image' ).css( 'float','left' ).css('position','absolute');

        //add class topImage to the first image in the stack
        //give it position relative (at least one image needs relative that their is space)
        simpleSlider.find( 'li.image' ).last().addClass('topImage').css('position','relative');


        // function slide()
        //slide the top image to the right
        function slide(){
            console.log('slide()');

            simpleSlider.find( 'li.image.topImage' ).animate(
                {
                    left: '+=' + sliderWidth + ''
                }, 1200
                 , function(){
                    regroupSlider();
                });

        };

        // function regroupSlider()
        //put top image to the bottom of the image stack
        function regroupSlider(){
            //clone image and put it at the bottom of the images
            $('.topImage').clone().css('left','0px').css('position','absolute').removeClass('topImage').prependTo('ul.images');

            //delete moved image
            $('.topImage').remove();

            //add .topImage class to the new top image
            simpleSlider.find( 'li.image' ).last().addClass('topImage').css('position','relative');
        };
    

        // function crossfade()
        //fade out the top image
        function crossfade(){
            console.log('crossfade()');

            simpleSlider.find( 'li.image.topImage img' ).animate(
                {
                    opacity: 0
                }, 2500
                , function(){
                    regroupCrossfade();
                });

        };

        // function regroupCrossfade()
        //put top image to the bottom of the image stack
        function regroupCrossfade(){
            //clone image and put it at the bottom of the images
            var clone = $('.topImage').clone();
            clone.css('position','absolute').removeClass('topImage').prependTo('ul.images');
            clone.find('img').css('opacity','100');

            //delete moved image
            $('.topImage').remove();

            //add .topImage class to the new top image
            simpleSlider.find( 'li.image' ).last().addClass('topImage').css('position','relative');
        };

        //move all 5s to the next image when on desktop
        //call slide or crossfade to slide or crossfade it
        if ($(document).width() > 740){
            setIntervalId = setInterval(crossfade, 5000);
        }
    });

});