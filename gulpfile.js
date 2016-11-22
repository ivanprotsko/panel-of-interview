var gulp              = require('gulp');
var pug               = require('gulp-pug');
var livereload        = require('gulp-livereload');
var watch             = require('gulp-watch');
var defineModule      = require('gulp-define-module');
var sugarss           = require('sugarss');
var postcss           = require('gulp-postcss');
var rename            = require('gulp-rename');
var autoprefixer      = require('autoprefixer');
var prettify          = require('gulp-prettify');
var gulp              = require('gulp-group')(require('gulp'));
var sorting           = require('postcss-sorting');
var concat            = require('gulp-concat');


gulp.task('sort', function () {
    return gulp.src('build/style/**/*.sss').pipe(
        postcss([
            sorting({ "sort-order": "zen" })
        ])
    ).pipe(
        gulp.dest('build/style/**/*.sss')
    );
});

gulp.group('default', function() {

  gulp.task('css', function () {
      return gulp.src('build/styles/app2.sss')
          .pipe(watch('build/styles/app2.sss'))
          .pipe(postcss([require('precss')], { parser: sugarss }))
          .pipe(rename({ extname: '.css' }))
          .pipe(gulp.dest('build/styles/'))
          .pipe(livereload({ start: true }));
  });

  gulp.task('ap', function () {
      var postcss      = require('gulp-postcss');
      var sourcemaps   = require('gulp-sourcemaps');
      var autoprefixer = require('autoprefixer');

      return gulp.src('./build/styles/app2.css')
          .pipe(watch('build/styles/app2.css'))
          .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
          .pipe(gulp.dest('./public/styles/'))
          .pipe(livereload({ start: true }));
  });

  gulp.task('js', function() {
    return gulp.src('./build/modules/**/*.js')
      .pipe(concat('common.js'))
      .pipe(gulp.dest('./public/js/'));
  });

  gulp.task('views', function buildHTML() {
    return gulp.src('build/**/*.pug')
    .pipe(watch('build/**/*.pug'))
    .pipe(pug({ yourTemplate: 'Locals' }))
    .pipe(gulp.dest('public/'))
    .pipe(livereload({ start: true }));
  });
});
