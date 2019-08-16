angular.module('app.services')

	.service('APIService', ['$resource', function ($resource) {
		const BASE_URL = '/api';

		return $resource(BASE_URL, {},
			{
				courses: {
					url: BASE_URL + '/kurse/get.php',
					method: 'GET',
					isArray: true
				}
			});
	}]);
