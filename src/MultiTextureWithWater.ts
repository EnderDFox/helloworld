/// <reference path="../ts_common/utils/MathUtil" />
//多层贴图, 第二贴图是水波纹效果贴图
class MultiTextureWithWater {
  private static _si: MultiTextureWithWater;
  public static get si(): MultiTextureWithWater {
    if (MultiTextureWithWater._si == null) {
      MultiTextureWithWater._si = new MultiTextureWithWater();
    }
    return MultiTextureWithWater._si;
  }

  public gl: WebGLRenderingContext;
  public program: WebGLProgram;
  pos_offsetUV: WebGLUniformLocation;
  val_offsetUV: number = 0;
  g_texUnit0: boolean = false;
  g_texUnit1: boolean = false;

  public init() {
    Q.all<string>([
      Q.Promise<string>((resolve, reject) => {
        $.get("shaders/standard_vs.txt", null, (data) => {
          resolve(data);
        }, "text");
        //reject("t1 error");
      }),
      Q.Promise<string>((resolve, reject) => {
        $.get("shaders/MultiTextureWithWater_fs.txt", null, (data) => {
          resolve(data);
        }, "text");
      })
    ]).then((values) => {
      // console.log(values.length);
      this.initWebgl(values[0], values[1]);
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
  }
  public initWebgl(vs: string, fs: string) {
    // Retrieve <canvas> element
    var canvas: HTMLElement = document.getElementById('webgl');
    // Get the rendering context for WebGL
    this.gl = getWebGLContext(canvas);
    if (!this.gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
    this.program = initShaders(this.gl,vs,fs);
    // Initialize shaders
    if (this.program==null) {
      console.log('Failed to intialize shaders.');
      return;
    }

    // Set the vertex information
    var n: number = this.initVertexBuffers();
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
  }
  public initVertexBuffers() {
    var gl:WebGLRenderingContext = this.gl;
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
    gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

    // Get the storage location of a_TexCoord
    var a_TexCoord = gl.getAttribLocation(this.program, 'a_TexCoord');
    if (a_TexCoord < 0) {
      console.log('Failed to get the storage location of a_TexCoord');
      return -1;
    }
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);  // Enable the buffer assignment

    return n;
  }

  public initTextures(n: number) {
    var gl: WebGLRenderingContext = this.gl;
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
    image0.onload = () => { this.loadTexture(n, texture0, u_Sampler0, image0, 0); };
    image1.onload = () => { this.loadTexture(n, texture1, u_Sampler1, image1, 1); };
    // Tell the browser to load an Image
    image0.src = 'resources/shayu.png';
    image1.src = 'resources/water.png';

    return true;
  }
  // Specify whether the texture unit is ready to use
  public loadTexture(n: number, texture, u_Sampler, image: HTMLImageElement, texUnit) {
    var gl: WebGLRenderingContext = this.gl;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);// Flip the image's y-axis
    // Make the texture unit active
    if (texUnit == 0) {
      gl.activeTexture(gl.TEXTURE0);
      this.g_texUnit0 = true;
    } else {
      gl.activeTexture(gl.TEXTURE1);
      this.g_texUnit1 = true;
    }
    // Bind the texture object to the target
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // Set the image to texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler, texUnit);   // Pass the texure unit to u_Sampler

    // Clear <canvas>
    if (this.g_texUnit0 && this.g_texUnit1) {
      // setInterval(() => this.render(n), 30);
      window.requestAnimationFrame(()=>{this.render(n);});
    }
  }
  public render(n) {
    this.val_offsetUV = MathUtil.repeat(this.val_offsetUV + 0.003, 1);
    this.gl.uniform1f(this.pos_offsetUV, this.val_offsetUV);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n);   // Draw the rectangle
  }
}
