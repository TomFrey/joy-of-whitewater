// eslint-disable-next-line no-unused-vars
const Server = (function (Service) {
	/**
	 * Sendet dem Kunden ein Bestätigungsmail anhand seiner Daten aus dem
	 * Anmeldungsformular.
	 *
	 * @returns {Promise}
	 */
	function sendDataToServer(registrationFormData) {
		return Service.call('POST', '/api/mail.php', registrationFormData);
	}


	// Public api
	return {
		sendFormDataWithMail: sendDataToServer
	};
})(Service);
