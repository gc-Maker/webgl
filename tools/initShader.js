// 初始化着色器和着色器对象
function initShader(gl, VERTEX_SOURCE, FRAGMENT_SOURCE) {
    // 创建顶点着色器与片元着色器
    let vertex = gl.createShader(gl.VERTEX_SHADER);
    let fragment = gl.createShader(gl.FRAGMENT_SHADER);
    // 为着色器添加着色器程序
    gl.shaderSource(vertex, VERTEX_SOURCE);
    gl.shaderSource(fragment, FRAGMENT_SOURCE);
    // 编译着色器
    gl.compileShader(vertex);
    gl.compileShader(fragment);

    // 创建程序对象
    let program = gl.createProgram();
    // 为程序对象添加着色器
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    // 连接着色器
    gl.linkProgram(program);
    // 使用程序对象
    gl.useProgram(program);
    return program;
}