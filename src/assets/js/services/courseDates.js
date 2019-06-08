// eslint-disable-next-line no-unused-vars
const CourseDates = (function () {
	function init() {
		// alle Kursdaten lesen
		Service.call('GET', '/api/kurse.php')
			.then((response) => {
				console.log(response);

				// render Kursdaten
			})
			.catch((error) => {
				console.log(error);
				// unerlaubter Zugriff, auf die Startseite wechseln
				window.location.href = '/index.html';
			});
	}


	// public api
	return {
		init
	};
})();
