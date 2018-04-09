////////////////////////////////////////////////////////////
//Required
////////////////////////////////////////////////////////////

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

////////////////////////////////////////////////////////////
//Scripts task
////////////////////////////////////////////////////////////
gulp.task('scripts', function () {
  gulp.src(['app/js/**/*.js', '!app/js/**/*/min.js'])
      .pipe(rename({suffix:'.min'}))
      .pipe(concat('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

////////////////////////////////////////////////////////////
//Sass task
////////////////////////////////////////////////////////////
gulp.task('styles', function () {
  gulp.src('./app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
});
////////////////////////////////////////////////////////////
//html task
////////////////////////////////////////////////////////////
gulp.task('html', function () {
  gulp.src('./app/templates/**/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./public/html/'));
});
////////////////////////////////////////////////////////////
//html task
////////////////////////////////////////////////////////////
gulp.task('imagemin', function () {
  gulp.src('./app/image/**/*')
    .pipe(imagemin({ verbose: true}))
    .pipe(gulp.dest('./public/image/'));
});
////////////////////////////////////////////////////////////
//browserSync task
////////////////////////////////////////////////////////////
// gulp.task('browser-sync', function () {
//   browserSync.init({
//      server: {
//       baseDir: "./public/html/"
//     }
//   });
// });
////////////////////////////////////////////////////////////
//Watch task
////////////////////////////////////////////////////////////
// gulp.task('watch',function(){
//   gulp.watch('./app/js/**/*.js',['scripts']);
//   gulp.watch('./app/sass/**/*.scss',['styles'])
// });
gulp.watch('./app/js/**/*.js', ['scripts']).on('change', browserSync.reload);
gulp.watch('./app/sass/**/*.scss', ['styles']).on('change', browserSync.reload);
gulp.watch('./app/templates/**/*.jade', ['html']).on('change', browserSync.reload);

////////////////////////////////////////////////////////////
//nodemon task
////////////////////////////////////////////////////////////

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html'

  })
});

////////////////////////////////////////////////////////////
//Default task
////////////////////////////////////////////////////////////

gulp.task('default', ['scripts', 'styles', 'nodemon', 'imagemin']);
