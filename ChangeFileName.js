var express = require('express'),
    fortune = require('./lib/fortune.js'),
    formidable = require('formidable');
fs = require('fs');
path = require('path');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
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


var filesData = { dir: "" };
var fileAll = new Array();
function getFilesData() {
    filesData.files = [];
    if (filesData.dir) {
        parseDir(filesData.dir);
        getFiles(filesData.dir);
    }
    var i = 3;
    filesData.randomFiles = [];
    //  = fileAll.slice(0,3);
    while (i--) {
        var obj = fileAll[randomInt(fileAll.length - 1)];
        filesData.randomFiles.push(obj);
    }
    return filesData;
}

function randomInt(max) {
    var rs = Math.random() * max;
    rs = Math.round(rs);
    return rs;
}

function parseDir(dir) {
    if (dir == null || dir.trim() == "") {
        return;
    }
    if (dir.indexOf("/") == -1) {
        dir += "/";
    }
    // console.log("parseDir", dir, path.resolve(dir));
    var files = fs.readdirSync(dir);
    // console.log("[debug]","files",files.length);
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fullname = path.resolve(dir, file);
        console.log("parseDir item:", fullname, file);
        try {
            var stat = fs.lstatSync(fullname);
            if (file.indexOf(".") == 0) {
                console.info("[info]", "过滤掉以 . 开头的File");
            } else {
                if (stat.isDirectory()) {
                    filesData.files.push(
                        {
                            idIndex: filesData.files.length,
                            isDir: true,
                            fullname: fullname,
                            curr_name: path.parse(fullname).name
                        }
                    );
                    // parseDir(fullname);//recursive children folders
                } else {
                    filesData.files.push(
                        {
                            idIndex: filesData.files.length,
                            isDir: false,
                            fullname: fullname,
                            curr_name: path.parse(fullname).name
                        }
                    );
                }
            }
        } catch (error) {
        }
    }
}
function getFiles(dir) {
    if (dir == null || dir.trim() == "") {
        return;
    }
    if (dir.indexOf("/") == -1) {
        dir += "/";
    }
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fullname = path.resolve(dir, file);
        console.log("parseDir item:", fullname, file);
        try {
            var stat = fs.lstatSync(fullname);
            if (file.indexOf(".") == 0) {
                console.info("[info]", "过滤掉以 . 开头的File");
            } else {
                if (stat.isDirectory()) {
                    /*  fileAll.push(
                         {
                             idIndex: filesData.files.length,
                             isDir: true,
                             fullname: fullname,
                             curr_name: path.parse(fullname).name
                         }
                     ); */
                    getFiles(fullname);//recursive children folders
                } else {
                    fileAll.push(
                        {
                            idIndex: filesData.files.length,
                            isDir: false,
                            fullname: fullname,
                            curr_name: path.parse(fullname).name
                        }
                    );
                }
            }
        } catch (error) {
        }
    }
}
app.get('/', function (req, res) {
    res.redirect(303, '/ChangeFileName');
});
app.get('/ChangeFileName', function (req, res) {
    filesData.dir = req.query.dir || "";
    // console.log(filesData.dir, "{filesData.dir}");
    res.render('change_file_name', getFilesData());
});
app.get('/ChangeFileName/openRandom', function (req, res) {
    console.log("openRandom",req);
});
app.post('/ChangeFileName/change', function (req, res) {
    console.log("/ChangeFileName/change post:", req.body);
    var fileVo = filesData.files[req.body.idIndex];
    var parsedPath = path.parse(fileVo.fullname);
    var newFullname = path.resolve(parsedPath.dir, req.body.newName) + parsedPath.ext.toLowerCase();
    console.log("newFullname:", newFullname);
    if (fileVo.fullname.toLowerCase() == newFullname.toLowerCase()) {
        //大小写不敏感时直接rename有问题
        fs.rename(fileVo.fullname, newFullname + ".back", function () {
            fs.rename(newFullname + ".back", newFullname);
        });
    } else {
        fs.rename(fileVo.fullname, newFullname);
    }
    fileVo.fullname = newFullname;
    parsedPath = path.parse(newFullname);
    fileVo.curr_name = parsedPath.name;
    res.send({ success: true });
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});