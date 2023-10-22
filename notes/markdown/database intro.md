# 带你认识储存&数据库

> 作者： 徐子霖\
> 时间： 2023.05.23\
> 参考： 字节第五届后端青训营  
> 资源 ：<https://bytedance.feishu.cn/file/boxcn7QgwoNh57Tjg6HmxKMhMHf>

## 课程目录

*   [1. 经典案例](#1.经典案例)
*   [2. 存储 & 数据库简介](#2.存储&数据库简介)
*   [3. 主流产品剖析](#3.主流产品剖析)
*   [4. 新技术演进 ](#4.新技术演进)

## 1. 经典案例

### 数据的产生

某天，小明同学下载了新的app并且注册了账号

| 用户名 | 密码         | 密码提示问题 |
| --- | ---------- | ------ |
| 小明  | helloworld | coding |

就这样数据产生了，向app的后端服务器飞奔而去

### 数据的流动

一条用户的注册数据 --> 后端服务器 --> 数据库系统（才算持久化下来）-->其他系统（不展开说）

> 为什么要持久化呢？\
> 我们需要带有记忆的，如果知识在内存时，那么每次用户都要注册。

### 数据的持久化

*   校验数据的合法性
    *   小明是否已经存在
*   修改内存
    *   用高效的数据结构组织数据
    *   形成一个准备可以持久化的结果
*   写入存储介质
    *   以寿命&性能友好的方式写入硬件

### 潜在的问题

*   数据库怎么保证数据不丢？
*   数据库怎么处理多人同时修改的问题？
*   为什么用数据库，除了数据库还能存到**别的存储系统**吗？
    *   答案是可以的
*   数据库只能处理**结构化数据**吗？
    *   答案是不一定的
*   有哪些操作数据库的**方式**， 要用什么**编程语言**？

## 2. 存储&数据库简介

> 什么是存储系统？

*   一个提供了**读写**、**控制类**接口，能够安全有效的把数据持久化的软件，就可以成为**存储系统**

其实就是用户和介质，但是可能也要和**内存**打交道，设计更好的性能。也有可能关注到**网络编程**。

### 系统特点

*   作为后端软件的底座，**性能敏感**
    *   很多后端架构里面，都是持久化、有状态的服务，那就要设计大量频繁并发的服务，所以我们需要超高设计
*   存储系统代码，既*简单*又*复杂*
    *   对性能要求高，在I/O（读写）路径上代码一定不能很复杂或者很多分支，搞得系统性能很差
    *   在非I/O路径上，考虑很多异常情况，比如硬件损坏
*   存储系统软件架构，容易受**硬件**影响
    *   存储系统往下，是直接和硬件打交道，比如磁盘。只要硬件发生变革，那么我们软件也需要做一定的变革，甚至不惜推倒重来。

### 2.1 存储器层级结构

Computer Memory Hierarchy\
金字塔尖：容量极小，超高性能访问\
金字塔底部：容量大，读写速度非常慢，访问方式不友好

![截屏2023-05-23 16.26.36 (2).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2497f947e07046e0aeab5b742f6760e6~tplv-k3u1fbpfcp-watermark.image?)

> 想法：在我们的中间层，能不能存在一个坚固，持久化的新型存储器呢？

*   Persistent Memory

> 数据怎么从应用到存储介质呢

*   如下链路图

![截屏2023-05-23 16.28.51.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c14f8779e6c145069f272545239c685a~tplv-k3u1fbpfcp-watermark.image?)

`缓存`很重要，贯穿整个存储体系

*   存储介质访问有可能不是特别友好，比如有的硬件需要一个byte一个byte写入，但是软件不会这样写
*   **软件**去实现cache就很重要，帮助我们和硬件友好的方式去和硬件交互。
*   软件也是分层的，还能跨软件层

`拷贝` 是非常昂贵的

*   消耗CPU的操作

`Disk` 代指任何硬件， 需要抽象统一的接入层

### RAID技术

Q： 单机存储系统怎么做到高性能，高性价比，高可靠性\
A： RAID

**RAID0**

*   多款磁盘简单组合
*   数据条带化储存，提高磁盘带宽
*   没有额外的容错设计
    *   没有对数据做冗余，备份。只是写进去会被切割

**RAID1**

*   一款磁盘对应一块额外镜像盘（克隆）
*   真实空间利用率50%
*   容错能力强

**RAID 0 + 1**

*   结合了0 和 1
*   真实空间利用率百分之50
*   容错能力强，写入带宽好

> 难道数据库和存储系统不一样么？

*   关系型数据库
*   非关系型数据库

### 2.2 数据库 - 概览

> 关系（relation）是什么？

*   关系 = 集合= 任意元素组成的若干有序偶对反应了事物间的关系

**关系代数** = 对关系做运算的抽象查询语言

*   交， 并， 笛卡尔积。。。。。

**SQL** = 一种DSL = 方便人类阅读的关系代数表达式

*   去操作关系时用到的特定语言
*   人说人话，狗说狗话

### 2.2 数据库 - 关系型数据库的特点

**关系型数据库是存储系统**，但是在存储之外，又发展出其他能力

*   结构化数据友好
*   支持事务（ACID）
*   支持复杂查询语言

### 2.2 数据库 - 非关系型数据库特点

非关系型数据库也是存储系统，但是**一般不要求严格的结构化**

*   半结构化数据友好
*   可能支持事务
*   可能支持复杂查询语言

### 2.3 数据库 vs 经典存储 - 结构化数据管理

一条用户注册数据

```json
{
    "user_name": "xiaoming",
    "password": "helloworld",
    "password_hint": "coding",
    .....
    }
```

写入关系型数据库，以`表形式`管理，很简单自然

| use\_name | password   |
| --------- | ---------- |
| xiaoming  | helloworld |

写入文件，自行定义管理结构

![截屏2023-05-23 17.01.02.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdc682bb2a0d4c3591282cb88b249630~tplv-k3u1fbpfcp-watermark.image?)

第一个 **4 byte** 是这条数据的长度， 第二个就是描述第一个字段多长，
第四个就是描述**password**有多长

*   很痛苦，无时无刻都在和byte打交道，做byte级别运算

### 2.3 数据库 vs 经典存储 - 事务能力

**ACID**

*   atomicity： 事务内操作要么全做，要么不做
*   consistency： 事务执行前后，数据状态是一致的
    *   转账： A的账上有1k， B没钱。 A给B转500，事务结束后。 A账户有500，B有500
    *   不一致：A给B转钱，B没收到。数据库状态不一致了
*   isolation： 可以隔离多个并发事务，避免影响
    *   也取决于隔离级别
*   durability： 事务一旦提交成功，数据保证持久性

**经典存储没有事务这种概念**

### 2.3 数据库 vs 经典存储 - 复杂的查询能力

![截屏2023-05-23 17.14.28.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c03ffe168f746a6864f2e8ffeea7e57~tplv-k3u1fbpfcp-watermark.image?)

### 2.4 数据库的使用方式

![截屏2023-05-23 17.16.06.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4559e93bf6b4f4dbb5cc7e821a6a898~tplv-k3u1fbpfcp-watermark.image?)

## 3. 主流产品剖析

*   3.1 单机存储
*   3.2 分布式存储
*   3.3单机关系型数据库
*   3.4单机非关系型数据库
*   3.5分布式数据库

### 3.1 单机存储 -- 概览

单机存储 = 单个计算机节点上的存储软件系统，一般不涉及网络交互

![截屏2023-05-25 11.06.25.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2e1c1475dc24feea9b53ab8cb5dddab~tplv-k3u1fbpfcp-watermark.image?)

> 一个I node对应到一个文件。 一个文件夹下面有一个a文件，看另一个文件夹也有，他们的Inode不一样。

D Entry：不会被持久化存储

### 3.1 单机存储 - key value存储

世间一切皆key-value
\-- key是你身份证，value是你的内涵\
常见使用方式：put， get\
参见数据结构： LSM-tree，牺牲读性能，追求写入性能\
拳头产品： RocksDB

![截屏2023-05-25 11.13.14.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e5b8a236385489fa14afa30acb3eddd~tplv-k3u1fbpfcp-watermark.image?)

### 3.2 分布式存储 -- 概览

分布式存储 = 在单机存储基础上实现了分布式协议，涉及大量网络交互
![截屏2023-05-25 11.17.36.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ac798c3297541c89ccc4fab5dc54746~tplv-k3u1fbpfcp-watermark.image?)

*   用一些便宜的硬件
*   在这个之上，发明了Hadoop

![截屏2023-05-25 11.21.44.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47e6f46d4e4446afb187afc45e53947f~tplv-k3u1fbpfcp-watermark.image?)

### 3.3 单机数据库

单个计算机节点上的数据库系统
事务在单机内执行，也可能通过网络交互实现分布式事务
![截屏2023-05-25 11.25.25.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec24d0daaae3465eaacced6e741e2864~tplv-k3u1fbpfcp-watermark.image?)

![截屏2023-05-25 14.37.59.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aea95403f70342b997267fbf072c6c66~tplv-k3u1fbpfcp-watermark.image?)
用户想要update我们数据，其实就是操作我们的page\
redo log：保证操作不会丢失
others: 存我们的临时数据文件

### 3.4 单机数据库 -- 非关系型数据库

![截屏2023-05-25 14.41.44.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33d5dc38a5584ef6a4d3fd238800748b~tplv-k3u1fbpfcp-watermark.image?)

*   elastic search ：基于文档，对文档操作
*   mongoDB： 灵活
*   redis：数据结构丰富（没有尝试去支持DSL）

![截屏2023-05-25 14.56.55.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bf3eea78c664798ab9f96369be0c410~tplv-k3u1fbpfcp-watermark.image?)

![截屏2023-05-25 15.09.23.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/064796974ba546b5806818b8a7bac0e9~tplv-k3u1fbpfcp-watermark.image?)

> 跟RDVMS相比，ES天然能做模糊搜索，还能自动算出关联程度

### 3.5 从单机到分布式数据库

## 4. 新技术演进
- 软件架构变更
    - bypass OS kernerl
- AI增强
    - 智能存储格式转换
- 新硬件革命
    - 存储介质变更
    - 计算单元变更
    - 网络硬件变更
