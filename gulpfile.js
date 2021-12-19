var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var jade = require('gulp-jade');
var sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function(){
    return gulp.src(['scss/**/*.scss', 'partner/scss/**/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('css'))

        .pipe(browserSync.reload({stream: true}));
});

gulp.task('jade', function() {
    return gulp.src(['index.jade'])
        .pipe(jade({
            pretty:true
        }))

        .pipe(gulp.dest(''))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3001
    });

    gulp.watch(['scss/**/*.scss', 'partner/scss/**/**/*.scss'], ['sass']);
    gulp.watch(['index.jade'], ['jade']);
});

gulp.task('default', ['sass', 'jade', 'serve']);