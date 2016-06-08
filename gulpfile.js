var gulp = require('gulp');

// include plugins
var jshint = require('gulp-jshint');


/// gulp task jshint
/// check for errors in js files

gulp.task('jshint', function() {
	// place code in here
    gulp.src('./js/main.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});


gulp.task('default', ['jshint']);