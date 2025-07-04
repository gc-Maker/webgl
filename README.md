# 该仓库中的代码以webgl编程指南的章节进行划分，都是书中例子的实现

# webgl中涉及的一些概念
## 着色器
  - 顶点着色器(Vertex shader)：用来描述顶点特性(位置、颜色等)
  - 片元着色器(Fragment shader)：进行逐片元处理过程如光照，片元是webgl中的一个术语，可以理解为像素[这段话是书中的描述，暂时不太理解，后续补充]

## attribute、uniform、varying
  - attribute：只能用于顶点着色器中，声明顶点数据变量
  - uniform：作用于顶点着色器与片元着色器，声明非顶点数据变量
  - varying：顶点着色器与片元着色器中都用该关键字声明的变量会从顶点着色器中自动传入片元着色器
## 获取变量以及存储变量使用的函数
  - getAttribLocation：获取attribute变量的存储位置
  - vertexAttrib3f(方法中的数字可以是1-4中的任意一个)：设置attribute变量的值      (在第二章ClickPoints.html文件中有使用到）
  - getUniformLocation：获取uniform变量的存储位置
  - uniform3f(方法中的数字可以是1-4中的任意一个)：设置uniform变量的值 (第二章ColoredPoints.html文件中有使用到)
  - uniformMatrix4fv：为一个uniform的矩阵进行赋值

# 在实现第五章中纹理相关的代码时，可能有的图片无法正常显示，图片的尺寸需要是2^M * 2^N，下载了书中例子的图片就能正常显示了。

# 三维视图的实现涉及第七章中的三个矩阵：视图矩阵、模型矩阵、投影矩阵

# 第十章中让webgl的图像显示在页面之前
调用clearColor(0,0,0,0); 将webgl的背景色设置成透明的， 然后让webgl的z-index属性的值大于要显示的页面

# 缓冲区的使用
  - 创建缓冲区对象(gl.createBuffer())
  - 绑定缓冲区对象(gl.bindBuffer())：将缓冲区对象绑定到webgl系统中已经存在的target上，target表示缓冲区对象的用途
  - 数据写入缓冲区对象(gl.bufferData())
  - 将缓冲区对象分配给一个attribute变量(gl.vertexAttribPointer())
  - 开启attribute变量(gl.enableVertexAttribArray())：为了使顶点着色器能够访问缓冲区内的数据，需要开启attribute变量。

# WebGL: INVALID_OPERATION: useProgram: program not valid

在编程过程中出现以上提示的原因可能是着色器代码错写错误，可以通过gl.getShaderInfoLog(Shader)来获取具体的提示信息。
- gl：webgl绘图上下文
- shader：着色器


将chapter1/drawPoint.html中的顶点着色器代码中的gl_PointSize改为gl_PointSize1并且将最后一行代码 
`// console.log(gl.getShaderInfoLog(vertex));`注释取消，在控制台会输出额外的报错信息
`ERROR: 0:2: 'gl_PointSize1' : undeclared identifier`





# TypeScript中条件类型的分发特性
type types = 'vue' | 'react' | 'angular';
type Func<T> = T extends types ? () => T : never;
type Func1 = Func<types>;
以上写法对应的Func1等价于： type Func1 = (() => "vue") | (() => "react") | (() => "angular")
如果将Func的写法更改为：type Func<T> = () => T;
则此时的Func1等价于： () => 'vue' | 'react' | 'angular'
