class ClientGate {
    public x: number = 0;
    constructor() {
        this.init();
        setInterval(() => this.draw(), 30);
    }
    public onClickBtnRefresh(): void {
        // string val = document.getElementById('p0').innerText;
        // console.log("onClickBtnRefresh",$("#p0").val());
        this.x = parseFloat($("#p0").val() as string);
    }

    private gl: WebGLRenderingContext;
    private shaderProgram:WebGLProgram;
    public init(): void {
        var canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        this.gl = canvas.getContext("webgl");
        //顶点着色器程序
        var VSHADER_SOURCE =
            "attribute vec4 a_Position;\n" +
            "void main() {" +
            //设置坐标
            "gl_Position = a_Position; " +
            //设置尺寸
            "gl_PointSize = 10.0; " +
            "} ";

        //片元着色器
        var FSHADER_SOURCE =
            "void main() {" +
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
    }
    public draw(): void {
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
    }
}