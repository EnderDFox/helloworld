var DrawPoint = /** @class */ (function () {
    function DrawPoint() {
        this.x = 0;
    }
    Object.defineProperty(DrawPoint, "si", {
        get: function () {
            if (DrawPoint._si == null) {
                DrawPoint._si = new DrawPoint();
            }
            return DrawPoint._si;
        },
        enumerable: true,
        configurable: true
    });
    DrawPoint.prototype.onClickBtnReset = function () {
        $("#p0").val(0);
        this.onClickBtnRefresh();
    };
    DrawPoint.prototype.onClickBtnChangeX = function (offset) {
        $("#p0").val((parseFloat($("#p0").val()) + offset).toFixed(1));
        this.onClickBtnRefresh();
    };
    DrawPoint.prototype.onClickBtnRefresh = function () {
        // string val = document.getElementById('p0').innerText;
        // console.log("onClickBtnRefresh",$("#p0").val());
        this.x = parseFloat($("#p0").val());
    };
    DrawPoint.prototype.init = function () {
        var _this = this;
        this.initWebgl();
        setInterval(function () { return _this.draw(); }, 30);
    };
    DrawPoint.prototype.initWebgl = function () {
        var canvas = document.getElementById('canvas');
        this.gl = canvas.getContext("webgl");
        //顶点着色器程序
        var VSHADER_SOURCE = "attribute vec4 a_Position;\n" +
            "void main() {" +
            //设置坐标
            "gl_Position = a_Position; " +
            //设置尺寸
            "gl_PointSize = 10.0; " +
            "} ";
        //片元着色器
        var FSHADER_SOURCE = "void main() {" +
            //设置颜色
            "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
            "}";
        //获取绘制三维上下文
        if (!this.gl) {
            console.log("Failed");
            return;
        }
        //编译着色器
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, VSHADER_SOURCE);
        this.gl.compileShader(vertShader);
        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragShader, FSHADER_SOURCE);
        this.gl.compileShader(fragShader);
        //合并程序
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertShader);
        this.gl.attachShader(this.shaderProgram, fragShader);
        this.gl.linkProgram(this.shaderProgram);
        this.gl.useProgram(this.shaderProgram);
    };
    DrawPoint.prototype.draw = function () {
        if (!this.gl) {
            return;
        }
        var a_Position = this.gl.getAttribLocation(this.shaderProgram, "a_Position");
        if (a_Position < 0) {
            console.log("Failed to get the storege location of a_Position");
            return;
        }
        /* this.x += 0.01;
        console.log("x:",this.x);
        if(this.x>1){
            this.x = -1;
        } */
        this.gl.vertexAttrib3f(0, this.x, 0, 0);
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        //绘制一个点
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    };
    return DrawPoint;
}());
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    MathUtil.repeat = function (t, length) {
        while (t >= length) {
            t -= length;
        }
        while (t < 0) {
            t += length;
        }
        return t;
    };
    return MathUtil;
}());
/// <reference path="../ts_common/utils/MathUtil" />
//多层贴图, 第二贴图是水波纹效果贴图
var MultiTextureWithWater = /** @class */ (function () {
    function MultiTextureWithWater() {
        this.val_offsetUV = 0;
        this.g_texUnit0 = false;
        this.g_texUnit1 = false;
    }
    Object.defineProperty(MultiTextureWithWater, "si", {
        get: function () {
            if (MultiTextureWithWater._si == null) {
                MultiTextureWithWater._si = new MultiTextureWithWater();
            }
            return MultiTextureWithWater._si;
        },
        enumerable: true,
        configurable: true
    });
    MultiTextureWithWater.prototype.init = function () {
        var _this = this;
        Q.all([
            Q.Promise(function (resolve, reject) {
                $.get("shaders/standard_vs.txt", null, function (data) {
                    resolve(data);
                }, "text");
                //reject("t1 error");
            }),
            Q.Promise(function (resolve, reject) {
                $.get("shaders/MultiTextureWithWater_fs.txt", null, function (data) {
                    resolve(data);
                }, "text");
            })
        ]).then(function (values) {
            // console.log(values.length);
            _this.initWebgl(values[0], values[1]);
        });
        /*
        $.get("shaders/standard_vs.txt", null, (data) => {
          this.VSHADER_SOURCE = data;
          this.validateInit();
        }, "text");
        $.get("shaders/MultiTextureWithWater_fs.txt", null, (data) => {
          this.FSHADER_SOURCE = data;
          this.validateInit();
        }, "text");
        */
    };
    MultiTextureWithWater.prototype.initWebgl = function (vs, fs) {
        // Retrieve <canvas> element
        var canvas = document.getElementById('webgl');
        // Get the rendering context for WebGL
        this.gl = getWebGLContext(canvas);
        if (!this.gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }
        this.program = initShaders(this.gl, vs, fs);
        // Initialize shaders
        if (this.program == null) {
            console.log('Failed to intialize shaders.');
            return;
        }
        // Set the vertex information
        var n = this.initVertexBuffers();
        if (n < 0) {
            console.log('Failed to set the vertex information');
            return;
        }
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        // Specify the color for clearing <canvas>
        this.gl.clearColor(0.6, 0.6, 0.6, 1.0);
        // Set texture
        if (!this.initTextures(n)) {
            console.log('Failed to intialize the texture.');
            return;
        }
    };
    MultiTextureWithWater.prototype.initVertexBuffers = function () {
        var gl = this.gl;
        var pos = 1.2;
        var verticesTexCoords = new Float32Array([
            // Vertex coordinate, Texture coordinate
            -pos, pos, 0.0, 1.0,
            -pos, -pos, 0.0, 0.0,
            pos, pos, 1.0, 1.0,
            pos, -pos, 1.0, 0.0,
        ]);
        var n = 4; // The number of vertices
        // Create a buffer object
        var vertexTexCoordBuffer = gl.createBuffer();
        if (!vertexTexCoordBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
        this.pos_offsetUV = gl.getUniformLocation(this.program, 'offsetUV');
        // Write the positions of vertices to a vertex shader
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
        var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
        //Get the storage location of a_Position, assign and enable buffer
        var a_Position = gl.getAttribLocation(this.program, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return -1;
        }
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
        gl.enableVertexAttribArray(a_Position); // Enable the assignment of the buffer object
        // Get the storage location of a_TexCoord
        var a_TexCoord = gl.getAttribLocation(this.program, 'a_TexCoord');
        if (a_TexCoord < 0) {
            console.log('Failed to get the storage location of a_TexCoord');
            return -1;
        }
        gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
        gl.enableVertexAttribArray(a_TexCoord); // Enable the buffer assignment
        return n;
    };
    MultiTextureWithWater.prototype.initTextures = function (n) {
        var _this = this;
        var gl = this.gl;
        // Create a texture object
        var texture0 = gl.createTexture();
        var texture1 = gl.createTexture();
        if (!texture0 || !texture1) {
            console.log('Failed to create the texture object');
            return false;
        }
        // Get the storage location of u_Sampler0 and u_Sampler1
        var u_Sampler0 = gl.getUniformLocation(this.program, 'u_Sampler0');
        var u_Sampler1 = gl.getUniformLocation(this.program, 'u_Sampler1');
        if (!u_Sampler0 || !u_Sampler1) {
            console.log('Failed to get the storage location of u_Sampler');
            return false;
        }
        // Create the image object
        var image0 = new Image();
        var image1 = new Image();
        if (!image0 || !image1) {
            console.log('Failed to create the image object');
            return false;
        }
        // Register the event handler to be called when image loading is completed
        image0.onload = function () { _this.loadTexture(n, texture0, u_Sampler0, image0, 0); };
        image1.onload = function () { _this.loadTexture(n, texture1, u_Sampler1, image1, 1); };
        // Tell the browser to load an Image
        image0.src = 'resources/shayu.png';
        image1.src = 'resources/water.png';
        return true;
    };
    // Specify whether the texture unit is ready to use
    MultiTextureWithWater.prototype.loadTexture = function (n, texture, u_Sampler, image, texUnit) {
        var _this = this;
        var gl = this.gl;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y-axis
        // Make the texture unit active
        if (texUnit == 0) {
            gl.activeTexture(gl.TEXTURE0);
            this.g_texUnit0 = true;
        }
        else {
            gl.activeTexture(gl.TEXTURE1);
            this.g_texUnit1 = true;
        }
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Set texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Set the image to texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(u_Sampler, texUnit); // Pass the texure unit to u_Sampler
        // Clear <canvas>
        if (this.g_texUnit0 && this.g_texUnit1) {
            setInterval(function () { return _this.render(n); }, 30);
        }
    };
    MultiTextureWithWater.prototype.render = function (n) {
        this.val_offsetUV = MathUtil.repeat(this.val_offsetUV + 0.003, 1);
        this.gl.uniform1f(this.pos_offsetUV, this.val_offsetUV);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
    };
    return MultiTextureWithWater;
}());
//# sourceMappingURL=bundle.js.map