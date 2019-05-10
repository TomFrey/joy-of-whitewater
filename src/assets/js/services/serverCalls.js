// eslint-disable-next-line no-unused-vars
const Server = (function (Service) {
	/**
	 * Speichert alle gekauften Tickets eines Users auf der DB.
	 * Mehrere Tickets von mehreren Festivals sind möglich.
	 *
	 * @returns {Promise}
	 */
	function sendDataToServer(registrationFormData) {
		return Service.call('POST', '/api/sendRegistrationFormEmail.php', registrationFormData);
	}


	// Public api
	return {
		sendRegistrationFormData: sendDataToServer
	};
})(Service);
