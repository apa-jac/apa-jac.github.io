var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();
var sass           = require('gulp-sass')(require('sass'));
var nunjucksRender = require('gulp-nunjucks-render');

// Browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Browser sync reload
gulp.task('browser-sync-reload', function() {
  return browserSync.reload();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// Compute HTML templates using nunjucks
gulp.task('nunjucks', function () {
  // Gets .html and .nunjucks files in pages
  return (
    gulp
      .src('html/*.+(html|nunjucks)')
      // Renders template with nunjucks
      .pipe(
        nunjucksRender({
          path: ['html/templates'],
        })
      )
      .pipe(gulp.dest('.')) // output files in root folder
  )
})

// Static Server + watching scss/html files
gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });

  gulp.parallel("nunjucks");
  gulp.watch("scss/*.scss", gulp.series('sass'));
  gulp.watch("html/**/*.(html|nunjucks)").on('change', gulp.parallel('nunjucks'));
  gulp.watch("*.html").on('change', gulp.parallel('browser-sync-reload'));
});

// Define the default task
gulp.task('default', gulp.series('serve'));

