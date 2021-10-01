# 该仓库中的代码以webgl编程指南的章节进行划分，都是书中例子的实现


# WebGL: INVALID_OPERATION: useProgram: program not valid

在编程过程中出现以上提示的原因可能是着色器代码错写错误，可以通过gl.getShaderInfoLog(Shader)来获取具体的提示信息。
- gl：webgl绘图上下文
- shader：着色器

将chapter1/drawPoint.html中的顶点着色器代码中的gl_PointSize改为gl_PointSize1并且将最后一行代码 
`// console.log(gl.getShaderInfoLog(vertex));`注释取消，在控制台会输出额外的报错信息
`ERROR: 0:2: 'gl_PointSize1' : undeclared identifier`
