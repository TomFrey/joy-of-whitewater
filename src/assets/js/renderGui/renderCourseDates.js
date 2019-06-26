// eslint-disable-next-line no-unused-vars
const RenderCourseDates = (function (Dates, Globals) {
	/**
	 * Sortiert die Kursdaten nach vonDatum aufsteigend
	 * @param courseDates
	 * @returns {*}
	 */
	function sortDatumAscending(courseDates) {
		return courseDates.sort((a, b) => {
			if (b.vonDatum < a.vonDatum) {
				return 1;
			}
			if (b.vonDatum > a.vonDatum) {
				return -1;
			}
			return 0;
		});
	}

	/**
	 * Kreiert den 'Zur Anmeldung' Knopf
	 * @returns {HTMLElement}
	 */
	function createLinkButton(courseDate) {
		const linkButton = document.createElement('div');
		linkButton.classList.add('link-button');
		const linkButtonWrapper = document.createElement('a');
		linkButtonWrapper.classList.add('link-button-wrapper');
		linkButtonWrapper.classList.add('link-button-wrapper__courseRegistration');
		linkButtonWrapper.setAttribute('href', 'javascript:;');
		linkButtonWrapper.setAttribute('courseData', '?name=' + courseDate.name + '&vonDatum=' + courseDate.vonDatum);
		const linkButtonText = document.createElement('span');
		linkButtonText.classList.add('link-button-wrapper__label');
		linkButtonText.innerText = 'Zur Anmeldung';
		const linkButtonIcon = document.createElement('div');
		linkButtonIcon.classList.add('link-button-wrapper__icon');
		linkButtonWrapper.appendChild(linkButtonText);
		linkButtonWrapper.appendChild(linkButtonIcon);
		linkButton.appendChild(linkButtonWrapper);

		return linkButton;
	}

	/**
	 * Erstellt eine Liste mit Kursen:
	 *
	 * @param courseDate
	 * @returns {HTMLElement}
	 */
	function createCourseListItem(courseDate) {
		const breakPointLarge = Globals.get().breakpointLarge;

		const courseListItemWrapper = document.createElement('div');
		courseListItemWrapper.classList.add('course-list-item-wrapper');

		// create courseListItem
		const courseListItem = document.createElement('a');
		courseListItem.classList.add('course-list-item');
		courseListItem.setAttribute('href', 'javascript:;');

		const courseItemName = document.createElement('div');
		courseItemName.classList.add('course-item__name-wrapper');
		const courseName = document.createElement('span');
		courseName.classList.add('course-item__name');
		courseName.innerText = courseDate.name;
		courseItemName.appendChild(courseName);

		const courseItemPlace = document.createElement('div');
		courseItemPlace.classList.add('course-item__place-wrapper');
		const coursePlace = document.createElement('div');
		coursePlace.classList.add('course-item__place');
		const courseCity = document.createElement('span');
		courseCity.classList.add('course-place__city');
		courseCity.innerText = courseDate.ort;
		const courseCountry = document.createElement('span');
		courseCountry.classList.add('course-place__country');
		courseCountry.innerText = courseDate.land;
		coursePlace.appendChild(courseCity);
		coursePlace.appendChild(courseCountry);
		courseItemPlace.appendChild(coursePlace);

		const courseItemDuration = document.createElement('div');
		courseItemDuration.classList.add('course-item__duration-wrapper');
		const courseDuration = document.createElement('span');
		courseDuration.classList.add('course-item__duration');
		const calculatedDuration = Dates.calculateDurationBetweenTwoDates(courseDate.bisDatum, courseDate.vonDatum);
		courseDuration.innerText = calculatedDuration.toString();
		if (calculatedDuration > 1) {
			courseDuration.innerText += ' Tage';
		} else {
			courseDuration.innerText += ' Tag';
		}
		courseItemDuration.appendChild(courseDuration);

		const courseItemDate = document.createElement('div');
		courseItemDate.classList.add('course-item__date-wrapper');
		const courseD = document.createElement('div');
		courseD.classList.add('course-item__date');
		const courseFrom = document.createElement('span');
		courseFrom.classList.add('course-date__from');
		if (window.innerWidth >= breakPointLarge) {
			courseFrom.innerText = Dates.convertToMediumWithoutYearDateFormat(courseDate.vonDatum);
		} else {
			courseFrom.innerText = Dates.convertToShortWithoutYearDateFormat(courseDate.vonDatum);
		}

		const courseTo = document.createElement('span');
		courseTo.classList.add('course-date__to');
		if (window.innerWidth >= breakPointLarge) {
			courseTo.innerText = Dates.convertToMediumWithYearDateFormat(courseDate.bisDatum);
		} else {
			courseTo.innerText = Dates.convertToShortWithYearDateFormat(courseDate.bisDatum);
		}
		courseD.appendChild(courseFrom);
		courseD.appendChild(courseTo);
		courseItemDate.appendChild(courseD);

		courseListItem.appendChild(courseItemName);
		courseListItem.appendChild(courseItemPlace);
		courseListItem.appendChild(courseItemDuration);
		courseListItem.appendChild(courseItemDate);


		// create courseListItemDetail
		const courseListItemDetail = document.createElement('div');
		courseListItemDetail.classList.add('course-list-item-detail');

		const courseListItemDetailContentWrapper = document.createElement('div');
		courseListItemDetailContentWrapper.classList.add('course-list-item-detail__content-wrapper');

		const gridX12MeetingPoint = document.createElement('div');
		gridX12MeetingPoint.classList.add('gridx12');

		const gridX12Col1 = document.createElement('div');
		gridX12Col1.classList.add('gridx12__width6--col1of2');
		const titleMeetingPoint = document.createElement('h4');
		titleMeetingPoint.classList.add('course-list-detail__title');
		titleMeetingPoint.innerText = 'Treffpunkt:';
		const textMeetingPoint = document.createElement('p');
		textMeetingPoint.innerText = courseDate.treffpunkt;
		gridX12Col1.appendChild(titleMeetingPoint);
		gridX12Col1.appendChild(textMeetingPoint);

		const gridX12Col2 = document.createElement('div');
		gridX12Col2.classList.add('gridx12__width6--col2of2');

		gridX12MeetingPoint.appendChild(gridX12Col1);
		gridX12MeetingPoint.appendChild(gridX12Col2);


		const gridX12Costs = document.createElement('div');
		gridX12Costs.classList.add('gridx12');

		const gridX12CostsCol1 = document.createElement('div');
		gridX12CostsCol1.classList.add('gridx12__width6--col1of2');
		const titleCosts = document.createElement('h4');
		titleCosts.classList.add('course-list-detail__title');
		titleCosts.innerText = 'Kosten:';

		const costList = document.createElement('ul');
		const textCostCourse = document.createElement('li');
		textCostCourse.innerHTML = '<span class="course-list-detail__amount--part">' + parseFloat(courseDate.preisKurs) + '</span>';
		textCostCourse.innerHTML += 'für den Kurs';
		costList.appendChild(textCostCourse);
		if (parseFloat(courseDate.preisMaterial) > 0) {
			const textCostEquipment = document.createElement('li');
			textCostEquipment.innerHTML = '<span class="course-list-detail__amount--part">' + parseFloat(courseDate.preisMaterial) + '</span>';
			textCostEquipment.innerHTML += 'für die gesamte Ausrüstung';
			costList.appendChild(textCostEquipment);
		}
		const textCostTotal = document.createElement('li');
		const totalCost = parseFloat(courseDate.preisKurs) + parseFloat(courseDate.preisMaterial);
		textCostTotal.innerHTML = '<span class="course-list-detail__amount--total">' + totalCost + '</span>';
		textCostTotal.innerHTML += 'Total';
		costList.appendChild(textCostTotal);
		gridX12CostsCol1.appendChild(titleCosts);
		gridX12CostsCol1.appendChild(costList);

		const gridX12CostsCol2 = document.createElement('div');
		gridX12CostsCol2.classList.add('gridx12__width5--col2of2');
		gridX12CostsCol2.classList.add('content-at-the-end');

		if (courseDate.typ === 'Paddelreise'){
			const detailsLink = document.createElement('a');
			detailsLink.classList.add('link-in-text');
			detailsLink.setAttribute('href', '/paddelreisen.html#paddleJoureyKorsikaAnchor');
			detailsLink.innerText = 'weitere Details zu ' + courseDate.name;
			gridX12CostsCol2.appendChild(detailsLink);
		}
		const linkButton = createLinkButton(courseDate);
		gridX12CostsCol2.appendChild(linkButton);

		gridX12Costs.appendChild(gridX12CostsCol1);
		gridX12Costs.appendChild(gridX12CostsCol2);

		courseListItemDetailContentWrapper.appendChild(gridX12MeetingPoint);
		courseListItemDetailContentWrapper.appendChild(gridX12Costs);
		courseListItemDetail.appendChild(courseListItemDetailContentWrapper);

		courseListItemWrapper.appendChild(courseListItem);
		courseListItemWrapper.appendChild(courseListItemDetail);

		return courseListItemWrapper;
	}

	/**
	 * Kreiert ein li Element in der Liste der Paddelreisen (also nicht auf der Termin Übersicht)
	 * @param label
	 * @param value
	 * @returns {HTMLElement}
	 */
	function createListItemForPaddleJourney(label, value) {
		const listItem = document.createElement('li');
		listItem.classList.add('text-container-drawer__list-item');

		const listItemLabel = document.createElement('span');
		listItemLabel.classList.add('text-container-drawer-list__label');
		listItemLabel.innerText = label;

		const listItemValue = document.createElement('span');
		listItemValue.classList.add('text-container-drawer-list__value');
		if (label === 'Preis') {
			listItemValue.classList.add('amount-value');
		}
		listItemValue.innerText = value;

		listItem.appendChild(listItemLabel);
		listItem.appendChild(listItemValue);

		return listItem;
	}

	/**
	 * Kreiert einen Eintrag bei den Paddelreisen. Also wenn es zwei Mal nach Korsika geht, dann gibt es zwei
	 * Einträge.
	 * @param courseDate
	 * @returns {HTMLElement}
	 */
	function createPaddleJourneyItem(courseDate) {
		const valueDateRange = Dates.convertToMediumWithoutYearDateFormat(courseDate.vonDatum)
			+ ' - '
			+ Dates.convertToMediumWithYearDateFormat(courseDate.bisDatum);
		const valueDuration = Dates.calculateDurationBetweenTwoDates(courseDate.bisDatum, courseDate.vonDatum);
		const valueLocation = courseDate.ort + ' (' + courseDate.land + ')';

		const paddelJourneyItem = document.createElement('div');
		paddelJourneyItem.classList.add('gridx12');

		const column1 = document.createElement('div');
		column1.classList.add('gridx12__width5--col1of2');

		const courseName = document.createElement('h3');
		courseName.classList.add('title');
		courseName.innerText = courseDate.name;

		const list = document.createElement('ul');
		list.classList.add('text-container-drawer__list');
		list.appendChild(createListItemForPaddleJourney('Datum', valueDateRange));
		list.appendChild(createListItemForPaddleJourney('Paddeltage', valueDuration));
		list.appendChild(createListItemForPaddleJourney('Kursort', valueLocation));
		list.appendChild(createListItemForPaddleJourney('Stufe', courseDate.kursStufe));
		list.appendChild(createListItemForPaddleJourney('Kursleitung', courseDate.guide));
		list.appendChild(createListItemForPaddleJourney('Preis', courseDate.preisKurs));
		column1.appendChild(courseName);
		column1.appendChild(list);

		const column2 = document.createElement('div');
		column2.classList.add('gridx12__width5--col2of2');
		column2.classList.add('content-at-the-end');
		const linkButton = createLinkButton(courseDate);
		column2.appendChild(linkButton);

		paddelJourneyItem.appendChild(column1);
		paddelJourneyItem.appendChild(column2);
		return paddelJourneyItem;
	}


	/**
	 * Sucht das Vorkommen aller Klassen 'course-list-wrapper-bCourse' und erstellt darin eine Liste
	 * mit allen Kursen vom typ = 'Kanukurs' und kursStufe = 'B'.
	 *
	 * @param courseDates
	 */
	function renderCourseListForLevelB(courseDates) {
		let levelBCourseDates = courseDates.filter((courseDate) => {
			return courseDate.kursStufe === 'B' && courseDate.typ === 'Kanukurs';
		});
		levelBCourseDates = sortDatumAscending(levelBCourseDates);


		const courseListBWrappers = document.querySelectorAll('.course-list-wrapper-bCourse');

		if (courseListBWrappers !== null) {
			courseListBWrappers.forEach((courseListBWrapper) => {
				const courseList = document.createElement('div');
				courseList.classList.add('course-list');

				// delete all current images
				while (courseListBWrapper.firstChild) {
					courseListBWrapper.removeChild(courseListBWrapper.firstChild);
				}

				// add the course dates
				levelBCourseDates.forEach((levelBCourseDate) => {
					const courseListItem = createCourseListItem(levelBCourseDate);
					courseList.appendChild(courseListItem);
				});

				courseListBWrapper.appendChild(courseList);
			});
		}
	}


	/**
	 * Sucht das Vorkommen aller Klassen 'course-list-wrapper-fCourse' und erstellt darin eine Liste
	 * mit allen Kursen vom typ = 'Kanukurs' und kursStufe = 'F'.
	 *
	 * @param courseDates
	 */
	function renderCourseListForLevelF(courseDates) {
		let levelFCourseDates = courseDates.filter((courseDate) => {
			return courseDate.kursStufe === 'F' && courseDate.typ === 'Kanukurs';
		});
		levelFCourseDates = sortDatumAscending(levelFCourseDates);


		const courseListFWrappers = document.querySelectorAll('.course-list-wrapper-fCourse');

		if (courseListFWrappers !== null) {

			courseListFWrappers.forEach((courseListFWrapper) => {
				const courseList = document.createElement('div');
				courseList.classList.add('course-list');

				// delete all current images
				while (courseListFWrapper.firstChild) {
					courseListFWrapper.removeChild(courseListFWrapper.firstChild);
				}

				// add the course dates
				levelFCourseDates.forEach((levelFCourseDate) => {
					const courseListItem = createCourseListItem(levelFCourseDate);
					courseList.appendChild(courseListItem);
				});

				courseListFWrapper.appendChild(courseList);
			});
		}
	}


	/**
	 * Sucht das Vorkommen der Klasse 'course-list-wrapper-paddleJourney' und erstellt darin eine Liste
	 * mit allen Kursen vom typ = 'Paddelreise'.
	 *
	 * @param courseDates
	 */
	function renderListForPaddleJournies(courseDates) {
		let paddleJournies = courseDates.filter((courseDate) => {
			return courseDate.typ === 'Paddelreise';
		});
		paddleJournies = sortDatumAscending(paddleJournies);


		const courseListPaddleJourneyWrapper = document.querySelector('.course-list-wrapper-paddleJourney');

		if (courseListPaddleJourneyWrapper !== null) {
			const courseList = document.createElement('div');
			courseList.classList.add('course-list');

			// delete all current images
			while (courseListPaddleJourneyWrapper.firstChild) {
				courseListPaddleJourneyWrapper.removeChild(courseListPaddleJourneyWrapper.firstChild);
			}

			// add the course dates
			paddleJournies.forEach((paddleJourney) => {
				const courseListItem = createCourseListItem(paddleJourney);
				courseList.appendChild(courseListItem);
			});

			courseListPaddleJourneyWrapper.appendChild(courseList);
		}
	}

	/**
	 * Sucht nach dem Vorkommen von 'course-list-wrapper-paddleJourneyKorsika' und erstellt darin für
	 * jedes Korsika Datum einen Eintrag. In der Genuss/Abenteuerreisen Abteilung.
	 * @param courseDates
	 */
	function renderListForPaddleJourniesKorsika(courseDates) {
		let paddleJournies = courseDates.filter((courseDate) => {
			return courseDate.typ === 'Paddelreise' && courseDate.land === 'Korsika';
		});
		paddleJournies = sortDatumAscending(paddleJournies);

		const courseListPaddleJourneyWrapper = document.querySelector('.course-list-wrapper-paddleJourneyKorsika');

		if (courseListPaddleJourneyWrapper !== null) {
			// delete all current children
			while (courseListPaddleJourneyWrapper.firstChild) {
				courseListPaddleJourneyWrapper.removeChild(courseListPaddleJourneyWrapper.firstChild);
			}

			// add the course dates
			paddleJournies.forEach((paddleJourney) => {
				const courseListItem = createPaddleJourneyItem(paddleJourney);
				courseListPaddleJourneyWrapper.appendChild(courseListItem);
			});
		}
	}


	// public api
	return {
		createCourseLevelB: renderCourseListForLevelB,
		createCourseLevelF: renderCourseListForLevelF,
		createPaddleJourniesOverview: renderListForPaddleJournies,
		createPaddleJourneyKorsika: renderListForPaddleJourniesKorsika
	};
})(Dates, Globals);
