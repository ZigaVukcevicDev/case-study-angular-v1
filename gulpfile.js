var gulp = require('gulp');
var flatten = require('gulp-flatten');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('move', function() {
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Uspešno sem skopiral HTML'));

    gulp.src(['!./src/index.html', 'src/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Uspešno sem skopiral temp'));

    gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(gulp.dest('./dist/vendor'))
        .pipe(notify('Uspešno sem skopiral Angular in Bootstrap'));

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
    gulp.start(['scripts', 'move']);

    gulp.watch(['./src/**/*.js'], ['scripts']);
    gulp.watch(['./src/**/*.html'], ['move']);
});