angular.module('app', [
	'ngMaterial',
	'ngMessages',
	'ui.router',
	'app.courseoverview',
	'app.services'
])
	.config(['$stateProvider', '$mdThemingProvider', function ($stateProvider, $mdThemingProvider) {
		const helloState = {
			name: 'hello',
			url: '/hello',
			template: '<h3>hello world!</h3>'
		}

		const aboutState = {
			name: 'about',
			url: '/about',
			template: '<h3>Its the UI-Router hello world app!</h3>'
		}

		const courseOverviewState = {
			name: 'course-overview',
			url: '/course-overview',
			// template: '<h1>Kurse</h1>'
			templateUrl: 'courseoverview/courseOverview.html'
		}

		$stateProvider.state(helloState);
		$stateProvider.state(aboutState);
		$stateProvider.state(courseOverviewState);

		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('orange');
	}]);


/* angular.module('backoffice', [
	'ui.router'
	// 'backoffice.home'
])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/login/login.tmpl.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'backoffice/home/courseOverview.html',
				controller: 'homeController',
				controllerAs: 'home'
			});  */

/* .state('backoffice', {
				url: '/backoffice',
				templateUrl: 'app/backoffice/backoffice.tmpl.html',
				controller: 'backofficeController',
				controllerAs: 'backoffice',
				// bevor wir zu dieser Route springen können, braucht es Authorisierung
				resolve: {
					currentUser: ['Auth', function (Auth) {
						return Auth.requireAuth();
					}]
				}
			}); */
// })

/* .run(function ($routeScope, $state){
		$routeScope.$on('$stateChangeError', function(event, toState, toParam, fromStat) {
			event.preventDefault();
			if (error === 'AUTH_REQUIRED') {
				$state.go('login');
			}
		});
	}); */
