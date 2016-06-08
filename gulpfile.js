var gulp = require('gulp');

// include plugins
var jshint = require('gulp-jshint');


gulp.task('jshint', function() {
	// place code in here
    gulp.src('./js/main.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});





gulp.task('default', function() {
	// place code in here

});
