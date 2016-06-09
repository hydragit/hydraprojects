//////////////////////////////////////////////////////
///// Our Gulpfile
//////////////////////////////////////////////////////
var gulp       = require('gulp');
///////////////////////////////////////////////////////
// include plugins
var jshint     = require('gulp-jshint');
var changed    = require('gulp-changed');
var plumber    = require('gulp-plumber');
/////////////////////////////////////////////////////
/// plumber checks for errors in file
/// and list's them and prevent gulp from
/// crashing
///////////////////////////////////////////////////
var imagemin   = require('gulp-imagemin');
var minifyCSS  = require('gulp-minify-css');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-sass');
////////////////////////////////////////////////////
//// Our variables
////////////////////////////////////////////////////
var SRC  = './js/*.js';
var DEST = 'dist'
/////////////////////////////////////////////////////

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
////////////////////////////////////////////////////



//////////////////////////////////////////////////////////
//// compressing javascryt files with uglify
//// gulp task uglify looks for js files in pre-js
//// and compresss it it to /js folder
gulp.task('compress', function() {
	// place code in here
   return gulp.src('./pre-js/*.js' )
	    .pipe(plumber())
	    .pipe(uglify({
		      keepBreaks: true
	    }))
	    .pipe(gulp.dest('js'));
});
//////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////
///  check for any js file changed  in source before 
///  the default task and put's them in ./dist folder
//////////////////////////////////////////////////////////
/// minify-css 
/// looks for pre-csss folder for style.css and
/// minify's it to css folder
/// and fires up gulp changed live to DEST
gulp.task('minify-css', function() {
	// place code in here
   return gulp.src('pre-css/*.css' )
	    .pipe(plumber())
	    .pipe(minifyCSS({
		      keepBreaks: true
	    }))
	   .pipe(gulp.dest('css'));
});

////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//// gulp task compress-images
///  compress snd minify images from images folder,
///  and put's them into our dist img folder "img""
gulp.task('compress-images', function() {
	// place code in here
    return gulp.src('./pre-images/*')
	.pipe(imagemin({ optimizationlevel: 7 }))	
	.pipe(gulp.dest('img'));

});
/////////////////////////////////////////////////////

////////////////////////////////////////////////////
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


////////////////////////////////////////////////////
/// Conpiling sass
/// watch task
/// looks for any file in SRC changed 
/// and fires up gulp changed live to DEST
gulp.task('sass', function () {
    gulp.src('/pre-scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('scss'));
});
////////////////////////////////////////////////////

////////////////////////////////////////////////////
/// watch task
/// looks for any file in SRC changed 
/// and fires up gulp changed live to DEST
gulp.task('watch', function() {
	// place code in here
    gulp.watch(SRC, ['changed']);

});
////////////////////////////////////////////////////


////////////////////////////////////////////////////
/// Default task of gulp
///////////////////////////////////////////////////
gulp.task('default', ['jshint', 'watch']);

///////////////////////////////////////////////////