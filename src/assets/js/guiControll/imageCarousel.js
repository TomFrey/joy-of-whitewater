// eslint-disable-next-line no-unused-vars
var ImageCarousel = (function () {
	const simpleSlider = $('.images-carousel');
	const sliderWidth = simpleSlider.parent().width(); // width of header
	// const stageWidth = sliderWidth * 2; // space to slide away the top image


	// function regroupSlider()
	// put top image to the bottom of the image stack
	function regroupSlider() {
		// clone image and put it at the bottom of the images
		$('.topImage').clone().css('left', '0px').css('position', 'absolute')
			.removeClass('topImage')
			.prependTo('ul.images');

		// delete moved image
		$('.topImage').remove();

		// add .topImage class to the new top image
		simpleSlider.find('li.image').last().addClass('topImage').css('position', 'relative');
	}


	// function slide()
	// slide the top image to the right
	// eslint-disable-next-line no-unused-vars
	function slide() {
		simpleSlider.find('li.image.topImage').animate(
			{
				left: '+=' + sliderWidth + ''
			},
			1200,
			() => { regroupSlider(); }
		);
	}


	// function regroupCrossFade()
	// put top image to the bottom of the image stack
	function regroupCrossFade() {
		// clone image and put it at the bottom of the images
		const clone = $('.topImage').clone();
		clone.css('position', 'absolute').removeClass('topImage').prependTo('ul.images');
		clone.find('img').css('opacity', '100');

		// delete moved image
		$('.topImage').remove();

		// add .topImage class to the new top image
		simpleSlider.find('li.image').last().addClass('topImage').css('position', 'relative');
	}


	// function crossfade()
	// fade out the top image
	function crossFade() {
		simpleSlider.find('li.image.topImage img')
			.animate({
				opacity: 0
			},
			2500,
			() => { regroupCrossFade(); });
	}


	function initiate() {
		// give every image the width of it's parent
		// die nächste Zeile wird nur für den Slider benötigt, nicht für crossFade
		// simpleSlider.find('li.image').width(sliderWidth);

		// let the images float over each other, hide everything out of the webside width
		simpleSlider.css('overflow', 'hidden');
		// die nächste Zeile wird nur für den Slider benötigt, nicht für crossFade
		// simpleSlider.find('ul.images').css('width', '' + stageWidth + '');
		simpleSlider.find('li.image').css('float', 'left').css('position', 'absolute');

		// add class topImage to the first image in the stack
		// give it position relative (at least one image needs relative that their is space)
		simpleSlider.find('li.image').last().addClass('topImage').css('position', 'relative');

		// move all 5s to the next image
		// call slide or crossFade to slide or crossfade it
		setInterval(crossFade, 5000);
	}


	// public api
	return {
		init: initiate
	};
})();
