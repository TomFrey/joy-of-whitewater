// eslint-disable-next-line no-unused-vars
const CourseDates = (function (RenderCourseDates, Dates) {
	let coursesFromStaticStorage;

	function getCoursesFromStaticStorage(){
		return coursesFromStaticStorage;
	}

	function init() {
		const promise = new Promise((resolve, reject) => {
			// alle Kursdaten lesen
			Service.call('GET', '/api/kurse.php') // http://localhost:3000/api/kurse.php
				.then(async (courses) => {
					// Datum vom Format yyyy-mm-dd ins Format yyyy/mm/dd konvertieren
					courses.forEach((course) => {
						course.vonDatum = Dates.convertToAllBrowsersReadableDate(course.vonDatum);
						course.bisDatum = Dates.convertToAllBrowsersReadableDate(course.bisDatum);
					});

					//Kurse in globaler Varibale speichern
					coursesFromStaticStorage = courses;

					// Render Level1 Basis Kajakkurse
					RenderCourseDates.createCourseListFor(courses, ['Level1'], 'Kanukurs', ['Kajak'], '.course-list-wrapper-level1KayakCourse');
					// Render Level2 Basis Kajakkurse
					RenderCourseDates.createCourseListFor(courses, ['Level2'], 'Kanukurs', ['Kajak'], '.course-list-wrapper-level2KayakCourse');
					// Render Level3 Aufbau Kajakkurse
					RenderCourseDates.createCourseListFor(courses, ['Level3'], 'Kanukurs', ['Kajak'], '.course-list-wrapper-level3KayakCourse');
					// Render Level4 Aufbau Kajakkurse
					RenderCourseDates.createCourseListFor(courses, ['Level4'], 'Kanukurs', ['Kajak'], '.course-list-wrapper-level4KayakCourse');
					// Render Level5 WW IV Kajakkurse
					RenderCourseDates.createCourseListFor(courses, ['Level5'], 'Kanukurs', ['Kajak'], '.course-list-wrapper-level5KayakCourse');

					// Render Level1 Kanadierkurse
					RenderCourseDates.createCourseListFor(courses, ['Level1'], 'Kanukurs', ['Kanadier'], '.course-list-wrapper-level1CanoeCourse');
					// Render Level2 Kanadierkurse
					RenderCourseDates.createCourseListFor(courses, ['Level2'], 'Kanukurs', ['Kanadier'], '.course-list-wrapper-level2CanoeCourse');
					// Render Level3 Kanadierkurse
					RenderCourseDates.createCourseListFor(courses, ['Level3'], 'Kanukurs', ['Kanadier'], '.course-list-wrapper-level3CanoeCourse');
					// Render Level4 Kanadierkurse
					RenderCourseDates.createCourseListFor(courses, ['Level4'], 'Kanukurs', ['Kanadier'], '.course-list-wrapper-level4CanoeCourse');
					// Render Level5 Kanadierkurse
					RenderCourseDates.createCourseListFor(courses, ['Level5'], 'Kanukurs', ['Kanadier'], '.course-list-wrapper-level5CanoeCourse');

					RenderCourseDates.createCourseListFor(courses, ['alle'], 'Eskimotieren', '.course-list-wrapper-rollCourse');

					RenderCourseDates.createCourseListFor(courses, ['Level2','Level3-Level4','Level5'], 'Packraft Kurs', ['Packraft'], '.course-list-wrapper-packraftCourse');

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
		loadAndRender: init,
		getCoursesFromStaticStorage
	};
})(RenderCourseDates, Dates);
