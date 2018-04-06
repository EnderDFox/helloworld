# Entitas-ts

https://github.com/darkoverlordofdata/entitas-ts

## Get Started

### 安装

#### 1 安装entitas-ts

```
git clone git@github.com:darkoverlordofdata/entitas-ts.git
cd entitas-ts
npm install . -g
```

#### 2 安装coffee-script
```
cnpm i coffee-script -g
```
### 创建工程

#### 1 进入workspace

打开自定义的workspace

输入entitas init namespace  生成  entitas.json

#### 2 修改entitas.json

参考git中的entitas.json

必须修改 output中的路径 且不能为空

#### 3 生成代码
entitas generate  

### 编写代码

1. 创建systems下的system

2. 创建入口Hello1.ts编写初始化代码

3. 编写 index.html 注意js的引用顺序

### 测试

vscode中

1. 运行task StaticServer
2. 运行tsc watch
3. 浏览器访问 http://192.168.xxx.xxx:xxxx  (StaticServer log中的地址)




