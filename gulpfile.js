"use strict";

var gulp = require('gulp');
var pump = require('pump');
var del = require('del');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var combinemq = require('gulp-combine-mq');
var csscomb = require('gulp-csscomb');
var minify = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var server = require('browser-sync').create();
var run = require('run-sequence');
var ghPages = require('gulp-gh-pages');

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff, woff2}',
    'img/**',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('style', function() {
  pump([
    gulp.src('sass/style.scss'),
    plumber(),
    sass().on('error', sass.logError),
    postcss([
      autoprefixer({browsers: [
        'last 2 versions',
        'safari >= 6',
        'ios >= 7',
        'ie >= 10'
      ]})
    ]),
    combinemq({beautify: true}),
    csscomb(),
    gulp.dest('build/css'),
    minify(),
    rename('style.min.css'),
    gulp.dest('build/css'),
    server.stream()
  ]);
});

gulp.task('compress', function () {
  pump([
    gulp.src('build/js/*.js'),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest('build/js-min'),
  ]);
});

gulp.task('image', function() {
  return gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function() {
  pump([
    gulp.src('build/img/icons/*.svg'),
    svgmin(),
    svgstore({inlineSvg: true}),
    rename('sprite.svg'),
    gulp.dest('build/img')
  ]);
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('*.html', ['html:update']);
  gulp.watch('js/*.js',['js:update']);
});

gulp.task('html:copy', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('js:copy', function () {
  pump([
    gulp.src('js/**.js'),
    gulp.dest('build/js')
  ]);
});

gulp.task('js:update', ['js:copy', 'compress'], function (done) {
  server.reload();
  done();
});

gulp.task('deploy', function () {
  del('.publish');
  return gulp.src('build/**/*')
      .pipe(ghPages());
});

gulp.task('build', function(callback) {
  run(
    'clean',
    'copy',
    'style',
    'compress',
    'image',
    'sprite',
    callback
  );
});

gulp.task('pub', function (callback) {
  run(
      'build',
      'deploy',
      callback
  );
});
