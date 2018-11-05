//导入gulp
const gulp = require('gulp'), //
    sass = require('gulp-sass'), //sass处理
    browserSync = require('browser-sync'), //搭建本地服务器并实时刷新
    useref = require('gulp-useref'), //合并文件
    uglify = require('gulp-uglify'), //压缩文件
    minifyCSS = require('gulp-minify-css'), //压缩css
    imagemin = require('gulp-imagemin'), //压缩图片
    cache = require('gulp-cache'), //减少图片重复压缩
    del = require('del'), //清理文件夹
    gulpIf = require('gulp-if'), //判断
    runSequence = require('run-sequence'), //执行任务
    htmlmin = require('gulp-htmlmin'), //对页面压缩
    rev = require('gulp-rev'),//添加hash值
    revReplace = require('gulp-rev-replace'),//替换hash值
    filter = require('gulp-filter'),  //-文件
    connect = require('gulp-connect'),
    csso = require('gulp-csso');   //压缩css


//sass任务
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('connect',function(){
    connect.server({
        root:'app',//根目录
        port: '47.100.37.94',//端口号
        livereload:true
    });
});



//搭建本地服务器并实时刷新
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app',
        },
        port:8000
    })
})




//合并压缩js/css
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        // Minifies only if it's a CSS file
        .pipe(gulpIf('app/*.css', minifyCSS()))
        // Uglifies only if it's a Javascript file
        .pipe(gulpIf('app/*.js', uglify()))
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

//压缩页面
gulp.task('html', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('app/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});


//压缩图片
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});


//清理文件夹(除去图片)
gulp.task('clean:dist', function (callback) {
    del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

//清理文件夹(包括图片)
gulp.task('clean', function (callback) {
    del('dist');
    return cache.clearAll(callback);
})


gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass', 'useref']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

//默认任务
gulp.task('default', function (callback) {
    runSequence(['sass', 'useref', 'images', 'browserSync', 'watch'],
        callback
    )
})


gulp.task('dev',function(){
    var jsFilter = filter('**/*.js',{restore:true}); 
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});

    return gulp.src('app/index.html')   //index主页
        .pipe(useref())//合并js ，css
        .pipe(jsFilter)
        .pipe(uglify())//压缩js
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())//压缩css
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())//添加哈希
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())//替换哈希码
        .pipe(gulp.dest('dist'));//输出
});

