// necessary check gulp version
'use strict'

// gulp ver4.0 style
/*-=-=-=-=-=-=-=-
	packages
-=-=-=-=-=-=-=-*/
// import spec not yet support 
// import {src, dest, watch, series, parallel, lastRun} from 'gulp';

const {src, dest, watch, series, parallel, lastRun} = require('gulp');
// js
const babel = require('gulp-babel');
// css
const sass = require('gulp-sass');
// image
const minify_img = require('gulp-imagemin');
const fileSync = require('gulp-file-sync');
const newer = require('gulp-newer');
const syncy = require('syncy');
// assistance
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const {
	Readable,
	Writable,
	Transform,
	Duplex,
	pipeline,
	finished 
} = require('readable-stream');
const multiDest = require('gulp-multi-dest');

// const destOptions = {mode : 0755};	return error : Octal literals are not allowed in strict mode. 
/* error ref 
	https://stackoverflow.com/questions/34358331/why-are-octal-numeric-literals-not-allowed-in-strict-mode-and-what-is-the-worka
	https://stackoverflow.com/questions/23609042/how-to-avoid-octal-literals-are-not-allowed-in-strict-mode-with-createwritestr
	https://stackoverflow.com/questions/36878850/octal-literals-are-not-allowed-in-strict-mode
*/
/*-=-=-=-=-=-=-=-
	path
-=-=-=-=-=-=-=-*/
const path = {
	js : 'dist/js',
	css : 'dist/css',
	css_sec : 'dist_sec/css',
	img : 'dist/images'
}

/*-=-=-=-=-=-=-=-
	tasks
-=-=-=-=-=-=-=-*/
function start(done){
	console.log("Getting started");
	done();	// any callback is possible. 
}
function browser_sync(done){
	browserSync.init({
		server : {
			baseDir : 'dist'
		},
		ui : {
			port : 9998
		},
		port : 9999,
		// watch : true,
		// watchOptions: {
		// 	ignoreInitial: true,
		// 	ignored: '*.txt'
		// },
		// files: [
		// 	"src/js/*.js", 
		// 	"src/scss/*.scss",
		// 	"src/images/*"
		// ],
		// codeSync: false,
		logLevel: "info",
		ghostMode: false
	});
	done();
}
function js(){
	return pipeline(	// replace gulp.pipe
		src('src/js/*.js', {
			sourcemaps : true,
			since : lastRun(js)
		}),
		// babel({	// transfiling
		// 	presets : ['@babel/preset-env']
		// }),
		dest(path.js)
	);
}
function scss(){
	return pipeline(
		src('src/scss/*.scss', {
			sourcemaps : true,
			since : lastRun(scss)
		}),
		sass({
			outputStyle : 'compressed',	// minify
			errLogToconsole : true
		}),
		rename({
			suffix : '.min'
		}),
		multiDest(
			[ path.css, path.css_sec ]
		)
	);
}
function imgMinify(){
	return pipeline(
		src('src/images/*',{
			since : lastRun(imgMinify)
		}),
		minify_img([
			minify_img.jpegtran({
				progressive: true
			}),
			minify_img.svgo({
				plugins: [
					{removeViewBox: false},
					{removeUselessDefs: false},	// can't recognize use or useless.
					{removeMetadata : true}
				]
			})
		]),
		dest(path.img)
	);
}

// update & sync
function codeSyncReload(done){
	browserSync.reload();	// Be available as a method.
	done();
}
function assetSync(done){
	syncy(['dist/images/**', 'dist_sec/images/**'], 'dest')
	.then(() => {
		console.log('Done!');
		done();
	})
	.catch(() => {
		console.log('Done!');
		done();
	});
	// return pipeline(
	// 	src("dist/images/**"),
	// 	newer("dist_sec/images"),
	// 	dest("dist_sec/images")
	// );
}

function realtime_update(){
	// one by one
	watch('src/js/*.js', series(js, codeSyncReload));
	watch('src/scss/*.scss', series(scss, codeSyncReload));
	watch('src/images/*', series(imgMinify, codeSyncReload));
		// asset sync
		// watch('dist/images/*', series(assetSync, codeSyncReload));
		// watch("dist/images/*", fileSync("dist/images", "dist_sec/images"));

	// // use watch option with chokidar package
	// const watcher = watch(['src/js/*.js', 'src/scss/*.scss', 'src/images/*'])
	// watch('src/js/*.js', series(js));
	// watch('src/scss/*.scss', series(scss));
	// watch('src/images/*', series(imgMinify));
	// watcher.on('change', function(){
	// 	console.log("change something");
	// 	browserSync.reload();
	// });

	// an impossible codes
	// --- task function do not allow Anonymous function. ---
	// watch(['src/js/*.js']).on('change', function(){
	// 	browserSync.reload;
	// });
	// watch(['src/scss/*.scss']).on('change', function(){
	// 	browserSync.reload;
	// });
	// watch(['src/images/*']).on('change', function(){
	// 	browserSync.reload;
	// });
	// --- browserSync.reload being anonymouse excute and never finished. ---
	// watch('src/js/*.js', series(js, browserSync.reload));
	// watch('src/scss/*.scss', series(scss, browserSync.reload));
	// watch('src/images/*', series(imgMinify, browserSync.reload));
	// --- cannot split stream. ---
	// watch(
	// 	['src/js/*.js', 'src/scss/*.scss', 'src/images/*'], 
	// 	series(
	// 		parallel(js, scss, imgMinify),
	// 		browser_sync.reload
	// 	)
	// )
}

exports.js = js;
exports.scss = scss;
exports.imgMinify = imgMinify;
// exports.default = series(
// 	start,
// 	assetSync,
// 	parallel(js, scss), 
// 	browser_sync, 
// 	realtime_update
// );

function clean(cb) {
	cb();
}

function build(cb) {
	cb();
}

exports.test1 =  clean;
exports.test2 = series(clean, build);

// gulp ver3.0 style
function gulp3(){
	let gulp = require('gulp');
	// js packages
	let babel = require('gulp-babel');
	let uglify = require('gulp-uglify');
	// css packages
	let sass = require('gulp-sass');
	sass.compiler = require('node-sass');
		// dart sass
		// let d_sass = require('gulp-dart-sass');
		// let Fiber = require('fibers');
	// serve packages
	let minify_img = require('gulp-imagemin');
	let browserSync = require('browser-sync');
	
	location = {
		js : 'src/js/*.js',
		scss : 'src/scss/*.scss',
		image : 'src/images/*'
	}
	
	digest = {
		js : 'dist/js/',
		css : 'dist/css/',
		image : 'dist/images/'
	}
	
	tasks = ['js', 'scss', 'imgmin'];
	
	gulp.task('js', () => 
		gulp.src(location.js)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(digest.js))
	);
	
	gulp.task('scss', () =>
		gulp.src(location.scss)
		.pipe(sass({ 
			// fiber: Fiber,
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest(digest.css))
	);
	
	gulp.task('imgmin', () =>
		gulp.src(location.image)
		.pipe( minify_img(
			[minify_img.jpegtran({progressive: true})]
		) )
		.pipe(gulp.dest(digest.image))
	);
	
	function watchAll(){
	
		browserSync.init({
			server: {
				baseDir: "dist"
			}
		});
	
		for (path in location){
			for(let i=0; i<location.length; i++){
				gulp.watch(location.path, [tasks[i]]).on("change", browserSync.reload);
			}
		};
	
	};
	gulp.task("default", tasks, watchAll);
}