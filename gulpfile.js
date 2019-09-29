const { src, dest, pipe, watch, series, parallel } = require('gulp');

// 01=>html文件压缩插件

let htmlMin = require('gulp-htmlmin');
let options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
let htmlMinTask = () => src('./src/*.html').pipe(htmlMin(options)).pipe(dest('./dist/'));
exports.htmlMinTask = htmlMinTask;

// 02=>压缩css文件
let cssMin = require('gulp-cssmin');
let cssMinTask = () => src('./src/css/*.css').pipe(cssMin()).pipe(dest('./dist/css'));
exports.cssMinTask = cssMinTask;

//03 => 重命名
let rename = require('gulp-rename');

let concat = require('gulp-concat');
let concatTask = () => src('./src/css/*.css')
    .pipe(concat('index.css'))
    .pipe(dest('./dist/css'))
    .pipe(cssMin())
    .pipe(rename('index.min.css'))
    .pipe(dest('./dist/css'));

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
let jsTask = () => src('./src/js/*.js')
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(dest('./dist/js'));

exports.jsTask = jsTask;


let serverCopy = () => src('./src/server/*.php').pipe(dest('./dist/server'));
exports.serverCopy = serverCopy;

let imgCopy = () => src('./src/img/*').pipe(dest('./dist/img'));
exports.imgCopy = imgCopy;

let fontCopy = () => src('./src/iconfont/iconfont.woff').pipe(dest('./dist/iconfont'));
exports.fontCopy = fontCopy;