import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as child_process from 'child_process'
gulp.task('MoveNodeModules',function(cb){
    gulp.src('node_modules/q/q.js').pipe(gulp.dest('bin/lib/node_modules'));
    gulp.src('node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('bin/lib/node_modules'));
    cb();
});

/* gulp.task('BuildStaticServer', function (cb) {
    var tsProject = ts.createProject('tsconfig.server.json');
    var tsResult = gulp.src("src/StaticServer.ts").pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('bin/js'));
});

// gulp.task('launch StaticServer', ['tsc StaticServer'],function (cb) {
gulp.task('LaunchStaticServer',['BuildStaticServer'], function (cb) {
    // console.log('launch StaticServer');//
    var free = child_process.spawn('node', ['bin/js/StaticServer.js']);
    // 捕获标准输出并将其打印到控制台 
    free.stdout.on('data', function (data) {
        console.log('' + data);//data直接输出是奇怪的字符,所以这里先用''+转一下
        // console.log(data);
    });
    // 捕获标准错误输出并将其打印到控制台 
    free.stderr.on('data', function (data) {
        // console.log('standard error output:\n' + data);
        console.log(data);
    });
    // 注册子进程关闭事件 
    free.on('exit', function (code, signal) {
        console.log('child process eixt ,exit:' + code);
        cb();
    });
}); */

gulp.task('default',function(){
});