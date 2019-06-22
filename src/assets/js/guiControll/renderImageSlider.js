// eslint-disable-next-line no-unused-vars
var RenderImageSlider = (function (Globals) {
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
		const breakPointLarge = Globals.get().breakpointLarge;

		const imageSliderItemElement = document.createElement('div');
		imageSliderItemElement.classList.add('image-slider--item');

		const pictureElement = document.createElement('picture');

		const sourceElement = document.createElement('source');
		sourceElement.setAttribute('srcset', '/assets/images/slider/' + image.name + '.jpg');
		sourceElement.setAttribute('media', '(min-width: ' + breakPointLarge + 'px)');

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
	 *
	 * @param images
	 * @returns {Promise<any>}
	 */
	function createImageItemsForTheImageSlider(images) {
		const promise = new Promise((resolve, reject) => {
			const imageSlider = document.querySelector('.image-slider');
			if (imageSlider !== null) {
				deleteAllImagesFromSliderItems(imageSlider);

				// add the new images
				images.forEach((image) => {
					const imageSliderItem = createImageSliderItem(image);
					imageSlider.appendChild(imageSliderItem);
				});
				resolve(imageSlider);
			} else {
				const error = new Error('class .image-slider does not exist');
				reject(error);
			}
		});
		return promise;
	}

	// public api
	return {
		createImageItemsForTheImageSlider,
		deleteAllImagesFromSliderItems
	};
})(Globals);
