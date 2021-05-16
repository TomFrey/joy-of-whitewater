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
					// Render Basis Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['B'], 'Kanukurs', '.course-list-wrapper-bCourse');
					// Render Aufbau Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['F'], 'Kanukurs', '.course-list-wrapper-fCourse');
					// Render WW III-IV Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['K'], 'Kanukurs', '.course-list-wrapper-kCourse');
					RenderCourseDates.createCourseListFor(courses, ['alle'], 'Eskimotieren', '.course-list-wrapper-rollCourse');

					RenderCourseDates.createCourseListFor(courses, ['B','F'], 'Packraft Kurs', '.course-list-wrapper-packraftCourse');

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
