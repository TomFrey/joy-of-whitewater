angular.module('app.courseoverview')

	.component('jowSearchCourses', {
		controller: 'SearchCoursesCtrl',
		templateUrl: 'courseoverview/jowSearchCourses.html',
		require: {
			coursesOverviewCtrl: '^jowCoursesOverview'
		}
	})

	.controller('SearchCoursesCtrl', ['APIService', function SearchCoursesCtrl(APIService) {
		const $ctrl = this;

		$ctrl.$onInit = function () {
			$ctrl.searchYear = 2019;
		};

		$ctrl.onSearchClicked = function () {
			APIService.courses().$promise.then((courses) => {
				const filteredCourses = courses.filter((course) => {
					const untilYear = (new Date(course.vonDatum)).getFullYear();
					return untilYear === parseInt($ctrl.searchYear, 10);
				});
				$ctrl.coursesOverviewCtrl.courses = $ctrl.coursesOverviewCtrl.formatCourseList(filteredCourses);
			});
		};
	}]);
