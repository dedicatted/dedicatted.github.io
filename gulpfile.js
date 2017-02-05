var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		fileinclude    = require('gulp-file-include'),
		gulpRemoveHtml = require('gulp-remove-html'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', ['headersass'], function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass', function() {
	return gulp.src('app/header.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		// 'app/libs/magnific-popup/magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
	gulp.watch('app/header.sass', ['headersass']);
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
<<<<<<< HEAD
		.pipe(gulp.dest('./img')); 
=======
		.pipe(gulp.dest('dist/img')); 
>>>>>>> b1e1a6a3a9328d0f2892569d307dde3c8d4818c6
});

gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
<<<<<<< HEAD
    .pipe(gulp.dest('./'));
=======
    .pipe(gulp.dest('dist/'));
>>>>>>> b1e1a6a3a9328d0f2892569d307dde3c8d4818c6
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'app/css/fonts.min.css',
		'app/css/main.min.css'
<<<<<<< HEAD
		]).pipe(gulp.dest('./css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
	]).pipe(gulp.dest('.'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('./fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('./js'));
=======
		]).pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));
>>>>>>> b1e1a6a3a9328d0f2892569d307dde3c8d4818c6

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
<<<<<<< HEAD
	'./**',
	'./.htaccess',
=======
	'dist/**',
	'dist/.htaccess',
>>>>>>> b1e1a6a3a9328d0f2892569d307dde3c8d4818c6
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
