// eslint-disable-next-line no-unused-vars
var RenderConfirmation = (function () {
	function getEquipmentString(registrationData) {
		if (registrationData.equipment === 'all') {
			return 'Du benötigst die gesamte Ausrüstung.';
		}
		if (registrationData.equipment === 'nothing') {
			return 'Du benötigst keine Ausrüstung, du bringst alles selber mit.';
		}
		return registrationData.equipmentDetails;
	}

	function createRegistrationConfirmation(registrationData) {
		const registration = document.querySelector('.anmeldung');

		// delete all
		while (registration.firstChild) {
			registration.removeChild(registration.firstChild);
		}

		const title = document.createElement('h2');
		title.classList.add('title');
		title.innerText = 'Anmeldung';

		const confirmationText = document.createElement('div');
		confirmationText.classList.add('registration-confirmation');

		const anrede = document.createElement('p');
		anrede.classList.add('registration-confirmation__paragraph');
		anrede.innerHTML = 'Hallo ' + registrationData.firstName;

		const text = document.createElement('p');
		text.classList.add('registration-confirmation__paragraph');
		text.innerHTML = 'Danke für deine Anmeldung!<br>Sie wurde per E-Mail an unser Büro gesendet. Wir werden möglichst bald darauf antworten.';

		const tschuess = document.createElement('p');
		tschuess.classList.add('registration-confirmation__paragraph');
		tschuess.innerHTML = 'Liebe Grüsse<br>Joe';

		const adresse = document.createElement('p');
		adresse.classList.add('registration-confirmation__paragraph');
		adresse.innerHTML = '------------------- <br>'
							+ 'The Joy Of Whitewater <br>'
							+ 'mitLinXlernen AG <br>'
							+ 'Station Versam 7 <br>'
							+ 'CH - 7104 Versam <br><br>'
							+ 'Thomas (Joe) Frey<br>'
							+ '+41 79 391 63 61';

		const daten = document.createElement('p');
		daten.classList.add('registration-confirmation__paragraph');
		daten.innerHTML = 'Du hast uns folgende Informationen geschickt:<br><br>'
							+ registrationData.firstName + ' ' + registrationData.surName + '<br>'
							+ registrationData.address + '<br>'
							+ registrationData.plz + ' ' + registrationData.city + '<br>'
							+ registrationData.email + '<br><br>'
							+ 'Kurs: ' + registrationData.courseName + '<br>'
							+ 'Datum: ' + registrationData.courseDate + '<br>'
							+ 'Anzahl Personen: ' + registrationData.numberOfParticipants + '<br>'
							+ 'Ausrüstung: ' + getEquipmentString(registrationData);

		confirmationText.appendChild(anrede);
		confirmationText.appendChild(text);
		confirmationText.appendChild(daten);
		confirmationText.appendChild(tschuess);
		confirmationText.appendChild(adresse);

		registration.appendChild(title);
		registration.appendChild(confirmationText);
	}


	// public api
	return {
		createRegistrationConfirmation
	};
})();
