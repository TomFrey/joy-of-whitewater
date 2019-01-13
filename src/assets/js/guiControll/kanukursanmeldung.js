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

	function isCourseDateValid() {
		return Validator.isDateValid(courseDateInputField);
	}

	/**
	 *	Prüft, ob das Zahlungsformular korrekt ausgefüllt wurde.
	 *
	 *  @returns {boolean}
	 */
	function isRegistraitionFormValid() {
		if (isCourseNameValid()
			&& isCourseDateValid()
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
				isRegistraitionFormValid();
			});

			courseDateInputField = document.querySelector('.anmeldung__date .moving-placeholder__input');
			courseDateInputField.addEventListener('blur', () => {
				isRegistraitionFormValid();
			})


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
