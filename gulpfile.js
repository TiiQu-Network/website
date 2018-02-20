/**
 * Node Dependencies
 * remember to have dependencies installed with
 * npm install (dependency-name) --save
 */

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserify  = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


/**
 * Variables
 */

var sassPath  = "./build/sass/main.scss";
var jsPath  = "./build/js/index.js";
var publicPath = "./public";
var outputDir = "./";


/**
 * Error Handling
 * Usage:
 * .on('error', handleError);
 * Use this line where you want to log if an error occurs
 */

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}


/**
 * The Sass Task
 * compiles Sass Files from Sass Folder into Css
 */

gulp.task('sass', function(){
  var config = {};
  config.sourceComments = 'map';
  // config.outputStyle = 'compressed';

  return gulp.src(sassPath)
    .on('error', handleError)
    .pipe(sass(config))
    .on('error', handleError)
    .pipe(gulp.dest(outputDir))
    .pipe(reload({stream: true}));
});

/**
 * The JS Task
 * concatenates JS files and compiles them from the JS Folder
 */

 gulp.task('js', function(){
    return gulp.src(jsPath)
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('./'));
 });


/**
 * The Serve Task
 * calls other Gulp tasks
 */

gulp.task('serve', ['sass','js'], function(){

  browserSync.init({
        server: {
            baseDir: "./"
        }
    });

  gulp.watch('./build/sass/**/*' , ['sass','public']);
  gulp.watch('./build/js/**/*.js' , ['js', 'public', browserSync.reload]);
  gulp.watch('./*.html').on('change', browserSync.reload);
});


gulp.task('public', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest(publicPath));
   gulp.src('./main.css')
       .pipe(gulp.dest(publicPath));
   gulp.src('./index.js')
       .pipe(gulp.dest(publicPath));

});




/**
 * Default Gulp Task
 * This task will run when you call 'gulp' in the Command Line
 */

gulp.task('default', ['serve','public']);
