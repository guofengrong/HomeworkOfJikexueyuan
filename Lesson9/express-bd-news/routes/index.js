var express = require('express');
var router = express.Router();
var orm = require('orm');
var dbusername = "root";
var dbpassword = "";
var dbname = "newslist";

//当前请求的根目录
router.get('/index', function(req, res, next) {
    res.render('bd_news', {});
    // next();
});
//从数据库中找到推荐类型新闻并返回
router.use('/recommendation', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.recommendation = db.define("newslist", {
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
router.get('/recommendation',function(req,res,next){
	var newsClass = req.query.newsclass;
	var countNews = req.query.countnews-0;
	req.models.recommendation.find({newsclass:newsClass},countNews,["addtime"],function(err,news){
		res.status(200);
		res.json(news);
	});
});

//从数据库中找到本地类型新闻并返回
router.use('/local', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
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
router.get('/local',function(req,res,next){
	var newsClass = req.query.newsclass;
	var countNews = req.query.countnews-0;
	req.models.local.find({newsclass:newsClass},countNews,["addtime"],function(err,news){
		res.status(200);
		res.json(news);
	});
});

//从数据库中找到娱乐类型的新闻列表并返回
router.use('/entertainment', orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
    define: function(db, models, next) {
        models.entertainment = db.define("newslist", {
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
router.get('/entertainment',function(req,res,next){
	var newsClass = req.query.newsclass;
	var countNews = req.query.countnews-0;
	req.models.entertainment.find({newsclass:newsClass},countNews,["addtime"],function(err,news){
		res.status(200);
		res.json(news);
	});
});

module.exports = router;
