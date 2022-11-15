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
			{ name: 'paddelreisen_4', title: 'Open Canoe in Costa Rica', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_1', title: 'Sesia, Piemont', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2', title: 'Paddelreise in Georgien', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_5', title: 'Taravo, Korsika', alt: 'Paddelreisen' }
			
		],
		packraftImages: [
			{ name: 'packraft_6', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'packraft_7', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'packraft_3', title: 'Packraft', alt: 'Packraft' },
			{ name: 'packraft_4', title: 'Packraft Ausflüge', alt: 'Packraft Ausflüge' }
		]
	};

	// Die Bilder, die in der Mobile Version im Header erscheinen.
	// Jeweils nur ein Bild, aber in der Hoch- und Querversion.
	// Die Bilder müssen unter /assets/images/mobileHeader/*.jpg liegen
	const mobileImages = {
		theJoyOfWhiteWaterImages: [
			{ name: 'mobile_quer_joyofwhitewater', title: 'Kanuschule - The Joy Of Whitewater', alt: 'Kanuschule - The Joy Of Whitewater' },
			{ name: 'mobile_joyofwhitewater', title: 'Kanuschule - The Joy Of Whitewater', alt: 'Kanuschule - The Joy Of Whitewater' }
		],
		kanukurseImages: [
			{ name: 'mobile_quer_kanukurse', title: 'Kanukurs', alt: 'Kanukurs' },
			{ name: 'mobile_kanukurse', title: 'Kanukurs', alt: 'Kanukurs' }
		],
		paddelreisenImages: [
			{ name: 'mobile_quer_paddelreisen', title: 'Wildwasser Reisen', alt: 'Wildwasser Reisen' },
			{ name: 'mobile_paddelreisen', title: 'Wildwasser Reisen', alt: 'Wildwasser Reisen' }
		],
		packraftImages: [
			{ name: 'mobile_quer_packraft', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'mobile_packraft', title: 'Packraft Kurse', alt: 'Packraft Kurse' }
		]
	};

	// Die Bilder, die der Benutzer wechseln kann. Z.B. bei den verschiedenen Paddelreisen unter den Details.
	const imageSlider = {
		korsika: [
			{ name: 'korsika_1_gr', 
			  nameTablet: 'korsika_1_mi',
			  nameMobile: 'korsika_1_kl', 
			  title: 'Herrliche Flusslandschaft am Taravo', 
			  alt: 'Herrliche Flusslandschaft am Taravo'
			},
			{ name: 'korsika_2_gr',
			  nameTablet: 'korsika_2_mi',
			  nameMobile: 'korsika_2_kl', 
			  title: 'Tavignano in Korsika', 
			  alt: 'Tavignano in Korsika'
			},
			{ name: 'korsika_4_gr',
			  nameTablet: 'korsika_4_mi',
			  nameMobile: 'korsika_4_kl', 
			  title: 'Asco in Korsika', 
			  alt: 'Asco in Korsika'
			},
			{ name: 'korsika_12_gr',
			  nameTablet: 'korsika_12_mi',
			  nameMobile: 'korsika_12_kl', 
			  title: 'Kajakcamp am Asco', 
			  alt: 'Kajakcamp am Asco'
			},
			{ name: 'korsika_11_gr', 
			  nameTablet: 'korsika_11_mi',
			  nameMobile: 'korsika_11_kl', 
			  title: 'Travo auf Korsika', 
			  alt: 'Travo auf Korsika'
			},
			{ name: 'korsika_10_gr',
			  nameTablet: 'korsika_10_mi', 
			  nameMobile: 'korsika_10_kl', 
			  title: 'Asco im Kajak', 
			  alt: 'Asco im Kajak'
			},
			{ name: 'korsika_9_gr', 
			  nameTablet: 'korsika_9_mi',
			  nameMobile: 'korsika_9_kl', 
			  title: 'Tavignano in Korsika', 
			  alt: 'Tavignano in Korsika'
			},
			{ name: 'korsika_8_gr',
			  nameTablet: 'korsika_8_mi',
			  nameMobile: 'korsika_8_kl', 
			  title: 'Taravo im Kajak', 
			  alt: 'Taravo im Kajak'
			},
			{ name: 'korsika_7_gr',
			  nameTablet: 'korsika_7_mi',
			  nameMobile: 'korsika_7_kl', 
			  title: 'Corte Korsika', 
			  alt: 'Corte Korsika'
			},
			{ name: 'korsika_5_gr',
			  nameTablet: 'korsika_5_mi',
			  nameMobile: 'korsika_5_kl', 
			  title: 'Streetlife in Korsika', 
			  alt: 'Streetlife in Korsika'
			},
			{ name: 'korsika_3_gr',
			  nameTablet: 'korsika_3_mi',
			  nameMobile: 'korsika_3_kl', 
			  title: 'Einstieg am oberen Golo', 
			  alt: 'Einstieg am oberen Golo'}
		],
		soca: [
			{ name: 'soca_1_gr',
			  nameTablet: 'soca_1_mi',
			  nameMobile: 'soca_1_kl', 
			  title: 'Wildwasser paddeln auf der Soca (Abseilstrecke)', 
			  alt: 'Wildwasser paddeln auf der Soca (Abseilstrecke)' 
			},
			{ name: 'soca_2_gr', 
			  nameTablet: 'soca_2_mi',
			  nameMobile: 'soca_2_kl', 
			  title: 'Wildwasser paddeln auf der Koritnica', 
			  alt: 'Wildwasser paddeln auf der Koritnica' 
			},
			{ name: 'soca_4_gr', 
			  nameTablet: 'soca_4_mi',
			  nameMobile: 'soca_4_kl', 
			  title: 'Die Julischen Alpen von Bovec aus gesehen', 
			  alt: 'Die Julischen Alpen von Bovec aus gesehen' 
			},
			{ name: 'soca_3_gr',
			  nameTablet: 'soca_3_mi',
			  nameMobile: 'soca_3_kl', 
			  title: 'Soca (Friedhofsstrecke)', 
			  alt: 'Soca (Friedhofsstrecke)' 
			},
			{ name: 'soca_5_gr', 
			  nameTablet: 'soca_5_mi',
			  nameMobile: 'soca_5_kl', 
			  title: 'Soca (Slalomstrecke)', 
			  alt: 'Soca (Slalomstrecke)' 
			},
			{ name: 'soca_6_gr',
			  nameTablet: 'soca_6_mi',
			  nameMobile: 'soca_6_kl', 
			  title: 'Soca Slalomstrecke im Kanadier Einer', 
			  alt: 'Soca Slalomstrecke im Kanadier Einer' 
			},
			{ name: 'soca_7_gr', 
			  nameTablet: 'soca_7_mi',
			  nameMobile: 'soca_7_kl', 
			  title: 'Downtown Bovec', 
			  alt: 'Downtown Bovec' 
			},
		],
		piemont: [
			{ name: 'piemont_4_gr',
			  nameTablet: 'piemont_4_mi', 
			  nameMobile: 'piemont_4_kl', 
			  title: 'Sesia im Kanadier Einer', 
			  alt: 'Sesia im Kanadier Einer' 
			},
			{ name: 'piemont_7_gr',
			  nameTablet: 'piemont_7_mi', 
			  nameMobile: 'piemont_7_kl', 
			  title: 'Die Gronda im Vale Sesia', 
			  alt: 'Die Gronda im Vale Sesia' 
			},
			{ name: 'piemont_2_gr',
			  nameTablet: 'piemont_2_mi', 
			  nameMobile: 'piemont_2_kl', 
			  title: 'Typisches Dorf im Vale Sesia', 
			  alt: 'Typisches Dorf im Vale Sesia' 
			},
			{ name: 'piemont_1_gr',
			  nameTablet: 'piemont_1_mi', 
			  nameMobile: 'piemont_1_kl', 
			  title: 'Sesia (Alpin Sprint)', 
			  alt: 'Sesia (Alpin Sprint)' 
			},
			{ name: 'piemont_3_gr', 
			  nameTablet: 'piemont_3_mi',
			  nameMobile: 'piemont_3_kl', 
			  title: 'Sesia (Balmuccia)', 
			  alt: 'Sesia (Balmuccia)' 
			},
			{ name: 'piemont_6_gr', 
			  nameTablet: 'piemont_6_mi',
			  nameMobile: 'piemont_6_kl', 
			  title: 'Campingplatz in Campertogno', 
			  alt: 'Campingplatz in Campertogno' 
			}
		],
		georgien: [
			{ name: 'georgien_1_gr',
			  nameTablet: 'georgien_1_mi',
			  nameMobile: 'georgien_1_kl', 
			  title: 'Paddeln in Georgien', 
			  alt: 'Paddeln in Georgien' 
			},
			{ name: 'georgien_2_gr', 
			  nameTablet: 'georgien_2_mi',
			  nameMobile: 'georgien_2_kl', 
			  title: 'Wehrtürme in Georgien', 
			  alt: 'Wehrtürme in Georgien' 
			},
			{ name: 'georgien_3_gr', 
			  nameTablet: 'georgien_3_mi',
			  nameMobile: 'georgien_3_kl', 
			  title: 'Kajak Transport in Georgien', 
			  alt: 'Kajak Transport in Georgien' 
			},
			{ name: 'georgien_4_gr', 
			  nameTablet: 'georgien_4_mi',
			  nameMobile: 'georgien_4_kl', 
			  title: 'Paddeln in Georgien', 
			  alt: 'Paddeln in Georgien' 
			},
			{ name: 'georgien_5_gr', 
			  nameTablet: 'georgien_5_mi',
			  nameMobile: 'georgien_5_kl', 
			  title: 'Paddeln in Georgien', 
			  alt: 'Paddeln in Georgien' 
			},
			{ name: 'georgien_6_gr', 
			  nameTablet: 'georgien_6_mi',
			  nameMobile: 'georgien_6_kl', 
			  title: 'Georgische orthodoxe Kirche', 
			  alt: 'Georgische orthodoxe Kirche' 
			},
			{ name: 'georgien_7_gr', 
			  nameTablet: 'georgien_7_mi',
			  nameMobile: 'georgien_7_kl', 
			  title: 'Der grosse Kaukasus', 
			  alt: 'Der grosse Kaukasus' 
			}
		],
		albanien: [
			{ name: 'albanien_1_gr', 
			  nameTablet: 'albanien_1_mi',
			  nameMobile: 'albanien_1_kl', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_2_gr', 
			  nameTablet: 'albanien_2_mi',
			  nameMobile: 'albanien_2_kl', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_3_gr',
			  nameTablet: 'albanien_3_mi',
			  nameMobile: 'albanien_3_kl', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_4_gr',
			  nameTablet: 'albanien_4_mi',
			  nameMobile: 'albanien_4_kl', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			},
			{ name: 'albanien_5_gr',
			  nameTablet: 'albanien_5_mi',
			  nameMobile: 'albanien_5_kl', 
			  title: 'Paddeln in Albanien', 
			  alt: 'Paddeln in Albanien' 
			}
		],
		griechenland: [
			{ name: 'griechenland_1_gr', 
			  nameTablet: 'griechenland_1_mi',
			  nameMobile: 'griechenland_1_kl', 
			  title: 'Paddeln in Griechenland', 
			  alt: 'Paddeln in Griechenland' 
			},
			{ name: 'griechenland_2_gr', 
			  nameTablet: 'griechenland_2_mi',
			  nameMobile: 'griechenland_2_kl', 
			  title: 'Paddeln auf dem Mileapotamos in Griechenland', 
			  alt: 'Paddeln auf dem Mileapotamos in Griechenland' 
			},
			{ name: 'griechenland_3_gr',
			  nameTablet: 'griechenland_3_mi',
			  nameMobile: 'griechenland_3_kl', 
			  title: 'Paddeln auf dem Voidomatis in Griechenland', 
			  alt: 'Paddeln auf dem Voidomatis in Griechenland' 
			},
			{ name: 'griechenland_4_gr',
			  nameTablet: 'griechenland_4_mi',
			  nameMobile: 'griechenland_4_kl', 
			  title: 'Im Vikostal in Griechenland', 
			  alt: 'Im Vikostal in Griechenland' 
			},
			{ name: 'griechenland_5_gr',
			  nameTablet: 'griechenland_5_mi',
			  nameMobile: 'griechenland_5_kl', 
			  title: 'Paddeln in Griechenland', 
			  alt: 'Paddeln in Griechenland' 
			},
			{ name: 'griechenland_6_gr',
			  nameTablet: 'griechenland_6_mi',
			  nameMobile: 'griechenland_6_kl', 
			  title: 'Paddeln auf dem Aoos in Griechenland', 
			  alt: 'Paddeln auf dem Aoos in Griechenland' 
			}
		]
	};

	function getImagesForKanukurse() {
		return imageCarousel.kanukurseImages;
	}

	function getImagesForPackraft() {
		return imageCarousel.packraftImages;
	}

	function getImagesForPaddelreisen() {
		return imageCarousel.paddelreisenImages;
	}

	function getImagesForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages;
	}

	function getAllCarouselImages() {
		return getImagesForJoyOfWhitewater().concat(getImagesForPaddelreisen(), getImagesForKanukurse(), getImagesForPackraft());
	}

	// Gets the first image, which is the first image in the array ;-)
	function getTheFirstImageForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages[0];
	}

	function getTheFirstImageForPackraft() {
		return imageCarousel.packraftImages[0];
	}

	function getTheFirstImageForPaddelreisen() {
		return imageCarousel.paddelreisenImages[0];
	}

	function getTheFirstImageForKanukurse() {
		return imageCarousel.kanukurseImages[0];
	}

	function getMobileImagesForKanukurse() {
		return mobileImages.kanukurseImages;
	}

	function getMobileImagesForPackraft() {
		return mobileImages.packraftImages;
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
		getImagesForKanukurse,
		getImagesForPaddelreisen,
		getImagesForPackraft,
		getImagesForJoyOfWhitewater,
		getTheFirstImageForJoyOfWhitewater,
		getTheFirstImageForPackraft,
		getTheFirstImageForPaddelreisen,
		getTheFirstImageForKanukurse,
		getMobileImagesForKanukurse,
		getMobileImagesForPaddelreisen,
		getMobileImagesForPackraft,
		getMobileImagesForJoyOfWhitewater,
		getImagesForSlider
	};
})();
