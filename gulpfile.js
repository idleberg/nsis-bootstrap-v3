 /**
  *  nsis-bootstrap-v3
  *  https://github.com/idleberg/nsis-bootstrap-v3
  *
  *  Copyright (c) 2017 Jan T. Sott
  *  Licensed under the CC-BY-NC-SA-4.0 license.
  */

const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const less = require('gulp-less');
const lesshint = require('gulp-lesshint');
const path = require('path');
const watch = require('gulp-watch');

// Build Tasks
gulp.task('build:less', gulp.series( (done) => {
  gulp.src('src/build.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('theme.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css/'));

    done();
}));

// Lint Tasks
gulp.task('lint:less', gulp.series( (done) => {
  gulp.src('src/*.less')
    .pipe(lesshint())
    .pipe(lesshint.reporter());

    done();
}));

// Watch Tasks
gulp.task('watch:less', function() {
  gulp.watch('src/*.less', gulp.series('lint:less', 'build:less'));
});

// Available Tasks
gulp.task('build', gulp.parallel('build:less'));
gulp.task('lint', gulp.parallel('lint:less'));
gulp.task('watch', gulp.parallel('watch:less'));
