# HTML5完整教学通俗易懂

> author: Zilin Xu\
> date: 2023.05.24\
> resource: b站狂神说

**作为后端程序员，也要懂前端**
## 快捷键（mac）
- h1 + tab : 快速创建标签
- cmd + / ： 注释

## 初步认识html

### 什么是html

*   HTML
    *   hyper text markup language (超文本标记语言)
    *   超文本包括：文字 图片 音频 视频 动画等

### html发展史

html5 + css3（现在用的）

### html5优势

*   世界知名浏览器对html5的支持
*   市场的需求
*   跨平台

### w3c标准

*   W3C
    *   world wide web consortium(万维网联盟)
*   W3C标准
    *   结构化标准语言（html，xml）
    *   表现标准语言（css）
    *   行为标准（Dom， javascript）

### 常见IDE

*   记事本
*   dreamweaver
*   IDEA
*   webstorm

### IDEA 操作

1.  new一个project，把src文件夹不用了删掉，新建一个文件夹叫html

![截屏2023-05-24 10.49.25.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d8ca876c1cb40f28c9db3e969087451~tplv-k3u1fbpfcp-watermark.image?)

```html
<!DOCTYPE html>  
<html lang="en">  
<!-- 网页头部 -->  
<head>开放标签  
<meta charset="UTF-8"> 自闭和标签  
<title>Title</title>  
</head>闭合标签  
<!-- 主体部分 -->  
<body>  
my first web page  
</body>  
</html>
```

### 网页基本结构

```html
<!-- DOCTYPE: 告诉浏览器，我们要使用什么规范 -->

<!DOCTYPE html>
<html lang="en">
<!-- 网页头部 -->
<head>
<!--    meta描述性标签，他用来描述我们网站的一些信息-->
<!--    meta标签一般用来做SEO-->
    <meta charset="UTF-8">
    <meta name = "keywords" content = "xzlnb">
    <meta name = "description" content = "hello">
<!-- title 网页标题-->
    <title>我的第一个网页</title>
</head>
<!-- 主体部分 -->
<body>
    my first web page
</body>
</html>
```

### 网页的基本标签

- 标题标签
- 段落标签
- 换行标签
- 水平线标签
- 字体样式标签
- 注释和特殊符号

``` html
<!DOCTYPE html>  
<html lang="en">  
<head>  
<meta charset="UTF-8">  
<title>Title</title>  
</head>  
<body>  
<!--标题标签-->  
<h1>一级标签</h1>  
<h2>二级标签</h2>  
<h3>三级标签</h3>  
<h4>四级标签</h4>  
<h5>五级标签</h5>  
<h6>六级标签</h6>  
  
<!--水平线标签-->  
<hr>  
  
<!--段落标签-->  
<p>两只老虎</p>  
<p>两只老虎</p>  
<p>两只老虎</p>  
  
<!--换行标签-->  
两只老虎<br>  
两只老虎<br>  
两只老虎<br>  
  
<!--粗体 斜体-->  
<h1>字体样式标签</h1>  
  
粗体： <strong>我爱你</strong>  
斜体： <em>我爱你</em>  
  
<br>  
<!--特殊符号-->  
空 格：  
空&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格  
> : &gt;  
<br>  
< : &lt;  
<br>  
版权：&copy;  
<!--  
特殊符号记忆方式  
& ；-->  
  
</body>  
</html>
```
### 图像标签

- JPG
- GIF
- PNG
- BMP

> 先new一个resource的文件夹

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
<meta charset="UTF-8">  
<title>image tag learn</title>  
</head>  
<body>  
<!--  
src（必须填）: 图片地址  
推荐用相对地址：../ --上一级目录  
  
alt(必须填): 如果加载错误，错误信息  
-->  
  
  
<img src="../resource/image/1.jpeg" alt="xzl头像" title="悬停文字" width="300" height="300">  
  
</body>  
</html>
```

### 图像标签
- 文本超链接
- 图像超链接



