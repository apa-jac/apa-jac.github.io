var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();

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

// Static Server + watching scss/html files
gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("css/*.css").on('change', gulp.parallel('browser-sync-reload'));
  gulp.watch("*.html").on('change', gulp.parallel('browser-sync-reload'));
});

// Define the default task
gulp.task('default', gulp.series('serve'));

