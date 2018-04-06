/* global require */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const fileinject = require('gulp-inject');


/* Change your directory and settings here */
const settings = {
  publicDir: './app',
  sassDir: './app/scss',
  cssDir: './app/assets/css',
  jsDir: './app/assets/js'
};


gulp.task('hello', function () {
  console.log('Hallo welt!!!');
});


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
 * Default task, running just `gulp` will compile the sass,
 * compile the site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['serve']);



/**
 * Setzt den Standard html header und footer auf jeder Seite ein
 * Hört auf Änderungen in html Files im Ordner templates
 */
gulp.task('injectHeaderAndFooter', function () {
  gulp.watch('./app/templates/*.html', function (file) {
    return gulp.src('./app/*.html')
      .pipe(fileinject(gulp.src(['./app/templates/header.html']), {
        starttag: '<!-- inject:htmlHeader -->',
        transform: function(filepath, file) {
          return file.contents.toString();
        }
      }))
      .pipe(fileinject(gulp.src(['./app/templates/footer.html']), {
        starttag: '<!-- inject:htmlFooter -->',
        transform: function(filepath, file) {
          return file.contents.toString();
        }
      }))
      .pipe(gulp.dest('app/'));
  });
});