// eslint-disable-next-line no-unused-vars
const CourseRegistration = (function (Validator) {
	const SHOW = 'js-show';

	let ticketData = [];


	const registerData = {};

	let paymentKindDropdown;
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

	let sendRegistraitionFormButtonOkIcon;
	let sendRegistraitionFormButtonNokIcon

	/**
	 * Prüft, ob die Kreditkartennummer im korrekten Format eingegen wurde.
	 * Nur Ganzzahlen in vier Vierergruppen. z.B.: 1234-3453-5345-4677
	 *
	 * @returns {boolean}
	 */
	function isCreditCardNumberValid() {
		const isValidCreditCardNumber = new RegExp(/([0-9]{4}-){3}[0-9]{4}$/);
		return Validator.validate(isValidCreditCardNumber, paymentData.creditCardNumberInputField);
	}

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


	/**
	 *	Prüft, ob das Zahlungsformular korrekt ausgefüllt wurde.
	 *
	 *  @returns {boolean}
	 */
	function isRegistraitionFormValid() {
		if (isCourseNameValid()
			&& isCourseDateValid()
			&& isNumberOfParticipantsValid()
			&& isFirstNameValid()
			&& isSurNameValid()
			&& isAddressValid()
			&& isPlzValid()
			&& isPlaceValid()
			&& isEmailValid()
		) {
			sendRegistraitionFormButtonNokIcon.classList.remove(SHOW);
			sendRegistraitionFormButtonOkIcon.classList.add(SHOW);
			return true;
		}
		sendRegistraitionFormButtonNokIcon.classList.add(SHOW);
		sendRegistraitionFormButtonOkIcon.classList.remove(SHOW);
		return false;
	}


	/**
	 *
	 */
	function sendRegistraitionFormData() {

	}


	function init() {
		registrationForm = document.querySelector('.anmeldung');
		if (registrationForm !== null) {
			sendRegistraitionFormButtonOkIcon = document.querySelector('.send-button__icon.send-button__icon-ok');
			sendRegistraitionFormButtonNokIcon = document.querySelector('.send-button__icon.send-button__icon-nok');

			courseNameInputField = document.querySelector('.anmeldung__course .moving-placeholder__input');
			courseNameInputField.addEventListener('blur', () => {
				if (isCourseNameValid()) {
					isRegistraitionFormValid();
				}
			});

			courseDateInputField = document.querySelector('.anmeldung__date .moving-placeholder__input');
			courseDateInputField.addEventListener('blur', () => {
				if (isCourseDateValid()) {
					isRegistraitionFormValid();
				}
			});

			numberOfParticipantsInputField = document.querySelector('.anmeldung__number-of-participants .moving-placeholder__input');
			numberOfParticipantsInputField.addEventListener('blur', () => {
				if (isNumberOfParticipantsValid()) {
					isRegistraitionFormValid();
				}
			});

			firstNameInputField = document.querySelector('.anmeldung__vorname .moving-placeholder__input');
			firstNameInputField.addEventListener('blur', () => {
				if (isFirstNameValid()) {
					isRegistraitionFormValid();
				}
			});

			surNameInputField = document.querySelector('.anmeldung__name .moving-placeholder__input');
			surNameInputField.addEventListener('blur', () => {
				if (isSurNameValid()) {
					isRegistraitionFormValid();
				}
			});

			addressInputField = document.querySelector('.anmeldung__adresse .moving-placeholder__input');
			addressInputField.addEventListener('blur', () => {
				if (isAddressValid()) {
					isRegistraitionFormValid();
				}
			});

			plzInputField = document.querySelector('.anmeldung__plz .moving-placeholder__input');
			plzInputField.addEventListener('blur', () => {
				if (isPlzValid()) {
					isRegistraitionFormValid();
				}
			});

			placeInputField = document.querySelector('.anmeldung__ort .moving-placeholder__input');
			placeInputField.addEventListener('blur', () => {
				if (isPlaceValid()) {
					isRegistraitionFormValid();
				}
			});

			emailInputField = document.querySelector('.anmeldung__email .moving-placeholder__input');
			emailInputField.addEventListener('blur', () => {
				if (isEmailValid()) {
					isRegistraitionFormValid();
				}
			});

			agbCheckbox = document.querySelector('.agb-wrapper input');
			agbCheckbox.addEventListener('click', () => {
				if (isEmailValid()) {
					isRegistraitionFormValid();
				}
			});


			// Listener auf dem 'Verbindlich anmelden' Button
			sendRegistraitionFormButton = document.querySelector('.anmeldung__send-button');
			if (sendRegistraitionFormButton !== null) {
				sendRegistraitionFormButton.addEventListener('click', () => {
					if (isRegistraitionFormValid()) {
						sendRegistraitionFormData();
					}
				});
			}
		}

		// registerData.courseNameInputField = document.querySelector('.anmeldung__course .moving-placeholder__input');

		/* paymentForm = document.querySelector('.payment-box__wrapper');
		if (paymentForm !== null) {
			paymentForm.addEventListener('keydown', (event) => {
				if (event.target && event.target.matches('.payment-box__credit-card-number .moving-placeholder__input')) {
					Validator.onlyNumbers(event);
					autoCompleteBlocksOfNumbersWithACertainCharacter(event, '-', 4, 19);
				}

				if (event.target && event.target.matches('.payment-box__expire-date .moving-placeholder__input')) {
					Validator.onlyNumbers(event);
					autoCompleteBlocksOfNumbersWithACertainCharacter(event, '/', 2, 5);
				}

				if (event.target && event.target.matches('.payment-box__cvc__input .moving-placeholder__input')) {
					Validator.onlyNumbers(event);
				}
			});
		} */
	}

	// public api
	return {
		init
	};
})(Validator);
