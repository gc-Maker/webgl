# 该仓库中的代码以webgl编程指南的章节进行划分，都是书中例子的实现

# webgl中涉及的一些概念
## 着色器
  - 顶点着色器(Vertex shader)：用来描述顶点特性(位置、颜色等)
  - 片元着色器(Fragment shader)：进行逐片元处理过程如光照，片元是webgl中的一个术语，可以理解为像素[这段话是书中的描述，暂时不太理解，后续补充]

## attribute、uniform、varying
  - attribute：只能用于顶点着色器中，声明顶点数据变量
  - uniform：作用于顶点着色器与片元着色器，声明非顶点数据变量
  - varying：
## 获取变量以及存储变量使用的函数
  - getAttribLocation：获取attribute变量的存储位置
  - vertexAttrib3f(方法中的数字可以是1-4中的任意一个)：设置attribute变量的值      (在第二章ClickPoints.html文件中有使用到）
  - getUniformLocation：获取uniform变量的存储位置
  - uniform3f(方法中的数字可以是1-4中的任意一个)：设置uniform变量的值 (第二章ColoredPoints.html文件中有使用到)
  - uniformMatrix4fv：为一个uniform的矩阵进行赋值

# 在实现第五章中纹理相关的代码时，可能有的图片无法正常显示，图片的尺寸需要是2^M * 2^N，下载了书中例子的图片就能正常显示了。

# WebGL: INVALID_OPERATION: useProgram: program not valid

在编程过程中出现以上提示的原因可能是着色器代码错写错误，可以通过gl.getShaderInfoLog(Shader)来获取具体的提示信息。
- gl：webgl绘图上下文
- shader：着色器


将chapter1/drawPoint.html中的顶点着色器代码中的gl_PointSize改为gl_PointSize1并且将最后一行代码 
`// console.log(gl.getShaderInfoLog(vertex));`注释取消，在控制台会输出额外的报错信息
`ERROR: 0:2: 'gl_PointSize1' : undeclared identifier`
