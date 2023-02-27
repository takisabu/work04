// ----- 共通パッケージ -----
// gulp本体
const gulp = require('gulp');

// エラー処理
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// 名前変更
const rename = require('gulp-rename');


// ----- 共通関数 -----
function get_dest_theme_path() {
  return './public/'
}


function get_dest_assets_path(dir_name) {
  return `${get_dest_theme_path()}assets/${dir_name}/`;
}


// ----- 実行コマンド -----
// 開発中の監視自動化
exports.dev = gulp.parallel(browserInit, watch);

// 手動の一括ビルド
exports.build = gulp.parallel(copyHtml, compileSass, copyImage, minJS);

// 個別のビルド
exports.copyHtml = copyHtml;
exports.compileSass = compileSass;
exports.copyImage = copyImage;
exports.minJS = minJS;


// ----- 監視 -----
function watch() {
  gulp.watch('./src/**/*.html', gulp.series(copyHtml, browserReload));
  gulp.watch('./src/assets/sass/**/*.scss', gulp.series(compileSass, browserReload));
  gulp.watch('./src/assets/img/**/*', gulp.series(copyImage, browserReload));
  gulp.watch('./src/assets/js/**/*.js', gulp.series(minJS, browserReload));
}


// ----- ブラウザの操作 -----
const browserSync = require('browser-sync');

// ブラウザ初期化
function browserInit(done) {
  target = {
    server: {
      baseDir: get_dest_theme_path(),
      index: "",
    }
  };

  browserSync.init(target);
  done();
}

// ブラウザ自動更新
function browserReload(done) {
  browserSync.reload();
  done();
}


// --- ファイル種別ごとの処理 -----
// HTML
function copyHtml() {
  return gulp.src(['./src/**/*.html', '!./src/**/_*.html'])
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>'),
  }))
  .pipe(gulp.dest(get_dest_theme_path()));
}


// SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssSorter = require('css-declaration-sorter');
const mmq = require('gulp-merge-media-queries');
const cleanCss = require('gulp-clean-css');

function compileSass() {
  return gulp.src('./src/assets/sass/**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>'),
  }))
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssSorter()]))
  .pipe(mmq())
  .pipe(gulp.dest(get_dest_assets_path('css')))
  .pipe(gulp.dest('./src/assets/css/'))
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(get_dest_assets_path('css')));
}

// JS
const uglify = require('gulp-uglify');

function minJS() {
  return gulp.src('./src/assets/js/**/*.js')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>'),
  }))
  .pipe(gulp.dest(get_dest_assets_path('js')))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(get_dest_assets_path('js')));
}

// Image
function copyImage() {
  return gulp.src('./src/assets/img/**/*')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>'),
  }))
  .pipe(gulp.dest(get_dest_assets_path('img')));
}