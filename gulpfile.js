var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('sass', function() {
    return gulp.src('app/style/scss/main.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(cleanCSS({
            inline: ['none']
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('app/style/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch', function() {
    gulp.watch('app/style/scss/main.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('sass', 'browserSync',  'watch'));