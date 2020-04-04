const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      sourcemaps = require('gulp-sourcemaps');

let browserSync = require('browser-sync').create();

function styles() {
    return (
        gulp
            .src('sass/main.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            //.pipe(sourcemaps.write())
            .pipe(gulp.dest('./'))
            .pipe(browserSync.stream())
    );
}


function scripts() {

}

// A simple task to reload the page
function reload() {
    browserSync.reload();
}

function watch() {
    styles();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('sass/**/*.scss', styles);
    //gulp.watch('index.html', reload);
}



gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);