/*global require*/
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');

gulp.task('css', function() {
   gulp.src('views/**/*.styl')
       .pipe(stylus())
       .pipe(gulp.dest('public/css/'))
       .pipe(livereload());
});

gulp.task('watch:css', ['css'], function() {
   livereload.listen();
   gulp.watch('views/**/*.styl', ['css']);
});