// eslint-disable-next-line no-unused-vars
var RenderImageSlider = (function () {
	/**
	 * Kreiert folgenes HTML Element:
	 * 	<div class="image-slider--item">
	 *		<picture>
	 *			<source srcset="/assets/images/Bildergalerie_DT_eins.jpg" media="(min-width: 740px)">
	 *			<img class="slider--item__img" src="/assets/images/Bildergalerie_MP_eins.jpg" alt="Festival Lovers" title="Festival Lovers">
	 *		</picture>
	 *	</div>
	 * @param image
	 * @returns {HTMLDIVElement}
	 */
	function createImageSliderItem(image) {
		const imageSliderItemElement = document.createElement('div');
		imageSliderItemElement.classList.add('image-slider--item');

		const pictureElement = document.createElement('picture');

		const sourceElement = document.createElement('source');
		sourceElement.setAttribute('srcset', '/assets/images/slider/' + image.name + '.jpg');
		sourceElement.setAttribute('media', '(min-width: 740px)');

		const imgElement = document.createElement('img');
		imgElement.setAttribute('src', '/assets/images/slider/' + image.nameMobile + '.jpg');
		imgElement.setAttribute('title', image.title);
		imgElement.setAttribute('alt', image.alt);

		pictureElement.appendChild(sourceElement);
		pictureElement.appendChild(imgElement);
		imageSliderItemElement.appendChild(pictureElement);
		return imageSliderItemElement;
	}

	function deleteAllImagesFromSliderItems(imageSlider) {
		// delete all current images
		while (imageSlider.firstChild) {
			imageSlider.removeChild(imageSlider.firstChild);
		}
	}

	/**
	 * Fügt alle 'image-slider--item' Elemente in das 'image-slider' Element.
	 * @param images
	 */
	function createImageItemsForTheImageSlider(images) {
		const imageSlider = document.querySelector('.image-slider');
		deleteAllImagesFromSliderItems(imageSlider);

		// add the new images
		images.forEach((image) => {
			const imageSliderItem = createImageSliderItem(image);
			imageSlider.appendChild(imageSliderItem);
		});
	}

	// public api
	return {
		createImageItemsForTheImageSlider,
		deleteAllImagesFromSliderItems
	};
})();
