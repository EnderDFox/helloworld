var express = require('express'),
	fortune = require('./lib/fortune.js'),
    formidable = require('formidable');
    fs = require('fs');
    path = require('path');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());


var filesData = null;

function getFilesData(){
    // if(filesData==null){
        filesData = {};
        filesData.files = [];
        // parseDir("D:/downloads/a3");
        parseDir("S:/av/Years/2017.s4");
    // }
    return filesData;
}

function parseDir(dir) {
    var files = fs.readdirSync(dir);
    // console.log("[debug]","files",files.length);
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fullname = path.resolve(dir, file);
        var stat = fs.lstatSync(fullname);
        if (stat.isDirectory()) {
            // parseDir(fullname);
        } else {
            if (file.indexOf(".") == 0) {
                console.info("[info]", "过滤掉以 . 开头的File");
            } else {
                filesData.files.push(
                    {
                        idIndex:filesData.files.length,
                        fullname:fullname,
                        curr_name:path.parse(fullname).name
                    }
                );
            }
        }
    }
}

app.get('/', function(req, res) {
    res.redirect(303, '/ChangeFileName');
});
app.get('/ChangeFileName',function(req,res){
    res.render('change_file_name',getFilesData());
});
app.post('/ChangeFileName/change',function(req,res){
    console.log("/ChangeFileName/change post:",req.body);
    var fileVo = filesData.files[req.body.idIndex];
    var parsedPath = path.parse(fileVo.fullname);
    var newFullname = path.resolve(parsedPath.dir, req.body.newName)+parsedPath.ext;
    console.log("newFullname:",newFullname);
    if(fileVo.fullname.toLowerCase()==newFullname.toLowerCase()){
        //大小写不敏感时直接rename有问题
        fs.rename(fileVo.fullname,newFullname+".back",function(){
            fs.rename(newFullname+".back",newFullname);
        });
    }else{
        fs.rename(fileVo.fullname,newFullname);
    }
    fileVo.fullname = newFullname;
    parsedPath = path.parse(newFullname);
    fileVo.curr_name = parsedPath.name;
    res.send({ success: true });
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});


