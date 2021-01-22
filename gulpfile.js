"use strict";

const gulp = require("gulp"),
      sass = require("gulp-sass"),
      browserSync = require("browser-sync"),
      autoPrefixer = require("gulp-autoprefixer"),
      cleanCss = require("gulp-clean-css"),
      rename = require("gulp-rename"),
      imgMin = require("gulp-imagemin"),
      htmlMin = require("gulp-htmlmin"),
      jsMin = require("gulp-jsmin");

gulp.task("server", function(){
    browserSync.init({
        server:{
            baseDir:"dist"
        }
    });
    gulp.watch("src/*.html").on("change",browserSync.reload);
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
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});

gulp.task("watch", function(){
    gulp.watch("src/sass/**/*.+(sass|scss|css)",gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change",gulp.parallel("html"));
});

gulp.task("html",function(){
    return gulp.src("src/*.html")
        .pipe(htmlMin({collapseWhitespace:true}))
        .pipe(gulp.dest("dist/"));
});

gulp.task("scripts",function(){
    return gulp.src("src/js/**/*.js")
        .pipe(jsMin())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("fonts",function(){
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts/"));
});

gulp.task("mailer",function(){
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer/"));
});

gulp.task("icons",function(){
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons/"));
});

gulp.task("images",function(){
    return gulp.src("src/img/**/*")
        .pipe(imgMin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("default",gulp.parallel("server","styles","watch","html","scripts","fonts","mailer","icons","images"));
