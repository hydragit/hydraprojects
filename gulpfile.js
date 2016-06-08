var gulp    = require('gulp');

// include plugins
var jshint  = require('gulp-jshint');
var changed = require('gulp-changed');

///
/// checked for any js file changed  in source before 
/// the default task and put's them in ./dist folder
var SRC  = './js/*.js';
var DEST = 'dist'

gulp.task('changed', function() {
	// place code in here
    return gulp.src(SRC)
	.pipe(changed(DEST))
	.pipe(gulp.dest(DEST));	
});

/// gulp task jshint
/// check for errors in js files

gulp.task('jshint', function() {
	// place code in here
    gulp.src('./js/main.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});


gulp.task('default', ['jshint']);