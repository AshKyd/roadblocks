var gulp = require('gulp');
var connect = require('gulp-connect');
var zip = require('gulp-zip');
var through = require('through');
var browserify = require('browserify');
var fs = require('fs');
var uglifyjs = require('uglifyjs');

function browserifyTask(src, dest){
    var b = browserify({
        entries: src,
        debug: false
    });

    return b.bundle()
        .pipe(fs.createWriteStream(dest));
}

gulp.task('js-main', function() {
    return browserifyTask('./src/scripts/index.js', 'dist/index.js');
});
gulp.task('js-worker', function() {
    return browserifyTask('./src/scripts/worker.js', 'dist/worker.js');
});
gulp.task('js', ['js-main','js-worker']);

gulp.task('html', function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
    gulp.src('src/css/style.css')
        .pipe(gulp.dest('dist/'));
});

gulp.task('connect',function(){
    connect.server({
        root: 'dist',
        livereload: false
    });
});

gulp.task('zip', ['js', 'css', 'html'], function(){
    gulp.src('dist/**')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'))
        .pipe(through(function(a){this.queue(a);},function(){
            var max = 13312;
            try{
                var size = fs.statSync(__dirname+'/dist.zip').size;
                var bytesleft = (max-size)+' bytes left.';
                if(size > max){
                    console.error('FILESIZE OVER: ',size+'kb. '+bytesleft);
                } else {
                    console.log('FILESIZE OKAY: ',Math.round(size/10.24)/100+'kb. '+bytesleft);
                }
            } catch(e){

            }
        }));
});

gulp.task('watch', function () {
    gulp.watch(['src/index.html','src/**/*'], ['build']);
});

gulp.task('build',['js','css','html','zip']);
gulp.task('default',['build','connect','watch']);
