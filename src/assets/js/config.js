// eslint-disable-next-line no-unused-vars
var Configuration = (function () {
	// Die Bilder, die im Header automatisch alle paar Sekunden wechseln.
	// Die Bilder müssen unter /assets/images/carousel/*.jpg liegen
	const imageCarousel = {
		theJoyOfWhiteWaterImages: [
			{ name: 'joyOfWhitewater_2', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_6', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_4', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_5', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_1', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_7', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'kanukurse_2', title: 'Eskimotieren', alt: 'Kanuschule' },
			{ name: 'kanukurse_6', title: 'Kajakkurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_3', title: 'Kajakkurs', alt: 'Kanuschule' },
			{ name: 'kanukurse_7', title: 'Kajakkurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_4', title: 'Kanukurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_1', title: 'Open Canoe Kurse', alt: 'Kanuschule' },
		],
		paddelreisenImages: [
			{ name: 'paddelreisen_11', title: 'Witecombe, New Zealand', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_1', title: 'Sesia, Piemont', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2', title: 'Paddelreise in Georgien', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_5', title: 'Taravo, Korsika', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_4', title: 'Open Canoe in Costa Rica', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_9', title: 'Jungle Ecuador', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_3', title: 'Open Canoe in Costa Rica', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_8', title: 'Quichos, Ecuador', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_7', title: 'Transportmittel in Chile', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_10', title: 'Tavignano, Korsika', alt: 'Paddelreisen' }
		]
	};

	// Die Bilder, die in der Mobile Version im Header erscheinen.
	// Jeweils nur ein Bild, aber in der Hoch- und Querversion.
	// Die Bilder müssen unter /assets/images/mobileHeader/*.jpg liegen
	const mobileImages = {
		theJoyOfWhiteWaterImages: [
			{ name: 'mobile_quer_karoline_costarica', title: 'The Joy Of Whitewater', alt: 'The Joy Of Whitewater' },
			{ name: 'mobile_karoline_costarica', title: 'The Joy Of Whitewater', alt: 'The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'mobile_quer_kanukurse_costarica', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'mobile_kanukurse_costarica', title: 'Kanukurs', alt: 'Kanukurs' }
		],
		paddelreisenImages: [
			{ name: 'mobile_quer_paddelreisen_costarica', title: 'Paddelreisen', alt: 'Paddelreisen' },
			{ name: 'mobile_paddelreisen_costarica', title: 'Paddelreisen', alt: 'Paddelreisen' }
		]
	};

	// Die Bilder, die der Benutzer wechseln kann. Z.B. bei den verschiedenen Paddelreisen unter den Details.
	const imageSlider = {
		korsika: [
			{
				name: 'korsika_11_gr', nameMobile: 'korsika_11_kl', title: 'Herrliche Flusslandschaft am Taravo', alt: 'Herrliche Flusslandschaft am Taravo'
			},
			{
				name: 'korsika_10_gr', nameMobile: 'korsika_10_kl', title: 'Travo im Open Canoe', alt: 'Travo im Open Canoe'
			},
			{
				name: 'korsika_9_gr', nameMobile: 'korsika_9_kl', title: 'Fast schon Wildschweine', alt: 'Fast schon Wildschweine'
			},
			{
				name: 'korsika_8_gr', nameMobile: 'korsika_8_kl', title: 'Travo im Kajak', alt: 'Travo im Kajak'
			},
			{
				name: 'korsika_7_gr', nameMobile: 'korsika_7_kl', title: 'Asco im Open Canoe', alt: 'Asco im Open Canoe'
			},
			{
				name: 'korsika_6_gr', nameMobile: 'korsika_6_kl', title: 'Travo mit dem C1', alt: 'Travo mit dem C1'
			},
			{
				name: 'korsika_5_gr', nameMobile: 'korsika_5_kl', title: 'Rutschen am oberen Golo', alt: 'Rutschen am oberen Golo'
			},
			{
				name: 'korsika_4_gr', nameMobile: 'korsika_4_kl', title: 'Oberer Golo', alt: 'Oberer Golo'
			},
			{
				name: 'korsika_3_gr', nameMobile: 'korsika_3_kl', title: 'Einstieg am oberen Golo', alt: 'Einstieg am oberen Golo'
			},
			{
				name: 'korsika_2_gr', nameMobile: 'korsika_2_kl', title: 'Berglandschaft in Korsika', alt: 'Berglandschaft in Korsika'
			},
			{
				name: 'korsika_1_gr', nameMobile: 'korsika_1_kl', title: 'Kajakcamp am Asco', alt: 'Kajakcamp am Asco'
			}

		],
		soca: [
			{ name: 'joyOfWhitewater_5', title: 'Big Wave in Idaho', alt: 'The Joy Of Whitewater' }
		]
	};

	function getImagesForKanukurse() {
		return imageCarousel.kanukurseImages;
	}

	function getImagesForPaddelreisen() {
		return imageCarousel.paddelreisenImages;
	}

	function getImagesForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages;
	}

	function getAllCarouselImages() {
		return getImagesForJoyOfWhitewater().concat(getImagesForPaddelreisen(), getImagesForKanukurse());
	}

	// Gets the first image, which is the last image in the array ;-)
	function getTheFirstImageForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages[imageCarousel.theJoyOfWhiteWaterImages.length - 1];
	}

	function getMobileImagesForKanukurse() {
		return mobileImages.kanukurseImages;
	}

	function getMobileImagesForPaddelreisen() {
		return mobileImages.paddelreisenImages;
	}

	function getMobileImagesForJoyOfWhitewater() {
		return mobileImages.theJoyOfWhiteWaterImages;
	}


	function getImagesForKorsika() {
		return imageSlider.korsika;
	}

	// public api
	return {
		getAllCarouselImages,
		getImagesForKanukurse,
		getImagesForPaddelreisen,
		getImagesForJoyOfWhitewater,
		getTheFirstImageForJoyOfWhitewater,
		getMobileImagesForKanukurse,
		getMobileImagesForPaddelreisen,
		getMobileImagesForJoyOfWhitewater,
		getImagesForKorsika
	};
})();
