define(function(require, exports, module) {
    // 通过 require 引入依赖
    require('jquery-1.11.3.min');
    //slideX用于实现图片轮播
    var slideX = {
        thisDiv: $(".rec-img-tab"),
        thisA: $('.rec-img-tab a'),
        init: function() {
            // 当鼠标进入poster-viewer、选中左右滑动按钮及pagination按钮时，自动轮播停止
            slideX.slideAuto();
            slideX.thisDiv.hover(slideX.slideStop, slideX.slideAuto);
        },

        //向右滑动时，先解绑点击事件，然后改变poster-wrapper的left属性值，移动完成后将左移的a标签放置到最右侧，在海报切换的过程通过if语句对pagination设置样式 
        slideRight: function() {
            slideX.thisDiv.children().animate({
                'left': '-355px'
            }, '2000', function() {
                slideX.thisDiv.children().css('left', '0');
                slideX.thisDiv.children().find('a:first').appendTo(slideX.thisDiv.children('.img-tab'));
            });
            // return false;
        },
        // 当鼠标没有进入poster-viewer时，页面进行自动播放，自动播放的方式是每间隔3s，图片向右移动一次
        slideAuto: function() {
            slideX.intervalId = window.setInterval(slideX.slideRight, 3000);
        },
        // 当鼠标进入poster-viewer、选中左右滑动按钮及pagination按钮时，清除自动轮播
        slideStop: function() {
            window.clearInterval(slideX.intervalId);
        }
    };
    var newsClass = "recommendation";
    var recCountNews = 5;
    var localCountNews = 5;
    var entertainmentCountNews = 5;
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
        $.get("showNews.php", {
            newsclass: "recommendation",
            countnews: recCountNews
        }, function(data) {
            recCountNews = recCountNews + 5;
            $(".news-list").html(data);
            $('#rec-line3').show();
            $('#entertainment-line3').hide();
            $('#local-line3').hide();
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
            $.get("showNews.php", {
                newsclass: "recommendation",
                countnews: recCountNews
            }, function(data) {
                $(".news-list").html(data);
                recCountNews = recCountNews + 5;
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
            $.get("showNews.php", {
                newsclass: "local",
                countnews: localCountNews
            }, function(data) {
                $(".news-list").html(data);
                localCountNews = localCountNews + 5;
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
            $.get("showNews.php", {
                newsclass: "entertainment",
                countnews: entertainmentCountNews
            }, function(data) {
                $(".news-list").html(data);
                entertainmentCountNews = entertainmentCountNews + 5;
            });
        });
        // 当点击加载更多新闻按钮时，countNews的值传递给php用于显示后五条新闻，并且在数据加载完成后countNews值自加5
        $('#rec-refresh').click(function() {
            $.get("showNews.php", {
                newsclass: newsClass,
                countnews: recCountNews
            }, function(data) {
                $(".news-list").html(data);
                recCountNews = recCountNews + 5;
            });
        });
        $('#local-refresh').click(function() {
            $.get("showNews.php", {
                newsclass: newsClass,
                countnews: localCountNews
            }, function(data) {
                $(".news-list").html(data);
                localCountNews = localCountNews + 5;
            });
        });
        $('#entertainment-refresh').click(function() {
            $.get("showNews.php", {
                newsclass: newsClass,
                countnews: entertainmentCountNews
            }, function(data) {
                $(".news-list").html(data);
                entertainmentCountNews = entertainmentCountNews + 5;
            });
        });
    });
});
