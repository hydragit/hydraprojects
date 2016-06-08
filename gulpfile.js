//////////////////////////////////////////////////////
///// Our Gulpfile
//////////////////////////////////////////////////////
var gulp     = require('gulp');
///////////////////////////////////////////////////////
// include plugins
var jshint   = require('gulp-jshint');
var changed  = require('gulp-changed');
var plumber  = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var minifyCSS  = require('gulp-minify-css');
////////////////////////////////////////////////////
//// Our variables
////////////////////////////////////////////////////
var SRC  = './js/*.js';
var DEST = 'dist'
///
/////////////////////////////////////////////////////
/// plumber checks for errors in file
/// and list's them and prevent gulp from
/// crashing
///////////////////////////////////////////////////

//////////////////////////////////////////////////////
//// gulp task changed
/// check for any js file changed  in source before 
/// the default task and put's them in ./dist folder
gulp.task('changed', function() {
	// place code in here
    return gulp.src(SRC)
	.pipe(plumber())
	.pipe(changed(DEST))
	.pipe(gulp.dest(DEST));	
});

//////////////////////////////////////////////////////
//// gulp task compress-images
///  compress snd minify images from images folder,
///  and put's them into our dist img folder "img""

gulp.task('compress-images', function() {
	// place code in here
    return gulp.src('pre-images/*')
	.pipe(imagemin({ optimizationlevel: 7 }))	
	.pipe(gulp.dest('img'));	
});
/////////////////////////////////////////////////////
/// gulp task jshint
/// check for errors in js files

gulp.task('jshint', function() {
	// place code in here
    gulp.src('./js/main.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

////////////////////////////////////////////////////
/// watch task
/// looks for any file in SRC changed 
/// and fires up gulp changed live to DEST

gulp.task('minify-css', function() {
	// place code in here
    return gulp.src('./pre-css/style.css' )
	.pipe(plumber())
	.pipe(minifyCSS({
		keepBreaks: true
	}))
	.pipe(gulp.dest('css'));
});

////////////////////////////////////////////////////
/// watch task
/// looks for any file in SRC changed 
/// and fires up gulp changed live to DEST

gulp.task('watch', function() {
	// place code in here
    gulp.watch(SRC, ['changed']);	
});

////////////////////////////////////////////////////
/// Default task of gulp
///////////////////////////////////////////////////
gulp.task('default', ['jshint', 'watch']);
///////////////////////////////////////////////////