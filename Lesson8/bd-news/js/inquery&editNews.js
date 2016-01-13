var newsId = null;
var newsClass = null;
var newsTitle = null;
var newsImg = null;
var newsContent = null;
var addTime = null;

function clearContent() {
    $('#update-newstitle').val('');
    $('#update-newscontent').val('');
    $('#update-newsimg').val('');
    $('#update-addtime').val('');
    $('#newstitle').val('');
    $('#newscontent').val('');
    $('#newsimg').val('');
    $('#addtime').val('');
    $('.masking').fadeOut();
    $('#success').fadeOut();
    $('.confirm-delete').fadeOut();
}
$(document).ready(function() {
    // 设置页面初始化时侧边导航栏的样式
    $(".btn-sidebar").each(function(index) {
        $(this).click(function() {
            $('.btn-sidebar .click').removeClass('click').addClass('normal');
            $(this).children().removeClass('normal').addClass('click');
        });
    });
    // 当点击增加新闻时，显示edit-news-wrapper标签，news-list-wrapper隐藏
    $("#edit-news").click(function() {
        $(".edit-news-wrapper").show().siblings().hide();
        // $(".news-list-wrapper").hide();
    });
    // 当填写好新闻信息点击提交时，将相应的数据传送到数据库中，并且在传送成功后在页面上显示提交成功
    $("#send").click(function() {
        newsTitle = $('#newstitle').val();
        newsContent = $('#newscontent').val();
        addTime = $('#addtime').val();
        if (newsTitle == '' || newsContent == '' || addTime == '') {
            $("#submit-status").text('请正确输入信息');
        } else {
            $.post("editNews.php", {
                newstitle: $("#newstitle").val(),
                newscontent: $("#newscontent").val(),
                newsimg: $("#newsimg").val(),
                addtime: $("#addtime").val(),
                newsclass: $('#newsclass').val()
            }, function(data) {
                // $("#submit-status").text(data);
                $('.masking').fadeIn();
                $('#success').fadeIn();
                setTimeout('clearContent()', 2000);
            });
        }
    });
    // 当点击重置按钮的时候将提交成功的字样清空
    $("#reset").click(function() {
        $("#submit-status").text("");
    });
    // 当点击各个类型的新闻时，从数据库中搜索相对应的新闻以table的形式展现在页面中，并且监听编辑及删除按钮的点击事件，当点击事件发生时展示确认删除对话框和编辑页面
    $("#local").click(function() {
        clearContent();
        // $(".edit-news-wrapper").hide();
        $(".news-list-wrapper").show().siblings().hide();
        $.get("inqueryNews.php", {
            newsclass: "local",
        }, function(data) {
            $(".news-list-wrapper").html(data);
            $('.delete').each(function(index) {
                $(this).click(function() {
                    newsId = $('td').eq(6 * index).text();
                    newsClass = "local";
                    $('#btn-wrapper').show();
                    $('#delete-status').text('');
                    $('.masking').fadeIn();
                    $('.confirm-delete').fadeIn();
                });
            });
            $('.update').each(function(index) {
                $(this).click(function() {
                    newsId = $('td').eq(6 * index).text();
                    newsClass = "local";
                    $('#update-newstitle').val($('td').eq(6 * index + 2).text());
                    $('#update-newsclass').val(newsClass);
                    $('#update-newscontent').val($('td').eq(6 * index + 3).text());
                    $('#update-newsimg').val($('td').eq(6 * index + 1).children().attr('src'));
                    $('#update-addtime').val($('td').eq(6 * index + 4).text());
                    $('.masking').fadeIn();
                    $('.update-wrapper').fadeIn();
                    $('#update-status').text('');
                });
            });
        });
    });
    $("#recommendation").click(function() {
        clearContent();
        // $(".edit-news-wrapper").hide();
        $(".news-list-wrapper").show().siblings().hide();
        $.get("inqueryNews.php", {
            newsclass: "recommendation",
        }, function(data) {
            $(".news-list-wrapper").html(data);
            $('.delete').each(function(index) {
                $(this).click(function() {
                    newsId = $('td').eq(6 * index).text();
                    newsClass = "recommendation";
                    $('#btn-wrapper').show();
                    $('#delete-status').text('');
                    $('.masking').fadeIn();
                    $('.confirm-delete').fadeIn();
                });
            });
            $('.update').each(function(index) {
                $(this).click(function() {
                    newsId = $('td').eq(6 * index).text();
                    newsClass = "recommendation";
                    $('#update-newstitle').val($('td').eq(6 * index + 2).text());
                    $('#update-newsclass').val(newsClass);
                    $('#update-newscontent').val($('td').eq(6 * index + 3).text());
                    $('#update-newsimg').val($('td').eq(6 * index + 1).children().attr('src'));
                    $('#update-addtime').val($('td').eq(6 * index + 4).text());
                    $('.masking').fadeIn();
                    $('.update-wrapper').fadeIn();
                    $('#update-status').text('');
                });
            });
        });
    });
    $("#entertainment").click(function() {
        clearContent();
        // $(".edit-news-wrapper").hide();
        $(".news-list-wrapper").show().siblings().hide();
        $.get("inqueryNews.php", {
            newsclass: "entertainment",
        }, function(data) {
            $(".news-list-wrapper").html(data);
            $('.delete').each(function(index) {
                $(this).click(function() {
                    newsId = $('td').eq(6 * index).text();
                    newsClass = "entertainment";
                    $('#btn-wrapper').show();
                    $('#delete-status').text('');
                    $('.masking').fadeIn();
                    $('.confirm-delete').fadeIn();
                });
            });
            $('.update').each(function(index) {
                $(this).click(function() {
                    newsId = $('td').eq(6 * index).text();
                    newsClass = "entertainment";
                    $('#update-newstitle').val($('td').eq(6 * index + 2).text());
                    $('#update-newsclass').val(newsClass);
                    $('#update-newscontent').val($('td').eq(6 * index + 3).text());
                    $('#update-newsimg').val($('td').eq(6 * index + 1).children().attr('src'));
                    $('#update-addtime').val($('td').eq(6 * index + 4).text());
                    $('.masking').fadeIn();
                    $('.update-wrapper').fadeIn();
                    $('#update-status').text('');
                });
            });
        });
    });
    // 当点击提交按钮时将要修改的新闻的id、新闻标题、新闻图片地址等信息传递给php脚本，然后在数据库中修改该新闻的信息，修改成功后返回修改成功字样，并且刷新新闻列表，最后重新监听编辑按钮的点击事件
    $('#update-send').click(function() {
        console.log(newsClass);
        $.post("updateNews.php", {
            newsid: newsId,
            newstitle: $("#update-newstitle").val(),
            newscontent: $("#update-newscontent").val(),
            newsimg: $("#update-newsimg").val(),
            addtime: $("#update-addtime").val(),
            newsclass: $('#update-newsclass').val()
        }, function(data) {
            $('.update-wrapper').fadeOut();
            $('#success').fadeIn();
            setTimeout('clearContent()', 2000);
            $.get("inqueryNews.php", {
                newsclass: newsClass,
            }, function(data) {
                $(".news-list-wrapper").html(data);
                // 更新新闻信息后继续监听编辑及删除按钮的点击事件
                $('.update').each(function(index) {
                    $(this).click(function() {
                        newsId = $('td').eq(6 * index).text();
                        // newsClass = "entertainment";
                        $('#update-newsclass').val(newsClass);
                        $('#update-newstitle').val($('td').eq(6 * index + 2).text());
                        $('#update-newscontent').val($('td').eq(6 * index + 3).text());
                        $('#update-newsimg').val($('td').eq(6 * index + 1).children().attr('src'));
                        $('#update-addtime').val($('td').eq(6 * index + 4).text());
                        $('.masking').fadeIn();
                        $('.update-wrapper').fadeIn();
                    });
                });
                $('.delete').each(function(index) {
                    $(this).click(function() {
                        newsId = $('td').eq(6 * index).text();
                        // newsClass = "entertainment";
                        $('#btn-wrapper').show();
                        $('#delete-status').text('');
                        $('.masking').fadeIn();
                        $('.confirm-delete').fadeIn();
                    });
                });
            })
        });
    });
    // 当点击编辑页面的重置按钮时清空修改成功字样
    $('#update-reset').click(function() {
        $('#update-status').text('');

    });
    // 当点击确认按钮时将要删除的新闻的id传递给php脚本，然后在数据库中删除该新闻，删除成功后返回删除成功字样，并且刷新新闻列表，最后重新监听删除按钮的点击事件
    $('#delete').click(function() {
        // console.log(newsId);
        $.post("deleteNews.php", {
            newsid: newsId,
        }, function(data) {
            $("#btn-wrapper").hide();
            $('#delete-status').text(data + '，页面将在2秒后关闭');
            setTimeout('clearContent()', 2000);
            $.get("inqueryNews.php", {
                newsclass: newsClass,
            }, function(data) {
                $(".news-list-wrapper").html(data);
                // 删除新闻信息后继续监听编辑及删除按钮的点击事件
                $('.delete').each(function(index) {
                    $(this).click(function() {
                        newsId = $('td').eq(6 * index).text();
                        $('#btn-wrapper').show();
                        $('#delete-status').text('');
                        $('.masking').fadeIn();
                        $('.confirm-delete').fadeIn();
                        // console.log(index);
                        // console.log(newsId);
                    });
                });
                $('.update').each(function(index) {
                    $(this).click(function() {
                        newsId = $('td').eq(6 * index).text();
                        newsClass = "entertainment";
                        $('#update-newstitle').val($('td').eq(6 * index + 2).text());
                        $('#update-newscontent').val($('td').eq(6 * index + 3).text());
                        $('#update-newsimg').val($('td').eq(6 * index + 1).children().attr('src'));
                        $('#update-addtime').val($('td').eq(6 * index + 4).text());
                        $('.masking').fadeIn();
                        $('.update-wrapper').fadeIn();
                        // console.log(index);
                        // console.log(newsId);
                    });
                });
            });
        });
    });
    // 当点击取消或者关闭时，关闭确认删除的页面
    $('#cancel').click(function() {
        $('.confirm-delete').fadeOut();
        $('.masking').fadeOut();
    });
    // 当点击关闭时关闭修改页面
    $('#update-close').click(function() {
        $('.update-wrapper').fadeOut();
        $('.masking').fadeOut();
    });

    // 点击操作成功对话框中的关闭之后清空输入框中的内容
    $('#success-close').click(function() {
        $('#update-newstitle').val('');
        $('#update-newscontent').val('');
        $('#update-newsimg').val('');
        $('#update-addtime').val('');
        $('#newstitle').val('');
        $('#newscontent').val('');
        $('#newsimg').val('');
        $('#addtime').val('');
        $('.masking').fadeOut();
        $('#success').fadeOut();
    });
});
