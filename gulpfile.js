"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");

gulp.task("server", function(){
    browserSync.init({
        server:{
            baseDir:"src"
        }
    });
});

gulp.task("styles", function(){
    return gulp.src("src/sass/**/*.+(sass|scss)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix:"",
                suffix:".min"
            }))
            .pipe(autoPrefixer())
            .pipe(cleanCss({compatibility:'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

gulp.task("watch", function(){
    gulp.watch("src/sass/**/*.+(sass|scss)",gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change",browserSync.reload);
});

gulp.task("default",gulp.parallel("server","styles","watch"));
