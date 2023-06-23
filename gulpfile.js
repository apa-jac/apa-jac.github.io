var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass')(require('sass'));

// Browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/*.scss", gulp.series('sass'));
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Define the default task
gulp.task('default', gulp.series('serve'));

