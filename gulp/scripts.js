/*global require*/
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
   gulp.src(['ng/ng.module.js','ng/**/*.js'])
       .pipe(sourcemaps.init())
       .pipe(concat('ngApp.js'))
       .pipe(ngAnnotate())
       .pipe(uglify())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('public/js/'));
});

gulp.task('watch:js', ['js'], function() {
   gulp.watch('ng/**/*.js', ['js']);
});