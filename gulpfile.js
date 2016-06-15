//////////////////////////////////////////////////////
///// Our Gulpfile
//////////////////////////////////////////////////////
var gulp        = require('gulp');
///////////////////////////////////////////////////////
// include plugins
var jshint      = require('gulp-jshint');
var changed     = require('gulp-changed');
var plumber     = require('gulp-plumber');
/////////////////////////////////////////////////////
/// plumber checks for errors in file
/// and list's them and prevent gulp from
/// crashing
///////////////////////////////////////////////////
var imagemin    = require('gulp-imagemin');
var minifyCSS   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var concat      = require('gulp-concat')
var iconfont    = require('gulp-iconfont')
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
gulp.task('concat', function() {
	// place code in here
    return gulp.src(['pre-js/one.js', 'pre-js/two.js'])
	.pipe(plumber())
	.pipe(concat('all.js', {newLine: ';'}))
	.pipe(gulp.dest('js'));

});
////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//// gulp task changed
/// check for any js file changed  in source before 
/// the default task and put's them in ./dist folder
gulp.task('iconfont', function() {
	// place code in here
    gulp.src(['pre-assets/icons/*.svg'])
	.pipe(iconfont({
		fontName: 'awesome_font',
		appendCodepoints: true
	}))
	.on('codepoints', function(codepoints, points) {
           //// css templatying
		   console.log(codepoints, options);
	})
	.pipe(gulp.dest('assets/fonts'));

});
////////////////////////////////////////////////////


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

//////////////////////////////////////////////////////
//// gulp task browser-sync
/// check for any file changed in /pre-css and
/// browser-sync will reload the browser and notify
gulp.task('serve', ['minify-css'], function() {
	// place code in here
    browserSync.init({
		server: "./"
	})	
	gulp.watch("./pre-css/*.css", ['minify-css']);
    gulp.watch("./pre-css/*.css").on('change', reload);
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
/// minify-css 
/// looks for pre-csss folder for style.css and
/// minify's it to css folder
/// and fires up gulp changed live to DEST
gulp.task('minify-css', function() {
	// place code in here
   gulp.src('./pre-css/style.css' )	    
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
	.pipe(plumber())
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
    gulp.src('pre-scss/*')
	    .pipe(plumber())
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
    gulp.watch(SRC, ['minify-css']);

});
////////////////////////////////////////////////////

////////////////////////////////////////////////////
/// less task
gulp.task('less', function() {
	// place code in here
    gulp.src('pre-less/*.less')   
	.pipe(less())
	.pipe(gulp.dest('less'));
});
////////////////////////////////////////////////////


////////////////////////////////////////////////////
/// Default task of gulp
///////////////////////////////////////////////////
gulp.task('default', ['serve']);

///////////////////////////////////////////////////