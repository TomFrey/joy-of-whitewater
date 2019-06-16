// eslint-disable-next-line no-unused-vars
const CourseDates = (function (RenderCourseDates) {
	function init() {
		const promise = new Promise((resolve, reject) => {

			// alle Kursdaten lesen
			Service.call('GET', '/api/kurse.php') // http://localhost:3000/api/kurse.php
				.then((response) => {
					console.log(response);
					RenderCourseDates.createCourseLevelB(response);
					RenderCourseDates.createCourseLevelF(response);
					RenderCourseDates.createPaddleJourney(response);
					resolve();
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});

		return promise;
	}


	// public api
	return {
		loadAndRender: init
	};
})(RenderCourseDates);
