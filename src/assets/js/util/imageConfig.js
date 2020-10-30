// eslint-disable-next-line no-unused-vars
var Images = (function () {
	// Die Bilder, die im Header automatisch alle paar Sekunden wechseln.
	// Die Bilder müssen unter /assets/images/carousel/*.jpg liegen
	const imageCarousel = {
		theJoyOfWhiteWaterImages: [
			{ name: 'joyOfWhitewater_6', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_1', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_7', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_2', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_4', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'kanukurse_1', title: 'Open Canoe Kurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_4', title: 'Kanukurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_7', title: 'Kajakkurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_2', title: 'Eskimotieren', alt: 'Kanuschule' },
			{ name: 'kanukurse_6', title: 'Kajakkurse', alt: 'Kanuschule' },
			{ name: 'kanukurse_3', title: 'Kajakkurs', alt: 'Kanuschule' }
		],
		paddelreisenImages: [
			{ name: 'paddelreisen_10', title: 'Tavignano, Korsika', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_7', title: 'Transportmittel in Chile', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_9', title: 'Jungle Ecuador', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_1', title: 'Sesia, Piemont', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2', title: 'Paddelreise in Georgien', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_5', title: 'Taravo, Korsika', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_4', title: 'Open Canoe in Costa Rica', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_8', title: 'Quichos, Ecuador', alt: 'Paddelreisen' }
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
				name: 'korsika_12_gr', nameMobile: 'korsika_12_kl', title: 'Kajakcamp am Asco', alt: 'Kajakcamp am Asco'
			},
			{
				name: 'korsika_11_gr', nameMobile: 'korsika_11_kl', title: 'Travo auf Korsika', alt: 'Travo auf Korsika'
			},
			{
				name: 'korsika_10_gr', nameMobile: 'korsika_10_kl', title: 'Asco im Kajak', alt: 'Asco im Kajak'
			},
			{
				name: 'korsika_9_gr', nameMobile: 'korsika_9_kl', title: 'Tavignano in Korsika', alt: 'Tavignano in Korsika'
			},
			{
				name: 'korsika_8_gr', nameMobile: 'korsika_8_kl', title: 'Taravo im Kajak', alt: 'Taravo im Kajak'
			},
			{
				name: 'korsika_7_gr', nameMobile: 'korsika_7_kl', title: 'Corte Korsika', alt: 'Corte Korsika'
			},
			{
				name: 'korsika_5_gr', nameMobile: 'korsika_5_kl', title: 'Streetlife in Korsika', alt: 'Streetlife in Korsika'
			},
			{
				name: 'korsika_4_gr', nameMobile: 'korsika_4_kl', title: 'Asco in Korsika', alt: 'Asco in Korsika'
			},
			{
				name: 'korsika_3_gr', nameMobile: 'korsika_3_kl', title: 'Einstieg am oberen Golo', alt: 'Einstieg am oberen Golo'
			},
			{
				name: 'korsika_2_gr', nameMobile: 'korsika_2_kl', title: 'Tavignano in Korsika', alt: 'Tavignano in Korsika'
			},
			{
				name: 'korsika_1_gr', nameMobile: 'korsika_1_kl', title: 'Herrliche Flusslandschaft am Taravo', alt: 'Herrliche Flusslandschaft am Taravo'
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
