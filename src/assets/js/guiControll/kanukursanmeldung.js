// eslint-disable-next-line no-unused-vars
const CourseRegistration = (function (Validator, RenderConfirmation, Dates) {
	const SHOW = 'js-show';
	const HIDE = 'js-hide';
	const INVALID = 'js-invalid';

	const registrationData = {};

	let registrationForm;
	let sendRegistraitionFormButton;
	let courseNameInputField;

	let bootsTypInputField;
	let courseLevelInputField;

	let courseDateInputField;
	let firstNameInputField;
	let surNameInputField;
	let plzInputField;
	let addressInputField;
	let placeInputField;
	let emailInputField;
	let numberOfParticipantsInputField;
	let agbCheckbox;
	let equipment;
	let equipmentTextArea;
	let equipmentSelectedRadioButton;
	let equipmentAll;
	let equipmentSome;
	let equipmentNothing;
	let commentTextArea;

	let sendRegistraitionFormButtonOkIcon;
	let sendRegistraitionFormButtonNokIcon;

	
	// /**
	//  * Holt anhand des Input Feldes das Feld, wo die Error Meldung drin steht.
	//  * @param {*} inputField 
	//  * @returns 
	//  */
	// function getErrorMessageField(inputField){
	// 	return inputField.parentElement.parentElement.lastElementChild;
	// }


	// /**
	//  * Setzt die Error Meldung und den roten Rahmen an das Input Feld.
	//  * @param {*} inputField 
	//  * @param {*} errorMessage 
	//  * @param {*} markParent 
	//  */
	// function setErrorMessageOnFormField(inputField, errorMessage, markParent){
	// 	let errorMessageField = getErrorMessageField(inputField);
	// 	errorMessageField.innerText = errorMessage;
	// 	errorMessageField.classList.remove(HIDE);
	// 	markParent?inputField.parentElement.classList.add(INVALID):inputField.classList.add(INVALID);
	// }


	// /**
	//  * Löscht die Fehlermeldung und den roten Rahmen.
	//  * @param {*} inputField 
	//  * @param {*} markParent 
	//  */
	// function resetErrorMessageOnFormField(inputField, markParent){
	// 	let errorMessageField = getErrorMessageField(inputField);
	// 	errorMessageField.innerText = '';
	// 	errorMessageField.classList.add(HIDE);
	// 	markParent?inputField.parentElement.classList.remove(INVALID):inputField.classList.remove(INVALID);
	// }


	// /**
	//  * Setzt oder löscht die Fehlermeldung je nach Validation
	//  * @param {*} inputField 
	//  * @param {*} validationResult 
	//  * @param {*} markParent 
	//  */
	// function toggleFormFieldMessage (inputField, validationResult, markParent=true){
	// 	if (validationResult.isValid) {
	// 		resetErrorMessageOnFormField(inputField, markParent);
	// 	} else {
	// 		setErrorMessageOnFormField(inputField, validationResult.message, markParent);
	// 	}
	// }


	function isCourseNameValid() {
		let validationResult = Validator.notEmptyNoEvilCharacters(courseNameInputField)
		Validator.toggleFormFieldMessage(courseNameInputField, validationResult);
		return validationResult.isValid;
	}

	function isCommentValid() {
		let validationResult = Validator.noEvilCharacters(commentTextArea)
		Validator.toggleFormFieldMessage(commentTextArea, validationResult, false);
		return validationResult.isValid;
	}

	function isFirstNameValid() {
		let validationResult = Validator.isNameValid(firstNameInputField)
		Validator.toggleFormFieldMessage(firstNameInputField, validationResult);
		return validationResult.isValid;
	}

	function isSurNameValid() {
		let validationResult = Validator.isNameValid(surNameInputField)
		Validator.toggleFormFieldMessage(surNameInputField, validationResult);
		return validationResult.isValid;
	}

	function isCourseDateValid() {
		let validationResult = Validator.isDateValid(courseDateInputField)
		Validator.toggleFormFieldMessage(courseDateInputField, validationResult);
		return validationResult.isValid;
	}

	function isAddressValid() {
		let validationResult = Validator.notEmptyNoEvilCharacters(addressInputField)
		Validator.toggleFormFieldMessage(addressInputField, validationResult);
		return validationResult.isValid;
	}

	function isPlzValid() {
		let validationResult = Validator.isPlzValid(plzInputField)
		Validator.toggleFormFieldMessage(plzInputField, validationResult);
		return validationResult.isValid;
	}

	function isPlaceValid() {
		let validationResult = Validator.notEmptyNoEvilCharacters(placeInputField)
		Validator.toggleFormFieldMessage(placeInputField, validationResult);
		return validationResult.isValid;
	}

	function isEmailValid() {
		let validationResult = Validator.isEMailValid(emailInputField)
		Validator.toggleFormFieldMessage(emailInputField, validationResult);
		return validationResult.isValid;
	}

	function isNumberOfParticipantsValid() {
		let validationResult = Validator.isNumberOfParticipantsValid(numberOfParticipantsInputField)
		Validator.toggleFormFieldMessage(numberOfParticipantsInputField, validationResult);
		return validationResult.isValid;
	}

	function isEquipmentValid() {
		let validationResult = Validator.noEvilCharacters(equipmentTextArea)
		Validator.toggleFormFieldMessage(equipmentTextArea, validationResult, false);
		return validationResult.isValid;
	}


	function setRegistrationFormInvalid() {
		sendRegistraitionFormButtonNokIcon.classList.add(SHOW);
		sendRegistraitionFormButtonOkIcon.classList.remove(SHOW);
	}

	function setRegistrationFormValid() {
		sendRegistraitionFormButtonNokIcon.classList.remove(SHOW);
		sendRegistraitionFormButtonOkIcon.classList.add(SHOW);
	}


	/**
	 *	Prüft, ob das gesamte Zahlungsformular korrekt ausgefüllt wurde.
	 *
	 *  @returns {boolean}
	 */
	function isRegistrationFormValid() {
		if (isCourseNameValid()
			&& isCourseDateValid()
			&& isNumberOfParticipantsValid()
			&& isCommentValid()
			&& isEquipmentValid()
			&& isFirstNameValid()
			&& isSurNameValid()
			&& isAddressValid()
			&& isPlzValid()
			&& isPlaceValid()
			&& isEmailValid()
			&& agbCheckbox.checked
		) { return true; }
		return false;
	}


	/**
	 * Prüft die übergebene Funktion (das entsprechende Feld) und dann den Rest des Formulars.
	 * Und setzt dann das Formular valid oder invalid.
	 *
	 * @param isFieldValid
	 */
	function setRegistrationFormValidity(isFieldValid) {
		if (isFieldValid() && isRegistrationFormValid()) {
			setRegistrationFormValid();
		} else {
			setRegistrationFormInvalid();
		}
	}


	/**
	 *
	 */
	function sendFormData() {
		registrationData.subject = 'Anmeldung über TheJoyOfWhitewater';
		registrationData.courseName = courseNameInputField.value;
		registrationData.courseDate = courseDateInputField.value;

		registrationData.bootsTyp = bootsTypInputField.options[bootsTypInputField.selectedIndex].text;
		registrationData.courseLevel = courseLevelInputField.options[courseLevelInputField.selectedIndex].text;

		registrationData.numberOfParticipants = numberOfParticipantsInputField.value;
		registrationData.firstName = firstNameInputField.value;
		registrationData.surName = surNameInputField.value;
		registrationData.address = addressInputField.value;
		registrationData.plz = plzInputField.value;
		registrationData.city = placeInputField.value;
		registrationData.email = emailInputField.value;
		registrationData.agb = agbCheckbox.checked ? 'angenommen' : 'nicht angenommen';
		registrationData.equipment = equipmentSelectedRadioButton;
		registrationData.equipmentDetails = equipmentTextArea.value;
		registrationData.comment = commentTextArea.value;

		Server.sendFormDataWithMail(registrationData)
			.then((response) => {
				//console.log(response);
				// Die Formular Daten konnten vom Server entgegengenommen werden, ein EMail wurde verschickt...
				RenderConfirmation.createRegistrationConfirmation(registrationData);
			})
			.catch((error) => {
				console.log(error);
				console.log('Fehlermeldung: ' + error.jow_message);
				// TODO: Dem Benutzer einer Fehlermeldung auf's GUI rendern.
			});
	}


	function callRegistrationForm(event) {
		event.stopPropagation();
		// Kursname und Datum aus dem selber erstellten Attribut courseData holen
		const urlParameter = event.target.getAttribute('courseData');
		window.location.href = '/kanukursanmeldung.html' + urlParameter;
	}


	function addListenerToRegistrationButtons() {
		let registrationButtons = document.querySelectorAll('.link-button-wrapper__courseRegistration');
		if (registrationButtons !== null) {
			registrationButtons.forEach((registrationButton) => {
				registrationButton.addEventListener('click', (event) => {
					callRegistrationForm(event);
				});
			});
		}
	}



	/**
	 * Je nach Bootstyp (Kajak, Kanadier, Packraft) werden andere Kurslevel in die Dropdown Box
	 * gerendert.
	 * 
	 * @param {*} boatType 
	 * @returns Promise
	 */
	function setPossibleCourseLevels(boatType) {
		const kajakLevels = [{name: 'Level 1', value: 1}, 
							 {name: 'Level 2', value: 2}, 
							 {name: 'Level 3', value: 3},
							 {name: 'Level 4', value: 4}, 
							 {name: 'Level 5', value: 5}, 
							 {name: 'alle', value: 6}];
		const packraftLevels = [{name: 'Level 2', value: 2}, 
							    {name: 'Level 3&4', value: 3}, 
								{name: 'Level 5', value: 5}, 
								{name: 'alle', value: 6}];


		const promise = new Promise((resolve, reject) => {
			let selectBoatType;

			//boatType ist ein Objekt, wenn man den Bootstyp im Dropdown wechselt,
			//und ein String, wenn der Bootstyp aus der URL kommt.
			if (typeof boatType === 'object') {
				selectBoatType = boatType.target.value;
			} else {
				if (boatType === 'Packraft') {
					selectBoatType = '3';
				} else {
					selectBoatType = '1';
				}
			}

			function renderLevelDropdown(levels){
				// delete all current children
				while (courseLevelInputField.firstChild) {
					courseLevelInputField.removeChild(courseLevelInputField.firstChild);
				}

				levels.forEach((level) => {
					const optionEle = document.createElement('option');
					optionEle.setAttribute('value', level.value);
					optionEle.innerText = level.name;
					courseLevelInputField.appendChild(optionEle);
				})
			}

			switch (selectBoatType) {
				case '1':
				case '2':
				case '4':
					renderLevelDropdown(kajakLevels);
					break;
				case '3':
					renderLevelDropdown(packraftLevels);
					break;
				default:
					reject(new Error('unbekannter Bootstyp'));
			}
			resolve(selectBoatType);
		});
		return promise;
	}


	function convertBoatsTypeToDropdownPosition (boatType){
		switch (boatType) {
			case 'Kanadier':
				return 0;
			case 'Kajak':
				return 1;
			case 'Packraft':
				return 2;
			case 'alle':
				return 3;
			default:
				return 0;
		}
	}


	function convertCourseLevelToDropdownPosition (boatType, courseLevel){
		switch (boatType) {
			case 'Kanadier':
			case 'Kajak':
			case 'alle':
				switch (courseLevel) {
					case 'Level1':
					case 'Level 1':
						return 0;
					case 'Level2':
					case 'Level 2':
						return 1;
					case 'Level3':
					case 'Level 3':
						return 2;
					case 'Level4':
					case 'Level 4':
						return 3;
					case 'Level5':
					case 'Level 5':
						return 4;
					case 'alle':
						return 5;
					default:
						return 0;
				}
			case 'Packraft':
				switch (courseLevel) {
					case 'Level1':
					case 'Level 1':
					case 'Level2':
					case 'Level 2':
						return 0;
					case 'Level3-Level4':
					case 'Level 3&4':
					case 'Level 4':
					case 'Level 3':
					case 'Level4':
					case 'Level3':
						return 1;
					case 'Level5':
					case 'Level 5':
						return 2;
					case 'alle':
						return 3;
					default:
						return 0;
				}
		}
	}


	function clearAllSelectedElementsInDropdown(parentEle){
		let children = parentEle.children;
		for (let i = 0; i < children.length; i++) {
			children[i].removeAttribute('selected');
		}
	}


	function init() {
		// Listener auf allen 'Anmelden' Knöpfen
		addListenerToRegistrationButtons();

		registrationForm = document.querySelector('.anmeldung');
		if (registrationForm !== null) {
			sendRegistraitionFormButtonOkIcon = document.querySelector('.send-button__icon.send-button__icon-ok');
			sendRegistraitionFormButtonNokIcon = document.querySelector('.send-button__icon.send-button__icon-nok');

			courseNameInputField = document.querySelector('.anmeldung__course .moving-placeholder__input');
			courseNameInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isCourseNameValid);			
			});

			courseDateInputField = document.querySelector('.anmeldung__date .moving-placeholder__input');
			courseDateInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isCourseDateValid);
			});

			courseLevelInputField = document.querySelector('.dropdown-select select.dropdown-select__courseLevel');

			bootsTypInputField = document.querySelector('.dropdown-select select.dropdown-select__boatType');
			bootsTypInputField.addEventListener('change', (event) => {

				let currentCourseLevel =  courseLevelInputField.options[courseLevelInputField.selectedIndex].text;
				let currentBoatType = event.target.options[event.target.selectedIndex].text;

				//Die möglichen Kurslevel anhand des Bootstyp in die Dropdown Box rendern.
				setPossibleCourseLevels(event)
				.then(() => {
					//Der Kurslevel soll sich nicht ändern, wenn der Bootstyp geändert wird.
					courseLevelInputField.options[convertCourseLevelToDropdownPosition(currentBoatType, currentCourseLevel)].setAttribute('selected', 'selected');
				})
				.catch((error) => {
					console.log('Kurslevel konnten nicht gerendert werden. --> ' + error);
				});

			});
			
			numberOfParticipantsInputField = document.querySelector('.anmeldung__number-of-participants .moving-placeholder__input');
			numberOfParticipantsInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isNumberOfParticipantsValid);
			});

			firstNameInputField = document.querySelector('.anmeldung__vorname .moving-placeholder__input');
			firstNameInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isFirstNameValid);
			});

			surNameInputField = document.querySelector('.anmeldung__name .moving-placeholder__input');
			surNameInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isSurNameValid);
			});

			addressInputField = document.querySelector('.anmeldung__adresse .moving-placeholder__input');
			addressInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isAddressValid);
			});

			plzInputField = document.querySelector('.anmeldung__plz .moving-placeholder__input');
			plzInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isPlzValid);
			});

			placeInputField = document.querySelector('.anmeldung__ort .moving-placeholder__input');
			placeInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isPlaceValid);
			});

			emailInputField = document.querySelector('.anmeldung__email .moving-placeholder__input');
			emailInputField.addEventListener('blur', () => {
				setRegistrationFormValidity(isEmailValid);
			});

			agbCheckbox = document.querySelector('.agb-wrapper input');
			agbCheckbox.addEventListener('click', () => {
				if (agbCheckbox.checked && isRegistrationFormValid()) {
					setRegistrationFormValid();
				} else {
					setRegistrationFormInvalid();
				}
			});

			commentTextArea = document.querySelector('.comment-input');
			commentTextArea.addEventListener('blur', () => {
				setRegistrationFormValidity(isCommentValid);
			});


			equipment = document.querySelector('.equipment-wrapper');
			if (equipment !== null) {
				equipmentSelectedRadioButton = document.querySelector('.equipment-wrapper input[name=equipment]:checked').value;
				equipmentTextArea = document.querySelector('.equipment-needed-input');

				equipmentAll = document.querySelector('.equipment__all input');
				equipmentNothing = document.querySelector('.equipment__nothing input');
				equipmentSome = document.querySelector('.equipment__some input');

				// Eventlistener über alle Radiobuttons innerhalb der 'equipment-wrapper' Klasse
				equipment.addEventListener('click', (event) => {
					if (event.target && event.target.parentElement.matches('.equipment__some')) {
						equipmentTextArea.removeAttribute('disabled');
						equipmentSome.setAttribute('checked', 'true');
						equipmentAll.removeAttribute('checked');
						equipmentNothing.removeAttribute('checked');

						equipmentTextArea.addEventListener('blur', () => {
							setRegistrationFormValidity(isEquipmentValid);
						});
					} else if (event.target && event.target.parentElement.matches('.equipment__all')) {
						equipmentTextArea.value = '';
						setRegistrationFormValidity(isEquipmentValid);
						equipmentTextArea.setAttribute('disabled', 'disabled');
						equipmentAll.setAttribute('checked', 'true');
						equipmentNothing.removeAttribute('checked');
						equipmentSome.removeAttribute('checked');
					} else if (event.target && event.target.parentElement.matches('.equipment__nothing')) {
						equipmentTextArea.value = '';
						setRegistrationFormValidity(isEquipmentValid);
						equipmentTextArea.setAttribute('disabled', 'disabled');
						equipmentNothing.setAttribute('checked', 'checked');
						equipmentAll.removeAttribute('checked');
						equipmentSome.removeAttribute('checked');
					}
					equipmentSelectedRadioButton = document.querySelector('.equipment-wrapper input[name=equipment]:checked').value;
				});
			}


			// Listener auf dem 'Verbindlich anmelden' Button
			sendRegistraitionFormButton = document.querySelector('.anmeldung__send-button');
			if (sendRegistraitionFormButton !== null) {
				sendRegistraitionFormButton.addEventListener('click', () => {
					if (isRegistrationFormValid()) {
						sendFormData();
					}
				});
			}


			// Kursname, Datum ... aus der URL nehmen und in die Input Felder abfüllen
			const url = new URL(window.location.href);
			const name = Validator.encodeUri(url.searchParams.get('name'));
			const vonDatum = url.searchParams.get('vonDatum');
			const bootsTyp = encodeURIComponent(url.searchParams.get('bootsTyp'));
			const kursLevel = encodeURIComponent(url.searchParams.get('kursLevel'));
			if (name !== null && vonDatum !== null && bootsTyp !== null && kursLevel !== null) {
				courseNameInputField.setAttribute('value', name);
				courseDateInputField.setAttribute('value', Dates.convertToMediumDateFormatJustDigits(vonDatum));

				clearAllSelectedElementsInDropdown(bootsTypInputField);
				bootsTypInputField.options[convertBoatsTypeToDropdownPosition(bootsTyp)].setAttribute('selected', 'selected');

				//Kurslevel rendern
				setPossibleCourseLevels(bootsTyp)
				.then(() => {
					clearAllSelectedElementsInDropdown(courseLevelInputField);
					courseLevelInputField.options[convertCourseLevelToDropdownPosition(bootsTyp, kursLevel)].setAttribute('selected', 'selected');
				})
				.catch((error) => {
					console.log('Kurslevel konnte aus der URL nicht gerendert werden. --> ' + error);
				});

				
			}

			
			// Das Feld mit dem Focus ist nie invalid.
			registrationForm.addEventListener('focus', (event) => {
				event.target.classList.remove(INVALID);
				event.target.parentElement.classList.remove(INVALID);
				Validator.getErrorMessageField(event.target).classList.add(HIDE);
			}, true);
		}
	}

	// public api
	return {
		init,
		addListenerToRegistrationButtons
	};
})(Validator, RenderConfirmation, Dates);
