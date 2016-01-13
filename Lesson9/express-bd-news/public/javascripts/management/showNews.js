define(function(require, exports, module) {
    require('../jquery-1.11.3.min');
    // 将返回的json格式的数据依次提取出newstitle、newsclass等值，并将html元素写入innerHtml中，最后以表格的形式呈现在页面中
    var showNews = function(data) {
        var innerHtml = "<table class='table'><tr><th>序号</th><th>新闻图片地址</th><th>新闻标题</th><th>新闻内容</th><th>添加时间</th><th>操作</th></tr>";
        $.each(data, function(index, value) {
            var newsId = $(value).attr("newsid");
            var newsTitle = $(value).attr("newstitle");
            var newsImg = $(value).attr("newsimg");
            var newsContent = $(value).attr("newscontent");
            var addTime = $(value).attr("addtime");
            innerHtml += "<tr><td class='newsid'>" + newsId + "</td><td><img src='" + newsImg + "'></img></td><td>" + newsTitle + "</td><td><p class='news-content'>" + newsContent + "</p></td><td>" + addTime + "</td><td><input class='btn-update' type='button' value='编辑'/><input class='btn-delete' type='button' value='删除'/></td></tr>";
        });
        innerHtml += "</table>";
        $(".news-list-wrapper").html(innerHtml);
    };

    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = showNews;
});
