// eslint-disable-next-line no-unused-vars
var RenderHeader = (function () {
	/**
	 * Kreiert ein li Element mit einem img darin, welches das Image Carousel verwendet.
	 * @param image
	 * @returns {HTMLLIElement}
	 */
	function createLiElementWithImageForTheCarousel(image) {
		const listElement = document.createElement('li');
		listElement.classList.add('image');

		const imgElement = document.createElement('img');
		imgElement.setAttribute('src', '/assets/images/carousel/' + image.name + '.jpg');
		imgElement.setAttribute('title', image.title);
		imgElement.setAttribute('alt', image.alt);

		listElement.appendChild(imgElement);
		return listElement;
	}

	/**
	 * Fügt all li Elemente in das ul Element.
	 * @param images
	 */
	function createImagesListForTheCarousel(images) {
		const ulElementWithImages = document.querySelector('.images-carousel ul.images');

		// delete all current images
		while (ulElementWithImages.firstChild) {
			ulElementWithImages.removeChild(ulElementWithImages.firstChild);
		}

		// add the new images
		images.forEach((image) => {
			const liElement = createLiElementWithImageForTheCarousel(image);
			ulElementWithImages.appendChild(liElement);
		});
	}


	// public api
	return {
		createImagesListForTheCarousel
	};
})();
