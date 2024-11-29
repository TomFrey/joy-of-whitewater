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
			{ name: 'kanukurse_8.jpg', title: 'Wildwasser Kajakkurse', alt: 'Wildwasser Kajakkurse' },
			{ name: 'paddelreisen_1.jpg', title: 'Wildwasser Kajakkurse auf WW IV', alt: 'Wildwasser Kajakkurse auf WW IV' },
			{ name: 'kanukurse_7.jpg', title: 'Wildwasser Kajakkurse', alt: 'Wildwasser Kajakkurse' }
		],
		kanadierkurseImages: [
			{ name: 'kanukurse_4.jpg', title: 'Canadierkurse', alt: 'Canadierkurse' },
			{ name: 'kanadierkurse_1.webp', title: 'Kanadierkurs', alt: 'Kanadierkurs' },
			{ name: 'kanadierkurse_2.webp', title: 'Kanadier-Zweier Kurse', alt: 'Kanadier-Zweier Kurse' },
			{ name: 'kanukurse_9.jpg', title: 'Open Canoe und Kanadierkurse', alt: 'Open Canoe und Kanadierkurse' }
		],
		packraftkurseImages: [
			{ name: 'packraft_1.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'packraft_6.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'packraft_2.jpg', title: 'Packraft', alt: 'Packraft' },
			{ name: 'packraft_3.jpg', title: 'Packraft Ausflüge', alt: 'Packraft Ausflüge' }
		],
		specialImages: [
			{ name: 'specials_1.webp', title: 'Eskimotierkurse', alt: 'Eskimotierkurse' },
			{ name: 'specials_2.webp', title: 'Wildwasser Rettungskurse', alt: 'Wildwasser Rettungskurse' },
			{ name: 'specials_3.webp', title: 'Eskimotierkurse', alt: 'Eskimotierkurse' },
			{ name: 'specials_4.webp', title: 'Wildwasser Rettungskurse', alt: 'Wildwasser Rettungskurse' },
			{ name: 'specials_5.jpg', title: 'Eskimotierkurse', alt: 'Eskimotierkurse' }
		],
		ausflugImages: [
			{ name: 'ausflug_1.webp', title: 'Wildwasserausflüge durch die Rheinschlucht', alt: 'Wildwasserausflüge durch die Rheinschlucht' },
			{ name: 'ausflug_3.webp', title: 'Wildwasserausflüge durch die Rheinschlucht', alt: 'Wildwasserausflüge durch die Rheinschlucht' },
			{ name: 'packraft_2.jpg', title: 'Wildwassertouren mit dem Packraft', alt: 'Wildwassertouren mit dem Packraft' },
			{ name: 'packraft_3.jpg', title: 'Wildwasserausflug mit dem Packraft', alt: 'Wildwasserausflug mit dem Packraft' }
		],
		paddelreisenImages: [
			{ name: 'paddelreisen_10.jpg', title: 'Wildwasserreise - Tavignano, Korsika', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_7.jpg', title: 'Transportmittel in Chile', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_3.jpg', title: 'Inn, Engadin', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_2.jpg', title: 'Paddelreise in Georgien', alt: 'Paddelreisen' },
			{ name: 'paddelreisen_5.jpg', title: 'Wildwasser Reise - Taravo, Korsika', alt: 'Paddelreisen' }
		],
		korsikaImages: [
			{name: 'paddelreisen_5.jpg', title: 'Wildwasser Reise - Taravo, Korsika', alt: 'Wildwasser Reise - Taravo, Korsika' },
			{name: 'paddelreisen_10.jpg', title: 'Wildwasserreise - Tavignano, Korsika', alt: 'Wildwasserreise - Tavignano, Korsika'}
			
		],
		griechenlandImages: [
			{name: 'wildwasser_reise_griechenland_3.webp', title: 'Wildwasser Griechenland, Arachtos', alt: 'Wildwasser Griechenland, Arachtos' },
			{name: 'wildwasser_reise_griechenland_1.webp', title: 'Wildwasser Griechenland, Venetikos', alt: 'Wildwasser Griechenland, Venetikos' },
			{name: 'wildwasser_reise_griechenland_2.webp', title: 'Wildwasser Griechenland, Meteora', alt: 'Wildwasser Griechenland, Meteora' },
			{name: 'wildwasser_reise_griechenland_4.webp', title: 'Wildwasser Griechenland, Aoos', alt: 'Wildwasser Griechenland, Aoos' },
			
		],
		sesiaImages: [
			{name: 'wildwasser_reise_sesia_1.webp', title: 'Wildwasserkurse auf der Sesia im Packraft', alt: 'Wildwasserkurse auf der Sesia im Packraft' },
			{name: 'wildwasser_reise_sesia_3.webp', title: 'Wildwasserkurse auf der Sesia im Open Canoe', alt: 'Wildwasserkurse auf der Sesia im Open Canoe' },
			{name: 'wildwasser_reise_sesia_2.webp', title: 'Wildwasserkurse auf der Sesia im Kajak', alt: 'Wildwasserkurse auf der Sesia im Kajak' },
			{name: 'wildwasser_reise_sesia_4.webp', title: 'Wildwasserreise Sesia', alt: 'Wildwasserreise Sesia' },
		],
		socaImages: [
			{name: 'wildwasser_reise_soca_5.webp', title: 'Wildwasserreise Soča', alt: 'Wildwasserreise Soča' },
			{name: 'wildwasser_reise_soca_1.webp', title: 'Wildwasserreise Soča, Slovenien', alt: 'Wildwasserreise Soča, Slovenien' },
			{name: 'wildwasser_reise_soca_3.webp', title: 'Wildwasserreise in Slovenien - Koritnita', alt: 'Wildwasserreise in Slovenien - Koritnita' },
			{name: 'wildwasser_reise_soca_2.webp', title: 'Paddeln auf der Koritnita', alt: 'Paddeln auf der Koritnita' },
		],
		innImages: [
			{name: 'wildwasser_reise_inn_1.webp', title: 'Wildwasserkurse auf dem Inn', alt: 'Wildwasserkurse auf dem Inn' },
			{name: 'paddelreisen_3.jpg', title: 'Paddeln im Open Canoe auf dem Inn - Happy Snapper', alt: 'Paddeln im Open Canoe auf dem Inn - Happy Snapper' },
			{name: 'wildwasser_reise_inn_4.webp', title: 'Wildwasserkurse auf dem Inn', alt: 'Wildwasserkurse auf dem Inn' },
			
		],
		georgienImages: [
			{name: 'wildwasser_reise_georgien_1.webp', title: 'Wildwasserreise nach Georgien', alt: 'Wildwasserreise nach Georgien' },
			{name: 'wildwasser_reise_georgien_5.webp', title: 'Wildwasserreise nach Georgien - Bzhuzha', alt: 'Wildwasserreise nach Georgien - Bzhuzha' },
			{name: 'wildwasser_reise_georgien_6.webp', title: 'Wildwasserreise nach Georgien - Tekhuri', alt: 'Wildwasserreise nach Georgien - Tekhuri' },
			{name: 'wildwasser_reise_georgien_2.webp', title: 'Wildwasserreise nach Georgien - Uschguli', alt: 'Wildwasserreise nach Georgien - Uschguli' },
			{name: 'wildwasser_reise_georgien_4.webp', title: 'Wildwasserreise nach Georgien', alt: 'Wildwasserreise nach Georgien' },
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
		korsikaImages: [
			{ name: 'mobile_quer_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' },
			{ name: 'mobile_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' }
		],
		griechenlandImages: [
			{ name: 'mobile_quer_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' },
			{ name: 'mobile_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' }
		],
		sesiaImages: [
			{ name: 'mobile_quer_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' },
			{ name: 'mobile_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' }
		],
		socaImages: [
			{ name: 'mobile_quer_paddelreisen.jpg', title: 'Wildwasser Reisen auf der Soca', alt: 'Wildwasser Reisen auf der Soca' },
			{ name: 'mobile_paddelreisen.jpg', title: 'Wildwasser Reisen auf der Soca', alt: 'Wildwasser Reisen auf der Soca' }
		],
		innImages: [
			{ name: 'mobile_quer_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' },
			{ name: 'mobile_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' }
		],
		georgienImages: [
			{ name: 'mobile_quer_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' },
			{ name: 'mobile_korsikakurse.webp', title: 'Wildwasser paddeln in Korsika', alt: 'Wildwasser paddeln in Korsika' }
		],
		packraftkurseImages: [
			{ name: 'mobile_quer_packraft.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' },
			{ name: 'mobile_packraft.jpg', title: 'Packraft Kurse', alt: 'Packraft Kurse' }
		],
		specialImages: [
			{ name: 'mobile_quer_specialskurse.webp', title: 'Sicherheits- und Eskimotierkurse', alt: 'Sicherheits- und Eskimotierkurse' },
			{ name: 'mobile_specialskurse.webp', title: 'Sicherheits- und Eskimotierkurse', alt: 'Sicherheits- und Eskimotierkurse' }
		],
		ausflugImages: [
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
		],
		wildnisreiseNorthAmerica: [
			{ name: 'northAmerica_1_gr.jpg', 
			  nameTablet: 'northAmerica_1_mi.jpg',
			  nameMobile: 'northAmerica_1_kl.jpg', 
			  title: 'Die Anreise zum Bonnet Plume River ist nur mit Wasserflugzeug möglich.', 
			  alt: 'Die Anreise zum Bonnet Plume River ist nur mit Wasserflugzeug möglich.' 
			},
			{ name: 'northAmerica_2_gr.jpg', 
			  nameTablet: 'northAmerica_2_mi.jpg',
			  nameMobile: 'northAmerica_2_kl.jpg', 
			  title: 'Paddelreise in den Yukon Territories', 
			  alt: 'Paddelreise in den Yukon Territories' 
			},
			{ name: 'northAmerica_5_gr.jpg', 
			  nameTablet: 'northAmerica_5_mi.jpg',
			  nameMobile: 'northAmerica_5_kl.jpg', 
			  title: 'Wildnisreise Yukon Territories', 
			  alt: 'Wildnisreise Yukon Territories' 
			},
			{ name: 'northAmerica_3_gr.webp', 
			  nameTablet: 'northAmerica_3_mi.webp',
			  nameMobile: 'northAmerica_3_kl.webp', 
			  title: 'Paddelreise in der Wildnis Nordamerikas', 
			  alt: 'Paddelreise in der Wildnis Nordamerikas' 
			},
			{ name: 'northAmerica_4_gr.jpg', 
			  nameTablet: 'northAmerica_4_mi.jpg',
			  nameMobile: 'northAmerica_4_kl.jpg', 
			  title: 'Wildwasserreise Bonnet Plume River', 
			  alt: 'Wildwasserreise Bonnet Plume River' 
			},
			{ name: 'northAmerica_7_gr.webp', 
			  nameTablet: 'northAmerica_7_mi.webp',
			  nameMobile: 'northAmerica_7_kl.webp', 
			  title: 'Paddelreise in der Wildnis Nordamerikas', 
			  alt: 'Paddelreise in der Wildnis Nordamerikas' 
			},
			{ name: 'northAmerica_8_gr.jpg', 
			nameTablet: 'northAmerica_8_mi.jpg',
			nameMobile: 'northAmerica_8_kl.jpg', 
			title: 'Camp am Bonnet Plume River', 
			alt: 'Camp am Bonnet Plume Rivern' 
		  	},
			{ name: 'northAmerica_9_gr.jpg', 
			  nameTablet: 'northAmerica_9_mi.jpg',
			  nameMobile: 'northAmerica_9_kl.jpg', 
			  title: 'Wildwasserreise Yukon', 
			  alt: 'Wildwasserreise Yukon' 
			}
		],
		chile: [
			{ name: 'chile_8_gr.webp', 
			nameTablet: 'chile_8_mi.webp',
			nameMobile: 'chile_8_kl.webp', 
			title: 'Wildwasser Reise in Chile', 
			alt: 'Wildwasser Reise in Chile' 
		  	},
			{ name: 'chile_2_gr.webp', 
			  nameTablet: 'chile_2_mi.webp',
			  nameMobile: 'chile_2_kl.webp', 
			  title: 'Wildwasser am Rio Claro de Teno', 
			  alt: 'Wildwasser am Rio Claro de Teno' 
			},
			{ name: 'chile_3_gr.webp', 
			  nameTablet: 'chile_3_mi.webp',
			  nameMobile: 'chile_3_kl.webp', 
			  title: 'Wanderziel im Tal des Futaleufu', 
			  alt: 'Wanderziel im Tal des Futaleufu' 
			},
			{ name: 'chile_5_gr.webp', 
			  nameTablet: 'chile_5_mi.webp',
			  nameMobile: 'chile_5_kl.webp', 
			  title: 'Abgelegenes Wildwasser am Rio Figeroa im Süden von Chile', 
			  alt: 'Abgelegenes Wildwasser am Rio Figeroa im Süden von Chile' 
			},
			{ name: 'chile_4_gr.webp', 
			  nameTablet: 'chile_4_mi.webp',
			  nameMobile: 'chile_4_kl.webp', 
			  title: 'Traumhafte Flusslandschaften, Rio Puelo', 
			  alt: 'Traumhafte Flusslandschaften, Rio Puelo' 
			},
			{ name: 'chile_11_gr.webp', 
			  nameTablet: 'chile_11_mi.webp',
			  nameMobile: 'chile_11_kl.webp', 
			  title: 'Rio Petrohue in Chile', 
			  alt: 'Rio Petrohue in Chile' 
			},
			{ name: 'chile_6_gr.webp', 
			  nameTablet: 'chile_6_mi.webp',
			  nameMobile: 'chile_6_kl.webp', 
			  title: 'Wandern zwischen Araukanien in Chile', 
			  alt: 'Wandern zwischen Araukanien in Chile' 
			},
			{ name: 'chile_7_gr.webp', 
			  nameTablet: 'chile_7_mi.webp',
			  nameMobile: 'chile_7_kl.webp', 
			  title: 'Rodeo Training in Chile', 
			  alt: 'Rodeo Training in Chile' 
			},
			{ name: 'chile_1_gr.webp', 
			  nameTablet: 'chile_1_mi.webp',
			  nameMobile: 'chile_1_kl.webp', 
			  title: 'Der Fluss der Flüsse, Rio Futaleufu', 
			  alt: 'Der Fluss der Flüsse, Rio Futaleufu' 
		  	},
			{ name: 'chile_9_gr.webp', 
			  nameTablet: 'chile_9_mi.webp',
			  nameMobile: 'chile_9_kl.webp', 
			  title: 'Wildwasser, Rio Trancura', 
			  alt: 'Wildwasser, Rio Trancura' 
			},
			{ name: 'chile_10_gr.webp', 
			  nameTablet: 'chile_10_mi.webp',
			  nameMobile: 'chile_10_kl.webp', 
			  title: 'Rio San Pedro in Chile', 
			  alt: 'Rio San Pedro in Chile' 
			},
			{ name: 'chile_12_gr.webp', 
			  nameTablet: 'chile_12_mi.webp',
			  nameMobile: 'chile_12_kl.webp', 
			  title: 'Wildwasser Reise in Chile, auf dem Weg ins Puelo Tal', 
			  alt: 'Wildwasser Reise in Chile, auf dem Weg ins Puelo Tal' 
			}
		],
		durance: [
			{ name: 'durance_2_gr.webp', 
			nameTablet: 'durance_2_mi.webp',
			nameMobile: 'durance_2_kl.webp', 
			title: 'Guisane, ein Seitenfluss der Durance', 
			alt: 'Guisane, ein Seitenfluss der Durance' 
		  	},
			{ name: 'durance_1_gr.webp', 
			  nameTablet: 'durance_1_mi.webp',
			  nameMobile: 'durance_1_kl.webp', 
			  title: 'Wildwasser Reise an die Durance', 
			  alt: 'Wildwasser Reise an die Durance' 
			},
			{ name: 'durance_3_gr.webp', 
			  nameTablet: 'durance_3_mi.webp',
			  nameMobile: 'durance_3_kl.webp', 
			  title: 'Clareé, ein Seitenfluss der Durance', 
			  alt: 'Clareé, ein Seitenfluss der Durance' 
			},
			{ name: 'durance_4_gr.webp', 
			  nameTablet: 'durance_4_mi.webp',
			  nameMobile: 'durance_4_kl.webp', 
			  title: 'Paddeln auf der Durance', 
			  alt: 'Paddeln auf der Durance' 
			},
			{ name: 'durance_5_gr.webp', 
			  nameTablet: 'durance_5_mi.webp',
			  nameMobile: 'durance_5_kl.webp', 
			  title: 'Wildwasser Reise an die Durance', 
			  alt: 'Wildwasser Reise an die Durance' 
			}
		],
		engadin: [
			{ name: 'inn_1_gr.webp', 
			  nameTablet: 'inn_1_mi.webp',
			  nameMobile: 'inn_1_kl.webp', 
			  title: 'Kajakreise auf dem Inn', 
			  alt: 'Kajakreise auf dem Inn' 
		  	},
			{ name: 'inn_2_gr.webp', 
			  nameTablet: 'inn_2_mi.webp',
			  nameMobile: 'inn_2_kl.webp', 
			  title: 'Wildwasserreise im Open Canoe auf dem Inn', 
			  alt: 'Wildwasserreise im Open Canoe auf dem Inn' 
			},
			{ name: 'inn_3_gr.webp', 
			  nameTablet: 'inn_3_mi.webp',
			  nameMobile: 'inn_3_kl.webp', 
			  title: 'Wildwasser Reise im Engadin', 
			  alt: 'Wildwasser Reise im Engadin' 
			},
			{ name: 'inn_4_gr.webp', 
			  nameTablet: 'inn_4_mi.webp',
			  nameMobile: 'inn_4_kl.webp', 
			  title: 'Wildwasser paddeln in der Giarsun Schlucht auf dem Inn', 
			  alt: 'Wildwasser paddeln in der Giarsun Schlucht auf dem Inn' 
			},
			{ name: 'inn_5_gr.webp', 
			  nameTablet: 'inn_5_mi.webp',
			  nameMobile: 'inn_5_kl.webp', 
			  title: 'Wildwasserreise im Engadin', 
			  alt: 'Wildwasserreise im Engadin' 
			},
			{ name: 'inn_6_gr.webp', 
			  nameTablet: 'inn_6_mi.webp',
			  nameMobile: 'inn_6_kl.webp', 
			  title: 'Kanureise auf dem Inn', 
			  alt: 'Kanureise auf dem Inn' 
			},
			{ name: 'inn_7_gr.webp', 
			  nameTablet: 'inn_7_mi.webp',
			  nameMobile: 'inn_7_kl.webp', 
			  title: 'Im Open Canoe durch die Preussenschleuder auf dem Inn', 
			  alt: 'Im Open Canoe durch die Preussenschleuder auf dem Inn' 
			}
		]
	};

	function getImagesForSpecials() {
		return imageCarousel.specialImages;
	}

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

	function getImagesForKorsikaCarousel() {
		return imageCarousel.korsikaImages;
	}

	function getImagesForGriechenlandCarousel() {
		return imageCarousel.griechenlandImages;
	}

	function getImagesForSesiaCarousel() {
		return imageCarousel.sesiaImages;
	}

	function getImagesForSocaCarousel() {
		return imageCarousel.socaImages;
	}

	function getImagesForInnCarousel() {
		return imageCarousel.innImages;
	}

	function getImagesForGeorgienCarousel() {
		return imageCarousel.georgienImages;
	}

	function getImagesForAusfluege() {
		return imageCarousel.ausflugImages;
	}

	function getImagesForJoyOfWhitewater() {
		return imageCarousel.theJoyOfWhiteWaterImages;
	}

	function getAllCarouselImages() {
		return getImagesForJoyOfWhitewater().concat(getImagesForPaddelreisen(), getImagesForKajakkurse(), getImagesForPackraftkurse(), getImagesForKanadierkurse(), getImagesForKorsikaCarousel());
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

	function getTheFirstImageForKorsika() {
		return imageCarousel.korsikaImages[0];
	}

	function getTheFirstImageForGriechenland() {
		return imageCarousel.griechenlandImages[0];
	}

	function getTheFirstImageForSesia() {
		return imageCarousel.sesiaImages[0];
	}

	function getTheFirstImageForSoca() {
		return imageCarousel.socaImages[0];
	}

	function getTheFirstImageForInn() {
		return imageCarousel.innImages[0];
	}

	function getTheFirstImageForGeorgien() {
		return imageCarousel.georgienImages[0];
	}

	function getTheFirstImageForKajakkurse() {
		return imageCarousel.kajakkurseImages[0];
	}

	function getTheFirstImageForKanadierkurse() {
		return imageCarousel.kanadierkurseImages[0];
	}

	function getTheFirstImageForSpecials() {
		return imageCarousel.specialImages[0];
	}

	function getTheFirstImageForAusfluege() {
		return imageCarousel.ausflugImages[0];
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

	function getMobileImagesForKorsika() {
		return mobileImages.korsikaImages;
	}

	function getMobileImagesForGriechenland() {
		return mobileImages.griechenlandImages;
	}

	function getMobileImagesForSesia() {
		return mobileImages.sesiaImages;
	}

	function getMobileImagesForSoca() {
		return mobileImages.socaImages;
	}

	function getMobileImagesForInn() {
		return mobileImages.innImages;
	}

	function getMobileImagesForGeorgien() {
		return mobileImages.georgienImages;
	}

	function getMobileImagesForJoyOfWhitewater() {
		return mobileImages.theJoyOfWhiteWaterImages;
	}

	function getMobileImagesForSpecials() {
		return mobileImages.specialImages;
	}

	function getMobileImagesForAusfluege() {
		return mobileImages.ausflugImages;
	}
	

	function getImagesForSlider(nameOfImageSlider) {
		return imageSlider[nameOfImageSlider];
	}


	/**
	 * z.B.: https://joyofwhitewater/wildwasser-reisen/paddeln-auf-korsika.html
	 * Trennt den String 'paddeln-auf-korsika' bei den '-' und nimmt das letzte Wort aus dem Array.
	 * @returns string (Name des Ortes der Paddelreise)
	 */
	function getPaddleJourneyLocation () {
		if (location.pathname.split('/')[1].split('.')[0] === 'wildwasser-reisen') {
			return location.pathname.split('/')[2].split('.')[0].split('-').slice(-1)[0];
		}
	}


	// public api
	return {
		getAllCarouselImages,

		getImagesForKajakkurse,
		getImagesForKanadierkurse,
		getImagesForPaddelreisen,
	 	getImagesForKorsikaCarousel,
		getImagesForGriechenlandCarousel,
		getImagesForSesiaCarousel,
		getImagesForSocaCarousel,
		getImagesForInnCarousel,
		getImagesForGeorgienCarousel,
		getImagesForPackraftkurse,
		getImagesForJoyOfWhitewater,
		getImagesForSpecials,
		getImagesForAusfluege,

		getTheFirstImageForJoyOfWhitewater,
		getTheFirstImageForPackraftkurse,
		getTheFirstImageForPaddelreisen,
		getTheFirstImageForKorsika,
		getTheFirstImageForGriechenland,
		getTheFirstImageForSesia,
		getTheFirstImageForSoca,
		getTheFirstImageForInn,
		getTheFirstImageForGeorgien,
		getTheFirstImageForKajakkurse,
		getTheFirstImageForKanadierkurse,
		getTheFirstImageForSpecials,
		getTheFirstImageForAusfluege,

		getMobileImagesForKajakkurse,
		getMobileImagesForKanadierkurse,
		getMobileImagesForPaddelreisen,
		getMobileImagesForKorsika,
		getMobileImagesForGriechenland,
		getMobileImagesForSesia,
		getMobileImagesForSoca,
		getMobileImagesForInn,
		getMobileImagesForGeorgien,
		getMobileImagesForPackraftkurse,
		getMobileImagesForJoyOfWhitewater,
		getMobileImagesForSpecials,
		getMobileImagesForAusfluege,

		getImagesForSlider,
		getPaddleJourneyLocation
	};
})();
