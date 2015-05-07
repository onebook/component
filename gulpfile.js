'use strict'

const es6moduleTranspiler = require('gulp-es6-module-transpiler')
const rubySass = require('gulp-ruby-sass')
const jade = require('gulp-jade')
const gulp = require('gulp')

gulp.task('jade', function() {
  gulp.src('./example/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./example/'))
})

gulp.task('module', function() {
  return gulp.src('*/*.js')
    .pipe(es6moduleTranspiler({
      formatter: 'bundle'
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/'))
})

gulp.task('scss', function() {
  return rubySass('./')
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/'))
})

gulp.task('default', ['module', 'scss'])
