/* global require */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const fileinject = require('gulp-inject');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulpSequence = require('gulp-sequence');
const replace = require('gulp-replace');
const cleanCss = require('gulp-clean-css');
const pump = require('pump');
const configFile = require('./config.js');


/* Change your directory and settings here */
const settings = {
	publicDir: './src',
	sassDir: './src/scss',
	cssDir: './src/assets/css',
	jsDir: './src/assets/js'
};

/* Alle verwendeten JS Files, damit das eine JS File zusammengesetzt werden kann. */
const allBackofficeJsFiles = [
	'./node_modules/angular/angular.js',
	'./node_modules/angular-animate/angular-animate.js',
	'./node_modules/angular-aria/angular-aria.js',
	'./node_modules/angular-messages/angular-messages.js',
	'./node_modules/angular-material/angular-material.js',
	'./node_modules/angular-resource/angular-resource.js',
	'./node_modules/angular-ui-router/release/angular-ui-router.js',
	'./node_modules/jquery/dist/jquery.js',
	'./node_modules/slick-carousel/slick/slick.js',
	'./node_modules/gsap/src/uncompressed/TweenMax.js',

	'./src/app/app.js',
	'./src/app/courseoverview/courseoverview.module.js',
	'./src/app/courseoverview/jowCoursesOverview.js',
	'./src/app/courseoverview/jowShowCourses.js',
	'./src/app/courseoverview/jowSearchCourses.js',
	'./src/app/services/services.module.js',
	'./src/app/services/APIService.js'
];


/* Alle verwendeten JS Files, damit das eine JS File zusammengesetzt werden kann. */
const allFrontAppJsFiles = [
	'./node_modules/jquery/dist/jquery.js',
	'./node_modules/slick-carousel/slick/slick.js',
	'./node_modules/gsap/src/uncompressed/TweenMax.js',

	'./src/assets/js/config.js',
	'./src/assets/js/util/crypto.js',
	'./src/assets/js/util/globalSettings.js',
	'./src/assets/js/util/dates.js',
	'./src/assets/js/util/validator.js',

	'./src/assets/js/renderGui/renderCourseDates.js',

	'./src/assets/js/services/ajaxService.js',
	'./src/assets/js/services/serverCalls.js',
	'./src/assets/js/services/courseDates.js',

	'./src/assets/js/guiControll/renderRegistrationConfirmation.js',
	'./src/assets/js/guiControll/renderHeader.js',
	'./src/assets/js/guiControll/renderImageSlider.js',
	'./src/assets/js/guiControll/navigation.js',
	'./src/assets/js/guiControll/imageCarousel.js',
	'./src/assets/js/guiControll/imageSlider.js',
	'./src/assets/js/guiControll/kanukursanmeldung.js',

	'./src/assets/js/app.js',
	'./src/assets/js/ready.js'
];


/**
 * build task:
 * Löscht den dist Ordner
 *
 */
gulp.task('build', (callback) => {
	gulpSequence(
		'clean',
		['minifyFrontJsForDist', 'minifyBackofficeJsForDist', 'sass'],
		['minifyCss', 'minifyBackofficeCss'],
		['copyApi', 'copyApp', 'copyHtml', 'copyFrontJs', 'copyBackofficeJs', 'copyImages', 'copyXml',
			'copyRobotsAndHtaccess', 'copyGoogleConfirmationFile'],
		'replaceProductionCredentials',
		callback
	);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['serve']);


/**
 * serve task, will launch browserSync and launch index.html files,
 * and watch the changes for html and sass files
 * and watching if a file in the template folder is changing and then insert the changes in all html files in app
 */
gulp.task('serve', ['sass', 'sassBackoffice', 'injectHeaderAndFooter', 'minifyFrontJs', 'minifyBackofficeJs'], () => {
	/* browserSync.init({
		server: settings.publicDir
	}); */

	// auf dem Port 8888 läuft das Backend
	browserSync.init({
		proxy: 'http://localhost:8888',
		open: false
	});

	/**
   	* watch for changes in sass files
   	*/
	gulp.watch(settings.sassDir + '/**/*.scss', ['sass']);
	gulp.watch('./src/app/scss/**/*.scss', ['sassBackoffice']);

	/**
   	* watch for changes in html files
   	*/
	gulp.watch([settings.publicDir + '/*.html', './src/app/**/*.html'])
		.on('change', browserSync.reload);

	// Wartet auf Änderungen in einer .js Datei im Frontend Bereich
	gulp.watch([settings.jsDir + '/**/*.js'], ['minifyFrontJs'])
		.on('change', browserSync.reload);

	// Wartet auf Änderungen in einer .js Datei im Backend Bereich
	gulp.watch([
		'./src/app/*.js',
		'./src/app/services/*.js',
		'./src/app/courseoverview/*.js'], ['minifyBackofficeJs'])
		.on('change', browserSync.reload);
});


/**
 * sass task, will compile the .SCSS files,
 * and handle the error through plumber and notify through system message.
 */
gulp.task('sass', () => {
	return gulp.src(settings.sassDir + '/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(settings.cssDir))
		.pipe(browserSync.stream());
});


/**
 * sass task, will compile the .SCSS files,
 * and handle the error through plumber and notify through system message.
 */
gulp.task('sassBackoffice', () => {
	return gulp.src('./src/app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src/app/assets/css'))
		.pipe(browserSync.stream());
});


/**
 * Setzt den Standard html Templates auf jeder Seite ein
 * Hört auf Änderungen in html Files im Ordner templates
 */
gulp.task('injectHeaderAndFooter', () => {
	gulp.watch('./src/templates/*.html', () => {
		return gulp.src('./src/*.html')
			.pipe(fileinject(gulp.src(['./src/templates/header.html']), {
				starttag: '<!-- inject:htmlHeader -->',
				transform(filepath, file) {
					return file.contents.toString();
				}
			}))

			.pipe(fileinject(gulp.src(['./src/templates/head.html']), {
				starttag: '<!-- inject:htmlHead -->',
				transform(filepath, file) {
					return file.contents.toString();
				}
			}))

			.pipe(fileinject(gulp.src(['./src/templates/navigation.html']), {
				starttag: '<!-- inject:htmlNavigation -->',
				transform(filepath, file) {
					return file.contents.toString();
				}
			}))

			.pipe(fileinject(gulp.src(['./src/templates/imageSlider.html']), {
				starttag: '<!-- inject:htmlImageSlider -->',
				transform(filepath, file) {
					return file.contents.toString();
				}
			}))

			.pipe(fileinject(gulp.src(['./src/templates/footer.html']), {
				starttag: '<!-- inject:htmlFooter -->',
				transform(filepath, file) {
					return file.contents.toString();
				}
			}))
			.pipe(gulp.dest('src/'));
	});
});


/**
 * Fügt alle .js Files aus dem Array allFrontAppJsFiles in einem File frontApp.js zusammen.
 * Und verkleinert die .js Files.
 * - Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 * - pump ist eine Alternative zu pipe, dank pump gibt's schlaue Fehlermeldungen.
 */
gulp.task('minifyFrontJs', (callback) => {
	pump([
		gulp.src(allFrontAppJsFiles),
		sourcemaps.init(),
		concat('frontApp.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('frontApp.min.js'),
		sourcemaps.write('./'),
		gulp.dest('src/assets/scripts')
	], callback);
});


/**
 * Fügt alle .js Files aud dem Array allBackofficeJsFiles in einem File backApp.js zusammen.
 * Und verkleinert die .js Files.
 * - Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 * - pump ist eine Alternative zu pipe, dank pump gibt's schlaue Fehlermeldungen.
 */
gulp.task('minifyBackofficeJs', (callback) => {
	pump([
		gulp.src(allBackofficeJsFiles),
		sourcemaps.init(),
		concat('backApp.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('backApp.min.js'),
		sourcemaps.write('./'),
		gulp.dest('src/app/assets/scripts')
	], callback);
});


/**
 * Löscht das dist
 */
gulp.task('clean', () => {
	return gulp.src('dist', { read: false })
		.pipe(clean());
});


/**
 * Macht fast das Gleiche, wie der Task 'minifyFrontJs',
 * aber hier wird für den produktiven Code kein Sourcemaps hinzugfügt.
 *
 * Fügt alle .js Files aus dem Array allFrontAppJsFiles in einem File frontApp.js zusammen.
 * Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 */
gulp.task('minifyFrontJsForDist', (callback) => {
	pump([
		gulp.src(allFrontAppJsFiles),
		concat('frontApp.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('frontApp.min.js'),
		gulp.dest('src/assets/scripts')
	], callback);
});


/**
 * Macht fast das Gleiche, wie der Task 'minifyBackofficeJs',
 * aber hier wird für den produktiven Code kein Sourcemaps hinzugfügt.
 *
 * Fügt alle .js Files aus dem Array allFrontAppJsFiles in einem File frontApp.js zusammen.
 * Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 */
gulp.task('minifyBackofficeJsForDist', (callback) => {
	pump([
		gulp.src(allBackofficeJsFiles),
		concat('backApp.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('backApp.min.js'),
		gulp.dest('src/app/assets/scripts')
	], callback);
});


/**
 * Minimiert die css Datei für's Frontend und schreibt sie in den 'dist' Ordner.
 */
gulp.task('minifyCss', () => {
	return gulp.src('./src/assets/css/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/assets/css'));
});


/**
 * Minimiert die css Datei für's Backoffice und schreibt sie in den 'dist' Ordner.
 */
gulp.task('minifyBackofficeCss', () => {
	return gulp.src('./src/app/assets/css/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/app/assets/css'));
});


/**
 * Kopiert die scripts/app.min.js Datei in den dist Ordner
 */
gulp.task('copyFrontJs', () => {
	return gulp.src(['./src/assets/scripts/frontApp.min.js'])
		.pipe(gulp.dest('dist/assets/scripts'));
});


/**
 * Kopiert die scripts/backApp.min.js Datei in den dist/app Ordner
 */
gulp.task('copyBackofficeJs', () => {
	return gulp.src(['./src/app/assets/scripts/backApp.min.js'])
		.pipe(gulp.dest('dist/app/assets/scripts'));
});


/**
 * Kopiert alle html Dateien in den dist Ordner, ausser den
 * html Dateien, die im templates Order liegen.
 */
gulp.task('copyHtml', () => {
	return gulp.src(['./src/**/**/*.html', '!./src/templates/**/*.html', '!./src/assets/webServerConfig/**/*.html'])
		.pipe(gulp.dest('dist'));
});

/**
 * Kopiert alle xml Dateien in den dist Ordner
 */
gulp.task('copyXml', () => {
	return gulp.src(['./src/**/**/*.xml'])
		.pipe(gulp.dest('dist'));
});

/**
 * Kopiert die robots.txt und nicht die .htaccess Dateien in den dist Ordner
 */
gulp.task('copyRobotsAndHtaccess', () => {
	return gulp.src(['./src/assets/webServerConfig/robots.txt', '!./src/assets/webServerConfig/.htaccess'])
		.pipe(gulp.dest('dist'));
});

/**
 * Kopiert die Google Datei (welche die Inhaberschaft der Webseite bestätigt) in den dist Ordner
 */
gulp.task('copyGoogleConfirmationFile', () => {
	return gulp.src(['./src/assets/webServerConfig/google6d6ea9eec37d2de0.html'])
		.pipe(gulp.dest('dist'));
});

/**
 * Kopiert alle Bilder und Icons in den dist Ordner
 */
gulp.task('copyImages', () => {
	return gulp.src([
		'./src/assets/images/**/*.png',
		'./src/assets/images/**/*.svg',
		'./src/assets/images/**/*.gif',
		'./src/assets/images/**/*.jpg'
	]).pipe(gulp.dest('dist/assets/images'));
});


/**
 * Kopiert alle Dateien aus dem api Ordner in den dist Ordner
 */
gulp.task('copyApi', () => {
	return gulp.src(['./src/api/**/*.*'])
		.pipe(gulp.dest('dist/api'));
});


/**
 * Kopiert alle Dateien aus dem app Ordner in den dist/app Ordner
 * Das ist mein Backoffice
 */
gulp.task('copyApp', () => {
	return gulp.src(['./src/app/**/*.*', '!./src/app/scss/**/*.*', '!./src/app/assets/**/*.*'])
		.pipe(gulp.dest('dist/app'));
});


/**
 * Ersetzt username und passwort der DB
 */
gulp.task('replaceProductionCredentials', () => {
	return gulp.src(['./src/api/database/DB.php'])
		.pipe(replace('rootuser', configFile.config.production.user))
		.pipe(replace('rootpw', configFile.config.production.pass))
		.pipe(gulp.dest('dist/api/database'));
});
