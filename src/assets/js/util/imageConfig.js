// eslint-disable-next-line no-unused-vars
var Images = (function () {
	// Die Bilder, die im Header automatisch alle paar Sekunden wechseln.
	// Die Bilder müssen unter /assets/images/carousel/*.jpg liegen
	const imageCarousel = {
		theJoyOfWhiteWaterImages: [
			{ name: 'joyOfWhitewater_6.jpg', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_3.jpg', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_1.jpg', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_2.jpg', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'joyOfWhitewater_8.jpg', title: 'Kanuschule', alt: 'Kanuschule - The Joy Of Whitewater' }
		],
		kajakkurseImages: [
			{ name: 'kanukurse_5.jpg', title: 'Kajakkurse', alt: 'Kajakkurse' },
			{ name: 'kanukurse_8.jpg', title: 'Open Canoe Kurse', alt: 'Open Canoe Kurse' }
		],
		kanadierkurseImages: [
			{ name: 'kanukurse_4.jpg', title: 'Canadierkurse', alt: 'Canadierkurse' },
			{ name: 'kanadierkurse_1.webp', title: 'Kanadierkurs', alt: 'Kanadierkurs' },
			{ name: 'kanadierkurse_2.webp', title: 'Kanadier-Zweier Kurse', alt: 'Kanadier-Zweier Kurse' },
			{ name: 'kanukurse_9.jpg', title: 'Open Canoe und Kanadierkurse', alt: 'Open Canoe und Kanadierkurse' }
		],
		paddelreisenImages: [
			{ name: 'paddelreisen_10.jpg', title: 'Tavignano, Korsika', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_7.jpg', title: 'Transportmittel in Chile', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_3.jpg', title: 'Inn, Engadin', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2.jpg', title: 'Paddelreise in Georgien', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_5.jpg', title: 'Taravo, Korsika', alt: 'Paddelreisen' }
			
		],
		packraftkurseImages: [
			{ name: 'packraft_1.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'packraft_6.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'packraft_2.jpg', title: 'Packraft', alt: 'Packraft' },
			{ name: 'packraft_3.jpg', title: 'Packraft Ausflüge', alt: 'Packraft Ausflüge' }
		]
	};

	// Die Bilder, die in der Mobile Version im Header erscheinen.
	// Jeweils nur ein Bild, aber in der Hoch- und Querversion.
	// Die Bilder müssen unter /assets/images/mobileHeader/*.jpg liegen
	const mobileImages = {
		theJoyOfWhiteWaterImages: [
			{ name: 'mobile_quer_joyofwhitewater.jpg', title: 'Kanuschule - The Joy Of Whitewater', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'mobile_joyofwhitewater.jpg', title: 'Kanuschule - The Joy Of Whitewater', alt: 'Kanuschule - The Joy Of Whitewater' }
		],
		kajakkurseImages: [
			{ name: 'mobile_quer_kanukurse.jpg', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'mobile_kanukurse.jpg', title: 'Kanukurs', alt: 'Kanukurs' }
		],
		kanadierkurseImages: [
			{ name: 'mobile_quer_kanadierkurse.webp', title: 'Kanadierkurs', alt: 'Kanadierkurs' },
			{ name: 'mobile_kanadierkurse.webp', title: 'Kanadierkurs', alt: 'Kanadierkurs' }
		],
		paddelreisenImages: [
			{ name: 'mobile_quer_paddelreisen.jpg', title: 'Wildwasser Reisen', alt: 'Wildwasser Reisen' },
			{ name: 'mobile_paddelreisen.jpg', title: 'Wildwasser Reisen', alt: 'Wildwasser Reisen' }
		],
		packraftkurseImages: [
			{ name: 'mobile_quer_packraft.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'mobile_packraft.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' }
		]
	};

	// Die Bilder, die der Benutzer wechseln kann. Z.B. bei den verschiedenen Paddelreisen unter den Details.
	const imageSlider = {
		korsika: [
			{ name: 'korsika_1_gr.jpg', 
			  nameTablet: 'korsika_1_mi.jpg',
			  nameMobile: 'korsika_1_kl.jpg', 
			  title: 'Herrliche Flusslandschaft am Taravo', 
			  alt: 'Herrliche Flusslandschaft am Taravo'
			},
			{ name: 'korsika_2_gr.jpg',
			  nameTablet: 'korsika_2_mi.jpg',
			  nameMobile: 'korsika_2_kl.jpg', 
			  title: 'Tavignano in Korsika', 
			  alt: 'Tavignano in Korsika'
			},
			{ name: 'korsika_4_gr.jpg',
			  nameTablet: 'korsika_4_mi.jpg',
			  nameMobile: 'korsika_4_kl.jpg', 
			  title: 'Asco in Korsika', 
			  alt: 'Asco in Korsika'
			},
			{ name: 'korsika_12_gr.jpg',
			  nameTablet: 'korsika_12_mi.jpg',
			  nameMobile: 'korsika_12_kl.jpg', 
			  title: 'Kajakcamp am Asco', 
			  alt: 'Kajakcamp am Asco'
			},
			{ name: 'korsika_11_gr.jpg', 
			  nameTablet: 'korsika_11_mi.jpg',
			  nameMobile: 'korsika_11_kl.jpg', 
			  title: 'Travo auf Korsika', 
			  alt: 'Travo auf Korsika'
			},
			{ name: 'korsika_10_gr.jpg',
			  nameTablet: 'korsika_10_mi.jpg', 
			  nameMobile: 'korsika_10_kl.jpg', 
			  title: 'Asco im Kajak', 
			  alt: 'Asco im Kajak'
			},
			{ name: 'korsika_9_gr.jpg', 
			  nameTablet: 'korsika_9_mi.jpg',
			  nameMobile: 'korsika_9_kl.jpg', 
			  title: 'Tavignano in Korsika', 
			  alt: 'Tavignano in Korsika'
			},
			{ name: 'korsika_8_gr.jpg',
			  nameTablet: 'korsika_8_mi.jpg',
			  nameMobile: 'korsika_8_kl.jpg', 
			  title: 'Taravo im Kajak', 
			  alt: 'Taravo im Kajak'
			},
			{ name: 'korsika_7_gr.jpg',
			  nameTablet: 'korsika_7_mi.jpg',
			  nameMobile: 'korsika_7_kl.jpg', 
			  title: 'Corte Korsika', 
			  alt: 'Corte Korsika'
			},
			{ name: 'korsika_5_gr.jpg',
			  nameTablet: 'korsika_5_mi.jpg',
			  nameMobile: 'korsika_5_kl.jpg', 
			  title: 'Streetlife in Korsika', 
			  alt: 'Streetlife in Korsika'
			},
			{ name: 'korsika_3_gr.jpg',
			  nameTablet: 'korsika_3_mi.jpg',
			  nameMobile: 'korsika_3_kl.jpg', 
			  title: 'Einstieg am oberen Golo', 
			  alt: 'Einstieg am oberen Golo'}
		],
		soca: [
			{ name: 'soca_1_gr.jpg',
			  nameTablet: 'soca_1_mi.jpg',
			  nameMobile: 'soca_1_kl.jpg', 
			  title: 'Wildwasser paddeln auf der Soca (Abseilstrecke)', 
			  alt: 'Wildwasser paddeln auf der Soca (Abseilstrecke)' 
			},
			{ name: 'soca_2_gr.jpg', 
			  nameTablet: 'soca_2_mi.jpg',
			  nameMobile: 'soca_2_kl.jpg', 
			  title: 'Wildwasser paddeln auf der Koritnica', 
			  alt: 'Wildwasser paddeln auf der Koritnica' 
			},
			{ name: 'soca_4_gr.jpg', 
			  nameTablet: 'soca_4_mi.jpg',
			  nameMobile: 'soca_4_kl.jpg', 
			  title: 'Die Julischen Alpen von Bovec aus gesehen', 
			  alt: 'Die Julischen Alpen von Bovec aus gesehen' 
			},
			{ name: 'soca_3_gr.jpg',
			  nameTablet: 'soca_3_mi.jpg',
			  nameMobile: 'soca_3_kl.jpg', 
			  title: 'Soca (Friedhofsstrecke)', 
			  alt: 'Soca (Friedhofsstrecke)' 
			},
			{ name: 'soca_5_gr.jpg', 
			  nameTablet: 'soca_5_mi.jpg',
			  nameMobile: 'soca_5_kl.jpg', 
			  title: 'Soca (Slalomstrecke)', 
			  alt: 'Soca (Slalomstrecke)' 
			},
			{ name: 'soca_6_gr.jpg',
			  nameTablet: 'soca_6_mi.jpg',
			  nameMobile: 'soca_6_kl.jpg', 
			  title: 'Soca Slalomstrecke im Kanadier Einer', 
			  alt: 'Soca Slalomstrecke im Kanadier Einer' 
			},
			{ name: 'soca_7_gr.jpg', 
			  nameTablet: 'soca_7_mi.jpg',
			  nameMobile: 'soca_7_kl.jpg', 
			  title: 'Downtown Bovec', 
			  alt: 'Downtown Bovec' 
			},
		],
		piemont: [
			{ name: 'piemont_4_gr.jpg',
			  nameTablet: 'piemont_4_mi.jpg', 
			  nameMobile: 'piemont_4_kl.jpg', 
			  title: 'Sesia im Kanadier Einer', 
			  alt: 'Sesia im Kanadier Einer' 
			},
			{ name: 'piemont_7_gr.jpg',
			  nameTablet: 'piemont_7_mi.jpg', 
			  nameMobile: 'piemont_7_kl.jpg', 
			  title: 'Die Gronda im Vale Sesia', 
			  alt: 'Die Gronda im Vale Sesia' 
			},
			{ name: 'piemont_2_gr.jpg',
			  nameTablet: 'piemont_2_mi.jpg', 
			  nameMobile: 'piemont_2_kl.jpg', 
			  title: 'Typisches Dorf im Vale Sesia', 
			  alt: 'Typisches Dorf im Vale Sesia' 
			},
			{ name: 'piemont_1_gr.jpg',
			  nameTablet: 'piemont_1_mi.jpg', 
			  nameMobile: 'piemont_1_kl.jpg', 
			  title: 'Sesia (Alpin Sprint)', 
			  alt: 'Sesia (Alpin Sprint)' 
			},
			{ name: 'piemont_3_gr.jpg', 
			  nameTablet: 'piemont_3_mi.jpg',
			  nameMobile: 'piemont_3_kl.jpg', 
			  title: 'Sesia (Balmuccia)', 
			  alt: 'Sesia (Balmuccia)' 
			},
			{ name: 'piemont_6_gr.jpg', 
			  nameTablet: 'piemont_6_mi.jpg',
			  nameMobile: 'piemont_6_kl.jpg', 
			  title: 'Campingplatz in Campertogno', 
			  alt: 'Campingplatz in Campertogno' 
			}
		],
		georgien: [
			{ name: 'georgien_1_gr.jpg',
			  nameTablet: 'georgien_1_mi.jpg',
			  nameMobile: 'georgien_1_kl.jpg', 
			  title: 'Paddeln in Georgien', 
			  alt: 'Paddeln in Georgien' 
			},
			{ name: 'georgien_2_gr.jpg', 
			  nameTablet: 'georgien_2_mi.jpg',
			  nameMobile: 'georgien_2_kl.jpg', 
			  title: 'Wehrtürme in Georgien', 
			  alt: 'Wehrtürme in Georgien' 
			},
			{ name: 'georgien_3_gr.jpg', 
			  nameTablet: 'georgien_3_mi.jpg',
			  nameMobile: 'georgien_3_kl.jpg', 
			  title: 'Kajak Transport in Georgien', 
			  alt: 'Kajak Transport in Georgien' 
			},
			{ name: 'georgien_4_gr.jpg', 
			  nameTablet: 'georgien_4_mi.jpg',
			  nameMobile: 'georgien_4_kl.jpg', 
			  title: 'Paddeln in Georgien', 
			  alt: 'Paddeln in Georgien' 
			},
			{ name: 'georgien_5_gr.jpg', 
			  nameTablet: 'georgien_5_mi.jpg',
			  nameMobile: 'georgien_5_kl.jpg', 
			  title: 'Paddeln in Georgien', 
			  alt: 'Paddeln in Georgien' 
			},
			{ name: 'georgien_6_gr.jpg', 
			  nameTablet: 'georgien_6_mi.jpg',
			  nameMobile: 'georgien_6_kl.jpg', 
			  title: 'Georgische orthodoxe Kirche', 
			  alt: 'Georgische orthodoxe Kirche' 
			},
			{ name: 'georgien_7_gr.jpg', 
			  nameTablet: 'georgien_7_mi.jpg',
			  nameMobile: 'georgien_7_kl.jpg', 
			  title: 'Der grosse Kaukasus', 
			  alt: 'Der grosse Kaukasus' 
			}
		],
		albanien: [
			{ name: 'albanien_1_gr.jpg', 
			  nameTablet: 'albanien_1_mi.jpg',
			  nameMobile: 'albanien_1_kl.jpg', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_2_gr.jpg', 
			  nameTablet: 'albanien_2_mi.jpg',
			  nameMobile: 'albanien_2_kl.jpg', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_3_gr.jpg',
			  nameTablet: 'albanien_3_mi.jpg',
			  nameMobile: 'albanien_3_kl.jpg', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_4_gr.jpg',
			  nameTablet: 'albanien_4_mi.jpg',
			  nameMobile: 'albanien_4_kl.jpg', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_5_gr.jpg',
			  nameTablet: 'albanien_5_mi.jpg',
			  nameMobile: 'albanien_5_kl.jpg', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			}
		],
		griechenland: [
			{ name: 'griechenland_1_gr.jpg', 
			  nameTablet: 'griechenland_1_mi.jpg',
			  nameMobile: 'griechenland_1_kl.jpg', 
			  title: 'Paddeln in Griechenland', 
			  alt: 'Paddeln in Griechenland' 
			},
			{ name: 'griechenland_2_gr.jpg', 
			  nameTablet: 'griechenland_2_mi.jpg',
			  nameMobile: 'griechenland_2_kl.jpg', 
			  title: 'Paddeln auf dem Mileapotamos in Griechenland', 
			  alt: 'Paddeln auf dem Mileapotamos in Griechenland' 
			},
			{ name: 'griechenland_3_gr.jpg',
			  nameTablet: 'griechenland_3_mi.jpg',
			  nameMobile: 'griechenland_3_kl.jpg', 
			  title: 'Paddeln auf dem Voidomatis in Griechenland', 
			  alt: 'Paddeln auf dem Voidomatis in Griechenland' 
			},
			{ name: 'griechenland_4_gr.jpg',
			  nameTablet: 'griechenland_4_mi.jpg',
			  nameMobile: 'griechenland_4_kl.jpg', 
			  title: 'Im Vikostal in Griechenland', 
			  alt: 'Im Vikostal in Griechenland' 
			},
			{ name: 'griechenland_5_gr.jpg',
			  nameTablet: 'griechenland_5_mi.jpg',
			  nameMobile: 'griechenland_5_kl.jpg', 
			  title: 'Paddeln in Griechenland', 
			  alt: 'Paddeln in Griechenland' 
			},
			{ name: 'griechenland_6_gr.jpg',
			  nameTablet: 'griechenland_6_mi.jpg',
			  nameMobile: 'griechenland_6_kl.jpg', 
			  title: 'Paddeln auf dem Aoos in Griechenland', 
			  alt: 'Paddeln auf dem Aoos in Griechenland' 
			}
		]
	};

	function getImagesForKajakkurse() {
		return imageCarousel.kajakkurseImages;
	}

	function getImagesForKanadierkurse() {
		return imageCarousel.kanadierkurseImages;
	}

	function getImagesForPackraftkurse() {
		return imageCarousel.packraftkurseImages;
	}

	function getImagesForPaddelreisen() {
		return imageCarousel.paddelreisenImages;
	}

	function getImagesForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages;
	}

	function getAllCarouselImages() {
		return getImagesForJoyOfWhitewater().concat(getImagesForPaddelreisen(), getImagesForKajakkurse(), getImagesForPackraftkurse(), getImagesForKanadierkurse());
	}

	// Gets the first image, which is the first image in the array ;-)
	function getTheFirstImageForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages[0];
	}

	function getTheFirstImageForPackraftkurse() {
		return imageCarousel.packraftkurseImages[0];
	}

	function getTheFirstImageForPaddelreisen() {
		return imageCarousel.paddelreisenImages[0];
	}

	function getTheFirstImageForKajakkurse() {
		return imageCarousel.kajakkurseImages[0];
	}

	function getTheFirstImageForKanadierkurse() {
		return imageCarousel.kanadierkurseImages[0];
	}

	function getMobileImagesForKajakkurse() {
		return mobileImages.kajakkurseImages;
	}

	function getMobileImagesForKanadierkurse() {
		return mobileImages.kanadierkurseImages;
	}

	function getMobileImagesForPackraftkurse() {
		return mobileImages.packraftkurseImages;
	}

	function getMobileImagesForPaddelreisen() {
		return mobileImages.paddelreisenImages;
	}

	function getMobileImagesForJoyOfWhitewater() {
		return mobileImages.theJoyOfWhiteWaterImages;
	}

	function getImagesForSlider(nameOfImageSlider) {
		return imageSlider[nameOfImageSlider];
	}

	// public api
	return {
		getAllCarouselImages,
		getImagesForKajakkurse,
		getImagesForKanadierkurse,
		getImagesForPaddelreisen,
		getImagesForPackraftkurse,
		getImagesForJoyOfWhitewater,
		getTheFirstImageForJoyOfWhitewater,
		getTheFirstImageForPackraftkurse,
		getTheFirstImageForPaddelreisen,
		getTheFirstImageForKajakkurse,
		getTheFirstImageForKanadierkurse,
		getMobileImagesForKajakkurse,
		getMobileImagesForKanadierkurse,
		getMobileImagesForPaddelreisen,
		getMobileImagesForPackraftkurse,
		getMobileImagesForJoyOfWhitewater,
		getImagesForSlider
	};
})();
