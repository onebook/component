'use strict'

const scss = require('gulp-ruby-sass')
const pack = require('gulp-webpack')
const seq = require('run-sequence')
const babel = require('gulp-babel')
const jade = require('gulp-jade')
const gulp = require('gulp')

gulp.task('jade', function() {
  gulp.src('./example/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./example/'))
})

gulp.task('babel', function() {
  return gulp.src(['*/*.js', '!build/**/*', '!example/**/*', '!test/**/*'])
    .pipe(babel())
    .pipe(gulp.dest('build/babel/'))
})

gulp.task('import', function() {
  return gulp.src('example/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/babel/import/'))
})

gulp.task('scss', function() {
  return scss('./')
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/'))
})

gulp.task('pack', function() {
  return gulp.src('build/babel/import/*.js')
    .pipe(pack({
      output: {
        filename: 'index.js'
      }
    }))
    .pipe(gulp.dest('build/dest/'))
})

gulp.task('default', function() {
  seq(['scss', 'jade', 'babel'], ['import'], ['pack'])
})
