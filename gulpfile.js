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
var pump = require('pump');


/* Change your directory and settings here */
const settings = {
	publicDir: './src',
	sassDir: './src/scss',
	cssDir: './src/assets/css',
	jsDir: './src/assets/js'
};


/* Alle verwendeten JS Files, damit das eine JS File zusammengesetzt werden kann. */
const allJsFiles = [
	'./node_modules/jquery/dist/jquery.js',
	'./node_modules/slick-carousel/slick/slick.js',
	'./node_modules/gsap/src/uncompressed/TweenMax.js',
	// './node_modules/moment/moment.js',

	'./src/assets/js/config.js',

	'./src/assets/js/services/ajaxService.js',
	'./src/assets/js/services/serverCalls.js',
	'./src/assets/js/services/courseDates.js',

	'./src/assets/js/util/validator.js',

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
		['minifyJsForDist', 'sass'],
		'minifyCss',
		['copyApi', 'copyHtml', 'copyJs', 'copyImages'],
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
gulp.task('serve', ['sass', 'injectHeaderAndFooter', 'minifyJs'], () => {
	/* browserSync.init({
		server: settings.publicDir
	}); */

	// auf dem Port 8888 läuft das Backend
	browserSync.init({
		proxy: 'http://localhost:8888'
	});

	/**
   	* watch for changes in sass files
   	*/
	gulp.watch(settings.sassDir + '/**/*.scss', ['sass']);

	/**
   	* watch for changes in html files
   	*/
	gulp.watch(settings.publicDir + '/*.html').on('change', browserSync.reload);

	// Wartet auf Änderungen in einer .js Datei
	gulp.watch(settings.jsDir + '/**/*.js', ['minifyJs']).on('change', browserSync.reload);
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
 * Fügt die .js Files in einem File app.js zusammen. Und verkleinert die .js Files.
 * - Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 * - pump ist eine Alternative zu pipe, dank pump gibt's schlaue Fehlermeldungen.
 */
gulp.task('minifyJs', (callback) => {
	pump([
		gulp.src(allJsFiles),
		sourcemaps.init(),
		concat('app.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('app.min.js'),
		sourcemaps.write('./'),
		gulp.dest('src/assets/scripts')
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
 * Macht fast das Gleiche, wie der Task 'minifyJs' aber hier wird für den produktiven Code kein Sourcemaps hinzugfügt.
 *
 * Fügt die .js Files einem File app.js zusammen. Und verkleinert die .js Files.
 * Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 */
gulp.task('minifyJsForDist', (callback) => {
	pump([
		gulp.src(allJsFiles),
		concat('app.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('app.min.js'),
		gulp.dest('src/assets/scripts')
	], callback);
});


/**
 * Minimiert die css Datei und schreibt sie in den 'dist' Ordner.
 */
gulp.task('minifyCss', () => {
	return gulp.src('./src/assets/css/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/assets/css'));
});


/**
 * Kopiert die scripts/app.min.js Datei in den dist Ordner
 */
gulp.task('copyJs', () => {
	return gulp.src(['./src/assets/scripts/app.min.js'])
		.pipe(gulp.dest('dist/assets/scripts'));
});


/**
 * Kopiert alle html Dateien in den dist Ordner, ausser den
 * html Dateien, die im templates Order liegen.
 */
gulp.task('copyHtml', () => {
	return gulp.src(['./src/**/**/*.html', '!./src/templates/**/*.html'])
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
