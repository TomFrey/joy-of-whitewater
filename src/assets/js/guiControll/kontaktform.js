// eslint-disable-next-line no-unused-vars
const ContactForm = (function (Validator, RenderConfirmation, Dates) {
    const SHOW = 'js-show';
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


	function isMessageValid() {
		return Validator.isTextFieldNotEmptyValid(messageInputField);
	}

	function isFirstNameValid() {
		return Validator.isNameValid(firstNameInputField);
	}

	function isSurNameValid() {
		return Validator.isNameValid(surNameInputField);
	}

    function isEmailValid() {
		return Validator.isEMailValid(emailInputField);
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


	function init() {
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
				event.target.classList.remove('js-invalid');
				event.target.parentElement.classList.remove('js-invalid');
			}, true);
		}
	}

	// public api
	return {
		init
	};
})(Validator, RenderConfirmation, Dates);
