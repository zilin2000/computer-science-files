
> author: Zilin Xu  
> date : 2023.9.20  
> link: 【JavaWeb视频教程（JSP/Servlet/上传/下载/分页/MVC/三层架构/Ajax）】https://www.bilibili.com/video/BV18s411u7EH?vd_source=c13765adc65e1127b9523161e34f9a99

## 0. 
JSP: 动态网页

静态/动态：  
- 不要和是否有动感混为一谈
- 是否 随着 时间，地点，用户操作 的 改变而改变

e.g.   
静态： 一篇公众号  
动态： 查看天气的网站

## 1. 架构  
CS： Client Server

![截屏2023-09-20 20.31.20.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/425d5078293a4d2c90f6c6e71cded4ad~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1692&s=1402837&e=png&b=fdfcfc)

**不足**  
1. 如果软件要升级，那么所有设备都要升级
2. 维护麻烦： 需要维护每一台 客户端软件
3. 每一台客户端 都需要按转客户端软件  
    我们玩QQ，需要安装

**优势**  
美观
    
BS：Broser Server

e.g.  
网页版：京东，百度  
客户端通过浏览器 直接访问  服务端

![截屏2023-09-20 20.36.08.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/785fd0051aae465aba6368e201993f3e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1692&s=1443255&e=png&b=fdfcfc)

注意： BS和CS各有优势  

## 2.tomcat解压后目录  
bin:可执行文件（startup.bat shutdown.bat）  
conf:配置文件（server.xml）  
lib: tomcat依赖的jar文件  
log:日志文件（记录出错等信息）  
temp: 临时文件  
webapps: tomcat的可执行项目（我们开发完的项目放入该目录）  
work： 存放由jso翻译成的java，以及编译成的class文件  

jsp - > Java -> class

## 3.配置
1. 配置jdk（必须配置JAVA_HOME）
java_home classPath path
2. 配置catalina_home  

之后打开 `terminal` 输入  
``` cd /Users/xzl/Desktop/conf/apache-tomcat-8.5.93/bin```  
进入到tomcat的bin文件夹  
再输入  
``` ./catalina.sh start ```   
会看到  

![截屏2023-09-24 00.12.19.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c02a247343647da918f687b6f8ebb9e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2504&h=678&s=635257&e=png&b=1f1f1f)

可以在浏览器中输入 `http://localhost:8080` 访问 Tomcat 的欢迎页面。如果成功打开了页面，那么 Tomcat 就正常运行了。  

关闭Tomcat    
``` ./catalina.sh stop ```

常见错误： 可能与其他服务的端口号冲突  
Tomcat端口号默认8080，太常见了，建议修改  

修改端口号：  
到conf目录下的`server.xml`的第69行

![截屏2023-09-24 00.15.58.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0891743a81a4a51951432a68ef0bff6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1168&h=706&s=145063&e=png&b=2f2f2f)

## 4.访问

http://localhost:8888/


![截屏2023-09-24 00.20.54 (2).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ddae6f45f84435aa9ab270389ee5b06~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2560&h=1600&s=854887&e=png&b=faf1e4)

**这个界面是从哪里来的呢**  
答： 是`/apache-tomcat-8.5.93/webapps` 这个目录下的ROOT，这是默认的  

![截屏2023-09-24 00.24.49.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88d3c6ea5fe94e83bc0fb3498c41be35~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1556&h=864&s=104935&e=png&b=212224)

如果要访问其他的，直接在`http://localhost:8888/`后面加东西就好，比如：

`http://localhost:8888/examples/`

![截屏2023-09-24 00.26.14.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08ca46275b54927b6c10ae254d68890~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1284&h=856&s=79836&e=png&b=ffffff)

那么问题来了，这个又是哪里来的呢？

答：examples里面的WEB-INF里面的`web.xml`中，第406行  


![截屏2023-09-24 00.29.19.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee14f4b03d734780993340e4bd76cf8f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1058&h=652&s=155064&e=png&b=2f2f2f)  

如果没有第一个文件就第二个，没有第二个就第三个  

要是把`index.html`删了就会404 

复习八股：

200:一切正常

300/301:页面重定向（跳转）

403: 权限不足（如果访问a目录，但是a目录设置 不可见）

404: 资源不存在

500:服务器内部错误（代码有误）

其他编码：积累

## 5. 创建自己的项目

在webapps目录下创建`JspProject`


要遵循一些规则：

- WEB-INF文件夹一定要有！从ROOT里面cv过来，这个里面要有.xml文件，以及：
    - 一个classes文件夹
        - 上面提到的字节码文件
    - 一个lib文件夹
        - 三方依赖库，比如一些引用的jar包

![截屏2023-09-24 00.40.45.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/941733ebd2a543829ff0a6e09547e650~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=838&h=592&s=78687&e=png&b=2a2829)

回到`JspProject`， 创建`index.jsp`

```jsp
<html>
    <head>
        <title>my first jsp project</title>
    </head>

    <body>
            hello jsp ... 
            <%
                out.print("hello");
            %>
    </body>
</html>
```
启动tomcat后把网址改成JspProject

![截屏2023-09-24 00.46.57.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddf9677a11154c3597bee6a266f7ec4b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1034&h=518&s=45168&e=png&b=ffffff)

jsp:在html中嵌套Java代码`<% %>`

**如何指定打开哪个文件**

在项目/WEB-INF/web.xml中设置 默认的 初始页面

```xml
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.xhtml</welcome-file>
        <welcome-file>index.htm</welcome-file>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
```

**什么时候会报错 500**

Java代码写错了

比如：把上面的.jsp里面的`out.print("hello");` 分号去掉  


![截屏2023-09-24 13.56.51.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37296b252bb5445cb0291bd1c6097426~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1698&h=1286&s=317929&e=png&b=fefefe)

## 6. 虚拟路径  

**Tomcat怎么知道你默认要访问webapps里面的内容呢**

答：虚拟路径

### 方式1:  

> 缺点： 需要重启

在conf/server.xml中161行


![截屏2023-09-24 14.09.27.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/add132fcf586448692b0db75848e5856~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2076&h=1150&s=324735&e=png&b=1d1d1d)

**最常用用法**

将web项目放到webapps以外的目录下


docBase: 实际路径

path:虚拟路径 （绝对路径， 相对路径 相对于webapps）

```xml
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">

        <!-- SingleSignOn valve, share authentication between web applications
             Documentation at: /docs/config/valve.html -->
        <!--
        <Valve className="org.apache.catalina.authenticator.SingleSignOn" />
        -->

        <!-- Access log processes all example.
             Documentation at: /docs/config/valve.html
             Note: The pattern used is equivalent to using pattern="common" -->
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
          
          <Context docBase="" path="/JspProject" />

      </Host>
```

上面 `/JspProject` 是相对路径，相对于webapps，等同写法：

`/Users/xzl/Desktop/conf/apache-tomcat-8.5.93/webapps/JspProject`

一般来说用相对路径

把webapps/JspProject挪到桌面，上面17行改成  

` <Context docBase="/Users/xzl/Desktop/JspProject" path="/JspProject" />`

这一行的含义是，当我们访问 path 的时候 就访问 docBase

就改好了，能正常运行  


![截屏2023-09-24 14.27.20.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68f123db33ab4e0880a1e948efde4e9e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=633&h=453&s=32692&e=png&b=ffffff)

### 方式2:

在`/conf/Catalina/localhost`中创建 `项目名.xml`

` <Context docBase="/Users/xzl/Desktop/JspProject" path="/JspProject" />`

把这一行放过去就行

![截屏2023-09-24 14.36.19.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c7c4b2b33ee4083a070364fdfeda942~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1296&h=568&s=137730&e=png&b=2e2e2e)

两种方式都很常见

第二种方法还有一招：把 `.xml` 文件名字改成 `ROOT.xml`

这样的话我们访问`http://localhost:8888/`就行，因为启动Tomcat的时候它默认去ROOT.xml中找映射 

**一般不这样干**

## 7.虚拟主机 

通过www.test.com访问本机

#### 补充八股again！
![截屏2023-09-24 15.30.59.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6c6f91fd0d047cfb3acf4ab3dd150ff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1676&h=994&s=719993&e=png&b=fdfcfc)

在访问一个网址后，会先在本机解析，如果本机有那么就直接加载本机的ip地址。如果没有，比如www.jd.com，那么就回去域名解析器中找对应的ip地址。

`127.0.0.1 `是localhost的IP地址

**怎么在mac中查看localhost的IP地址？**

`ifconfig lo0 | grep "inet "`

### 步骤  
0. 先在server.xml中配置

![截屏2023-09-24 15.57.49.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed6fb9aaf8b546c38868f86815f2a47d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1228&h=1466&s=369595&e=png&b=1d1d1d)

先把141行的defaultHost改成我们想要的`www.test.com`

再把下面的Host依样画葫芦的写，值得注意的是Context中的 path 我们写的是"/"而不是 "JspProject"  这是因为我们这样的话就可以简化我们的网址。如果还是写 "JspProject" 的话那我们输入的网址就要是 `www.test.com/JspProject`了。所以这里我们简单一点。

1. 添加127.0.0.1到`www.test.com`的映射，方法如下：

要将 `127.0.0.1` 映射到 `www.test.com`，你可以通过修改你的系统的 hosts 文件来实现。

以下是具体步骤：

1. 打开终端应用程序。

2. 输入以下命令以编辑 hosts 文件：

   ```bash
   sudo nano /etc/hosts
   ```

   你可能需要输入管理员密码以确认。

3. 在打开的文本编辑器中，找到一个空白行（或在文件末尾添加一个新行），然后输入：

   ```
   127.0.0.1  www.test.com
   ```

   这将把 `www.test.com` 映射到本地主机的 IP 地址 `127.0.0.1`。

4. 保存并退出文本编辑器。如果你使用的是 nano 编辑器，可以按下 `Ctrl + X`，然后按 `Y` 确认保存，最后按 `Enter` 退出。

5. 刷新 DNS 缓存：

   在终端中运行以下命令以刷新 DNS 缓存：

   ```bash
   sudo dscacheutil -flushcache
   ```

   或者在较新版本的 macOS 中，你可以使用以下命令：

   ```bash
   sudo killall -HUP mDNSResponder
   ```

现在，当你在浏览器中访问 `www.test.com` 时，它将会映射到本地主机 `127.0.0.1`。请注意，这只会在你的计算机上有效，而不会影响到其他设备。

这个时候我们访问`www.test.com:8888`就会出现


![截屏2023-09-24 16.03.43.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b7f161bc504449ba9587f0e39132fb5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=796&h=348&s=36676&e=png&b=ffffff)

如果需要省略端口号的话，就去把8888改成80（虽然我没成功）

**回顾一下整个流程**

www.test.com -> host找映射关系 -> server.xml找Engine的defaultHost -> 通过“/”(可以省略)映射到`/Users/xzl/Desktop/JspProject`

这个只是学习一下，一般开发不会用，将上面复原！