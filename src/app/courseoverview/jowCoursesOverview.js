angular.module('app.courseoverview')

	.component('jowCoursesOverview', {
		controller: 'CoursesOverviewCtrl',
		templateUrl: 'courseoverview/jowCoursesOverview.html'
	})

	.controller('CoursesOverviewCtrl', ['APIService', function CoursesOverviewCtrl(APIService) {
		const $ctrl = this;

		$ctrl.convertToShortDateFormat = function (dateInDBFormat) {
			const jsDate = new Date(dateInDBFormat);
			return jsDate.toLocaleString('de-DE', { year: '2-digit', month: 'numeric', day: '2-digit' });
		};

		$ctrl.formatCourseList = function (courses) {
			$ctrl.formattedCourses = courses.map((course) => {
				const clone = Object.assign({}, course);
				clone.vonDatum = $ctrl.convertToShortDateFormat(course.vonDatum);
				clone.bisDatum = $ctrl.convertToShortDateFormat(course.bisDatum);
				return clone;
			});
			return $ctrl.formattedCourses;
		};

		$ctrl.$onInit = function () {
			// Initial liest die Komponente alle Kurse
			APIService.courses().$promise.then((courses) => {
				$ctrl.courses = $ctrl.formatCourseList(courses);
			});
		};
	}]);
