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
	 * Sortiert nach der Gruppe der Paddelreise z.B. 'Piemont, Korsika...'
	 * @param courseDates
	 * @returns {*}
	 */
	function sortPaddleDestination(courseDates) {
		return courseDates.sort((a, b) => {
			if (b.paddelreiseGruppe < a.paddelreiseGruppe) {
				return 1;
			}
			if (b.paddelreiseGruppe > a.paddelreiseGruppe) {
				return -1;
			}
			return 0;
		});
	}

	/**
	 * Berechnet anhand des Datum wie viele Paddel- und Pausentage der Kurs beinhaltet
	 * und liefert einen String zurück, wie dies dargestellt werden soll.
	 * @param courseDates
	 * @returns a string mit der Anzahl Paddel- und Pausentagen
	 */
	function renderCourseDuration(courseDate){
		const courseDuration = Dates.calculateDurationBetweenTwoDates(courseDate.bisDatum, courseDate.vonDatum) - courseDate.anzahlPausentage;
		let courseDurationText;

		if (courseDate.anzahlPausentage === '0') {
			courseDurationText = courseDuration;
		} else if (courseDate.anzahlPausentage === '1') {
			courseDurationText = courseDuration + ' (plus ' + courseDate.anzahlPausentage + ' Tag Pause)'
		} else {
			courseDurationText = courseDuration + ' (plus ' + courseDate.anzahlPausentage + ' Tage Pause)'
		} 
		return courseDurationText;
	}

	/**
	 * Gruppiert die paddleJournies. D.h. liefert ein Array zurück mit so vielen Arrays wie es Gruppen gibt z.B.
	 *     [
	 * 			[{journeyA}, {journeyA}],
	 * 			[{journeyB}],
	 * 			[{journeyC}, {journeyC}, {journeyC}]
	 * 		]
	 * Gruppiert wird anhand von paddelreise_gruppe='...'.
	 * @param {*} paddleJournies 
	 * @returns an array mit den arrays der Gruppen
	 */
	function groupPaddleJournies(paddleJournies) {
		let paddleJourneyGroupArrays = [];
		let group = [];

		paddleJournies.forEach((journey, index, allJournies) => {
			//erster Lauf
			if (index === 0) {
				group.push(journey);
			//alle anderen Läufe
			} else {
				if (journey.paddelreiseGruppe === allJournies[index-1].paddelreiseGruppe) {
					group.push(journey);
				} else {
					paddleJourneyGroupArrays.push(group);
					group = [];
					group.push(journey);
				}
			}
			//letzter Lauf
			if (index === allJournies.length-1) {
				paddleJourneyGroupArrays.push(group);
			}
		});
		return paddleJourneyGroupArrays;
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
	 * Kreiert die Status Meldung für einen Kurs. Also z.B. 'green', 'blue', 'red' ...
	 * Innerhalb des Details (Also wenn der Drawer geöffnet wird.)
	 * @returns {HTMLElement}
	 */
	function createCourseItemDetailStatus(courseDate){
		const courseListItemDetailStatus = document.createElement('div');
		courseListItemDetailStatus.classList.add('course-list-item-detail__status');

		const courseListItemDetailStatusText = document.createElement('div');
		courseListItemDetailStatusText.innerText = courseDate.statusText;
		courseListItemDetailStatus.appendChild(courseListItemDetailStatusText);

		switch (courseDate.status) {
			case 'green':
				courseListItemDetailStatus.classList.add('course-list-item-detail__status-green');
				break;
			case 'yellow':
				courseListItemDetailStatus.classList.add('course-list-item-detail__status-yellow');
				break;
			case 'red':
				courseListItemDetailStatus.classList.add('course-list-item-detail__status-red');
				break;
			default:
				break;
		}

		return courseListItemDetailStatus;
	}



	function createADetailOfACourseListItem(title, text) {
		const gridX12DetailElement = document.createElement('div');
		gridX12DetailElement.classList.add('gridx12');

		const gridX12Col1 = document.createElement('div');
		gridX12Col1.classList.add('gridx12__width6--col1of2');
		if (title !== undefined && title !== '') {
			const titleOfDetailElement = document.createElement('h4');
			titleOfDetailElement.classList.add('course-list-detail__title');
			titleOfDetailElement.innerText = title;
			gridX12Col1.appendChild(titleOfDetailElement);
		}
		const textOfDetailElement = document.createElement('p');
		textOfDetailElement.innerHTML = text;
		gridX12Col1.appendChild(textOfDetailElement);

		const gridX12Col2 = document.createElement('div');
		gridX12Col2.classList.add('gridx12__width6--col2of2');

		gridX12DetailElement.appendChild(gridX12Col1);
		gridX12DetailElement.appendChild(gridX12Col2);

		return gridX12DetailElement;
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

		const courseItemStatus = document.createElement('div');
		courseItemStatus.classList.add('course-item__status-wrapper');

		switch (courseDate.status) {
			case 'green':
				courseItemStatus.classList.add('course-item__status-green');
				break;
			case 'yellow':
				courseItemStatus.classList.add('course-item__status-yellow');
				break;
			case 'red':
				courseItemStatus.classList.add('course-item__status-red');
				break;
			default:
				break;
		}
		const courseStatus = document.createElement('span');
		courseStatus.classList.add('course-item__status');
		courseItemStatus.appendChild(courseStatus);
		
		courseListItem.appendChild(courseItemStatus);
		courseListItem.appendChild(courseItemName);
		courseListItem.appendChild(courseItemPlace);
		courseListItem.appendChild(courseItemDuration);
		courseListItem.appendChild(courseItemDate);


		// create courseListItemDetail
		const courseListItemDetailStatus = createCourseItemDetailStatus(courseDate);
		const courseListItemDetail = document.createElement('div');
		courseListItemDetail.classList.add('course-list-item-detail');

		const courseListItemDetailContentWrapper = document.createElement('div');
		courseListItemDetailContentWrapper.classList.add('course-list-item-detail__content-wrapper');

		const gridX12Costs = document.createElement('div');
		gridX12Costs.classList.add('gridx12');

		const gridX12CostsCol1 = document.createElement('div');
		gridX12CostsCol1.classList.add('gridx12__width6--col1of2');
		const titleCosts = document.createElement('h4');
		titleCosts.classList.add('course-list-detail__title');
		titleCosts.innerText = 'Kosten';
		const costList = document.createElement('ul');
		const textCostCourse = document.createElement('li');

		//Es gibt mehrere Preise
		if (parseFloat(courseDate.preisMaterial) > 0) {
			textCostCourse.innerHTML = '<span class="course-list-detail__amount--part">' + parseFloat(courseDate.preisKurs) + '</span>';
			textCostCourse.innerHTML += 'Kurs';
			costList.appendChild(textCostCourse);
			
			const textCostEquipment = document.createElement('li');
			textCostEquipment.innerHTML = '<span class="course-list-detail__amount--part">' + parseFloat(courseDate.preisMaterial) + '</span>';
			textCostEquipment.innerHTML += 'gesamte Ausrüstung (falls benötigt)';
			costList.appendChild(textCostEquipment);
			
			const textCostTotal = document.createElement('li');
			const totalCost = parseFloat(courseDate.preisKurs) + parseFloat(courseDate.preisMaterial);
			textCostTotal.innerHTML = '<span class="course-list-detail__amount--total">' + totalCost + '</span>';
			textCostTotal.innerHTML += 'Total';
			costList.appendChild(textCostTotal);
		
		//Es gibt nur einen Preis (den Preis für den Kurs)
		} else {
			textCostCourse.innerHTML = '<span class="course-list-detail__amount--part">' + parseFloat(courseDate.preisKurs) + '</span>';
			costList.appendChild(textCostCourse);
		}
		gridX12CostsCol1.appendChild(titleCosts);
		gridX12CostsCol1.appendChild(costList);

		
		const gridX12CostsCol2 = document.createElement('div');
		gridX12CostsCol2.classList.add('gridx12__width5--col2of2');
		gridX12CostsCol2.classList.add('content-at-the-end');

		if (courseDate.typ === 'Paddelreise'){
			const detailsLink = document.createElement('a');
			detailsLink.classList.add('link-in-text');

			switch (courseDate.paddelreiseGruppe) {
				case 'Korsika':
					detailsLink.setAttribute('href', '/paddelreisen.html#paddleJourneyKorsikaAnchor');
					break;
				case 'Piemont':
					detailsLink.setAttribute('href', '/paddelreisen.html#paddleJourneyPiemontAnchor');
					break;
				case 'Soca':
					detailsLink.setAttribute('href', '/paddelreisen.html#paddleJourneySocaAnchor');
					break;
				default:
					detailsLink.setAttribute('href', '/paddelreisen.html');
					break;
			}

			detailsLink.innerText = 'weitere Details zu ' + courseDate.name;
			gridX12CostsCol2.appendChild(detailsLink);
		}

		if (courseDate.status !== 'red') {
			const linkButton = createLinkButton(courseDate);
			gridX12CostsCol2.appendChild(linkButton);
		}
		
		gridX12Costs.appendChild(gridX12CostsCol1);
		gridX12Costs.appendChild(gridX12CostsCol2);

		if (courseDate.beschreibung !== null &&
			courseDate.beschreibung !== undefined &&
			courseDate.beschreibung !== '') {
			courseListItemDetailContentWrapper.appendChild(createADetailOfACourseListItem('', courseDate.beschreibung));
		}

		if (courseDate.treffpunkt !== null &&
			courseDate.treffpunkt !== undefined &&
			courseDate.treffpunkt !== '') {
			courseListItemDetailContentWrapper.appendChild(createADetailOfACourseListItem('Treffpunkt', courseDate.treffpunkt));
		}

		courseListItemDetailContentWrapper.appendChild(gridX12Costs);

		if (courseDate.status !== 'blue') {
			courseListItemDetail.appendChild(courseListItemDetailStatus);
		}

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
		let list;
		let column1;
		let column2;

		const valueDateRange = Dates.convertToMediumWithoutYearDateFormat(courseDate.vonDatum)
			+ ' - '
			+ Dates.convertToMediumWithYearDateFormat(courseDate.bisDatum);
		const valueDuration = renderCourseDuration(courseDate);
		const valueLocation = courseDate.ort + ' (' + courseDate.land + ')';

		//Titel der Reise
		const paddelJourneyTitle = document.createElement('div');
		paddelJourneyTitle.classList.add('gridx12');

		column1 = document.createElement('div');
		column1.classList.add('gridx12__width5--col1of2');
		const courseName = document.createElement('h3');
		courseName.classList.add('title');
		courseName.innerText = courseDate.name;
		column1.appendChild(courseName);

		column2 = document.createElement('div');
		column2.classList.add('gridx12__width5--col2of2');

		paddelJourneyTitle.appendChild(column1);
		paddelJourneyTitle.appendChild(column2);


		//Kursort, Datum und der Treffpunkt
		const paddelJourneyTimePlace = document.createElement('div');
		paddelJourneyTimePlace.classList.add('gridx12');

		column1 = document.createElement('div');
		column1.classList.add('gridx12__width5--col1of2');
		list = document.createElement('ul');
		list.classList.add('text-container-drawer__list');
		list.appendChild(createListItemForPaddleJourney('Kursort', valueLocation));
		list.appendChild(createListItemForPaddleJourney('Datum', valueDateRange));
		list.appendChild(createListItemForPaddleJourney('Paddeltage', valueDuration));
		column1.appendChild(list);

		column2 = document.createElement('div');
		column2.classList.add('gridx12__width5--col2of2');
		const meetingPoint = document.createElement('div');
		meetingPoint.classList.add('text-container-drawer__meetingPoint');
		meetingPoint.innerText = courseDate.treffpunkt;
		column2.appendChild(meetingPoint);

		paddelJourneyTimePlace.appendChild(column1);
		paddelJourneyTimePlace.appendChild(column2);


		//Kurs Stufe und die Beschreibung zum Kurs
		const paddelJourneyDescription = document.createElement('div');
		paddelJourneyDescription.classList.add('gridx12');

		column1 = document.createElement('div');
		column1.classList.add('gridx12__width5--col1of2');
		list = document.createElement('ul');
		list.classList.add('text-container-drawer__list');
		list.appendChild(createListItemForPaddleJourney('Stufe', courseDate.kursStufe));
		list.appendChild(createListItemForPaddleJourney('Kursleitung', courseDate.guide));
		list.appendChild(createListItemForPaddleJourney('Preis', courseDate.preisKurs));
		column1.appendChild(list);

		column2 = document.createElement('div');
		column2.classList.add('gridx12__width5--col2of2');
		const description = document.createElement('div');
		description.classList.add('text-container-drawer__description');
		description.innerHTML = courseDate.beschreibung;
		column2.appendChild(description);

		paddelJourneyDescription.appendChild(column1);
		paddelJourneyDescription.appendChild(column2);


		//Anmelde Button ganz am Schluss
		const paddelJourneyRegistration = document.createElement('div');
		paddelJourneyRegistration.classList.add('gridx12');

		column1 = document.createElement('div');
		column1.classList.add('gridx12__width5--col1of2');

		column2 = document.createElement('div');
		column2.classList.add('gridx12__width5--col2of2');
		column2.classList.add('content-at-the-end');
		if (courseDate.status !== 'red') {
			const linkButton = createLinkButton(courseDate);
			column2.appendChild(linkButton);
		}

		paddelJourneyRegistration.appendChild(column1);
		paddelJourneyRegistration.appendChild(column2);

		//Item zusammensetzen
		const paddelJourneyItem = document.createElement('div');
		paddelJourneyItem.classList.add('paddleJourneyItem');
		paddelJourneyItem.appendChild(paddelJourneyTitle);
		paddelJourneyItem.appendChild(paddelJourneyTimePlace);
		paddelJourneyItem.appendChild(paddelJourneyDescription);
		paddelJourneyItem.appendChild(paddelJourneyRegistration);

		return paddelJourneyItem;
	}


	/**
	 * Sucht das Vorkommen aller Klassen z.B.: cssClass = 'course-list-wrapper-fCourse' und erstellt darin eine Liste
	 * mit allen Kursen vom courseType z.B.: 'Kanukurs', 'Eskimotieren' und courseLevels z.B.: ['B'], ['B','F'], ['alle'].
	 *
	 * @param courseDates  -> array (Eingang), mit allen Kursen, die gefiltert werden
	 * @param courseLevels  -> array (Filterwert), mit allen Leveln, die ausgefiltert werden sollen 
	 * @param courseType   -> (Filterwert), Kurstype, der ausgefiltert werden soll
	 * @param cssClass     -> css Klasse, wo die Liste gerendert wird
	 */
	function renderCourseListFor(courseDates, courseLevels, courseType, cssClass) {
		let courseDatesForLevel = courseDates.filter((courseDate) => {
			return courseDate.typ === courseType && courseLevels.indexOf(courseDate.kursStufe) != -1;
		});
		courseDatesForLevel = sortDatumAscending(courseDatesForLevel);

		const courseListWrappers = document.querySelectorAll(cssClass);
		if (courseListWrappers !== null) {
			courseListWrappers.forEach((courseListWrapper) => {
				const courseList = document.createElement('div');
				courseList.classList.add('course-list');

				// delete all current course dates
				while (courseListWrapper.firstChild) {
					courseListWrapper.removeChild(courseListWrapper.firstChild);
				}

				// add the course dates
				courseDatesForLevel.forEach((courseDate) => {
					const courseListItem = createCourseListItem(courseDate);
					courseList.appendChild(courseListItem);
				});

				courseListWrapper.appendChild(courseList);
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
	 * Sucht alle Reisen zusammen, anhand von typ='Paddelreise'. Und gruppiert diese dann nach Reiseorten
	 * anhand von paddelreise_gruppe='...'.
	 *
	 * Sucht für jede gefundene Reisegruppe nach dem Vorkommen von 'course-list-wrapper-paddleJourney+Name der Gruppe' und erstellt darin für
	 * jedes Reisedatum der Gruppe einen Eintrag. In der Genuss/Abenteuerreisen Abteilung.
	 * @param courseDates
	 */
	function renderListsForAllPaddleJournies(courseDates) {
		let paddleJournies = courseDates.filter((courseDate) => {
			return courseDate.typ === 'Paddelreise';
		});
		paddleJournies = sortPaddleDestination(paddleJournies);
		let paddleJourneyGroups = groupPaddleJournies(paddleJournies);

		//Für jede Paddelreise Gruppe den entsprechenden Wrapper im html suchen
		paddleJourneyGroups.forEach((paddleJourneyGroup) => {
			const courseListPaddleJourneyWrapper = document.querySelector('.course-list-wrapper-paddleJourney' + paddleJourneyGroup[0].paddelreiseGruppe);

			if (courseListPaddleJourneyWrapper !== null) {
				// delete all current children
				while (courseListPaddleJourneyWrapper.firstChild) {
					courseListPaddleJourneyWrapper.removeChild(courseListPaddleJourneyWrapper.firstChild);
				}
				paddleJourneyGroup = sortDatumAscending(paddleJourneyGroup);
				// add the course dates
				paddleJourneyGroup.forEach((paddleJourney) => {
					if (paddleJourney.status !== 'blue') {
						const courseListItemDetailStatus = createCourseItemDetailStatus(paddleJourney);
						courseListPaddleJourneyWrapper.appendChild(courseListItemDetailStatus);
					}
					const courseListItem = createPaddleJourneyItem(paddleJourney);
					courseListPaddleJourneyWrapper.appendChild(courseListItem);
				});
			}
		});
	}

	// public api
	return {
		createCourseListFor: renderCourseListFor,
		createPaddleJourniesOverview: renderListForPaddleJournies,
		createPaddleJournies: renderListsForAllPaddleJournies
	};
})(Dates, Globals);
