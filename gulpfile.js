const PATH = require('./node/paths'),
		gulp = require('gulp'),
		sass = require('gulp-sass'),
		pug  = require('gulp-pug'),
		browserSync = require('browser-sync').create(),
		fs   = require('fs'),
		argv = require('yargs').argv;

function msg(text){
	console.log(text);
}

gulp.task('sass', function(){
	return gulp.src(PATH.TEMP.SASS + '**/*.sass')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest(PATH.TEMP.CSS))
		.pipe(browserSync.stream()); 
})

gulp.task('pug', function(){
	return gulp.src(PATH.TEMP.PUG + 'pages/**/*.pug')
		.pipe(pug({

		}))
		.pipe(gulp.dest(PATH.TEMP.SRC))
})

gulp.task('js', function(){
	return gulp.src(PATH.TEMP.JS + '**/*.js')
})

gulp.task('watch', function(){
	browserSync.init({
		server: PATH.TEMP.SRC
	});
	gulp.watch(PATH.TEMP.SASS + '**/*.sass', gulp.series('sass'));
	gulp.watch(PATH.TEMP.PUG + '**/*.pug', gulp.parallel('pug')).on('change', browserSync.reload);
	gulp.watch(PATH.TEMP.JS + '**/*.js').on('change', browserSync.reload);
})

function createPugFile(dir, template, text) {
	var args = argv.n.split(',')
	args.forEach(function(arg, i){
		var file = PATH.TEMP.PUG + `${dir}${arg}.pug`;
		fs.access(file, function(error){
			if (!error) {
				return msg(`${text} ${arg} уже имеется`);
			} else{
				fs.writeFile(file, template, function(error){
					return msg(`${text} ${arg} успешно создана`);    
				});
			}
		})
	})
}

gulp.task('page', function(callback){
	if(argv.n){
		createPugFile('pages/', fs.readFileSync(PATH.TEMP.PUG + '_page.pug', 'utf8', function(error, data){return data}), 'Страница');
	}

	callback();
})

gulp.task('part', function(callback){
	if(argv.n){
		createPugFile('parts/', '', 'Часть');
	}

	callback();
})


gulp.task('default', gulp.parallel(['watch']));