/* global require */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const fileInject = require('gulp-inject');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const cleanCss = require('gulp-clean-css');
const pump = require('pump');
//const gUtil = require('gulp-util');
const ftp = require('vinyl-ftp');

const configFile = require('./config.js');


/* Change your directory and settings here */
const settings = {
	publicDir: './src',
	sassDir: './src/scss',
	cssDir: './src/assets/css',
	jsDir: './src/assets/js'
};

/* Alle verwendeten JS Files, damit das eine JS File zusammengesetzt werden kann. */
const allFrontAppJsFiles = [
	'./node_modules/jquery/dist/jquery.js',
	'./node_modules/slick-carousel/slick/slick.js',
	'./node_modules/gsap/src/uncompressed/TweenMax.js',

	'./src/assets/js/util/imageConfig.js',
	'./src/assets/js/util/crypto.js',
	'./src/assets/js/util/globalConfig.js',
	'./src/assets/js/util/dates.js',
	'./src/assets/js/util/validator.js',
	'./src/assets/js/util/preloader.js',
	'./src/assets/js/util/pageConfig.js',
	'./src/assets/js/util/implementGoogleMaps.js',

	'./src/assets/js/renderGui/renderCourseDates.js',

	'./src/assets/js/services/ajaxService.js',
	'./src/assets/js/services/serverCalls.js',
	'./src/assets/js/services/courseDates.js',

	'./src/assets/js/guiControll/renderRegistrationConfirmation.js',
	'./src/assets/js/guiControll/renderHeader.js',
	'./src/assets/js/util/responsive.js',
	'./src/assets/js/guiControll/renderImageSlider.js',
	'./src/assets/js/guiControll/kanukursanmeldung.js',
	'./src/assets/js/renderGui/renderCourseSearchResults.js',
	'./src/assets/js/guiControll/courseSearch.js',
	'./src/assets/js/guiControll/navigation.js',
	'./src/assets/js/guiControll/youtubeVideoControl.js',
	'./src/assets/js/guiControll/imageCarousel.js',
	'./src/assets/js/guiControll/imageSlider.js',
	'./src/assets/js/guiControll/kontaktform.js',
	
	'./src/assets/js/app.js',
	'./src/assets/js/ready.js'
];

/**
 * sass task, will compile the .SCSS files,
 * and handle the error through plumber and notify through system message.
 */
function compileScss(){
	return gulp.src(settings.sassDir + '/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(settings.cssDir))
		.pipe(browserSync.stream());
}


/**
 * Setzt die html-Templates auf jeder Seite ein
 * Hört auf Änderungen in html Files im Ordner templates
 */
function injectHeaderAndFooter(){
	return gulp.src('./src/*.html')
		.pipe(fileInject(gulp.src(['./src/templates/header.html']), {
			starttag: '<!-- inject:htmlHeader -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/head.html']), {
			starttag: '<!-- inject:htmlHead -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/navigation.html']), {
			starttag: '<!-- inject:htmlNavigation -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/footer.html']), {
			starttag: '<!-- inject:htmlFooter -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))
		.pipe(gulp.dest('src/'));
}


/**
 * Setzt die html-Templates auf jeder Seite ein
 * Hört auf Änderungen in html Files im Ordner templates
 */
function injectHeaderAndFooterIntoWildwasserReisen(){
	return gulp.src('./src/wildwasser-reisen/*.html')
		.pipe(fileInject(gulp.src(['./src/templates/header.html']), {
			starttag: '<!-- inject:htmlHeader -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/head.html']), {
			starttag: '<!-- inject:htmlHead -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/navigation.html']), {
			starttag: '<!-- inject:htmlNavigation -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/footer.html']), {
			starttag: '<!-- inject:htmlFooter -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))
		.pipe(gulp.dest('src/wildwasser-reisen/'));
}


/**
 * Fügt alle .js Files aus dem Array allFrontAppJsFiles in einem File frontApp.js zusammen.
 * Und verkleinert die .js Files.
 * - Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 * - pump ist eine Alternative zu pipe, dank pump gibt's schlaue Fehlermeldungen.
 */
function minifyFrontJs(cb){
	pump([
		gulp.src(allFrontAppJsFiles),
		sourcemaps.init(),
		concat('frontApp.js'),
		replace('googleMapsApiKeyReplacedWithGulp',  configFile.config.googleMap.apiKey),
	 	babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: 
			[
				[
					'@babel/env', 
					{debug: true}
				]
			]
		}),
		uglify(),
		rename('frontApp.min.js'),
		sourcemaps.write('./'),
		gulp.dest('src/assets/scripts')
	], cb);
}


/**
 * Löscht das dist
 */
function deleteDistFolder(){
	return gulp.src('dist', { read: false, allowEmpty: true })
		.pipe(clean());
}


/**
 * Macht fast das Gleiche, wie der Task 'minifyFrontJs',
 * aber hier wird für den produktiven Code kein Sourcemaps hinzugfügt.
 *
 * Fügt alle .js Files aus dem Array allFrontAppJsFiles in einem File frontApp.js zusammen.
 * Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 */
function minifyFrontJsForDist(cb){
	pump([
		gulp.src(allFrontAppJsFiles),
		concat('frontApp.js'),
		replace('googleMapsApiKeyReplacedWithGulp',  configFile.config.googleMap.apiKey),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('frontApp.min.js'),
		gulp.dest('src/assets/scripts')
	], cb);
}


/**
 * Minimiert die css Datei für's Frontend und schreibt sie in den 'dist' Ordner.
 */
function minifyCss(){
	return gulp.src('./src/assets/css/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/assets/css'));
}


/**
 * Kopiert die scripts/app.min.js Datei in den dist Ordner
 */
function copyFrontJs(){
	return gulp.src(['./src/assets/scripts/frontApp.min.js'])
		.pipe(gulp.dest('dist/assets/scripts'));
}


/**
 * Kopiert alle html Dateien in den dist Ordner, ausser den
 * html Dateien, die im templates Order liegen.
 */
function copyHTML(){
	return gulp.src(['./src/**/**/*.html', '!./src/templates/**/*.html', '!./src/assets/webServerConfig/**/*.html'])
		.pipe(gulp.dest('dist'));
}


/**
 * Kopiert alle xml (für das Sitemap) Dateien in den dist Ordner
 */
function copyXml(){
	return gulp.src(['./src/**/**/*.xml'])
		.pipe(gulp.dest('dist'));
}


/**
 * Kopiert die robots.txt und nicht die .htaccess Dateien in den dist Ordner
 */
function copyRobotsAndHtaccess(){
	return gulp.src(['./src/assets/webServerConfig/robots.txt', '!./src/assets/webServerConfig/.htaccess'])
		.pipe(gulp.dest('dist'));
}


/**
 * Kopiert die robotsForTestEnviroment.txt Datei ins dist Verzeichnis
 * und benennt sie robots.txt um.
 */
function copyRobotsForTestEnviroment(){
	return gulp.src(['./src/assets/webServerConfig/robotsForTestEnviroment.txt'])
		.pipe(rename('robots.txt'))
		.pipe(gulp.dest('dist'));
}


/**
 * Kopiert die Google Datei (welche die Inhaberschaft der Webseite bestätigt) in den dist Ordner
 */
function copyGoogleConfirmationFile(){
	return gulp.src(['./src/assets/webServerConfig/google6d6ea9eec37d2de0.html'])
		.pipe(gulp.dest('dist'));
}


/**
 * Kopiert alle Bilder und Icons in den dist Ordner
 */
function copyImages(){
	return gulp.src([
		'./src/assets/images/**/*.png',
		'./src/assets/images/**/*.svg',
		'./src/assets/images/**/*.gif',
		'./src/assets/images/**/*.webp',
		'./src/assets/images/**/*.jpg',
		'./src/assets/images/**/*.json'
	]).pipe(gulp.dest('dist/assets/images'));
}


/**
 * Kopiert alle Dateien aus dem api Ordner in den dist Ordner
 */
function copyApi(){
	return gulp.src(['./src/api/**/*.*'])
		.pipe(gulp.dest('dist/api'));
}


/**
 * Kopiert alle pdf die im Ordner 'kanukurse' liegen
 */
 function copyKanukursePdf(){
	return gulp.src(['./src/kanukurse/*.pdf'])
		.pipe(gulp.dest('dist/kanukurse'));
}


/**
 * Ersetzt username und passwort der DB
 */
function replaceProductionCredentials(){
	return gulp.src(['./src/api/database/DB.php'])
		.pipe(replace('rootuser', configFile.config.production.user))
		.pipe(replace('rootpw', configFile.config.production.pass))
		.pipe(gulp.dest('dist/api/database'));
}


const getFtpProductionConnection = () => {
	return ftp.create({
		host: 'joyofwhitewater.ch',
		port: 21,
		user: configFile.config.ftp.user,
		password: configFile.config.ftp.pass,
		parallel: 5
		//log: gUtil.log
	})
}

const getFtpTestConnection = () => {
	return ftp.create({
		host: 'joyofwhitewater.mitlinxlernen.ch',
		port: 21,
		user: configFile.config.testFtp.user,
		password: configFile.config.testFtp.pass,
		parallel: 5,
		reload: true
		//log: gUtil.log
	})
}

function remoteDeploy(getFtpConnection, ftpDestination){
	const connection = getFtpConnection();
	const localFilesToCopy = ['./dist/**/*'];

	return gulp.src(localFilesToCopy, {buffer: false})
		//.pipe(connection.newer(ftpDestination)) //nur neue Files hochladen
		.pipe(connection.dest(ftpDestination))
}

/**
 * The run task, will launch browserSync and launch index.html files,
 * and watch the changes for html, sass and js files
 * and watching if a file in the template folder is changing and then insert the changes in all html files in app
 */
function run(done){
	// auf dem Port 8888 läuft das Backend
	browserSync.init({
		proxy: 'http://localhost:8888',
		open: false
	});

	//watch for changes in sass files
	gulp.watch(settings.sassDir + '/**/*.scss', gulp.series(compileScss));

	//watch for changes in html files
	gulp.watch([settings.publicDir + '/*.html', './src/app/**/*.html'])
		.on('change', browserSync.reload);

	//watch for changes in html templates
	gulp.watch('./src/templates/*.html', gulp.series(injectHeaderAndFooter));
	gulp.watch('./src/templates/*.html', gulp.series(injectHeaderAndFooterIntoWildwasserReisen));

	// Wartet auf Änderungen in einer .js Datei im Frontend Bereich
	gulp.watch([settings.jsDir + '/**/*.js'], gulp.series(minifyFrontJs))
		.on('change', browserSync.reload);
	done();
}

/**
 * Mit 'gulp' wird der Default Task gestartet, der in diesem
 * Fall unter anderm den 'run' Task startet.
 */
exports.default = gulp.series(gulp.parallel(compileScss,
											minifyFrontJs,
											injectHeaderAndFooter,
											injectHeaderAndFooterIntoWildwasserReisen),
								//replaceGoogleMapApiKey,
								run);

								
// Mit 'gulp build' wird das Projekte zusammengebaut und in den 'dist' Ordner gestellt.
function build(enviroment) {
	let building = gulp.series(deleteDistFolder,
		gulp.parallel(	minifyFrontJsForDist,
						compileScss),
		gulp.parallel(	minifyCss),
		gulp.parallel(	//copyApi,
						copyHTML,
						copyFrontJs,
						copyImages,
						copyXml,
						copyRobotsAndHtaccess,
						copyGoogleConfirmationFile,
						copyKanukursePdf),
		replaceProductionCredentials);

	//Überschreibt robots.txt mit src/assets/webServerConfig/robotsForTestEnviroment.txt
	if (enviroment === 'toTestEnviroment') {
		building = gulp.series(building, copyRobotsForTestEnviroment);
	}
	return building;
};

exports.build = build();

// Mit 'gulp deployToProduction' wird das Projekt auf den joyofwhitewater.ch FTP Server gestellt
exports.deployToProduction = gulp.series(build(), remoteDeploy.bind(this, getFtpProductionConnection, '/httpdocs'));

// Mit 'gulp deployToTest' wird das Projekt auf den joyofwhitewater.mitlinxlernen.ch FTP Server gestellt
exports.deployToTest = gulp.series(build('toTestEnviroment'), remoteDeploy.bind(this, getFtpTestConnection, '/'));

