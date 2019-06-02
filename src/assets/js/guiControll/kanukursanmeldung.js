// eslint-disable-next-line no-unused-vars
const CourseRegistration = (function (Validator) {
	const SHOW = 'js-show';

	const registrationData = {};

	let registrationForm;
	let sendRegistraitionFormButton;
	let courseNameInputField;
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

	let sendRegistraitionFormButtonOkIcon;
	let sendRegistraitionFormButtonNokIcon;

	let registrationButtons;


	function isCourseNameValid() {
		return Validator.isNameValid(courseNameInputField);
	}

	function isFirstNameValid() {
		return Validator.isNameValid(firstNameInputField);
	}

	function isSurNameValid() {
		return Validator.isNameValid(surNameInputField);
	}

	function isCourseDateValid() {
		return Validator.isDateValid(courseDateInputField);
	}

	function isAddressValid() {
		return Validator.isAddressValid(addressInputField);
	}

	function isPlzValid() {
		return Validator.isPlzValid(plzInputField);
	}

	function isPlaceValid() {
		return Validator.isNameValid(placeInputField);
	}

	function isEmailValid() {
		return Validator.isEMailValid(emailInputField);
	}

	function isNumberOfParticipantsValid() {
		return Validator.isNumberOfParticipantsValid(numberOfParticipantsInputField);
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
		registrationData.courseName = courseNameInputField.value;
		registrationData.courseDate = courseDateInputField.value;
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

		Server.sendRegistrationFormData(registrationData)
			.then((response) => {
				console.log(response);
				// Die Formular Daten konnten vom Server entgegengenommen werden, ein EMail wurde verschickt...
				RenderConfirmation.createRegistrationConfirmation(registrationData);
			})
			.catch((error) => {
				console.log(error.message);
				if (error.jow_message === 'email already used') {
					alert('Die E-Mail Adresse wurde schon verwendet. Hast du dich schon registriert?');
				}
			});
	}


	function callRegistrationForm(event) {
		console.log(event.target);
		event.stopPropagation();
		window.location.href = '/kanukursanmeldung.html?course=testKurs';
	}


	function init() {
		registrationButtons = document.querySelectorAll('.link-button-wrapper');
		if (registrationButtons !== null) {
			registrationButtons.forEach((registrationButton) => {
				registrationButton.addEventListener('click', (event) => {
					callRegistrationForm(event);
				});
			});
		}

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
					} else if (event.target && event.target.parentElement.matches('.equipment__all')) {
						equipmentTextArea.value = '';
						equipmentTextArea.setAttribute('disabled', 'disabled');
						equipmentAll.setAttribute('checked', 'true');
						equipmentNothing.removeAttribute('checked');
						equipmentSome.removeAttribute('checked');
					} else if (event.target && event.target.parentElement.matches('.equipment__nothing')) {
						equipmentTextArea.value = '';
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
		}
	}

	// public api
	return {
		init
	};
})(Validator, RenderConfirmation);
