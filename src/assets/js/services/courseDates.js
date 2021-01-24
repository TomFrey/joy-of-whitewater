// eslint-disable-next-line no-unused-vars
const CourseDates = (function (RenderCourseDates, Dates) {
	function init() {
		const promise = new Promise((resolve, reject) => {
			// alle Kursdaten lesen
			Service.call('GET', '/api/kurse.php') // http://localhost:3000/api/kurse.php
				.then((courses) => {
					// Datum vom Format yyyy-mm-dd ins Format yyyy/mm/dd konvertieren
					courses.forEach((course) => {
						course.vonDatum = Dates.convertToAllBrowsersReadableDate(course.vonDatum);
						course.bisDatum = Dates.convertToAllBrowsersReadableDate(course.bisDatum);
					});
					RenderCourseDates.createCourseListFor(courses, 'B', 'Kanukurs', '.course-list-wrapper-bCourse');
					RenderCourseDates.createCourseListFor(courses, 'F', 'Kanukurs', '.course-list-wrapper-fCourse')
					RenderCourseDates.createCourseListFor(courses, 'alle', 'Eskimotieren', '.course-list-wrapper-rollCourse')

					RenderCourseDates.createPaddleJourniesOverview(courses);
					RenderCourseDates.createPaddleJournies(courses);
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
})(RenderCourseDates, Dates);
