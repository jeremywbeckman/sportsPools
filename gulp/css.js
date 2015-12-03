/*global require*/
var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', function() {
   gulp.src('views/**/*.styl')
       .pipe(stylus())
       .pipe(gulp.dest('public/css/'));
});

gulp.task('watch:css', ['css'], function() {
   gulp.watch('views/**/*.styl', ['css']);
});