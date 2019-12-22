/*
	Code übernommen und angepasst von Norman van der Mull
	https://codepen.io/norman_pixelkings/pen/qNGBAB

	Baut auf dem Slick Slider von Ken Wheeler auf. Benötigt die Dateien slick.js, TweenMax.js und jquery.js.
*/
// eslint-disable-next-line no-unused-vars
const ImageSlider = (function (Globals) {
	const breakPointLarge = Globals.get().breakpointLarge;
	const $slider = $('.image-slider');
	const slideDuration = 900;

	const screenIsAtDesktopSize = window.matchMedia('(min-width: ' + breakPointLarge + 'px)');

	function init() {
		// RESET ANIMATIONS
		// On init slide change
		$slider.on('init', () => {
			TweenMax.to($('.slick-track'), 0.9, {
				marginLeft: 0
			});
			TweenMax.to($('.slick-active'), 0.9, {
				x: 0,
				zIndex: 2
			});
		});

		// On before slide change
		$slider.on('beforeChange', () => {
			TweenMax.to($('.slick-track'), 0.9, {
				marginLeft: 0
			});
			TweenMax.to($('.slick-active'), 0.9, {
				x: 0
			});
		});

		// On after slide change
		$slider.on('afterChange', () => {
			TweenMax.to($('.slick-track'), 0.9, {
				marginLeft: 0
			});
			$('.slick-slide').css('z-index', '1');
			TweenMax.to($('.slick-active'), 0.9, {
				x: 0,
				zIndex: 2
			});
		});

		// SLICK INIT
		$slider.slick({
			speed: slideDuration,
			dots: true,
			waitForAnimate: true,
			useTransform: true,
			cssEase: 'cubic-bezier(0.455, 0.030, 0.130, 1.000)',

			responsive: [{
				breakpoint: 740,
				settings: {
					// arrows: false
				}
			}]
		});

		// PREV
		$('.slick-prev').on('mouseenter', () => {
			TweenMax.to($('.slick-track'), 0.6, {
				marginLeft: '140px',
				ease: Quad.easeOut
			});
			TweenMax.to($('.slick-current'), 0.6, {
				x: -100,
				ease: Quad.easeOut
			});
		});

		$('.slick-prev').on('mouseleave', () => {
			TweenMax.to($('.slick-track'), 0.4, {
				marginLeft: 0,
				ease: Sine.easeInOut
			});
			TweenMax.to($('.slick-current'), 0.4, {
				x: 0,
				ease: Sine.easeInOut
			});
		});

		// NEXT
		$('.slick-next').on('mouseenter', () => {
			TweenMax.to($('.slick-track'), 0.6, {
				marginLeft: '-140px',
				ease: Quad.easeOut
			});
			TweenMax.to($('.slick-current'), 0.6, {
				x: 100,
				ease: Quad.easeOut
			});
		});

		$('.slick-next').on('mouseleave', () => {
			TweenMax.to($('.slick-track'), 0.4, {
				marginLeft: 0,
				ease: Quad.easeInOut
			});
			TweenMax.to($('.slick-current'), 0.4, {
				x: 0,
				ease: Quad.easeInOut
			});
		});

		if (screenIsAtDesktopSize.matches) {
			// In den Fullscreen Modus umschalten, bei einem Klick auf das Bild. Resp. den Fullscreen Modus ausschalten
			// bei einem weiteren Klick.
			$('.slick-slider').on('click', '.slick-slide', (elem) => {
				const image = elem.target;

				// Standard
				if (image.requestFullscreen) {
					if (!document.requestFullscreen) {
						image.classList.add('fullscreen');
						image.requestFullscreen();
					} else {
						document.exitFullscreen();
						image.classList.remove('fullscreen');
					}
					// IE 11 (keine Anforderung)
				} else if (image.msRequestFullscreen) {
					if (!document.msRequestFullscreen) {
						image.classList.add('fullscreen');
						image.msRequestFullscreen();
					} else {
						document.msExitFullscreen();
						image.classList.remove('fullscreen');
					}

					// Firefox
				} else if (image.mozRequestFullScreen) {
					if (!document.mozRequestFullScreen) {
						image.classList.add('fullscreen');
						image.mozRequestFullScreen();
					} else {
						document.mozCancelFullScreen();
						image.classList.remove('fullscreen');
					}

					// Chrome, Edge, Safari
				} else if (image.webkitRequestFullscreen) {
					if (!document.webkitFullscreenElement) {
						image.classList.add('fullscreen');
						image.webkitRequestFullscreen();
					} else {
						document.webkitExitFullscreen();
						image.classList.remove('fullscreen');
					}
				}
			});
		}
	}

	// public api
	return {
		init
	};
})(Globals);
