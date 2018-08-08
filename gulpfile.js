var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
gulp.task('server', function() {
    gulp.src('./src/')
        .pipe(server({
            port: 8083,
            middeware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/faviocn.ico') {
                    return;
                }
                if (pathname === '/')
                    pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readlinkSync(path.join(__dirname, 'src', pathname)));
            }

        }))
})