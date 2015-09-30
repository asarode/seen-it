var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// Bundles the background scripts
gulp.task('background', function() {
  browserify('src/background/index.js')
    .transform(babelify.configure({
      optional: ['es7.decorators', 'es7.classProperties']
    }))
    .bundle()
    .pipe(source('background.js'))
    .pipe(gulp.dest('dist/'));
});

// Bundles the popup scripts
gulp.task('popup', function() {
  browserify('src/popup/index.js')
    .transform(babelify.configure({
      optional: ['es7.decorators', 'es7.classProperties']
    }))
    .bundle()
    .pipe(source('popup.js'))
    .pipe(gulp.dest('dist/'));
});

// Bundles the client scripts
gulp.task('client', function() {
  browserify('src/client/index.js')
    .transform(babelify.configure({
      optional: ['es7.decorators', 'es7.classProperties']
    }))
    .bundle()
    .pipe(source('client.js'))
    .pipe(gulp.dest('dist/'));
});

// Rebuilds scripts and demo on change
gulp.task('watch', function() {
  gulp.watch('src/background/**/*.*', ['background', 'demo']);
  gulp.watch('src/popup/**/*.*', ['popup', 'demo']);
  gulp.watch('src/client/**/*.*', ['client', 'demo']);
});

// Moves files to a demo folder that you can load into chrome to test a local
// copy of the extension
gulp.task('demo', function() {
  gulp.src('dist/**/*.*')
    .pipe(gulp.dest('demo/dist/'));

  gulp.src(['manifest.json', 'popup.css', 'popup.html'])
    .pipe(gulp.dest('demo/'));

  gulp.src('images/**/*.*')
    .pipe(gulp.dest('demo/images'));
});

gulp.task('scripts', ['background', 'popup', 'client']);
gulp.task('default', ['watch', 'scripts', 'demo']);
