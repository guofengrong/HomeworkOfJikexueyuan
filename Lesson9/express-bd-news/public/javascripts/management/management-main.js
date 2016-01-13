define(function(require, exports, module) {
    require('../jquery-1.11.3.min');
    var newsId = null;
    var newsClass = null;
    var newsTitle = null;
    var newsImg = null;
    var newsContent = null;
    var addTime = null;
    var init = require('./init');
    var clearContent = require('./clearContent');
    var updateNews = require('./updateNews');
    var deleteNews = require('./deleteNews');
    var addNews = require('./addNews');
    var showNews = require('./showNews');
    // 当点击各个类型的新闻时，从数据库中搜索相对应的新闻进行输出，并通过showNews将json格式的数据转换为html元素呈现出来，并且监听编辑及删除按钮的点击事件，当点击事件发生时展示确认删除对话框和编辑页面
    function findLocal() {
        $("#local").click(function() {
            clearContent();
            $(".news-list-wrapper").show().siblings().hide();
            $.ajax({
                type: "get",
                url: "/management/local",
                data: {
                    "newsclass": "local",
                },
                success: function(data) {
                    showNews(data);
                    newsClass = "local";
                    $('.btn-delete').each(function(index) {
                        $(this).click(function() {
                            newsId = $('td').eq(6 * index).text();
                            // console.log(newsId);
                        });
                    });
                    $('.btn-update').each(function(index) {
                        $(this).click(function() {
                            newsId = $('td').eq(6 * index).text();
                            // console.log(newsId);
                        });
                    });
                    updateNews(newsClass);
                    deleteNews();
                }
            });
        });
    }

    function findEntertainment() {
        $("#entertainment").click(function() {
            clearContent();
            $(".news-list-wrapper").show().siblings().hide();
            $.ajax({
                type: "get",
                url: "/management/entertainment",
                data: {
                    "newsclass": "entertainment",
                },
                success: function(data) {
                    showNews(data);
                    newsClass = "entertainment";
                    $('.btn-delete').each(function(index) {
                        $(this).click(function() {
                            newsId = $('td').eq(6 * index).text();
                        });
                    });
                    $('.btn-update').each(function(index) {
                        $(this).click(function() {
                            newsId = $('td').eq(6 * index).text();
                        });
                    });
                    updateNews(newsClass);
                    deleteNews();
                }
            });
        });
    }

    function findRecommendation() {
        $("#recommendation").click(function() {
            clearContent();
            $(".news-list-wrapper").show().siblings().hide();
            $.ajax({
                type: "get",
                url: "/management/recommendation",
                data: {
                    "newsclass": "recommendation",
                },
                success: function(data) {
                    showNews(data);
                    newsClass = "recommendation";
                    $('.btn-delete').each(function(index) {
                        $(this).click(function() {
                            newsId = $('td').eq(6 * index).text();
                        });
                    });
                    $('.btn-update').each(function(index) {
                        $(this).click(function() {
                            newsId = $('td').eq(6 * index).text();
                        });
                    });
                    updateNews(newsClass);
                    deleteNews();
                }
            });
        });
    }
    $(document).ready(function() {
        // 页面初始化设置
        init();
        // 添加新闻模块
        addNews();
        // 当点击相应类型的新闻按钮时，以表格的形式展现数据库中的新闻；
        findLocal();
        findEntertainment();
        findRecommendation();
        // 当点击提交按钮时将要修改的新闻的id、新闻标题、新闻图片地址等信息传递给后端程序，然后在数据库中修改该新闻的信息，修改成功后返回修改成功字样，并且刷新新闻列表，最后重新监听编辑按钮的点击事件
        $('#update-send').click(function() {
            // console.log(newsClass);
            // console.log(newsId);
            $.ajax({
                type: "post",
                url: "/management/updateNews",
                data: {
                    "newsid": newsId,
                    "newstitle": $("#update-newstitle").val(),
                    "newscontent": $("#update-newscontent").val(),
                    "newsimg": $("#update-newsimg").val(),
                    "addtime": $("#update-addtime").val(),
                    "newsclass": $('#update-newsclass').val()
                },
                success: function(data) {
                    $('.update-wrapper').fadeOut();
                    $('#success').fadeIn();
                    setTimeout(clearContent, 2000);
                    $.ajax({
                        type: "get",
                        url: "/management/" + newsClass,
                        data: {
                            "newsclass": newsClass,
                        },
                        success: function(data) {
                            showNews(data);
                            $('.btn-delete').each(function(index) {
                                $(this).click(function() {
                                    newsId = $('td').eq(6 * index).text();
                                });
                            });
                            $('.btn-update').each(function(index) {
                                $(this).click(function() {
                                    newsId = $('td').eq(6 * index).text();
                                });
                            });
                            console.log(newsId);
                            updateNews(newsClass);
                            deleteNews();
                        }
                    });
                }
            });
        });
        // 当点击确认按钮时将要删除的新闻的id传递给后端程序，然后在数据库中删除该新闻，删除成功后返回删除成功字样，并且刷新新闻列表，最后重新监听删除按钮的点击事件
        $('#delete').click(function() {
            // console.log(newsId);
            $.ajax({
                type: "post",
                url: "/management/deleteNews",
                data: {
                    newsid: newsId,

                },
                success: function(data) {
                    $("#btn-wrapper").hide();
                    $('#delete-status').text(data + '，页面将在2秒后关闭');
                    setTimeout(clearContent, 2000);
                    $.ajax({
                        type: "get",
                        url: "/management/" + newsClass,
                        data: {
                            newsclass: newsClass,
                        },
                        success: function(data) {
                            showNews(data);
                            $('.btn-delete').each(function(index) {
                                $(this).click(function() {
                                    newsId = $('td').eq(6 * index).text();
                                });
                            });
                            $('.btn-update').each(function(index) {
                                $(this).click(function() {
                                    newsId = $('td').eq(6 * index).text();
                                });
                            });
                            updateNews(newsClass);
                            deleteNews();
                        }
                    });
                }
            });
        });
    });
});
