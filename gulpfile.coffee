autoprefixer = require 'gulp-autoprefixer'
bower        = require 'gulp-bower'
bump         = require 'gulp-bump'
coffee       = require 'gulp-coffee'
concat       = require 'gulp-concat'
connect      = require 'connect'
foreach      = require 'gulp-foreach'
fs           = require 'fs'
git          = require 'gulp-git'
gulp         = require 'gulp'
gutil        = require 'gulp-util'
http         = require 'http'
jade         = require 'gulp-jade'
livereload   = require 'gulp-livereload'
minifyCss    = require 'gulp-minify-css'
minifyHtml   = require 'gulp-minify-html'
open         = require "gulp-open"
plumber      = require 'gulp-plumber'
rev          = require 'gulp-rev'
rimraf       = require 'rimraf'
sass         = require 'gulp-sass'
uglify       = require 'gulp-uglify'
usemin       = require 'gulp-usemin'
watch        = require 'gulp-watch'
wrap         = require 'gulp-wrap'

# Paths to source files

jadeStagePath     = 'stage/index.jade'
jadePath          = 'app/jade/**/*.jade'
cssPath           = 'app/scss/**/*.scss'
cssStagePath      = 'stage/stage.scss'
coffeePath        = 'app/coffee/**/*.coffee'
coffeeStagePath   = 'stage/**/*.coffee'
assetPath         = 'app/images/*'


htmlStage = (cb)->
  gulp.src jadeStagePath
    .pipe jade()
    .pipe gulp.dest('./server/')
    .on('end', cb)

html = (cb)->
  gulp.src( jadePath )
    .pipe jade(client: true)
    .pipe wrap( "jadeTemplate['<%= file.relative.split('.')[0] %>'] = <%= file.contents %>;\n" )
    .pipe concat('jade-templates.js')
    .pipe wrap( "jadeTemplate = {};\n<%= file.contents %>" )
    .pipe gulp.dest('./server/js')
    .on('end', cb)

css = (cb)->
  # Stage css - not included in build
  gulp.src( cssPath )
    .pipe sass({errLogToConsole: true})
    .pipe autoprefixer( browsers: ['last 1 version'],cascade: false )
    .pipe gulp.dest('./server/css')
    .on('end', cb)

cssStage = (cb)->
  # Stage css - not included in build
  gulp.src( cssStagePath )
    .pipe sass({errLogToConsole: true})
    .pipe autoprefixer( browsers: ['last 1 version'],cascade: false )
    .pipe gulp.dest('./server/stage/css')
    .on('end', cb)

js = (cb)->
  # App
  gulp.src( coffeePath )
    .pipe plumber()
    .pipe coffee( bare: true ).on( 'error', gutil.log ) .on( 'error', gutil.beep )
    .pipe concat('app.js')
    .pipe gulp.dest('server/js')
    .on('end', cb)

jsStage = (cb)->
  gulp.src coffeeStagePath
    .pipe plumber()
    .pipe coffee( bare: true ).on('error', gutil.log).on( 'error', gutil.beep )
    .pipe concat('init.js')
    .pipe gulp.dest('server/stage/js')
    .on('end', cb)

copyAssets = (destination, cb) ->
  gulp.src assetPath
    .pipe gulp.dest(destination)
    .on('end', cb)

copyBowerLibs = ()->
  bower().pipe gulp.dest('./server/bower-libs/')

copyFilesToBuild = ->
  gulp.src( './server/js/*' ).pipe gulp.dest('./rel/')
  gulp.src( './server/css/main.css' ).pipe gulp.dest('./rel/')

pushViaGit = ->
  # Start out by reading the version number for commit msg, then git push, etc..
  fs.readFile './bower.json', 'utf8', (err, data) =>
    regex   = /version"\s*:\s*"(.+)"/
    version = data.match(regex)[1]
    gulp.src('./')
      .pipe git.add()
      .pipe git.commit("BUILD - #{version}")
      .pipe git.push 'origin', 'master', (err)=> console.log( err)

bumpBowerVersion = ->
  gulp.src('./bower.json')
    .pipe bump( {type:'patch'} )
    .pipe(gulp.dest('./'));

minifyAndJoin = () ->
  gulp.src('./server/*.html').pipe foreach((stream, file) ->
    stream.pipe(
      usemin
        css : [ minifyCss(), 'concat']
        html: [ minifyHtml({empty: true})]
        js  : [ uglify()]
    ).pipe gulp.dest('rel/')
  )


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Livereload Server
server = ->
  port      = 5031
  hostname  = null # allow to connect from anywhere
  base      = 'server'
  directory = 'server'
  app = connect()
    .use( connect.static(base) )
    .use( connect.directory(directory) )

  http.createServer(app).listen port, hostname
  console.log "SERVER LISTENING -> localhost:#{port}"

# Open in the browser
launch = ->
  gulp.src("./stage/index.jade") # An actual file must be specified or gulp will overlook the task.
    .pipe(open("",
      url: "http://localhost:5031/index.html",
      app: "google chrome"
    ))

compileFiles = (doWatch=false, cb) ->
  count       = 0
  onComplete = ()=> if ++count == ar.length then cb()
  ar         = [
    {meth:js,         glob:coffeePath}
    {meth:css,        glob:cssPath}
    {meth:html,       glob:jadePath}
    {meth:jsStage,    glob:coffeeStagePath}
    {meth:cssStage,   glob:cssStagePath}
    {meth:htmlStage,  glob:jadeStagePath}
    {meth:copyAssets, glob:assetPath, params:['server/assets', onComplete]}
  ]

  createWatcher = (item, params)-> watch( { glob:item.glob }, => item.meth.apply(null, params).pipe( livereload() ) )

  for item in ar
    params = if item.params? then item.params else [onComplete]
    if doWatch
      createWatcher(item, params)
    else
      item.meth.apply null, params

# ----------- MAIN ----------- #

gulp.task 'clean',                  (cb) -> rimraf './server', cb
gulp.task 'bowerLibs', ['clean'],   ()   -> copyBowerLibs()
gulp.task 'compile', ['bowerLibs'], (cb) -> compileFiles(true, cb)
gulp.task 'server', ['compile'],    (cb) -> server(); launch();
gulp.task 'default', ['server']

# ----------- BUILD (rel) ----------- #

gulp.task 'rel:clean',                                 (cb)  -> rimraf './rel', cb
gulp.task 'bumpVersion',                               ()    -> bumpBowerVersion()
gulp.task 'copyStatics', ['bowerLibs'],                ()    -> copyAssets('rel/assets', ->)
gulp.task 'releaseCompile', ['copyStatics'],           (cb)  -> compileFiles(false, cb)
gulp.task 'minify',['releaseCompile'],                 ()    -> minifyAndJoin();
gulp.task 'rel', ['rel:clean', 'bumpVersion', 'minify'],     -> #pushViaGit()
