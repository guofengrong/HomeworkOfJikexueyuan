define(function(require, exports, module) {
	// 通过 require 引入依赖
    require('../jquery-1.11.3.min');
    var clearContent = require('./clearContent');
    var init =function() {
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
        });
        // 当点击重置按钮的时候将提交成功的字样清空
        $("#reset").click(function() {
            $("#submit-status").text("");
        });
        // 当点击编辑页面的重置按钮时清空修改成功字样
        $('#update-reset').click(function() {
            $('#update-status').text('');

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
            clearContent();
        });
    };
	// 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = init;
});