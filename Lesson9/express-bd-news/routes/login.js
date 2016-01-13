var express = require('express');
var app = express();

//当前请求的根目录
app.get('/login', function(req, res, next) {
    res.render('login', {});
});
//验证输入的用户名和密码是否正确
app.post('/login/doLogin', function(req, res, next) {
    var user = {
        username: 'admin',
        password: 'admin'
    };
    if (req.body.username === user.username && req.body.password === user.password) {
    	res.status(200);
        res.send(true);
    } else {
    	res.status(200);
        res.send(false);
    };
});
module.exports = app;
