// eslint-disable-next-line no-unused-vars
const ContactForm = (function (Validator) {
    const SHOW = 'js-show';
    const SHOWANDFADE = 'js-fadeaway';
	const HIDE = 'js-hide';
	const INVALID = 'js-invalid';
    const contactFormData = {};

	let contactForm;
    let firstNameInputField;
    let surNameInputField;
    let emailInputField;
    let messageInputField;

    let sendContactFormButton;
    let sendContactFormButtonOkIcon;
    let sendContactFormButtonNokIcon;
    let contactFormInfoBox;

    let copyEMailButton;
    let copyEMailActionMessage;


    function copyEMailAddressToClipboard() {
        let eMailAddressWithMailto = Crypto.UnCryptMailto('nbjmup;nbjmAkpzpgxijufxbufs/di');
        let eMailAddress = eMailAddressWithMailto.slice(7, eMailAddressWithMailto.lenght);
        navigator.clipboard.writeText(eMailAddress).then(() => {
            showCopyEMailActionMessage();
        });
    }

    function showCopyEMailActionMessage() {
        copyEMailActionMessage = document.querySelector('.copy-email__action-message');
        copyEMailActionMessage.classList.add(SHOWANDFADE);
        setTimeout(function() {
            copyEMailActionMessage.classList.remove(SHOWANDFADE);
          }, 1200);
    }


	function isMessageValid() {
		let validationResult = Validator.minMaxNoEvilCharacters(messageInputField, 50, 5000)
		Validator.toggleFormFieldMessage(messageInputField, validationResult, false);
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

    function isEmailValid() {
		let validationResult = Validator.isEMailValid(emailInputField)
		Validator.toggleFormFieldMessage(emailInputField, validationResult);
		return validationResult.isValid;
	}


    /**
	 *	Prüft, ob das gesamte Kontaktformular korrekt ausgefüllt wurde.
	 *
	 *  @returns {boolean}
	 */
	function isContactFormValid() {
		if (isFirstNameValid()
			&& isSurNameValid()
			&& isEmailValid()
            && isMessageValid()
		) { return true; }
		return false;
	}

    function resetFormularData() {
        firstNameInputField.value = null;
        surNameInputField.value = null;
        emailInputField.value = null;
        messageInputField.value = null;

    }

    function setInfoBoxToSuccess() {
        const successInfo = document.createElement('span');
        successInfo.classList.add('contact-form__info-box__text');
        successInfo.innerText = 'Danke für deine Nachricht!';
        contactFormInfoBox.appendChild(successInfo);
    }

    function deleteInfoBoxContent() {
		while (contactFormInfoBox.firstChild) {
			contactFormInfoBox.removeChild(contactFormInfoBox.firstChild);
		}
    }

    function setContactFormInvalid() {
		sendContactFormButtonNokIcon.classList.add(SHOW);
		sendContactFormButtonOkIcon.classList.remove(SHOW);
	}

	function setContactFormValid() {
		sendContactFormButtonNokIcon.classList.remove(SHOW);
		sendContactFormButtonOkIcon.classList.add(SHOW);
        deleteInfoBoxContent();
	}

    /**
	 * Prüft die übergebene Funktion (das entsprechende Feld) und dann den Rest des Formulars.
	 * Und setzt dann das Formular valid oder invalid.
	 *
	 * @param isFieldValid
	 */
	function setFormValidity(isFieldValid) {
		if (isFieldValid() && isContactFormValid()) {
			setContactFormValid();
		} else {
			setContactFormInvalid();
		}
	}

    /**
	 *
	 */
	function sendFormData() {
        contactFormData.subject = 'Nachricht über TheJoyOfWhitewater';
		contactFormData.firstName = firstNameInputField.value;
		contactFormData.surName = surNameInputField.value;
		contactFormData.email = emailInputField.value;
		contactFormData.message = messageInputField.value;

		Server.sendFormDataWithMail(contactFormData)
			.then(() => {
                // Die Formular Daten konnten vom Server entgegengenommen werden, ein EMail wurde verschickt...
                resetFormularData();
                setContactFormInvalid();
                setInfoBoxToSuccess();
			})
			.catch((error) => {
				console.log(error);
				console.log('Fehlermeldung: ' + error.jow_message);
				// TODO: Dem Benutzer einer Fehlermeldung auf's GUI rendern.
			});
	}


	function fillUrlAttributeWithMessage (event){
		const urlParameter = event.target.getAttribute('message');
		window.location.href = '/kontakt.html?message=' + urlParameter;
	}


	function fillMessageFieldWithUrlAttribute (){
		const url = new URL(window.location.href);
		let message = url.searchParams.get('message');

		if (message != null ) {
			message = Validator.encodeUri(message);
			messageInputField.value = message;			
		}
	}


	function init() {
		//Listener auf alle Links setzen, die das Kontaktformular (mit vorgefülltem Text) aufrufen.
		const linksToContactForm = document.querySelectorAll('.link-to-filled-form');
		if (linksToContactForm !== null) {
			linksToContactForm.forEach((linkToContactForm) => {
				linkToContactForm.addEventListener('click', (event) => {
					fillUrlAttributeWithMessage(event);
				})
			});
		}

        copyEMailButton = document.querySelector('.copy-email__button');
		if (copyEMailButton !== null) {
			copyEMailButton.addEventListener('click', () => {
				copyEMailAddressToClipboard();
			});
		}

		contactForm = document.querySelector('.contact-form');
		
        if (contactForm !== null) {
			sendContactFormButtonOkIcon = document.querySelector('.send-button__icon.send-button__icon-ok');
			sendContactFormButtonNokIcon = document.querySelector('.send-button__icon.send-button__icon-nok');
            contactFormInfoBox = document.querySelector('.contact-form .contact-form__info-box');

			firstNameInputField = document.querySelector('.contact-form__firstname .moving-placeholder__input');
			firstNameInputField.addEventListener('blur', () => {
				setFormValidity(isFirstNameValid);
			});

			surNameInputField = document.querySelector('.contact-form__surname .moving-placeholder__input');
			surNameInputField.addEventListener('blur', () => {
				setFormValidity(isSurNameValid);
			});

			emailInputField = document.querySelector('.contact-form__email .moving-placeholder__input');
			emailInputField.addEventListener('blur', () => {
				setFormValidity(isEmailValid);
			});

            messageInputField = document.querySelector('.message-input');
			messageInputField.addEventListener('blur', () => {
				setFormValidity(isMessageValid);
			});

			// Listener auf dem 'Nachricht senden' Button
			sendContactFormButton = document.querySelector('.contact-form__send-button');
			if (sendContactFormButton !== null) {
				sendContactFormButton.addEventListener('click', () => {
					if (isContactFormValid()) {
						sendFormData();
					}
				});
			}

			// Das Feld mit dem Focus ist nie invalid.
			contactForm.addEventListener('focus', (event) => {
				event.target.classList.remove(INVALID);
				event.target.parentElement.classList.remove(INVALID);
				Validator.getErrorMessageField(event.target).classList.add(HIDE);
			}, true);

			fillMessageFieldWithUrlAttribute();
		}

		
	}

	// public api
	return {
		init
	};
})(Validator);
