angular.module('app.courseoverview')

	.component('jowShowCourses', {
		controller: 'ShowCoursesCtrl',
		templateUrl: 'courseoverview/jowShowCourses.html'
	})

	.controller('ShowCoursesCtrl', ['APIService', function SearchJokeCtrl(APIService) {
		const $ctrl = this;

		$ctrl.$onInit = function () {
			$ctrl.searchTerm = null;
		};

		$ctrl.onSearchClicked = function () {
			$ctrl.searchTerm = 'geklickt';

			APIService.courses().$promise.then((courses) => {
				$ctrl.courses = courses;
			});
		};
	}]);
