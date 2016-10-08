'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync').create(),
    imagemin     = require('gulp-imagemin'),
    watch        = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(browserSync.stream())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('image:build', function(){
    return watch(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'], function () {
        gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
    });
});

gulp.task('default', ['browser-sync', 'sass', 'image:build']);