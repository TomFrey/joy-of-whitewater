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

    './src/assets/js/guiControll/navigation.js',
    './src/assets/js/guiControll/imageCarousel.js',

    './src/assets/js/app.js'
];




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
 **/
gulp.task('serve', ['sass', 'injectHeaderAndFooter'], function() {

  /**
   * Launch BrowserSync from publicDir
   */
  browserSync.init({
    server: settings.publicDir
  });

  /**
   * watch for changes in sass files
   */
  gulp.watch(settings.sassDir + "/**/*.scss", ['sass']);

  /**
   * watch for changes in html files
   */
  gulp.watch(settings.publicDir + "/*.html").on('change', browserSync.reload);

  // Wartet auf Änderungen in einer .js Datei
    gulp.watch(settings.jsDir + '/**/*.js', ['minifyJs']).on('change', browserSync.reload);

});


/**
 * sass task, will compile the .SCSS files,
 * and handle the error through plumber and notify through system message.
 */
gulp.task('sass', function() {
  return gulp.src(settings.sassDir + "/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(settings.cssDir))
    .pipe(browserSync.stream());
});


/**
 * Setzt den Standard html header und footer auf jeder Seite ein
 * Hört auf Änderungen in html Files im Ordner templates
 */
gulp.task('injectHeaderAndFooter', function () {
  gulp.watch('./src/templates/*.html', function (file) {
    return gulp.src('./src/*.html')
      .pipe(fileinject(gulp.src(['./src/templates/header.html']), {
        starttag: '<!-- inject:htmlHeader -->',
        transform: function(filepath, file) {
          return file.contents.toString();
        }
      }))
      .pipe(fileinject(gulp.src(['./src/templates/footer.html']), {
        starttag: '<!-- inject:htmlFooter -->',
        transform: function(filepath, file) {
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
 * build task:
 * Löscht den dist Ordner
 *
 */
gulp.task('build', (callback) => {
    gulpSequence(
        'clean',
        'minifyJsForDist',
        'copyJs',
        callback
    );
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
 * Kopiert die scripts/app.min.js Datei in den dist Ordner
 */
gulp.task('copyJs', () => {
    return gulp.src(['./src/assets/scripts/app.min.js'])
        .pipe(gulp.dest('dist/assets/scripts'));
});
