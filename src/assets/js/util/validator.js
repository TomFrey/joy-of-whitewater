// eslint-disable-next-line no-unused-vars
const Validator = (function () {
	const BACK_SPACE_CHAR = 8;
	const TAB_CHAR = 9;
	const validationResult = {
		isValid: true,
		message: ''
	};
	/* Die folgenden Zeichen sind nicht erlaubt: < > &     */
	const noEvilCharacterInString = new RegExp(/^[^<>&]*$/);

	/**
	 * Prüft ob ein String leer oder null ist. Leerzeichen gelten nicht als Zeichen.
	 * 
	 * @param {*} string 
	 * @returns 
	 */
	function isStringEmpty(string){
		if(string === null || string.trim() === ''){
			return true;
		}
		return false;
	}

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


	function checkFor(regex, inputField) {
		if (regex.test(inputField.value)) {	
			return true;
		}
		return false;
	}


	function checkForNo(regex, inputField) {
		if (regex.test(inputField.value)) {	
			return false;
		}
		return true;
	}


	// /**
	//  * Setzt eine Fehlermeldung und markiert das Feld entsprechend oder löscht die Fehlermeldung.
	//  * 
	//  * @param markParent  -> Wenn true, wird das Parent Objekt "markiert", sonst das Input Feld
	//  */
	// function toggleErrorMessage(inputField, errorMessage, markParent=true){


	// 	let errorMessageField = inputField.parentElement.parentElement.lastElementChild;

	// 	// console.log('inputField = '+inputField);
	// 	// console.log('inputField.parentElement = '+inputField.parentElement);
	// 	// console.log('inputField.parentElement.parentElement = '+inputField.parentElement.parentElement);
	// 	// console.log('errorMessageField = '+errorMessageField);


	// 	//let errorMessageField = document.querySelector('.form-error-message__'+fieldName);

	// 	//Feld nicht gültig
	// 	if (errorMessageField !== null) {

	// 		if (errorMessageField.classList.contains('js-hide')) {
	// 			errorMessageField.innerText = errorMessage;
	// 			errorMessageField.classList.remove('js-hide');
	// 			markParent?inputField.parentElement.classList.add('js-invalid'):inputField.classList.add('js-invalid');
	// 		} else {
	// 			errorMessageField.innerText = '';
	// 			errorMessageField.classList.add('js-hide');
	// 			markParent?inputField.parentElement.classList.remove('js-invalid'):inputField.classList.remove('js-invalid');
	// 		}
	// 	} 

	// }


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

		if (isStringEmpty(mailInputField.value)) {
			validationResult.isValid =  false;
			validationResult.message = 'Das Feld darf nicht leer sein.';
		} else if (checkForNo(isValidEMail, mailInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'Wird nicht als gültige E-Mail erkannt.';
		} else {
			validationResult.isValid = true;
			validationResult.message = '';
		}
		return validationResult;
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
	function noEvilCharacters(inputField) {
		validationResult.isValid = checkFor(noEvilCharacterInString, inputField);
		validationResult.message = 'Die folgenden Zeichen sind nicht erlaubt: < > &';
		
		return validationResult;
	}


	/**
	 * Prüft, ob der Text im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute, Zahlen und einige Sonderzeichen sind erlaubt.
	 * String darf nicht leer sein.
	 *
	 * @returns {boolean}
	 */
	 function isTextFieldNotEmptyValid(textInputField) {
		const isValidTextField = new RegExp(/^[\w\s\.\'\"\?\-)(,;:!öäüÖÄÜéàèçœøæåêÉÈÀÇÅËÊßẞśŚšŠ%]+$/);
		return validate(isValidTextField, textInputField, false);
	}


	/**
	 * Prüft, ob der Name (z.B. Vorname, Stadt...) im korrekten Format eingegeben wurde.
	 * Buchstaben, Leerzeichen, Umlaute und einige Sonderzeichen sind erlaubt.
	 *
	 * @returns {boolean}
	 */
	function isNameValid(nameInputField) {
		//const isValidName = new RegExp(/^[a-zA-Z\söüäéàèçœøæåêÖÜÄÉÈÀÇÅËÊßẞśŚšŠ,'\-]+$/);
		//return validate(isValidName, nameInputField);

		const noNumbers = new RegExp(/^[^0-9]*$/);

		if (isStringEmpty(nameInputField.value)) {
			validationResult.isValid =  false;
			validationResult.message = 'Das Feld darf nicht leer sein.';
		} else if (checkForNo(noEvilCharacterInString, nameInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'Die folgenden Zeichen sind nicht erlaubt: < > &';
		} else if (checkForNo(noNumbers, nameInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'Zahlen sind nicht erlaubt!';
		} else {
			validationResult.isValid = true;
			validationResult.message = '';
		}
		return validationResult;
	}


	/**
	 * Prüft, ob die Adresse (z.B. Stadtgartenstr. 12) im korrekten Format eingegeben wurde.
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
		//return validate(isValidDate, dateInputField);

		if (isStringEmpty(dateInputField.value)) {
			validationResult.isValid =  false;
			validationResult.message = 'Das Feld darf nicht leer sein.';
		} else if (checkForNo(isValidDate, dateInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'Datum im Format: TT.MM.JJ eingeben.';
		} else {
			validationResult.isValid = true;
			validationResult.message = '';
		}
		return validationResult;
	}


	/**
	 * Prüft, ob die PLZ (z.B. 6300, 22345, CH - 1234, D-23456) im korrekten Format eingegeben wurde.
	 * Vier bis 15 Stellen sind erlaubt.
	 *
	 * @returns {boolean}
	 */
	function isPlzValid(dateInputField) {
		//const isValidPlz = new RegExp(/^[a-zA-Z\s0-9\-]{4,15}$/);
		const isValidPlz = new RegExp(/^[a-zA-Z\s0-9\-]*$/);
		const minThreeChar = new RegExp(/^.{3,}$/);
		const maxFifteenChar = new RegExp(/^.{0,15}$/);

		if (isStringEmpty(dateInputField.value)) {
			validationResult.isValid =  false;
			validationResult.message = 'Das Feld darf nicht leer sein.';
		} else if (checkForNo(isValidPlz, dateInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'Erlaubt sind Buchstaben A-Z, Zahlen 0-9 und -';
		} else if (checkForNo(minThreeChar, dateInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'min. 3 Zeichen';
		} else if (checkForNo(maxFifteenChar, dateInputField)) {
			validationResult.isValid = false;
			validationResult.message = 'max. 15 Zeichen';
		} else {
			validationResult.isValid = true;
			validationResult.message = '';
		}
		return validationResult;
	}


	/**
	 * Prüft, ob die Anzahl Teilnehmer im korrekten Format eingegeben wurde.
	 * Erlaubt sind Zahlen von 1 bis 99.
	 *
	 * @returns {boolean}
	 */
	function isNumberOfParticipantsValid(dateInputField) {
		const isValidNumberOfParticipants = new RegExp(/^[1-9]{1,1}[0-9]{0,1}$/);
		//return validate(isValidNumberOfParticipants, dateInputField);

		validationResult.isValid = validate(isValidNumberOfParticipants, dateInputField);
		validationResult.message = 'Es sind nur Zahlen zwischen 1 und 99 erlaubt.';
		
		return validationResult;
	}


	/**
	 * Ein Text (aus der URL) wird von Sonderzeichen befreit (z.B.: ><). Danach werden im encodierten Text
	 * die Zeichen ' üöäÖÄÜ,' wieder ersetzt.
	 * @param {*} text 
 	 * @returns 
	 */
	function encodeUri(text) {
		let encodedText = encodeURIComponent(text);
		encodedText = encodedText.replace(/%20/g, " ");
		encodedText = encodedText.replace(/%C3%BC/g, "ü");
		encodedText = encodedText.replace(/%C3%9C/g, "Ü");
		encodedText = encodedText.replace(/%C3%A4/g, "ä");
		encodedText = encodedText.replace(/%C3%84/g, "Ä");
		encodedText = encodedText.replace(/%C3%B6/g, "ö");
		encodedText = encodedText.replace(/%C3%96/g, "Ö");
		encodedText = encodedText.replace(/%2C/g, ",");
		return encodedText;
	}


	/**
	 * Prüft den Input auf: darf nicht leer, keine Leerzeichen und keine bösen Zeichen wie: < > &
	 * 
	 * @param {*} inputField 
	 * @returns validationResult Object
	 */
	function notEmptyNoEvilCharacters(inputField) {

		if (isStringEmpty(inputField.value)) {
			validationResult.isValid =  false;
			validationResult.message = 'Das Feld darf nicht leer sein.';
		} else if (checkForNo(noEvilCharacterInString, inputField)) {
			validationResult.isValid = false;
			validationResult.message = 'Die folgenden Zeichen sind nicht erlaubt: < > &';
		} else {
			validationResult.isValid = true;
			validationResult.message = '';
		}
		return validationResult;
	}


	// public api
	return {
		onlyNumbers,
		isEMailValid,
		isPasswordValid,
		isTextFieldNotEmptyValid,
		isNameValid,
		isAddressValid,
		isDateValid,
		isPlzValid,
		isNumberOfParticipantsValid,
		validate,
		encodeUri,
		notEmptyNoEvilCharacters,
		noEvilCharacters
	};
})();
