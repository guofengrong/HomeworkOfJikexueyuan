var express = require('express');
var app = express();
var orm = require('orm');
var dbusername = "root";
var dbpassword = "";
var dbname = "newslist";

//当前请求的根目录
app.get('/management', function(req, res, next) {
    res.render('manager', {});
});

//当前台填写好需要添加的新闻内容并点击提交时，后端程序连接数据库并将相应的新闻标题、类型、内容等数据写入
app.use('/management/addNews', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.addNews = db.define("newslist", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsclass: String,
            newsimg: String,
            newscontent: String,
            addtime: Date
        });
        next();
    }
}));

app.post('/management/addNews', function(req, res, next) {
    req.models.addNews.create({
        newstitle: req.body.newstitle,
        newsclass: req.body.newsclass,
        newsimg: req.body.newsimg,
        newscontent: req.body.newscontent,
        addtime: req.body.addtime
    }, function(err, news) {
        res.status(200);
        res.json(news);
    });
});

//在后台管理界面中点击当地新闻标签时，后端程序根据发起请求的路由，连接数据库并从中读取类型为local的所有新闻输出
app.use('/management/local', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.local = db.define("newslist", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsclass: String,
            newsimg: String,
            newscontent: String,
            addtime: Date
        });
        next();
    }
}));
app.get('/management/local', function(req, res, next) {
    var newsClass = req.query.newsclass;
    req.models.local.find({
        newsclass: newsClass
    }, ["addtime", "Z"], function(err, news) {
        res.status(200);
        res.json(news);
    });
});

//在后台管理界面中点击推荐新闻标签时，后端程序根据发起请求的路由，连接数据库并从中读取类型为recommendation的所有新闻输出
app.use('/management/recommendation', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.local = db.define("newslist", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsclass: String,
            newsimg: String,
            newscontent: String,
            addtime: Date
        });
        next();
    }
}));
app.get('/management/recommendation', function(req, res, next) {
    var newsClass = req.query.newsclass;
    req.models.local.find({
        newsclass: newsClass
    }, ["addtime", "Z"], function(err, news) {
        res.status(200);
        res.json(news);
    });
});

//在后台管理界面中点击娱乐新闻标签时，后端程序根据发起请求的路由，连接数据库并从中读取类型为entertainment的所有新闻输出
app.use('/management/entertainment', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.local = db.define("newslist", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsclass: String,
            newsimg: String,
            newscontent: String,
            addtime: Date
        });
        next();
    }
}));
app.get('/management/entertainment', function(req, res, next) {
    var newsClass = req.query.newsclass;
    req.models.local.find({
        newsclass: newsClass
    }, ["addtime", "Z"], function(err, news) {
        res.status(200);
        res.json(news);
    });
});

//当在后台管理界面中对新闻进行编辑并点击提交后，后端程序根据发起请求的路由根据新闻的ID，将原有的新闻内容用新传入的数据进行更新
app.use('/management/updateNews', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.update = db.define("newslist", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsclass: String,
            newsimg: String,
            newscontent: String,
            addtime: Date
        });
        next();
    }
}));
app.post('/management/updateNews', function(req, res, next) {
    req.models.update.get(req.body.newsid, function(err, item) {
        item.save({
            newstitle: req.body.newstitle,
            newsimg: req.body.newsimg,
            newscontent: req.body.newscontent,
            newsclass: req.body.newsclass,
            addtime: req.body.addtime
        }, function(err) {
            res.status(200);
            res.send(true);
        });
    });
});

//当在新闻后台管理界面中执行删除新闻操作时，根据发起请求的路由，链接数据库，并用newsid检索到相应的数据并进行删除
app.use('/management/deleteNews', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.deleteNews = db.define("newslist", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsclass: String,
            newsimg: String,
            newscontent: String,
            addtime: Date
        });
        next();
    }
}));
app.post('/management/deleteNews', function(req, res, next) {
    req.models.deleteNews.get(req.body.newsid, function(err, item) {
        item.remove(function(err) {
            res.status(200);
            res.send("删除成功");
        });
    });
});

module.exports = app;
