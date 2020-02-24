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
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css'))
            // Add browsersync stream pipe after compilation
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
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    gulp.watch('sass/**/*.scss', styles);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch('*.html', reload);
}



gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);