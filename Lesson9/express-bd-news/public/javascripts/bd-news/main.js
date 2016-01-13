define(function(require, exports, module) {
    // 通过 require 引入依赖
    require('../jquery-1.11.3.min');
    //slideX用于实现图片轮播
    // formatDate用于转换时间显示格式
    var slideX = require('./slideX');
    var formatDate = require('./formatDate');
    // 对newsClass、recCountNews、localCountNews、entertainmentCountNews进行初始化赋值；
    var newsClass = "recommendation";
    var recCountNews = 5;
    var localCountNews = 5;
    var entertainmentCountNews = 5;
    // showNews用于将返回的json格式的data数据依次提取出title、img、content、addtime数据，并输出html元素最后添加到".newslist"中；
    function showNews(data) {
        var innerHtml = "";
        $.each(data, function(index, value) {
            var newsTitle = $(value).attr("newstitle");
            var newsImg = $(value).attr("newsimg");
            var newsContent = $(value).attr("newscontent");
            var addTime = $(value).attr("addtime");
            addTime = addTime.substring(0, 19).replace("T", " ");
            var newsdate = new Date(addTime);
            var datanow = new Date();
            // 8小时的时间差，北京时间
            var differ = datanow.getTime() - 8 * 3600 * 1000 - newsdate.getTime();
            addTime = formatDate(differ) + "前";
            if (newsImg == '') {
                innerHtml += "<div class='news-list-item'><div class='news-info'><div class='news-content'><h2 class='news-title'>" + newsTitle + "</h2><p class='news-text'>" + newsContent + "</p></div><div class='addtime'>" + addTime + "</div></div></div>";

            } else {
                innerHtml += "<div class='news-list-item'><div class='news-img'><a href='#'><img src='" + newsImg + "' alt='news-img'></a></div><div class='news-info'><div class='news-content'><h2 class='news-title'>" + newsTitle + "</h2><p class='news-text'>" + newsContent + "</p></div><div class='addtime'>" + addTime + "</div></div></div>";

            }
            $(".news-list").html(innerHtml);
        });
    }
    $(document).ready(function() {
        //当页面加载完成时，执行图片轮播，并且读取当前显示屏的宽度，并调整相应标签的样式
        slideX.init();
        var width = ($(window).width() - 20);
        $('.img-tab-wrapper').css({
            'width': width + 'px',
            'height': width * 0.6 + 'px'
        });
        $('.img-tab a img').css({
            'width': width + 'px',
            'height': width * 0.6 + 'px'
        });
        $('.img-info').css({
            'width': width + 'px',
            'height': width * 0.081 + 'px',
            'line-height': width * 0.081 + 'px'
        });
        $('.img-tab').css('width', width * 3 + 'px');
        $('.rec-img-tab').css('width', width * 3 + 'px');
        $('.local').css('width', width * 3 + 'px');
        $('.entertainment-img-tab').css('width', width * 3 + 'px');
        $('#rec-refresh').show().siblings().hide();
        //同时在页面加载完成时，读取类型为recommendation的新闻信息展示在页面上；
        $.ajax({
            type: "get",
            url: "/index/recommendation/",
            data: {
                "newsclass": "recommendation",
                "countnews": recCountNews,
            },
            success: function(data) {
                recCountNews = recCountNews + 5;
                showNews(data);
                $('#rec-line3').show();
                $('#entertainment-line3').hide();
                $('#local-line3').hide();
            }
        });
        //当对导航栏进行点选时，切换轮播的图片，同时在后台查询相符合的新闻信息进行展示
        $('.btn-recommendation').click(function() {
            $('#rec-refresh').show().siblings().hide();
            recCountNews = 5;
            $('.rec-img-tab').show().siblings().hide();
            $('#rec-line3').show();
            $('#entertainment-line3').hide();
            $('#local-line3').hide();
            newsClass = "recommendation";
            console.log(newsClass);
            slideX.thisDiv = $(".rec-img-tab");
            slideX.thisA = $('.rec-img-tab a');
            $.ajax({
                type: "get",
                url: "/index/recommendation/",
                data: {
                    "newsclass": "recommendation",
                    "countnews": recCountNews,
                },
                success: function(data) {
                    recCountNews = recCountNews + 5;
                    showNews(data);
                }
            });
        });
        $('.btn-local').click(function() {
            $('#local-refresh').show().siblings().hide();
            localCountNews = 5;
            $('.local-img-tab').show().siblings().hide();
            $('#rec-line3').hide();
            $('#entertainment-line3').hide();
            $('#local-line3').show();
            newsClass = "local";
            console.log(newsClass);
            slideX.thisDiv = $(".local-img-tab");
            slideX.thisA = $('.local-img-tab a');
            $.ajax({
                type: "get",
                url: "/index/local/",
                data: {
                    "newsclass": "local",
                    "countnews": localCountNews,
                },
                success: function(data) {
                    localCountNews = localCountNews + 5;
                    showNews(data);
                }
            });
        });
        $('.btn-entertainment').click(function() {
            entertainmentCountNews = 5;
            $('#entertainment-refresh').show().siblings().hide();
            $('.entertainment-img-tab').show().siblings().hide();
            $('#rec-line3').hide();
            $('#entertainment-line3').show();
            $('#local-line3').hide();
            newsClass = "entertainment";
            console.log(newsClass);
            slideX.thisDiv = $(".entertainment-img-tab");
            slideX.thisA = $('.entertainment-img-tab a');
            $.ajax({
                type: "get",
                url: "/index/entertainment/",
                data: {
                    "newsclass": "entertainment",
                    "countnews": entertainmentCountNews,
                },
                success: function(data) {
                    entertainmentCountNews = entertainmentCountNews + 5;
                    showNews(data);
                }
            });
        });
        // 当点击加载更多新闻按钮时，countNews的值传递给php用于显示后五条新闻，并且在数据加载完成后countNews值自加5
        $('#rec-refresh').click(function() {
            $.ajax({
                type: "get",
                url: "/index/recommendation/",
                data: {
                    "newsclass": "recommendation",
                    "countnews": recCountNews,
                },
                success: function(data) {
                    recCountNews = recCountNews + 5;
                    showNews(data);
                }
            });
        });
        $('#local-refresh').click(function() {
            $.ajax({
                type: "get",
                url: "/index/local/",
                data: {
                    "newsclass": "local",
                    "countnews": localCountNews,
                },
                success: function(data) {
                    localCountNews = localCountNews + 5;
                    showNews(data);
                }
            });
        });
        $('#entertainment-refresh').click(function() {
            $.ajax({
                type: "get",
                url: "/index/entertainment/",
                data: {
                    "newsclass": "entertainment",
                    "countnews": entertainmentCountNews,
                },
                success: function(data) {
                    entertainmentCountNews = entertainmentCountNews + 5;
                    showNews(data);
                }
            });
        });
    });
});
