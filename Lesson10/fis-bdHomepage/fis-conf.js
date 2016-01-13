// 加 md5
fis.match('*.{js,css,png}', {
    useHash: true
});

//代码检查
//configure plugin
fis.config.set('modules.lint.js', 'jshint');
//configure plugin settings
fis.config.set('settings.lint.jshint', {
    //ignored some files
    //ignored : 'static/libs/**.js',
    ignored: ['public/lib/**.js', /jquery\.js$/i],

    //using Chinese reporter
    i18n: 'zh-CN',

    //jshint options
    camelcase: true,
    curly: true,
    eqeqeq: true,
    forin: true,
    immed: true,
    latedef: true,
    newcap: true,
    noarg: true,
    noempty: true,
    node: true
});

// 所有的文件产出到 static/ 目录下
fis.match('*', {
    release: '/static/$0'
});
fis.match('index.html', {
    release: '$0'
});

// widget源码目录下的资源被标注为组件
fis.match('/widget/**/*', {
    isMod: true
});

// test 目录下的原封不动产出到 test 目录下
fis.match('/test/**/*', {
    release: '$0'
});

//压缩资源
//当编译时使用 prod 指定的编译配置，即对 js 进行压缩。
fis.media('prod')
    .match('*.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'define', 'some string'] //不想被压的
            }
        })
    })
    .match('*.css', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant'
        })
    });
