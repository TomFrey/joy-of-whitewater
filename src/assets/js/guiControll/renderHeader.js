// eslint-disable-next-line no-unused-vars
const RenderHeader = (function (Globals) {
	/**
	 * Kreiert ein li Element mit einem img darin, welches das Image Carousel verwendet.
	 * @param image
	 * @returns {HTMLLIElement}
	 */
	function createLiElementWithImageForTheCarousel(image) {
		const listElement = document.createElement('li');
		listElement.classList.add('image');

		const imgElement = document.createElement('img');
		imgElement.setAttribute('src', Globals.get().pathForImagesInTheCarousel + image.name + '.jpg');
		imgElement.setAttribute('title', image.title);
		imgElement.setAttribute('alt', image.alt);

		listElement.appendChild(imgElement);
		return listElement;
	}

	/**
	 * Fügt das erste li Element (mit dem Image) in das ul Element.
	 * Kein Carousel nur ein Bild, damit beim Laden der Seite das erste Bild sofort dargestellt wird.
	 * @param images
	 */
	function addJustFirstImage(images) {
		const ulElementWithImages = document.querySelector('.images-carousel ul.images');

		// delete all current images
		while (ulElementWithImages.firstChild) {
			ulElementWithImages.removeChild(ulElementWithImages.firstChild);
		}

		// add the last image which is the first to show
		//const liElement = createLiElementWithImageForTheCarousel(images[images.length-1]);
		const liElement = createLiElementWithImageForTheCarousel(images[0]);
		ulElementWithImages.appendChild(liElement);
	}

	/**
	 * Fügt alle li Elemente mit dem Image in das ul Element.
	 * @param images
	 */
	function createImagesListForTheCarousel(images) {
		const ulElementWithImages = document.querySelector('.images-carousel ul.images');

		// delete all current images
		while (ulElementWithImages.firstChild) {
			ulElementWithImages.removeChild(ulElementWithImages.firstChild);
		}

		// add the new images
		images.slice().reverse().forEach((image) => {
			const liElement = createLiElementWithImageForTheCarousel(image);
			ulElementWithImages.appendChild(liElement);
		});
	}

	/**
	 * 	<source srcset="assets/images/mobile_quer_karoline_costarica.jpg" media="(min-width: 440px)">
	 * <img src="assets/images/mobile_karoline_costarica.jpg"  alt="Kajak" title="Kajak">
	 * */
	function createPictureTagForMobileHeader(images) {
		const mobilePictureElement = document.querySelector('header .mobile-header-picture');

		// delete all current images
		while (mobilePictureElement.firstChild) {
			mobilePictureElement.removeChild(mobilePictureElement.firstChild);
		}

		// add the new images
		images.forEach((image, index) => {
			let element;
			if (index === 0) {
				element = document.createElement('source');
				element.setAttribute('srcset', '/assets/images/mobileHeader/' + image.name + '.jpg');
				element.setAttribute('media', '(min-width: 440px)');
			} else {
				element = document.createElement('img');
				element.setAttribute('src', '/assets/images/mobileHeader/' + image.name + '.jpg');
				element.setAttribute('alt', image.alt);
				element.setAttribute('title', image.title);
			}
			mobilePictureElement.appendChild(element);
		});
	}


	// public api
	return {
		createImagesListForTheCarousel,
		createPictureTagForMobileHeader,
		addJustFirstImage
	};
})(Globals);
