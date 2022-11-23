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
					// Render Level1 Basis Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['Level1'], 'Kanukurs', '.course-list-wrapper-level1Course');
					// Render Level2 Basis Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['Level2'], 'Kanukurs', '.course-list-wrapper-level2Course');
					// Render Level3 Aufbau Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['Level3'], 'Kanukurs', '.course-list-wrapper-level3Course');
					// Render Level4 Aufbau Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['Level4'], 'Kanukurs', '.course-list-wrapper-level4Course');
					// Render Level5 WW IV Kanukurse
					RenderCourseDates.createCourseListFor(courses, ['Level5'], 'Kanukurs', '.course-list-wrapper-level5Course');

					RenderCourseDates.createCourseListFor(courses, ['alle'], 'Eskimotieren', '.course-list-wrapper-rollCourse');

					RenderCourseDates.createCourseListFor(courses, ['Level2','Level3-Level4','Level5'], 'Packraft Kurs', '.course-list-wrapper-packraftCourse');

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
