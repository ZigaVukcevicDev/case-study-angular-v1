var gulp = require('gulp');
var flatten = require('gulp-flatten');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('copy', function() {
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Copied index.html to dist folder'));

    gulp.src(['!./src/index.html', 'src/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Uspešno sem skopiral temp'));

    gulp.src([
        'node_modules/angular/angular.min.js',
        // 'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(gulp.dest('./dist/vendor'))
        .pipe(notify('Copied libraries to dist/vendor folder'));
});

gulp.task('scripts', function() {
    gulp.src(['./src/app.js', './src/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('Uspešno sem združil js datoteke'));
});

gulp.task('serve', function() {
    gulp.src('./dist')
        .pipe(webserver({
            port: 48080,
            livereload: true
        }));
});

gulp.task('watch', ['serve'], function() {
    gulp.start(['scripts', 'copy']);

    gulp.watch(['./src/**/*.js'], ['scripts']);
    gulp.watch(['./src/**/*.html'], ['copy']);
});