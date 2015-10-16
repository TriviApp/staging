var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var Karma = require('karma').Server;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('webpack:sass', function() {
  return gulp.src('./app/style/**/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest('build/style/'));
});

gulp.task('webpack:dev', function() {
	return gulp.src('./app/js/client.js')
		.pipe(webpack({
			output: {
				filename: 'bundle.js'
			}
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
	return gulp.src('./test/client/entry.js')
		.pipe(webpack({
			output: {
				filename: 'test_bundle.js'
			}
		}))
		.pipe(gulp.dest('test/client'));
});

gulp.task('staticfiles:dev', function() {
	return gulp.src('./app/**/*html')
		.pipe(gulp.dest('build/')); //to include html in static page
});

gulp.task('servertests', function() {
	return gulp.src('./test/server/*test.js') // name server and auth test
		.pipe(mocha({reporter: 'nyan'}))
		.once('error', function(err) {
			console.log(err);
			process.exit(1); //what is this for again?
		})
		.once('end', function() {
			if (this.seq.length === 1 && this.seq[0] === 'servertests')
				process.exit();
		}.bind(this));
});

gulp.task('karmatests', ['webpack:test'], function(done) {
	new Karma({
		configFile: __dirname + 'karma.conf.js';
	}, done).start();
});

gulp.task('build:dev', ['staticfiles:dev, webpack:dev, webpack:sass']);
gulp.task('default', ['build:dev']);