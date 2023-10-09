// eslint-disable-next-line no-unused-vars
const Validator = (function () {
	const BACK_SPACE_CHAR = 8;
	const TAB_CHAR = 9;


	/**
	 * Validiert den Inhalt eines Inputfeldes mit einem vorgegebenen Regex und setzt auf dem entsprechenden
	 * HTML Feld eine css Klasse, um das Feld zu stylen.
	 *
	 * @param regex       -> ein Regex Objekt
	 * @param inputField  -> DOM Inputfeld
	 * @param markParent  -> Wenn true, wird das Parent Objekt "markiert", sonst das Input Feld
	 * @returns {boolean}
	 */
	function validate(regex, inputField, markParent=true) {
		if (regex.test(inputField.value)) {
			markParent?inputField.parentElement.classList.remove('js-invalid'):inputField.classList.remove('js-invalid');
			return true;
		}

		//Test
		// Alle korrekten Zeichen ersetzen mit '', damit nur die falschen übrig bleiben.
		// let wrongCharacter = inputField.value.replace(regex, '');
		// console.log('inputField :' + inputField.value);
		// console.log('Falsch ist :' + wrongCharacter);
		
		markParent?inputField.parentElement.classList.add('js-invalid'):inputField.classList.add('js-invalid');
		return false;
	}


	/**
	 * Verhindert, dass andere Zeichen, wie Ganzzahlen (0-9) in ein Input Feld geschrieben werden können.
	 * Tab (Charcode 9) und Backspace (Charcode 8) sind allerdings immer noch möglich. Damit die Eingabe wieder
	 * gelöscht oder das Feld wieder verlassen werden kann.
	 *
	 * @param event
	 * @returns {boolean}
	 */
	function onlyNumbers(event) {
		var charCode = event.keyCode || event.which;

		// wenn Shift gedrückt ist, dann nur Tab ermöglichen
		if (event.shiftKey === true) {
			// Tab ist ok
			if (charCode === TAB_CHAR) {
				return true;
			}
			event.preventDefault();
		}
		// Zahlen liegen zwischen 48 und 57
		if (charCode > 57) {
			event.preventDefault();
		}
		if (charCode === BACK_SPACE_CHAR) {
			return true;
		}
		// keine Leerzeichen
		if (charCode === 32) {
			event.preventDefault();
		}
		return true;
	}


	/**
	 * Prüft, ob es sich um eine EMail Adresse handelt.
	 * Der Regex stamm von: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	 *
	 * @returns {boolean}
	 */
	function isEMailValid(mailInputField) {
		const isValidEMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

		if (isValidEMail.test(mailInputField.value)) {
			mailInputField.parentElement.classList.remove('js-invalid');
			return true;
		}
		mailInputField.parentElement.classList.add('js-invalid');
		return false;
	}


	/**
	 * Prüft, ob das Passwort mindestens acht Zeichen lang ist.
	 *
	 * @returns {boolean}
	 */
	function isPasswordValid(passwordInputField) {
		if (passwordInputField.value.length > 7) {
			passwordInputField.classList.remove('js-invalid');
			return true;
		}
		passwordInputField.classList.add('js-invalid');
		return false;
	}


	/**
	 * Prüft, ob der Text im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute, Zahlen und einige Sonderzeichen sind erlaubt.
	 * String darf leer sein.
	 *
	 * @returns {boolean}
	 */
	 function isTextFieldValid(textInputField) {
		const isValidTextField = new RegExp(/^[\w\s\.\'\"\?\-)(,;:!öäüÖÄÜéàèçœøæåêÉÈÀÇÅËÊßẞśŚšŠ]*$/);
		return validate(isValidTextField, textInputField, false);
	}


	/**
	 * Prüft, ob der Text im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute, Zahlen und einige Sonderzeichen sind erlaubt.
	 * String darf nicht leer sein.
	 *
	 * @returns {boolean}
	 */
	 function isTextFieldNotEmptyValid(textInputField) {
		const isValidTextField = new RegExp(/^[\w\s\.\'\"\?\-)(,;:!öäüÖÄÜéàèçœøæåêÉÈÀÇÅËÊßẞśŚšŠ]+$/);
		return validate(isValidTextField, textInputField, false);
	}


	/**
	 * Prüft, ob die Kursbezeichnung im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute, Zahlen und einige Sonderzeichen sind erlaubt.
	 *
	 * @returns {boolean}
	 */
	 function isCourseNameValid(courseNameInputField) {
		const isValidCourseName = new RegExp(/^[a-zA-Z\s0-9öüäéàèçœøæåêÖÜÄÉÈÀÇÅËÊßẞśŚšŠ(),\-]+$/);
		return validate(isValidCourseName, courseNameInputField);
	}


	/**
	 * Prüft, ob der Name (z.B. Vorname, Stadt...) im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute und einige Sonderzeichen sind erlaubt.
	 *
	 * @returns {boolean}
	 */
	function isNameValid(nameInputField) {
		const isValidName = new RegExp(/^[a-zA-Z\söüäéàèçœøæåêÖÜÄÉÈÀÇÅËÊßẞśŚšŠ,\-]+$/);
		return validate(isValidName, nameInputField);
	}


	/**
	 * Prüft, ob die Adress (z.B. Stadtgartenstr. 12) im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute und einige Sonderzeichen sind erlaubt.
	 *
	 * @returns {boolean}
	 */
	function isAddressValid(addressInputField) {
		const isValidAddress = new RegExp(/^[a-zA-Z\s0-9öüäéàèçœøæåêÖÜÄÉÈÀÇÅËÊßẞśŚšŠ,\-\.]+$/);
		return validate(isValidAddress, addressInputField);
	}


	/**
	 * Prüft, ob das Datum (z.B. 12.09.2020 oder 2.3.16) im korrekten Format eingegeben wurde.
	 * Der Regex stamm von: https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
	 * und wurde leicht verändert.
	 *
	 * @returns {boolean}
	 */
	function isDateValid(dateInputField) {
		const isValidDate = new RegExp(/^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
		return validate(isValidDate, dateInputField);
	}


	/**
	 * Prüft, ob die PLZ (z.B. 6300, 22345, CH - 1234, D-23456) im korrekten Format eingegeben wurde.
	 * Vier bis 15 Stellen sind erlaubt.
	 *
	 * @returns {boolean}
	 */
	function isPlzValid(dateInputField) {
		const isValidPlz = new RegExp(/^[a-zA-Z\s0-9\-]{4,15}$/);
		return validate(isValidPlz, dateInputField);
	}


	/**
	 * Prüft, ob die Anzahl Teilnehmer im korrekten Format eingegeben wurde.
	 * Erlaubt sind Zahlen von 1 bis 99.
	 *
	 * @returns {boolean}
	 */
	function isNumberOfParticipantsValid(dateInputField) {
		const isValidNumberOfParticipants = new RegExp(/^[1-9]{1,1}[0-9]{0,1}$/);
		return validate(isValidNumberOfParticipants, dateInputField);
	}


	// public api
	return {
		onlyNumbers,
		isEMailValid,
		isPasswordValid,
		isTextFieldValid,
		isTextFieldNotEmptyValid,
		isCourseNameValid,
		isNameValid,
		isAddressValid,
		isDateValid,
		isPlzValid,
		isNumberOfParticipantsValid,
		validate
	};
})();
