const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('clear-cache', shell.task('rm -rf _site'));

gulp.task('build', gulp.series('clear-cache', shell.task('jekyll build')));
