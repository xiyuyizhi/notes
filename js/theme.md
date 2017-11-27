

## webpack构建下换肤功能的思路

*最近项目中要实现一个换肤的功能，大体想了下，记录一下思路*

**要实现换肤功能，目标就是打包生成多份皮肤文件，需要哪个就用哪个**

### 打包生成多份皮肤文件

因为项目是使用webpack构建的，要想生成多份css文件，就要在入口中配置多个入口文件，**每个入口文件会提取出一个css文件**

```
config.entry={
    app: ['./src/app.js'],
    defaultTheme: ['./src/theme.default.color.js'],
    orangeTheme:['./src/theme.orange.color.js'],
    blueTheme:['./src/theme.blue.color.js'],
}
```

app.js中
```
 import "./app.styl" //整个项目的样式，在各种皮肤下都保持不变的那部分
```

theme.blue.color.js 蓝色皮肤js文件
```
import "./theme/blue.styl" 
```

blue.styl 蓝色皮肤
```
@require "./css/skinTheme/var.blue" //样式变量，整体为蓝色风格的颜色值
@require "./css/skinTheme/theme.color" //提取出来的需要换肤的那部分样式
```

如代码所示，`几个主题js文件`中只是单纯的引入了相应的皮肤样式文件，这样，webpack打包后就会生成几个无用的js文件和一系列皮肤样式文件

到这一步，就得到了需要的皮肤文件,但是需要注意的是，webpack会将生成的js、css路径插入到模板html中，所以，我们打开构建后生成index.html会看到

```
<html>
    <head>
        <link rel="stylesheet" href="app.xxxx.css">
        <link rel="stylesheet" href="defaultTheme.xxxxx.css">
        <link rel="stylesheet" href="orangeTheme.xxxxx.css">
        <link rel="stylesheet" href="blueTheme.xxxxx.css">
    </head>
    <body>
        <script src="app.xxxx.js"></script>
        <script src="defaultTheme.xxxx.js"></script>
        <script src="orangeTheme.xxxx.js"></script>
        <script src="blueTheme.xxxx.js"></script>
    </body>
</html>
```

### 操作index.html

接下来就需要操作打包后的index.html，将多余的js引用删掉，将皮肤路径提取出来，然后将皮肤引用删掉

*也就是要改成这样的文件*

/build/index.html
```
<html>
    <head>
        <script>
            window.cssUrls={
                "defaultTheme":"/defaultTheme.4bdb738cdc062e7842ce.css",
                "orangeTheme":"/orangeTheme.4bdb738cdc062e7842ce.css","blueTheme":"/blueTheme.4bdb738cdc062e7842ce.css"
            }
        </script>
        <link rel="stylesheet" href="app.xxxx.css">
    </head>
    <body>
        <script src="app.xxxx.js"></script>
    </body>
</html>
```

可以写这样一个操作文件的函数

cssExtract.js
```
const DISTPATH = 'build/index.html'
const cheerio = require('cheerio')
const fs = require('fs')
const chalk = require('chalk')
const prefix = ['defaultTheme', 'orangeTheme', 'blueTheme']
const cssUrls = {}

function extractCss() {
    fs.readFile(DISTPATH, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        const $ = cheerio.load(data)
        /**
         * 删除所有主题css，相关链接保存在window.cssUrls中
         */
        $('link').each((index, item) => {
            const href = $(item).attr('href')
            for (const val of prefix) {
                if (href.indexOf(val) !== -1) {
                    cssUrls[val] = href
                    $(item).remove()
                }
            }
        })
        /**
         * 删除无用的js
         */
        $('script').each((index, item) => {
            const src = $(item).attr('src')
            for (const val of prefix) {
                if (src && src.indexOf(val) !== -1) {
                    $(item).remove()
                }
            }
        })
 
        //插入行内js
        $('base').after(`<script>window.cssUrls=${JSON.stringify(cssUrls)}</script>`)

        fs.writeFile(DISTPATH, $.html(), err => {
            if (err) {
                throw err
            }
            console.log(chalk.cyan('extract css url complete.\n'))
        })
    })
}
extractCss()
```
### 最后

到这里，运行 `webpack && node cssExtract.js`,index.html就变成上面期望的那样，我们得要了皮肤文件的一个mapping,并保存在window.cssUrls中，接下来，通过切换按钮的方式切换皮肤还是什么其他的就可以自由发挥了.

需要说明的是，换肤功能的重点是对样式的重构，将需要换肤的所有样式提取到一起，通过变量来设置不同的主题
