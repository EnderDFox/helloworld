import * as express from "express";
import * as path from "path";
var app:express.Express = express();
console.log(__dirname,"{__dirname}");
console.log(path.resolve(__dirname,'../../'));
// app.use(express.static(__dirname + '/..'));
app.get('/',function(req,res,next){
    res.redirect(303, '/bin/index.html');
});
app.use(express.static(path.resolve(__dirname,'../../')));//'C:/fox/projects/helloword/webgl'
app.use(function(req, res, next){
    console.log("404",req.url);
});
app.use(function(err, req, res, next){
	console.error("err:",err.stack);
});
app.set('port',3000);
app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate StaticServer.' );
});