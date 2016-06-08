var gulp    = require('gulp');

// include plugins
var jshint  = require('gulp-jshint');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');

///
/////////////////////////////////////////////////////



/// plumber checks for errors in filea
/// and list's them and prevent gulp from
/// crashing

/// checked for any js file changed  in source before 
/// the default task and put's them in ./dist folder
var SRC  = './js/*.js';
var DEST = 'dist'

gulp.task('changed', function() {
	// place code in here
    return gulp.src(SRC)
	.pipe(plumber())
	.pipe(changed(DEST))
	.pipe(gulp.dest(DEST));	
});

/// gulp task jshint
/// check for errors in js files

gulp.task('jshint', function() {
	// place code in here
    gulp.src('./js/main.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

/// watch task
/// looks for any file in SRC changed 
/// and fires up gulp changed live

gulp.task('watch', function() {
	// place code in here
    gulp.watch(SRC, ['changed']);	
});


/// Default task of gulp
gulp.task('default', ['jshint', 'watch']);